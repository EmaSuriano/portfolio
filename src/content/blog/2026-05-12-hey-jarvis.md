---
publishedAt: 2026-05-12
title: "Hey Jarvis: Building a Voice-Activated Launcher for Sesame"
summary: How I built a local wake word detector to open and close Sesame with my voice, trained a custom model, and ended up with a tool I actually use every day.
cover: https://images.unsplash.com/photo-1650513737281-882e597ee5e5?q=80&w=1400&h=600&fit=crop
tags:
  - python
  - voice
  - automation
  - openwakeword
  - selenium
  - macos
  - ai
  - sesame
---

I've been using [Sesame](https://app.sesame.com/) a lot lately. If you haven't tried it — it's a voice AI with genuinely impressive conversational ability, and talking to Miles (one of the available agents) feels surprisingly natural. But there's one thing that kept breaking the immersion for me: I had to open my browser, navigate to the URL, and click a button every single time I wanted to start a session.

It's a small friction, but it's enough to kill the vibe.

So naturally, I did what any developer would do: spent way more time automating it than the clicks would have ever cost me.

## The Idea

The concept is simple. I wanted to say **"Hey Jarvis"** and have Sesame open automatically in Chrome, ready to go. And say **"Goodbye Jarvis"** to close it when I'm done. No keyboard, no mouse, no context switching.

The name is a bit on the nose, I know. But it felt right.

## How It Works

The whole thing runs locally on my Mac. Here's the architecture, such as it is:

```
Microphone → openWakeWord → threshold check → Selenium → Sesame
```

The script captures audio from the microphone in real time, feeds it into [openWakeWord](https://github.com/dscripka/openWakeWord) in small chunks (~80ms each), and checks if the confidence score for either wake word crosses a threshold. When it does, Selenium takes over and automates Chrome.

All of this runs **on-device** — no audio goes to any server. This was actually a requirement for me. I didn't want a cloud service listening to everything I say in my office.

## The Stack

- **openWakeWord** for wake word detection — it's local, fast, and supports custom models
- **Selenium + ChromeDriver** to automate Chrome
- **pyaudio + numpy** for the audio capture loop
- **python-dotenv** for configuration
- **uv** for dependency management (if you're not using uv yet, [you really should](https://emasuriano.com/blog/simplifying-python-development-with-uv))

## Training a Custom Wake Word

This is where it got interesting. openWakeWord ships with a handful of built-in models: `hey_jarvis`, `alexa`, `hey_mycroft`, and a few others. The open word (`hey_jarvis`) was already covered, but for "goodbye jarvis" I needed to train something from scratch.

The good news: openWakeWord models are trained on **synthetic audio**, not real recordings. The official [Google Colab notebook](https://colab.research.google.com/drive/1q1oe2zOyZp7UsB3jJiQ1IFn8z5YfjwEb) handles the whole pipeline — it generates thousands of TTS variations of your phrase, trains the model, and exports an `.onnx` file. You don't need a microphone, a GPU, or any dataset.

The not-so-obvious part is how to write the phrase. The TTS models used for training don't always pronounce things the way you'd expect. I ended up with:

```
good_bye_jar_vis
```

The underscores force the TTS to treat each part as a separate token, which gives you cleaner and more consistent pronunciation across the synthetic voices. If it sounds off, you can try variations like `gud_by_jar_vis` or `good_bye_jhar_vis`. It takes a bit of trial and error listening to the test clip in the notebook before committing to a full training run.

Training takes about 30–60 minutes on Colab depending on availability. At the end, you download a `.onnx` file and drop it into the `models/` folder.

> Speaking of which: the trained model **is included in the repo**, so you don't need to do any of this to get started. This section is just here in case you want to retrain it or build your own variant.

## The Code

The main loop is pretty straightforward:

```python
while True:
    raw = stream.read(CHUNK_SIZE, exception_on_overflow=False)
    frame = np.frombuffer(raw, dtype=np.int16)

    predictions = model.predict(frame)

    open_score  = predictions.get(OPEN_WORD, 0)
    close_score = predictions.get(CLOSE_WORD, 0)

    if open_score >= THRESHOLD:
        play_sound("Ping")
        open_sesame()
        model.reset()
        time.sleep(2)

    elif close_score >= THRESHOLD:
        play_sound("Blow")
        close_sesame()
        model.reset()
        time.sleep(2)
```

The `play_sound` function calls `afplay` — a macOS built-in — with a system sound file. It's non-blocking, so the audio plays while Selenium does its thing. Small touch, but it makes the interaction feel much more responsive.

One thing that tripped me up early on: when you load a custom `.onnx` model, the key in the `predictions` dict is the **filename stem**, not the path. So if your file is `./models/goodbye_jarvis.onnx`, the key is `goodbye_jarvis`. I had it as the full path initially and was getting 0 scores on every frame wondering why nothing was working.

Another gotcha: I was using `driver.close()` to shut down the browser, which only closes the current tab. `driver.quit()` is what actually kills the entire browser process. Obvious in retrospect, but it meant the browser was accumulating in the background every time I said goodbye.

## Logging in to Sesame

The script uses a dedicated Chrome profile so Sesame remembers your session between runs. You initialize it once:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --user-data-dir=/Users/your-username/selenium-sesame-profile
```

Log in to [app.sesame.com](https://app.sesame.com) in that window, then close it. Every subsequent run reuses the saved session.

> ⚠️ Logging in matters beyond just convenience: authenticated sessions last **30 minutes**, while guest sessions only last **5 minutes**. For a voice assistant you're having an actual conversation with, 5 minutes is nothing.

## Running It

```bash
# install and run
uv sync
hey-jarvis
```

That's it. The `hey-jarvis` CLI command comes from the `[project.scripts]` entry in `pyproject.toml`, so after `uv sync` it's available as a proper command.

If you don't want to install it, you can also just:

```bash
uv run sesame_launcher.py
```

## What I'd Do Differently

Honestly, not much — for a weekend project this held up well. A few things I've thought about:

- **A proper menu bar app** would be a nicer macOS experience than a terminal window. Something like rumps or py2app could wrap this into a little icon in the status bar.
- **Switching between Miles and Maya** by voice could be fun. Right now `AGENT_NAME` is a config constant; it wouldn't be hard to make it dynamic.
- **False positive handling** — occasionally the model fires on something that kind of sounds like the wake word. Adding a short lockout period after each detection helped, but it's not perfect.

## The Repo

The full source is on GitHub: [emasuriano/hey-jarvis](https://github.com/emasuriano/hey-jarvis)

It includes the trained `goodbye_jarvis.onnx` model, a `.env.example`, and everything you need to get started. If you try it out and end up retraining the model for better accuracy with your voice, I'd be curious how it goes — feel free to open an issue or drop me a message.