---
publishedAt: 2024-09-26
title: Get Github repository preview images
summary: You can use the Opengraph API of Github to get always up to date preview of any repository
tags:
  - Github
  - SEO
---

While I was writing another [TIL](/til) I needed to put some image about an open source project, in this case, was the popular project of [Ollama](https://ollama.com/). Normally what I do is take a screenshot of the website and store it locally in my assets folder, which is what most of the websites also do.

The main issue of this problem is not the fact that the repository size is going to grow (I solved this issue by using Git submodules), it is that the image most probably is going to get out of date. The information about the post is most probably also going to get outdated, but having as well old pictures doesn't help a lot ...

While I was searching for some kind of image that represents the project without information that can get outdated, I found this preview:

![Ollama Github preview](https://opengraph.githubassets.com/EmaSuriano/ollama/ollama)

It caught my attention because all the information was extremely up-to-date, considering that the last commit was less than 12 hours ago.

Then I decided to inspect the URL and, I found out that, it was coming from the [Open Graph](https://www.opengraph.xyz/) of Github assets. The URL itself looks like:

```plain
https://opengraph.githubassets.com/16dc0ce438cf338ca03e98e84238f23161d058f1665111075ba68fcd2f0ecf04/ollama/ollama
```

Then I checked on the Internet what each part means, and I found the following explanation:

```plain
https://opengraph.githubassets.com/<random_hash>/<owner>/<repo>
```

After knowing this I started playing with some of my other repositories and I found that I can always reliably get an up-to-date Github preview of my projects. As an example, I generated the one for this website:

![Portfolio Github preview](https://opengraph.githubassets.com/EmaSuriano/EmaSuriano/portfolio)

That will be all for now.

Thanks for reading.
