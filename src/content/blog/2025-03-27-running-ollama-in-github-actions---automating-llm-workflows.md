---
publishedAt: 2025-03-27
title: Running Ollama in GitHub Actions - Automating LLM Workflows
summary: How I integrated Ollama into GitHub Actions to run LLMs in CI/CD pipelines opening up new possibilities for automated content generation and AI-powered workflows
cover: https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=1400&h=600&fit=crop
tags:
  - ollama
  - github
  - actions
  - text-generation
---

As AI tools become more accessible, integrating them into our development workflows offers exciting new possibilities. In this post, I'll share how I set up [Ollama](https://ollama.com/) to run inside [GitHub Actions](https://docs.github.com/en/actions), creating a fully automated pipeline that generates daily motivational phrases for a website.

## What is Ollama?

For those unfamiliar, Ollama is an open-source tool that makes it easy to run large language models (LLMs) locally. It provides a simple interface to download, run, and customize models like Llama 3.2, Mistral, and other open weights. The key advantage is you can run these powerful AI models on your own hardware without relying on external APIs.

But what if we could run these models not just locally, but also in our CI/CD pipelines?

## The Project: Daily Motivational Phrases

To demonstrate this concept, I created a project that:

1. Runs Ollama with Llama 3.2 in GitHub Actions
2. Generates a new inspirational phrase daily
3. Saves it to the repository
4. Builds and deploys an updated Astro website

