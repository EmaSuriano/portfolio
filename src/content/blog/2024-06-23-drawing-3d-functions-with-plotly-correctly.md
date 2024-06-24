---
publishedAt: 2024-06-23
title: Drawing 3D functions with Plotly
summary: I found JupyterLite for embedding Python code in websites, enabling easy sharing and local execution.
cover: https://images.unsplash.com/photo-1633269540827-728aabbb7646?w=1400&h=600&fit=crop
tags:
  - Jupyter
  - Python
---

I recently found myself with the challenge of having to draw a function in 3 dimensions in Python, and for this, I already knew in advance that I wanted to use [plotly](https://plotly.com/graphing-libraries/) due to the interactivity it provides.

It turns out that the user can inspect the plot at any point, zoom in or out, rotate the camera, and do many other actions, which makes the whole experience already much better. Here you can find some examples of what I'm talking about [3D Surface Plots](https://plotly.com/python/3d-surface-plots/).

My first attempt was to define a function `draw_function` that receives the incoming function to draw and the range for `x` and `y`, and the objective of the function is to calculate the `z` and draw it using `plotly`.

The resulting code looks something like this:

```python
from typing import Callable
import plotly.graph_objects as go
import numpy as np


def draw_function(f: Callable, graph_range: tuple[float]):
    # vectorize function to call it with numpy arrays
 f_vector = np.vectorize(f)

    # Create a grid of x and y values
 x = np.linspace(*graph_range, 150)
 y = np.linspace(*graph_range, 150)
 X, Y = np.meshgrid(x, y)

    # Calculate Z values
 Z = f_vector(X, Y)

    # Create the 3D surface plot
 fig = go.Figure(data=[go.Surface(z=Z, x=X, y=Y)])

    # update layout properties
 fig.update_layout(
        margin=dict(l=0, r=0, t=0, b=0),
        autosize=False,
        width=800,
        height=600,
    )

    # Show the plot
 fig.show()
```

So far so good, the function seems to be doing exactly what I wanted. I even tested it with basic functions like `x^2 + y^2` and it drew the expected classic parabolic plot.

You can play with the function by using the following interactive notebook. Feel free to modify the code as you please:

<iframe
  loading="lazy"
  title="Demo plotly 1"
  src="https://emasuriano.github.io/python-demos/notebooks/index.html?path=/drawing-function-with-plotly/demo.ipynb"
  width="100%"
  height="500px"
></iframe>

> Btw in case you are wondering what is this _black magic_ that allows you to run Jupyter Notebook directly from the browser, I wrote a [small TIL](/til/2024-06-21-running-jupyter-notebook-in-the-browser) about it.

## When things started to go south ...

But unexpectedly for some other function, it was making a different graph, so this is the main reason for this article ... The function itself was:

$$
f(x,y) = x^2 - y^3
$$

The plot inside Grapher has the following shape:

![Grapher output](../../static/assets/blog/2024-06-23-drawing-3d-functions-with-plotly-correctly/grapher-function.png)

Here you can see a place where the plot presents some sort of _Well_, and later it starts growing towards the `z` axis. So I simply replaced the code inside `my_function` and this is the outcome:

![Plotly output](../../static/assets/blog/2024-06-23-drawing-3d-functions-with-plotly-correctly/basic-plot.png)

As you can see both graphs are completely different which means that I cannot use this code as a proper plotter, because it doesn't plot correctly ...

## Understanding plotly axis scaling

Something that caught my attention when I saw the output of plotly was that the scale of the axis didn't match, in the case of `x` and `y` the range was `[-5, 5]`, but for the `z` axis one can see that it goes from -100 up to 150. That gave me a hint that something was odd already.

After scrolling for quite some time inside the [plotly docs](https://plotly.com/python-api-reference/), I found out that the scale of the axis can be customized by changing the `scene` when updating the layout. Specifically talking the property is called `zaxis` inside the `scene` dictionary.

My first attempt was to set it to have the same value as my `x` and `y` axis, and given that I was already sending them under the `graph_range` param it was quite easy. Here is the diff:

```diff
from typing import Callable
import plotly.graph_objects as go
import numpy as np


def draw_function(f: Callable, graph_range: tuple[float]):
 # vectorize function to call it with numpy arrays
 f_vector = np.vectorize(f)

 # Create a grid of x and y values
 x = np.linspace(*graph_range, 150)
 y = np.linspace(*graph_range, 150)
 X, Y = np.meshgrid(x, y)

 # Calculate Z values
 Z = f_vector(X, Y)

 # Create the 3D surface plot
 fig = go.Figure(data=[go.Surface(z=Z, x=X, y=Y)])

 # update layout properties
 fig.update_layout(
 margin=dict(l=0, r=0, t=0, b=0),
 autosize=False,
 width=800,
 height=600,
+ scene=dict(zaxis=dict(range=graph_range)),
 )

 # Show the plot
 fig.show()
```

And guess what, it worked!

![Plotly output](../../static/assets/blog/2024-06-23-drawing-3d-functions-with-plotly-correctly/plot-with-z-range.png)

As you can see, there is a caveat on it: the scale for the color map is wrong. The reason for that is that we only changed `scene` but the values for `z` didn't change, the only thing we did was update the way our "camera" sees the graph.

For this issue, we have two possible solutions:

1. Limit the values for our `z` axis and with that, the color scale will be fixed.
2. Manually set our color scale range for the graph.

Originally I implemented I went for the first option, due to it being the most logical to me. But it causes some visual issues when you limit the values and you don't have a proper _resolution_ for the graph you might end up having some rough edges. That problem was easier to fix by increasing the amount of points in the `x` and `y` axis, but it will make the plot more complex.

So for the final code, I force the color scale to use the same values as my `graph_range`. This can be configured by changing the values of `cmax` and `cmin` when creating the instance of `go.Surface`:

```diff
from typing import Callable
import plotly.graph_objects as go
import numpy as np


def draw_function(f: Callable, graph_range: tuple[float]):
 # vectorize function to call it with numpy arrays
 f_vector = np.vectorize(f)

 # Create a grid of x and y values
 x = np.linspace(*graph_range, 150)
 y = np.linspace(*graph_range, 150)
 X, Y = np.meshgrid(x, y)

 # Calculate Z values
 Z = f_vector(X, Y)

 # Create the 3D surface plot
+ fig = go.Figure(
+ data=[go.Surface(z=Z, x=X, y=Y, cmin=graph_range[0], cmax=graph_range[1])]
+ )

 # update layout properties
 fig.update_layout(
 margin=dict(l=0, r=0, t=0, b=0),
 autosize=False,
 width=800,
 height=600,
 scene=dict(zaxis=dict(range=graph_range)),
 )

 # Show the plot
 fig.show()
```

We can observe that now the function does match the plot from Grapher, and one can finally use this function to plot any other function in 3 dimensions.

![Plotly output](../../static/assets/blog/2024-06-23-drawing-3d-functions-with-plotly-correctly/final-plot.png)

I deployed another version of the notebook where you can test the same `draw_function` with already all the changes applied and the function updated. The main difference with the image from above is that you can interact with the plot by moving and zooming the camera.

<iframe
  loading="lazy"
  title="Demo plotly 1"
  src="https://emasuriano.github.io/python-demos/notebooks/index.html?path=/drawing-function-with-plotly/demo-fixed.ipynb"
  width="100%"
  height="500px"
></iframe>

## Closing words

I decided to write about this topic mainly because of all the time that I spent trying to "debug" this (you cannot a graph ...), and also I found out that there is almost not so much content about this kind of issue on the Internet. It's not very well documented how the axis of plotly works, and the fact that the scale of the axis is _auto-adjustable_ to your graph is the main reason why your plot will look different from a plotting library.

On top of that, I'm pretty sure that many people will face the same issue because it seems that `plotly` is kind of one of the best when it comes to 3D representation thanks to its interactivity.

Thanks for reading.

PD: This is my first "official" Python blog, so I'm sorry if I didn't follow some kind of Python convention. I'm currently learning while writing, so in case I made some mistake feel free to leave in the comments!
