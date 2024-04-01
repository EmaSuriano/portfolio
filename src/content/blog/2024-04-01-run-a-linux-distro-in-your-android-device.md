---
publishedAt: 2024-04-01
title: Run a Linux Distro in your Android device
cover: https://images.unsplash.com/photo-1650094980569-f7903e52633d
summary: How I set up an Android tablet to be able to run a Linux Distro in
  order to have a desktop experience and boost your productivity.
---
This post is going to be about how I set up an Android tablet to be able to run a Linux Distro in order to have a desktop experience and boost the productivity due to the Window Manager.

> **Disclaimer:** The whole process happens locally in the tablet, therefore all the programs are executed inside the tablet. I saw some other tutorials where people use [code-server](https://github.com/coder/code-server) and besides the coding experience might look the same, running the full OS offers more capabilities.

This is how the end result looks like:

![Deskptop](https://cdn.statically.io/gh/emasuriano/static/main/assets/blog/2024-04-01-run-a-linux-distro-in-your-android-device/desktop.png)

## How I got here?

While I was travelling and reading some Machine Learning books, I wanted to try some of the new things that I was reading, but sadly I didn't have any laptop with me, and I was not planning in getting a new one. The only big screen that I had with me was a 10" Tablet, which I use for streaming and reading.

The tablet is a [Redmi Pad SE](https://www.gsmarena.com/xiaomi_redmi_pad_se-12466.php) running Android 14 with 8 GB of RAM, Snapdragon 680 for the CPU and 256 GB of disk. It's not a bad tablet at all, but clearly is not the best one, specially the CPU could have been better.

![Tablet specs](https://cdn.statically.io/gh/emasuriano/static/main/assets/blog/2024-04-01-run-a-linux-distro-in-your-android-device/tablet-specs.jpg)

The only piece of Hardware that I would highly recommend getting is a Bluetooth keyboard. Using the virtual keyboard in the screen takes quite a lot of space in the screen and highly reduce the productivity while using the desktop. I got a [Logitech K380](https://www.logitech.com/en-us/products/keyboards/k380-multi-device.920-009600.html), which is one of the cheapest and most compact Bluetooth keyboard that you can find stores.

One valid argument can be: what's the point of running Linux in a tablet if I already have a computer/laptop for development? I came up with the following points:

*   _Convenience_: In case you don't have computer around, then with this setup you **can do basically the same stuff**. In my case, I tried cloning repositories, installing dependencies, running node server, opening browser and inspecting the website.
    
*   _Affordability_: If you don't have a computer, this setup is **way cheaper** than buying a new laptop or even worse the whole setup for a desktop computer.
    
*   _Portability_: This point might depend on your Hardware, in my case the combo of Tablet + Keyboard is **lighter** than a laptop. Also considering that you can use the same charger that you use for your phone.
    

## Stack

The only things applications that you need to download are:

\- [Termux](https://termux.dev/en/): terminal application that allows to emulate bash and have access to package installation like `apt install`.

\- [Termux:X11](https://github.com/termux/termux-x11): plugin for Termux to connect to instance of servers and handle the connection.

> **Important disclaimer**: You can find the latest version of Termux inside F-Droid instead of Play Store, so please download those instead.

I want to keep this post mostly practical, therefore in case you want to read how the actual desktop emulation run, please check out the [official repository of the plugin](https://github.com/termux/termux-x11/blob/master/README.md). It provides an in depth description of the inner commands and options available inside the plugin.

Once both applications are installed, we can start with the installation of the project dependencies and image of the OS. For this step I found a [great GitHub repository](https://github.com/phoenixbyrd/Termux_XFCE) where the whole process is automatized, so I want to send great kudos to [@phoenixbyrd](https://github.com/phoenixbyrd) and rest of the team which made the installation script. Inside his README you can find:

> Sets up a Termux XFCE desktop and a Debian proot install. This setup uses Termux-X11, the termux-x11 server will be installed, and you will be prompted to allow Termux to install the Android APK.

Also consider that you are going to need at least 4 GB of storage space for the installation and as you install applications, they will take even more.

Open Termux and paste the following command.

```bash
> curl -sL https://raw.githubusercontent.com/phoenixbyrd/Termux_XFCE/main/setup.sh -o setup.sh && chmod +x setup.sh && ./setup.sh
```

This might take some time because it has to download all the resources + packages for the OS. In case you encountered some issue during the installation, you can

join their [Discord server](https://discord.gg/pNMVrZu5dm) or check out the [GitHub Issues](https://github.com/phoenixbyrd/Termux_XFCE/issues) of the repository.

Assuming your installation is successful, the setup already added a new `start` command into your Termux that allows you start the server and at the same time boot Termux:X11 with the same port.

I tested several setup in the past using approaches like [Andronix](https://andronix.app) and this setup is better in many ways:

*   _Installation_: the setup script takes care of downloading the resources you need and a single place for troubleshooting. This is extremely helpful because there are so many parts that can be misconfigured and searching in Stack Overflow is not that helpful due to the configuration of someone might defer from yours.
    
*   _Smoother experience_: Termux:X11 provides a smoother experience where the response time is faster to other alternatives.
    
*   _One button to start_: simply type `start` in Termux and in less than 5 seconds you are inside your desktop. No need to configure IP or have both application running, the command does everything for us.
    

## Configuration of the Desktop

At this point you can do pretty much whatever you want with the desktop like installation packages or applications. Nevertheless, that you are not running a real Unix Kernel and some modules might be missing, that's why not all the applications can be installed directly.

Luckily this project already have the solution for that! In your desktop there is an app called "App Installer". Once opened you can find many applications that are "modded" so they can run in this kind of virtual environment.

Some good examples are Visual Studio Code (even Extensions works!), Notion, Brave browser, PyCharm and many more! Just select the one you want to install and click on OK.

![App Installer](https://cdn.statically.io/gh/emasuriano/static/main/assets/blog/2024-04-01-run-a-linux-distro-in-your-android-device/app-installer.png)

> _Small caveat_: there is no installation progression indicator, so after selecting the application to install it might seem that nothing is happening, but simply wait a couple of minutes, and you should see a new alert saying that the App has been installed.

## Demo time

Honestly anything can be a proof that the setup works well, because at this point you can browse the internet, run bash scripts or even play desktop games. In my case, I use it mostly for web development, so that's what I'm going to showcase.

The first step is to install the IDE to handle files and changes. Nowadays, VS Code is the go-to editor for web development, which can be easily installed via the "App installer" as I described before.

Once installed we can open it and select the option to clone a new repository. I use GitHub to store my public repositories, which VS Code has an integration already built in for it.

Depending on the stack of the repository you are cloning, you might have to install additional dependencies. For this demo, I'm using my [own website](https://emasuriano.com), which is a static website built with [Astro.js](https://astro.build/). It which requires to have [Node.js](https://nodejs.org/) installed and [Yarn](https://yarnpkg.com/) for package manager.

Once all the dependencies are installed, we can now start the server. In my case, I run `yarn start` which starts a local server that can be opened in the browser.

![VS code running](https://cdn.statically.io/gh/emasuriano/static/main/assets/blog/2024-04-01-run-a-linux-distro-in-your-android-device/code.png)

![Local server running](https://cdn.statically.io/gh/emasuriano/static/main/assets/blog/2024-04-01-run-a-linux-distro-in-your-android-device/local-running.png)

For Web Development one of the most powerful tools is the Dev Tools, where you can inspect DOM Nodes, network activity or even trigger commands from the terminal. This kind of tooling is normally missing in Android and thanks to this setup we can have it.

![Dev Tools working](https://cdn.statically.io/gh/emasuriano/static/main/assets/blog/2024-04-01-run-a-linux-distro-in-your-android-device/web-inspector.png)

Thanks that we are running the local server, can we modify the codebase and see the changes in real time inside our browser. In this case, I modify the name and the company.

![Local modification running](https://cdn.statically.io/gh/emasuriano/static/main/assets/blog/2024-04-01-run-a-linux-distro-in-your-android-device/local-server-modified.png)

Once we are happy with the changes, we can commit our changes to saved our changes and potentially trigger a new deployment. With this we basically cover how we can do basic web development.

## Closing words

I normally don't write this kind of posts of "tech hacks" but I had so much fun tweaking the tablet that I just wanted to make a post documenting the process to help others. On top of that, when I was re-searching for this kind of stuff I would have wished to find some kind of post like this one!

Feel free to reach out to me or leave a comment in this post, I can try to help with the process or even better you consider joining the [Discord server](https://discord.gg/pNMVrZu5dm) where the real maintainers of the project can help you.

Have fun hacking, and thanks for reading.