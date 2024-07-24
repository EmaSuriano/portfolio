---
publishedAt: 2024-07-24
title: Setting up a decent recording setup without spending
summary: Boosting video recording setup using NVIDIA's app to save on hardware expenses.
tags:
  - Recording
  - OBS
  - Tutorial
---
I've been digging into the idea of publishing YouTube videos with the learning I've been making, but I didn't want to spend on additional hardware if I didn't know how many videos I would do or even if I would like it.

Because I would like to use my desktop computer (running Windows) to record videos and not my MacBook (mainly because I have a dedicated GPU that I'm planning to use for Deep Learning in the future), I don't own a webcam with which I can record my face or even try to explain to the camera. I know there are many people posting videos without showing the Face, but I feel that you can engage more with the audience when you show your face.

The only thing I currently own is a microphone with its arm, but the sound quality is quite bad. It takes quite a lot of background noise, and it doesn't provide any noise cancellation.

So the challenge was:

> How can I improve my current setup without spending?

## Tackling the Video problem

At first, I was checking on the market for "Best webcam in 2024", the classic search we always do when we want to buy something and have no clue what's good. I found many options, but the actual good ones were above 100 or even 200 Euros, which is not super expensive, but still it's quite a meaningful sum.

While searching for more alternatives, I found this cool [new feature of Windows 11](https://blogs.windows.com/windows-insider/2024/02/29/ability-to-use-a-mobile-devices-camera-as-a-webcam-on-your-pc-begins-rolling-out-to-windows-insiders/), that links your Android phone to Windows to use your phone camera as a Webcam, and because it's an included feature into the system it works flawlessly!

At the moment, I own a Pixel 7, and the output resolution is at about 720p (which sounds like Windows is capping it because the real resolution is 1080p), which I think should be enough for just showing my face in one of the corners of the screen.

## Tackling the sound quality problem

Most people would agree (me included) that to get better audio, you have to get new hardware and while it's indeed true, there are some _small tweaks_ that you can make to improve your existing sound quality.

I have an NVIDIA GPU installed on my desktop, and was always curious to try the app [Broadcast app](https://www.nvidia.com/en-us/geforce/broadcasting/broadcast-app/). It uses the GPU to improve the output of the audio, microphone, and even the camera. They provide a plugin system where you can decide what kind of filter to apply to each output.

Here is the video where they explain most of the features:

<lite-youtube videoid="_kHFTeL1RVU" videotitle="NVIDIA Broadcast App" ></lite-youtube>

## Time to hit record

So the last piece is now recording something and for that, I found out that many people recommend OBS. Given that it's Open Source, I gave it a try. I heard it was hard to configure or even that tends to crash quite often, in my experience, it was extremely easy. Maybe it's because I'm recording instead of streaming where the PC has to handle the resources differently, and it might just kill the app.

I simply added two sources:

1.  Display Capture: to record the whole screen or a specific app.
    
2.  Video Capture Device: here you must select the Nvidia Broadcast _Camera_ which is the one processed by the GPU.

Here is a quick demo of the setup that I recorded for YouTube:

<lite-youtube videoid="UG1WatzDuAk" videotitle="Quick setup of OBS" ></lite-youtube>

That should be all for now. I hope it helps someone who also wants to start!

Thanks for reading.