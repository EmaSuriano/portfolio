---
publishedAt: 2024-09-26
title: Running local LLM is not as hard as I expected
summary: During the past days I've tried different models locally and it turns out that it was easier than I expected!
tag:
  - LLM
  - Llama
  - Privacy
---

Let's keep it short, if you don't have a dedicated GPU you can still run locally an LLM and keep your data private to you, or even be creative and integrate it into an application or your workflow without having to pay per generated token (which is the way people pay for the closed-source LLM).

The open-source project that will make your life easier is called [Ollama](https://ollama.com/).

![Ollama Github preview](https://opengraph.githubassets.com/16dc0ce438cf338ca03e98e84238f23161d058f1665111075ba68fcd2f0ecf04/ollama/ollama)

Ollama can be described as an LLM manager, with which you can easily install and run models locally on your computer.

The installation is pretty straightforward forward and it's now [officially supported](https://ollama.com/blog/windows-preview) for all the Operative Systems: macOS, Linus, and Windows.

After the installation is over the way you interact with Ollama is via the Terminal application, using the command `ollama`.

```bash
➜  ~ ollama
Usage:
  ollama [flags]
  ollama [command]

Available Commands:
  serve       Start ollama
  create      Create a model from a Modelfile
  show        Show information for a model
  run         Run a model
  stop        Stop a running model
  pull        Pull a model from a registry
  push        Push a model to a registry
  list        List models
  ps          List running models
  cp          Copy a model
  rm          Remove a model
  help        Help about any command

Flags:
  -h, --help      help for ollama
  -v, --version   Show version information

Use "ollama [command] --help" for more information about a command.
```

All the models you can install and run are listed on their official website on the [Library page](https://ollama.com/library). They are by default listed as "Featured", which tends to be from better to worse (but that can change).

The most popular model to run with Ollama is [Llama](https://www.llama.com/) from Facebook. At the moment of writing this article, they just announced their new model [llama3.2](https://ollama.com/library/llama3.2).

To install and run it, simply execute:

```bash
➜  ~ ollama run llama3.2
```

The first time you run it, it will download the model and once everything is done you are going to see a prompt in your terminal saying "Send a message". This is the simplest way you can try the model and see how the responses are.

```plain
>>> Hey what's up?
Not much! It's nice to meet you. Is there something I can help you with or
would you like to chat?

>>> I'm writing a post, can you send a short message to the readers :)
Here is a short and sweet message:

"Thank you for being here!"

Feel free to use it as is or modify it to fit your post's tone and style!
```

## Going a step further

We can all agree that using the terminal to communicate with the model can be a bit cumbersome. Compared to other LLM experiences like Chat GPT, Claude, or even Bing, we are missing many features, such as History, the possibility of uploading images, file upload, sending audio, etc.

This is the problem that Open WebUI is coming to solve!

![Open WebUI Github preview](https://opengraph.githubassets.com/16dc0ce438cf338ca03e98e84238f23161d058f1665111075ba68fcd2f0ecf04/open-webui/open-webui).

It's a project that runs on top of Ollama and allows you to interact with the models in many ways. You can see it as a front end of your Backend (Ollama).

They ship tons of features so I highly recommend checking their websites where they explain all of them: [Features](https://docs.openwebui.com/features).

To [install the project](https://docs.openwebui.com/getting-started/#quick-start-with-docker--recommended) the easiest way is to download the Docker image that gets automatically updated when they release a new version. For this, you have to install Docker on your machine if you don't have it yet.

Then execute this command:

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

This will download the image, install the required dependencies in the image, and start the daemon instance, which you can easily access by entering https://localhost:3000.

The first time you are going to see a Login screen, just create an account. This is in case you want to host the server and would like to restrict access or split the history between the users.

And now you can fully enjoy the full experience :)

![Open WebUI demo](https://raw.githubusercontent.com/open-webui/open-webui/refs/heads/main/demo.gif)

Thanks for reading.
