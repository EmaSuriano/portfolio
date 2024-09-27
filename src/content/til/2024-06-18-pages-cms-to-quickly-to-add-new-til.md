---
publishedAt: 2024-06-18
title: Using Pages CMS to quickly to add new TIL
summary: An open source project to quickly share content directly from the browser
tags:
  - Today I learned
---

I wanted to share this tool before, but it was too "short" to be considered a full article, so I was keeping it for my self. Now that I officially release my TIL section, this is the perfect place for it.

The tool is called [Pages CMS](https://pagescms.org/), it's basically an online CMS that integrated perfectly with any of your GitHub repositories. It allows you to quickly add, remove or edit any plain text file in your repo. In my case, I was using it mostly for editing small typos in articles, but now I see a much better usage for TIL posts.

The UI is quite straight forward, where you can see all your "content" that you have to define in a config file called `.pages.yml` that looks something like this:

```yml
content:
  - name: til
    label: TIL
    path: src/content/til
    type: collection
    view:
      fields: [title, publishedAt]
    fields:
      - name: publishedAt
        label: Date
        type: date
      - name: title
        label: Title
        type: string
      - name: summary
        label: Summary
        type: string
      - name: body
        label: Body
        type: rich-text
```

This will allow the CMS to understand where to look for the TIL posts and also generate on the fly the fields to add or edit information about the post, and this is how I'm currently editing this post:

![Pages CMS edit page](../../static/assets/til/pages-cms/screenshot.png)

It's an amazing tool and Open Source, so you should definitely check out the [GitHub repository](https://github.com/pages-cms/pages-cms).

![pages-cms Github](https://opengraph.githubassets.com/random/pages-cms/pages-cms)

Thanks for reading
