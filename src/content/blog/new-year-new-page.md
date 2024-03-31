---
title: New year, new portfolio
summary: Introduction to my website, along with some learning I found on the process of refactoring and technical improvements.
publishedAt: 2023-01-03
cover: https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa
---

First of all, happy new 2023 to everybody reading this and welcome to the new version of my website! It took some time to set it up, between the breaks of work and some weekends while playing around with the new stack. The idea of the article is to share my insights about why I decided to fully rebuild it and some other improvements I made on top of the journey.

My old website was powered by [Gatsby](https://www.gatsbyjs.com/), a very popular static website generator. The part that attracted me the most about it was the whole [JAM Stack](https://jamstack.org/) architecture: the idea of decoupling data loading and application logic. Having as a result a fully static website without any loader if everything was fetched during build time.

## What was the problem before?

The previous version itself was a great website in terms of UI/UX and also performance-wise was quite competent, showing great results in Lighthouse. The main issue was maintaining the project. This was mainly related to the fact that the whole project was based on a non-maintained Gatsby Theme, called **Novela**. It still exists in the [documentation of Gatsby](https://www.gatsbyjs.com/plugins/@narative/gatsby-theme-novela/), but when trying to access to source code of the project the repository doesn’t exist anymore ...

A Gatsby Theme is basically a dependency of your project existing in your `package.json`, that has the power to hook into the Gatsby lifecycle of your project. Thanks to that, it can add new pages to the project, query information for your website or even install more plugins on top. Don’t take me wrong, the idea is great! But the issue comes when the theme itself is not getting up to date with the latest dependency, specially with the version of Gatbsy ...

In summary, even though my previous website was using some of the latest tools for web development such as GraphQL, PWA, MDX, etc., it was doomed to get worse and worse to maintain. One of the biggest pains was the build step. Whenever I had to build the project from scratch (installing dependencies, and not having cache for the assets), the process could take up to 13 minutes ... All because I was stuck to one old dependency which was bringing even more dependencies along the way. And I’m not even mentioning the security vulnerabilities I had in the project ...

## Time for a fresh start

I said to myself:

> No more templates, no more dependencies. The less, the better.

A framework that was released in 2022 caught my attention due to its simplicity and also because it is inside the JAM Stack community. I’m talking about [Astro](https://astro.build/)! I published some [open source projects](https://emasuriano.com/about#projects), and even gave a talk talking about its architecture:

<lite-youtube videoid="t28NaOgwVDg" videotitle="Typescript Berlin Meetup 2022" ></lite-youtube>

I was actually motivated by the idea of not using any framework at all for Astro. The idea of building a website just using JS, CSS and HTML resonated with me and made me rethink how many challenges are being unnecessarily solved with Javascript. One of the key features of Astro is **Zero JS, by default**. It means that in case you want to execute Javascript in the browser you have to explicitly declare it. This makes you fully aware when Javascript is indeed the only way to achieve things or if you can do it either with HTML or CSS directly.

A great example of this is all the visual responses that the user does with the application. In my previous project I used [`styled-components`](https://styled-components.com/) for theming and simply interactions such `:hover` or `:focus`, and [`react-motion`](https://github.com/chenglou/react-motion) for more complex animations. Again, I’m not saying those libraries are bad, but they do ship quite a lot of unnecessary code to our clients, making the loading and navigation of the site much slower. For this project, I replaced both libraries with [`tailwindcss`](https://github.com/tailwindlabs/tailwindcss), which provides everything I need: theming, animations, and a very solid design system with perfect spacing and colors.

Following the Astro philosophy, I decided not to adopt any framework. The entire website is built upon [Astro components](https://docs.astro.build/en/core-concepts/astro-components/), which can be seen as stateless components in React. With the main difference that there is no hooks, and in case you want to perform some kind of fetching for data or operation before the rendering, it has be done before the HTML comes. This creates a great separation between the logic of the component and the render. Inside the component you can declare the styles for it, using `<style>` tag, and the client-side code, using `<script>` tag (here you can even use Typescript by specifying the language `ts`).

```astro
---
import { transform } from 'dependency';

// fetching logic
const data = await fetch(URL);

// manipulating the data
const result = transform(data);
---

<h1>{result}</h1>

<style>
  /* scoped to the component, other H1s on the page remain the same */
  h1 {
    color: red;
  }
</style>

<script>
  import clientModule from 'another-dep';

  clientModule.start();
</script>
```

## Improvements over the previous version

### Build time

The current total time of this website is **6.64s**, counting as well optimization for images and compression for the website. With an incredible size of only **1MB**, thanks mostly to [`astro-compress`](https://github.com/astro-community/astro-compress). I highly recommend this plugin for anyone building websites with Astro!

In terms of performance, this website is actually much faster than the previous one, scoring a solid 100 in the Lighthouse report.

### Managing Assets properly

Finally, when building a blog or a rich-media website you have to decide where to store your images. For convenience and also fast iteration I was storing them inside the same repository, which was destroying the performance of my git repository and making it super slow when pulling and pushing changes containing images. Along the way I stumbled across [this great article](https://www.seancdavis.com/posts/should-i-add-images-to-my-git-repository/) from Sean. Where he explains different strategies on how to deal with these files. Short story: you should never store them inside the repo!

I opt-out for the solution of using [Git Large File Storage](https://git-lfs.com/), and luckily the service I’m using to build and deploy my website (Netlify) offers this option under the name of [Netlify Large Media](https://www.netlify.com/products/large-media/). The setup was extremely easy, and the best part is that my workflow was not altered at all.

The way it works is you have to specify the patterns for the files that are going to be considered Large Media, after that you can commit and push in the same way you always do it, but at push time the committed files that match those patterns are going to be first uploaded and later only the reference of the file is going to be published to Git.

As an example, the cover of this article in my repository contains the following information:

```plain
version https://git-lfs.github.com/spec/v1
oid sha256:d53944f17b0e4082ba5da5396a849f6bb1eaae2942560446cf9dfe7eb35a0302
size 1012361
```

### Article comments are now available!

In most of the places I published articles before, there was always a way of communicating with the writer. Before I used to engage into conversation inside Twitter of LinkedIn, but clearly not everybody has the time or wants to do that. Therefore I decided to finally add a comment box to the blog entries!

Following the idea of Astro, I wanted to ship as less JavaScript as possible, and that's when I found out about [`utterances`](https://utteranc.es/)! In order to enable is as easy as adding the following script into your website, and the comment box will be immediately created:

```html
<script
  src="https://utteranc.es/client.js"
  repo="[ENTER REPO HERE]"
  issue-term="pathname"
  theme="github-light"
  crossorigin="anonymous"
  async
></script>
```

One of the great things about Utterances is that it integrates seamlessly with your existing Github repository. All comments are stored as issues, making it easy to manage and organize conversations. Plus, since Github Issues can be edited and updated, it's possible to make changes and additions to comments even after they've been posted.

You can check how they work by leaving a comment at the bottom of this article!

In case you want to know more about the stack, features and developer tools that I'm using, you can checkout the [README.md](https://github.com/EmaSuriano/portfolio#readme) of this repository, where I specified everything that the project is using.

## Wrapping up

To close this post, I would like to recommend a new practice in the day to day of a developer which is asking the following questions:

> - Do I really need this library?
> - How does it impact the user experience while using the app?
> - Can I accomplish this without using Javascript?

Nowadays there is a library for mostly everything, but that doesn’t mean we should use it. The same applies to UI frameworks. There is an overhead of frameworks and just installing one dependency ends up installing many under the hood, filling our project with several packages that might be loaded when the user visits the site.

Less dependencies ➡️ Less maintainability ➡️ Less problems ➡️ **More time for you!**

Thanks for reading.
