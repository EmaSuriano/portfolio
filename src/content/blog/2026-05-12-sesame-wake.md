---
publishedAt: 2026-05-12
title: "Sesame Wake: A Bring-Your-Own Wake Word Launcher for Sesame"
summary: How I built a local wake-word launcher for Sesame with configurable ONNX models, a Textual TUI, and reliable browser automation.
cover: https://images.unsplash.com/photo-1650513737281-882e597ee5e5?q=80&w=1400&h=600&fit=crop
tags:
  - python
  - voice
  - automation
  - openwakeword
  - selenium
  - textual
  - macos
  - ai
  - sesame
---

I've been using [Sesame](https://app.sesame.com/) a lot lately. If you haven't tried it, it's a voice AI with genuinely impressive conversational ability, and talking to Miles feels surprisingly natural. But there was one thing that kept breaking the immersion for me: I had to open my browser, navigate to the URL, and click a button every single time I wanted to start a session.

It's a small friction, but it's enough to kill the vibe.

So naturally, I did what any developer would do: spent way more time automating it than the clicks would have ever cost me.

That's what Sesame Wake does. You bring any openWakeWord-compatible `.onnx` model, point the app at it, and Sesame Wake uses that phrase as a toggle: say the wake word once to open Sesame, say it again to close it.

## The Idea

The concept is simple. I want to talk to Sesame without touching the keyboard or mouse.

The app listens locally through the microphone. When the wake model crosses a confidence threshold, it uses Selenium to open Sesame in Chrome, click the configured agent, and keep track of whether the browser is currently active. If Sesame is already open, the same wake word closes it.

Using one wake word as a toggle keeps the interaction simple. I do not need one phrase to open Sesame and another phrase to close it; the app only needs to know whether the browser session is currently alive.

## How It Works

The whole thing runs locally:

```text
Microphone -> openWakeWord -> threshold check -> SessionManager -> Selenium -> Sesame
```

