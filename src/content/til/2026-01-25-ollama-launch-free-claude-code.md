---
publishedAt: 2026-01-25
title: Ollama Launch lets you run Claude Code for free
summary: Ollama’s Launch feature lets you spin up Claude locally, so you can use Claude Code without an Anthropic subscription. I’m running the powerful `gpt-oss:120b-cloud` model and it feels amazing.
tags:
  - Ollama
  - Claude Code
  - AI
  - CLI
---

I just discovered Ollama’s **Launch** command – a super‑simple way to run Claude locally for free. No environment variables, no config files, just a single command.

### How I got it going

1. **Install Claude Code** (if you haven’t already):
   ```bash
   brew install claude-code
   ```
2. **Install Ollama** (v0.15+):
   ```bash
   brew install ollama
   ```
3. **Launch Claude**:
   ```bash
   ollama launch claude
   ```
   The first run will prompt you to pick a model – hit _Enter_ for the default.
4. **Use Claude Code** as usual:
   ```bash
   claude-code "Explain the difference between GPT‑4 and Claude"
   ```

### Why I love this

- **Zero cost** – no subscription fees.
- **Speed** – local inference, tiny latency.
- **Control** – pick any model you like.
- **Privacy** – your prompts never leave your machine.

**Key details**

- **VRAM & context**: Top‑end models need ~23 GB VRAM and a 64 k token context window (adjustable in Ollama settings).
- **Pull models** (optional):
  ```bash
  # Local model (≈23 GB VRAM)
  ollama pull glm-4.7-flash
  # Cloud model with full context
  ollama pull glm-4.7:cloud
  ```

**Supported integrations**: Claude Code, OpenCode, Codex, Droid (`ollama launch <tool>`).

**Recommended models**

- _Local_: `glm-4.7-flash`, `qwen3-coder`, `gpt-oss:20b`
- _Cloud_: `glm-4.7:cloud`, `minimax-m2.1:cloud`, `gpt-oss:120b-cloud`, `qwen3-coder:480b-cloud`

**Extended sessions & pricing**: Ollama now offers a **5‑hour coding session** on the free tier. Details at https://ollama.com/pricing.

**Configure without launching**:

```bash
ollama launch opencode --config
```

For the full story, see Ollama’s blog post: https://ollama.com/blog/launch