You can see the [live demo here](https://emasuriano.github.io/ollama-ci-demo) and explore the [full repository](https://github.com/emasuriano/ollama-ci-demo).

![Screenshot of the daily motivation website](https://github.com/user-attachments/assets/6e258cdd-4b4f-497d-a925-17f3b1a062bc)

## Setting Up Ollama in GitHub Actions

The magic happens in the GitHub Actions workflow file. Here's how it works:

```yaml
name: deploy

on:
  push:
    branches: [main]
  workflow_dispatch:
  schedule:
    - cron: "0 0 * * *" # Runs every day at midnight UTC

jobs:
  ollama:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4

      - name: Install ollama
        run: curl -fsSL https://ollama.com/install.sh | bash

      - name: Run LLM
        run: ./run-llm.sh

      - uses: stefanzweifel/git-auto-commit-action@v5
```

Let's break down what's happening:

1. The workflow is triggered on push to main, manually, or every day at midnight UTC
2. We install Ollama directly on the GitHub runner using their install script
3. We execute the file called `run-llm` that I'm going to show right after this list.
4. Finally, we commit the new file back to the repository

Coming back to the `run-llm.sh` file, it contains the following code:

```sh
#!/bin/bash

DATE=$(date +'%Y-%m-%d')
FILE_PATH="./src/phrases/$DATE.md"
MODEL='llama3.2-motivational'
MODEL_FILE='./Modelfile'

# Avoid running the command if the file already exists
if [ -f "$FILE_PATH" ]; then
    echo '[INFO] Phrase already exists, skipping...'
    exit 1
fi

echo '[INFO] Creating new model based on Modelfile...'
ollama create $MODEL -f $MODEL_FILE

echo '[INFO] Generating new phrase...'
ollama run "$MODEL" 'Give me an inspirational phrase, just the phrase without the author' > "$FILE_PATH"
```

That's it! With just a few lines of configuration, we've set up a fully automated workflow that runs an LLM in the cloud.

## Customizing the Model

For more control, I created a `Modelfile` to fine-tune the model's behavior:

```
# Base model
FROM llama3.2

# Lower temperature for more focused output
PARAMETER temperature 0.7

# Context window is good, but adding a comment about token limit trade-offs
PARAMETER num_ctx 4096

# Add top_p to further control response randomness
PARAMETER top_p 0.9

# Reduce repetition with frequency penalty
PARAMETER repeat_penalty 1.1

# System prompt improvements
SYSTEM """
You are a motivational phrase writer specializing in concise, powerful messaging.

GUIDELINES:
- Create phrases under 30 words that inspire immediate action
- Focus on strength, resilience, growth, and possibility
- Avoid generic clichés like "never give up" or "follow your dreams"
- When given a specific theme, customize the response to that context
- Provide exactly ONE phrase per response unless multiple are requested
- Occasionally incorporate metaphors that create strong mental imagery

Each phrase should feel fresh, meaningful, and worthy of being remembered.
"""
```

This custom model definition is used by the script in `run-llm.sh`, which creates a new model based on this file before generating a phrase.

## Building the Website

Once our LLM has generated the content, the next jobs in the workflow handle building and deploying the website. I'm using Astro for the website, with a simple structure that displays each day's phrase and allows navigation between days:

```yaml
build:
  needs: ollama
  runs-on: ubuntu-latest
  steps:
    - name: Checkout your repository using git
      uses: actions/checkout@v4
    - name: Install, build, and upload your site
      uses: withastro/action@v3

deploy:
  needs: build
  runs-on: ubuntu-latest
  permissions:
    contents: read
    pages: write
    id-token: write
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

If we take a closer look at how the github workflow we can see how each step goes after the other.

![Github Action overview](https://github.com/user-attachments/assets/5ebba5fe-4a77-4375-8a43-b5946dab0475)

Github Actions allows us to create very nice flows where steps can be dependant (like in this case) or even run in parallel, like in the case we want to run multiple llm calls at the same time.

## Broader Applications

While generating daily phrases is a simple example, this pattern can be applied to numerous other use cases:

### Content Generation

Imagine automating the creation of blog post ideas or summaries whenever new code is pushed. Your CI/CD pipeline could generate technical documentation updates that directly reflect code changes, keeping your docs perpetually in sync with your codebase. The same approach works for drafting social media content or newsletters - your repository could automatically prepare content drafts for review based on recent commits or releases.

### Code Assistance

LLMs in your pipeline can generate test cases to cover new functionality, ensuring better test coverage without manual intervention. They can create or update code documentation as your project evolves, write contextually appropriate commit messages based on the actual changes detected, and even offer code review suggestions before human reviewers get involved.

### Data Processing

When dealing with data-heavy applications, these models can summarize reports and findings into digestible formats. They excel at converting raw data into human-readable narratives that explain trends and patterns. For DevOps teams, extracting meaningful insights from logs or metrics becomes a streamlined process that happens automatically after each deployment.

## Benefits of Running LLMs in CI/CD

There are several advantages to this approach:

1. **Automation**: Once set up, the process runs without human intervention
2. **Consistency**: The same model and parameters are used each time
3. **Version Control**: All generated content is tracked in your repository
4. **Integration**: Output can be automatically built into websites, documentation, or other systems
5. **Cost-Effective**: No need for dedicated servers or API costs

## Considerations and Limitations

This approach isn't without challenges:

- **Runner Resources**: GitHub's free tier runners have limited CPU/RAM, which may impact model performance
- **Model Size**: Larger models may be challenging to run in this environment
- **Runtime**: LLM inference can take time, increasing your action minutes usage
- **Determinism**: You might want to ensure consistent outputs by setting a seed

## Getting Started

Want to try this yourself? Here's what you need:

1. Fork the [demo repository](https://github.com/emasuriano/ollama-ci-demo)
2. Update the `astro.config.mjs` with your GitHub username
3. Enable GitHub Pages in your repository settings
4. Ensure GitHub Actions permissions are configured correctly

The repository includes a full Astro website setup with dark/light mode support, keyboard navigation, and a responsive design.

## Looking Forward

As LLMs become more efficient and GitHub runners more powerful, we'll see even more sophisticated AI-powered automation in our development workflows. This simple demo just scratches the surface of what's possible.

What would you build with LLMs in your CI/CD pipeline? The possibilities are endless:

- Automated code generation or refactoring
- Content localization and translation
- Intelligent comment analysis for issues and PRs
- Dynamic documentation that evolves with your codebase

## Conclusion

Integrating Ollama with GitHub Actions demonstrates how we can leverage AI capabilities directly within our existing development workflows. By bringing LLMs into CI/CD pipelines, we open new possibilities for automation, content generation, and intelligent processing.

Feel free to explore the [repository](https://github.com/emasuriano/ollama-ci-demo), try out the concepts in your own projects, and let me know what you build!