The listener captures audio from the microphone in real time with PyAudio, feeds frames into [openWakeWord](https://github.com/dscripka/openWakeWord), and checks the score for the configured model. When the score reaches the threshold, `SessionManager` toggles the Sesame browser session.

All wake-word processing stays **on-device**. The app is not sending microphone audio to a server, which was a hard requirement for me. If something is going to listen in the background while I work, I want that inference happening locally.

## The Stack

- **openWakeWord** for local wake-word detection
- **Selenium + ChromeDriver** to automate Chrome
- **Textual** for the terminal UI
- **PyAudio + NumPy** for the audio capture loop
- **python-dotenv** for configuration
- **uv** for dependency management

The project is organized as a small Python package:

```text
sesame_wake/
  cli.py          # console entry point
  config.py       # env loading and validation
  listener.py     # microphone + openWakeWord loop
  session.py      # Selenium lifecycle
  sounds.py       # cross-platform sound playback
  tui.py          # Textual UI
```

The console entry point is the `sesame-wake` command.

## Bring Your Own Wake Word

Sesame Wake does not bundle a wake model.

Instead, you provide an openWakeWord-compatible ONNX model and put it under `models/`:

```text
models/wakeword.onnx
```

Then configure it in `.env`:

```env
SELENIUM_PROFILE=/Users/your-username/selenium-sesame-profile
WAKE_MODEL=wakeword.onnx
```

`WAKE_MODEL` is intentionally treated as a filename inside `models/`. Parent paths are ignored, so the app always loads from the expected local model directory.

If you do not want to train a model from scratch, there is a large community collection in [home-assistant-wakewords-collection](https://github.com/fwartner/home-assistant-wakewords-collection/tree/main). If you do want to train one, the openWakeWord [Google Colab notebook](https://colab.research.google.com/drive/1q1oe2zOyZp7UsB3jJiQ1IFn8z5YfjwEb) can generate synthetic audio, train the model, and export an `.onnx` file.

I like this approach because the app stays focused on being a Sesame launcher. The wake phrase is just configuration.

## The TUI

The app uses [Textual](https://github.com/Textualize/textual) for a proper terminal dashboard:

- browser state: open or closed
- active wake model
- Chrome profile path
- live wake score
- configured threshold
- microphone input level
- recent listener, Selenium, and error events

It also has keyboard controls:

```text
t  toggle Sesame manually
q  quit
```

The manual toggle is more useful than I expected. When I am testing Selenium behavior, I can trigger the exact same open/close path without having to keep saying the wake word out loud.

For quieter debugging or running without the dashboard, there is also a plain log mode:

```bash
uv run sesame-wake --plain
```

## The Listener

The main loop is small, but it reports events to the TUI and handles a few important edge cases:

```python
while stop_event is None or not stop_event.is_set():
    frame = _read_audio_frame(stream)
    if frame is None:
        log.warning("Microphone error; attempting to reopen stream...")
        time.sleep(1)
        stream = _open_audio_stream(audio)
        continue

    score = model.predict(frame).get(score_key, 0)

    if score >= THRESHOLD:
        action = session.toggle()
        model.reset()
        time.sleep(COOLDOWN_SECS)
```

The part that matters is `score_key`. When openWakeWord loads a custom `.onnx` model, the predictions dictionary is keyed by the model name that openWakeWord registers internally. The app now derives that key directly from the loaded model:

```python
model = Model(wakeword_model_paths=[str(config.wake_model_path)], vad_threshold=0.5)
score_key = next(iter(model.models.keys()))
```

That avoids the annoying class of bugs where the model is loaded correctly but you are reading the wrong prediction key and getting zero forever.

The listener also emits microphone levels every 100ms. That small addition makes the TUI much more helpful: if the mic meter does not move, the problem is below openWakeWord. If the mic meter moves but the score never rises, the problem is model sensitivity, pronunciation, or threshold tuning.

## Browser State Is the Hard Part

The Selenium side is wrapped in a `SessionManager` that treats the WebDriver as the source of truth. That matters because the user might close the browser manually, Selenium might crash, or Chrome might get into a half-dead state.

Before deciding whether Sesame is active, it probes the browser with a tiny JavaScript round trip:

```python
def _is_driver_alive(self) -> bool:
    if self._driver is None:
        return False
    try:
        self._driver.execute_script("return true")
        return True
    except WebDriverException:
        return False
```

If the browser was closed externally, the session state resets itself. Opening Sesame also retries a few times, recreating the driver between attempts. That matters because browser automation is the least deterministic part of the whole project. The wake-word loop can be clean and predictable, but a web app can change, load slowly, or fail to expose the expected button quickly enough.

Closing uses `driver.quit()`, not `driver.close()`. `close()` only closes the current tab. `quit()` shuts down the browser process and cleans up the driver session, which is what I want when saying the wake word a second time.

## Logging in to Sesame

The script uses a dedicated Chrome profile so Sesame remembers your session between runs. You initialize it once:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --user-data-dir=/Users/your-username/selenium-sesame-profile
```

Log in to [app.sesame.com](https://app.sesame.com) in that window, then close it. Every subsequent run reuses the saved session.

Logging in matters beyond convenience: authenticated sessions last longer than guest sessions, and for a voice assistant you are having an actual conversation with, short guest sessions are painful.

## Running It

Clone the repo and install dependencies:

```bash
git clone https://github.com/emasuriano/sesame-wake.git
cd sesame-wake
uv sync
```

Create your `.env`:

```bash
cp .env.example .env
```

Put your ONNX wake model in `models/`, set `WAKE_MODEL`, and run the TUI:

```bash
uv run sesame-wake
```

You can also run the package module directly:

```bash
uv run python -m sesame_wake.cli
```

## Error Handling

The app tries to be clear when something is wrong.

Configuration fails fast with clear errors if `SELENIUM_PROFILE` is missing, `WAKE_MODEL` is not set, the model file does not exist, or the feedback sound assets are missing. Microphone read errors are treated as recoverable: the listener logs the issue, waits briefly, and tries to reopen the stream. Selenium open failures are retried before the app gives up and reports `OPEN_FAILED`.

Those are not glamorous changes, but they are what make the project feel usable instead of fragile.

## What I'd Do Next

A few ideas are still floating around:

- **A native menu bar app** would be a nicer macOS experience than a terminal window, even with the TUI being much better than raw logs.
- **Configurable agent selection** would make it easier to switch between Miles and Maya without editing `config.py`.
- **Threshold tuning in the UI** would be useful. Right now `THRESHOLD` lives in code, but the TUI is already showing the score, so making it adjustable there would fit naturally.
- **Packaging polish** would help if other people want to install it as a regular command-line tool instead of cloning the repo.

## The Repo

The full source is on GitHub: [emasuriano/sesame-wake](https://github.com/emasuriano/sesame-wake)

It includes the Textual UI, Selenium session manager, cross-platform sound playback, `.env.example`, and CI checks. It does **not** include a wake model, so bring your own `.onnx` file or grab one from the community collection.
