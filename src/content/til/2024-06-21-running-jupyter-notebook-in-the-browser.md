---
publishedAt: 2024-06-21
title: Running Jupyter notebook in the browser
summary: I found JupyterLite for embedding Python code in websites, enabling easy sharing and local execution.
tags:
  - Jupyter
  - Python
---

Given that this year I decided [moving into a new direction](/blog/going-into-a-new-direction/), towards the career path of AI engineer, learning first the fundamentals of python along with the core libraries like `numpy`, `pandas`, `matplotlib`, etc. I've been dealing a lot with Jupyter Notebook, like a lot ...

Basically everything that you learn or even build, you do it with notebooks (`.ipynb`) instead of python scripts files (`.py`), which for me was a bit weird in the beginning, because it felt more like playground to test functions rather than something that you can ship to production. But for learning purposes or even for sharing projects with others, they are great!

Coming from the web, I was missing a key element for my side projects: the **possibility of sharing** it with others or even making a demo. For this there is already a very popular project called [Google Colab](https://colab.google/), where people can work using cloud computing to later simply share the link of it.

I used many times and it does work great, but as a matter of fact you cannot insert the project directly into a website, a blog, portfolio, etc. They even have an [Github issue](https://github.com/googlecolab/colabtools/issues/1225) which is already 4 years old, where it doesn't seem that this will change in the future ...

For that reason, I did some research and I stumble across the awesome project of [JupyterLite](https://jupyterlite.readthedocs.io/), where they provide a fully Jupyter environment powered by WebAssembly. And yes, this allows you to run Python code in the browser!

And here is the demo, feel free to modify the code as you pleased because it's literally running in your computer, so the changes are local to you. By clicking in the button that says _Jupyter Lab_, you can open the current project in a new tab for a more comfortable view:

<iframe
  loading="lazy"
  title="Demo of jupyter notebook in the browser"
  src="https://emasuriano.github.io/python-demos/notebooks/index.html?path=demo.ipynb"
  width="100%"
  height="500px"
>
</iframe>

Something that I found and it's quite peculiar is that because you are still running code in the browser, you can make some very opinionated code by mixing Python with Javascript syntax. An example they show in the demo is this one:

```python
import json
from js import fetch

res = await fetch('https://httpbin.org/get')
text = await res.text()
obj = json.loads(text)
```

And yes this code indeed perform `async/await` to make a `GET` request to later parse to `JSON` ... I could have added it to the previous demo, but I preferred to keep it only with python code because that was the goal of the posts.

From now on, I'm planning to always add an embed of the project where you can see the content of the post along with the result of the code and in case you want to test something, easily change it on the fly.

In case you want to setup yours, you can refer to the official docs of JupyterLite where they made a very easy tutorial [how to setup your own JupyterLite website](https://jupyterlite.readthedocs.io/en/latest/quickstart/deploy.html).

Thanks for reading.
