---
publishedAt: 2025-01-23
title: VS Code Profiles - A Game-Changer for Managing Different Development Setups
summary: The profile feature lets you create separate environments with different extensions and settings for each tech stack helping keep your IDE fast and organized by loading only what you need for each project.
tags: 
  - VSCode
  - DevTools
  - Productivity
  - TIL
  - WebDev
  - dx
  - IDE
  - CodingTips
  - Programming
---

Today I discovered something pretty cool in VS Code that's been a total lifesaver for keeping my development environment clean and faster. You know how VS Code has all [these amazing extensions](https://marketplace.visualstudio.com/vscode)? Well, turns out you can create different profiles, each with its own set of extensions, themes, and settings!

![Create a profile](https://code.visualstudio.com/assets/docs/editor/profiles/create-profile.png)

Why is this such a big deal? Well, in my case, I bounce between React+TypeScript projects, Python development, and recently started writing some LaTeX documents. Each of these needs its own special sauce when it comes to extensions. For React, I need my TypeScript support, ESLint, Prettier, and a bunch of React-specific goodies. Switch to Python, and suddenly I need a different set of tools like Python language support, debugger, and Jupyter notebook integration. Don't even get me started on LaTeX with its preview features and compilation tools.

Before discovering profiles, I had ALL of these extensions enabled at once. Before started using the Profile feature I had a total of **61 extensions installed** in my editor. This issue gets even worse when you have many instances of vscode opened, because you are working in many projects at the same time.

But here's the neat part - creating and managing these profiles is super straightforward. You can access it right from the gear icon in the bottom left, or use the command palette and type "Profiles".

What I really love is that once you set up a profile for a specific project folder, VS Code remembers this choice. So next time you open that Python project? Boom! Your Python profile loads automatically with all the right extensions and none of the bloat.

Here's my current setup:

- A TypeScript profile loaded with web development and React tools
- A Python profile with just the essentials for data science and backend development
- A minimal LaTeX profile that keeps things focused on document writing

The best part? My VS Code is now running smoother than ever, and I don't have to manually enable/disable extensions anymore.

In case you want to know more, you can checkout the official [VS Code documentation](https://code.visualstudio.com/docs/editor/profiles).

Thanks for reading.