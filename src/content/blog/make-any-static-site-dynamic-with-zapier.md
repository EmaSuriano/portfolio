---
title: Make any Static Site Dynamic with Zapier
summary: Demo on how to integrate Zapier along with Gatsby to make automatic deploys based on events.
publishedAt: 2019-03-19
cover: https://images.unsplash.com/photo-1517953377824-516f2dca803b?w=1400&h=600&fit=crop
---

Without any doubt, there has been a huge adoption for Static Site Generators in these past 2 years, and one of the main reasons was the huge growth of Gatsby and its community.

In my case, Gatsby was my first experience using an SSG (Static Site Generator) and I can confirm that the development experience is wonderful and I will continue using it for future projects!

## But there is something … 🤔

If they are super fast and easy to build with all the frameworks out there that can help you, then why is not everybody switching to them?

Because sometimes the term _Static_ can be very problematic and might not be aligned with your application. If we look for the definition, the one I like the most is this one:

> A static website contains Web pages with fixed content. Each page is coded in HTML and displays the same information to every visitor. A static site can be built by simply creating a few HTML pages and publishing them to a Web server. **Since static Web pages contain fixed code, the content of each page does not change unless it is manually updated by the webmaster.** — [source](https://techterms.com/definition/staticwebsite)

In summary, if you want to update your beautiful deployed application you need to deploy a new build. This may sound obvious if you are used to triggering a new deploy every time you make a change in your frontend, but now you need to trigger a new deploy when something in your database changed! 🤦‍♂️

## Let’s solve this! 👷‍♂️

You can always build and host your own service that will be watching for changes in your resources/dependencies and then trigger a new deployment when there is a change. But obviously it may take some time, especially depending on the amount and kind of dependencies you are using.

I’m a true believer of Serverless Solutions because they provide an out of the box solution for problems that you don’t need to solve by yourself, so you can focus on the important stuff. Such as, building a robust product.

So on this occasion, this new service I found recently: [Zapier](http://zapier.com/). This is how they describe the product:

> Zapier is a tool that allows you to connect apps you use every day to automate tasks and save time. You can connect any of our 1,000+ integrated apps together to make your own automations. What’s more it’s quick and easy to set up — you don’t need to be a developer, anyone can make a Zap! — [source](https://zapier.com/help/what-is-zapier/)

The concept is quite similar [IFTTT](https://ifttt.com/) “X should happen after Y”. But Zapier provides more services to integrate and also it has a much better way of creating these flows. For example, you can create a chain of services or add different paths given a condition on an event.

Also, the free plan allows you to create up to 5 Zaps (services integration) and a total of 100 runs per month. If you want to automate any small side project, you will be covered!

## My Experience 🙋‍♂️

I built my [own portfolio](https://gatsby-starter-mate.netlify.app/) using Gatsby where I divided the Landing Page into different sections: Home, About, Projects, and Writing. The first 3 are populated with data from a CMS, but the Writing Section is reading the posts published on Medium.

![Gatsby Starter Mate — Landing Page](../../static/assets/blog/make-any-static-site-dynamic-with-zapier/Gatsby_Starter_Mate_—_Landing_Page.jpg)

So as I explained before, I found it very annoying that every time I write a new article or update my CMS I need to manually trigger a deploy. And the more _dependencies_ you have, the more noticeable is this issue.

So when I heard about Zapier I was super excited because it will allow me to forget about this constraint.

## Integrating with Zapier ⚡️

The first logical step is to create an account inside [their website](http://zapier.com/). Then click on the orange button in the top right corner “Make a Zap” in order to start an empty integration. You’ll see this screen:

![Start screen to create Zap](../../static/assets/blog/make-any-static-site-dynamic-with-zapier/Start_screen_to_create_Zap.png)

On the left, you have the chain of events, which it’s empty by default. And on the center, an input to search for apps or integrations.

In the case of Medium, I had to do a workaround because the current integration doesn’t have the possibility to detect new posts. Luckily, Medium provides an [RSS feed](https://help.medium.com/hc/en-us/articles/214874118-RSS-feeds) for any registered user, so when I publish a new article this RSS will change and then I just need to watch for it. And guess what, Zapier has an RSS Trigger 🎉

Then I just need to take my RSS feed from Medium which is [https://medium.com/feed/@emasuriano](https://medium.com/feed/@emasuriano)

![RSS Zap options](../../static/assets/blog/make-any-static-site-dynamic-with-zapier/RSS_Zap_options.jpg)

Once I set up the RSS watcher, I can add the next step to deploy my site. I’m using [Netlify](https://netlify.com) to host and deploy it, so I searched for the Netlify integration and select the action of “Start Deploy”.

For every integration you make, Zapier will enquire you to log-in so it can access your account information. In the scenario of Netlify, it will show you all your sites to deploy and I selected my portfolio.

![Picking a Netlify site](../../static/assets/blog/make-any-static-site-dynamic-with-zapier/Picking_a_Netlify_site.jpg)

The last step is to assign a name to the Zap and enable it! 🎉

![Enabling Zap](../../static/assets/blog/make-any-static-site-dynamic-with-zapier/Enabling_Zap.png)

A small comment about this integration, the RSS watcher takes 15 minutes to refresh the RSS content so don’t panic if you see the deploy is not being triggered automatically 😅

## Last Words 👋

Static Sites are simply amazing and when you combine them with tools like Zapier you remove the “static restrictions” they have and can absolutely compete with the dynamic websites!

This has been my experience using the tool and I found it very smooth. In case you are working with a Static Website, I encourage you to go and try the tool. I’m sure that you can find several integrations to fill your needs.
