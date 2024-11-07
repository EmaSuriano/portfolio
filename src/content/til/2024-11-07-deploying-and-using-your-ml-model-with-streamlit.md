---
publishedAt: 2024-11-07
title: Deploying and using your ML model with streamlit
summary: I stumble accross one of the easiest way of dpeloying  ML models online so anyone can use it
tags:
  - Machine Learning
  - Streamlit
  - Keras
  - Tensforflow
  - Python
---

I started learning about Deep Learning now for about a month, and it's has been a long journey, soon I will try to publish some kind of 101 post about it once I have some spare time.

Nevertheless I didn't want to loose the opportunity to share my latest discovery, [Streamlit](https://streamlit.io/). I see like:

> It's like Github Pages, but for ML models. - Ema Suriano

![Streamlit Github](https://opengraph.githubassets.com/random/streamlit/streamlit)

## Some context first

For me it was always very natural to create Demo websites of tools or apps that I create. When you are working with JS, it's very simple. Bootstrap a project using any framework you want, add your logic, build and deploy somewhere.

The main reason why things are straight forward is because when you are working **only** with JS, you can host all your logic on the client side. In case you need to have some BE logic, like a Database or a service, you can always rely on cloud services like Firebase or Lambda function.

Where was the problem with python? Well the browser cannot execute python, and therefore you need to have a service that can execute the code for you. I found many cloud services that can help with the deploying, but that means that everytime I want to make a demo website I have to go to always:

1. Wrap my model under an API endpoint and deploy it on the cloud
2. Build a demo website where I obtain the input of the user, call my server and show the results.

This sounds like a lot to me, just only for showing to people some demo that I made.

## Streamlit come to the rescue

By chance I stumble across with this new website "Streamlit", which to be fully honest, it sounded to good to be true.

They claimed:

> Streamlit turns data scripts into shareable web apps in minutes. All in pure Python. No front‑end experience required.

They provide a very basic template builder using Python, which allows you to define all the inputs that you need for the user, to later add the logic that you want to present to the user.

All your app logic is contained in only file, without the need of making a difference between BE and FE. For showing the capabilities of a model I think it's great, but I don't think it's suitable when you want to release the model to the end users, and most probably you want to customize the UX.

## My case: a Yoga pose classifier

So I built a Yoga pose image classifier using this [Yoga Kaggle Dataset](https://www.kaggle.com/datasets/tr1gg3rtrash/yoga-posture-dataset). In this short TIL, I'm not going to cover how I trained the model. That it's going to be in a separate blog post, and most probably longer that this one. For now, what's important is that the model is trained and already save as `.h5` file.

The idea of the app is that given an image of a Yoga pose, it has to identify to which position it belongs to and return the name for it. In the dataset there are in total 48, so it's doesn't cover all the positions in Yoga plus the variants for each one.

The app is deployed at: [yoga-classification-web-demo](https://yoga-classification-web-demo.streamlit.app/)

Here are some pictures of how the app looks like:

![Light theme](https://raw.githubusercontent.com/EmaSuriano/yoga-classification-web-demo/refs/heads/main/assets/light.png)

![Dark theme](https://raw.githubusercontent.com/EmaSuriano/yoga-classification-web-demo/refs/heads/main/assets/dark.png)

In case you want to checkout the source code for the website, here is the [Github repository](https://github.com/EmaSuriano/yoga-classification-web-demo/tree/main).

![Yoga classifier demo Github](https://opengraph.githubassets.com/random/EmaSuriano/yoga-classification-web-demo)

That's all for now, thanks for reading.
