---
title: You can create presentations from a Jupyter Notebook
publishedAt: 2024-07-02
summary: I explained how you can easily convert your notebooks into well animated presentations powered by Reveal.js
tags:
  - Jupyter Notebook
  - Developer extensions
  - Presentation
---

It turns out that any Jupyter Notebook can be easily turned on into Presentation Slides with minimal effort by using a feature that it's not so talked about it. It's not even a feature itself but rather an existing `output` format inside the `nbcovert` command inside the `jupyter` CLI. Link to the [official docs](https://github.com/jupyter/nbconvert/blob/main/docs/source/usage.rs).

```bash
> jupyter nbconvert your_notebook.ipynb --to slides --post serve
```

This command will first convert your notebook file into a `.slides.html` file powered by [revealjs](https://revealjs.com/) and then serve it locally in `localhost`. Each cell can have a tag assigned that will describe how the `nbconvert` will treat that cell, the possibilities are:

- Slide: A new slide (horizontal navigation).
- Sub-Slide: A new sub slide (vertical navigation).
- Fragment: A new transition inside the current slide.
- Skip: Ignore the cell.
- Notes: Use the content of the cell as slide notes.

This options are available either in the Jupyter Notebook Web Interface or in case you are using VS Code as your IDE, you can install [Jupyter Slide Show](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-jupyter-slideshow). The process it's more or less the same for both, in the upper right corner of each cell you should an option called _"Switch Slide Type"_, which allows you select between the 5 different types that I mentioned above.

By default the theme of the slides is `light`, but you can easily change with any of the [other official themes](https://revealjs.com/themes/) it by passing this option:

```bash
--SlidesExporter.reveal_theme=beige
```

Let's see a short demo. Given the following jupyter notebook:

![Demo screenshot 1](../../static/assets/til/jupyter-notebook-slides/screenshot-1.png)

![Demo screenshot 2](../../static/assets/til/jupyter-notebook-slides/screenshot-2.png)

You can see that each cell has on the bottom left the _Slide type_ assigned to, and here is the slide result:

<iframe
  loading="lazy"
  title="Demo slide"
  src="https://emasuriano.github.io/python-demos/files/slides/demo.slides.html#/"
  width="100%"
  height="500px"
></iframe>

To see the presentation in full screen, click [here](https://emasuriano.github.io/python-demos/files/slides/demo.slides.html#/). It also supports mobile gestures and many other features related to reveal.js.

Thanks for reading.
