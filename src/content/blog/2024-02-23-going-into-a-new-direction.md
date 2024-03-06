---
publishedAt: 2024-02-23
title: Going into a new direction
cover: https://images.unsplash.com/photo-1453173267031-c4c5ace6b624
summary: Testing summary
---
Hello, and happy new 2024! Last year was a crazy for all of us, and especially if you were to be in the tech industry, it felt like any day a new tool was going to be released ready to replace us.

Luckily most of us were not replaced which is good! But sadly there were many layoffs globally from companies that funnily were facing the highest profits of all time, but in their own words "We have to make the cut" ...

On top of that, the hiring situation got even worse, with many companies stopping the interviews process. Which ended up in a situation where the demand for new jobs and not so much offer. Which maybe for an experienced developer became just a big harder finding a new job, but for a recently graduated engineer or maybe self-taught developer was hardly impossible landing a new job.

\## My view on this

Since the launch of ChatGPT in early 2023, I always felt quite curious about how this was going to evolve. I was talking over and over with friends and colleagues about it, the new features and I even did a couple of mini projects with its API, that never got officially published just because they were never production ready.

I also learned about the existence of other popular models back then like Llama from Facebook, and all the huge community inside Hugging Face. It was like a whole new world for me, and it felt exciting but at the same time quite confusing.

Coming from the Web development world, where JS is the predominant language to work with, here the big guy is Python instead. I was aware that both shared many similarities, like for example: both are dynamic languages!

So I made my first attempt to go a try to make an app using Python and some of the Model outs there, and I failed ... Not only the syntax was a bit different, but the kind of errors that I was getting were not clear to me. Even very basic stuff like traversing an array just felt uncomfortable, and when trying to build a project you need to know more than just Python.

\## I bet I can do the same with JS

After my failure, I thought about, but why do I need to learn a whole new language and ecosystem if I already have everything I need in the JS world, right? Well I found out that I wasn't the only one that thought the same way! I found many new (and experimental) packages in NPM that were serving as wrappers for deployed models.

Back then, I managed to build an app using Next.js with server functions (also just released) powered by a JS wrapper around ChatGPT using vectors from Pinecone, which is a cloud storage for vector databases. The app was working and everything was smooth, but I was having this feeling that something was odd.

Somehow I was using all these tools, gluing them together on top of a simple UI for the user to interact and gather information, but deep down I didn't have much clue of how that works. Like for example, I used a vector database, just because it's the one that ML models are allowed to consume ... But why?

Besides this stack is still being used in many projects, IMO it's not scalable at all, and you can not build a whole product around a set of APIs of other services. Your costs are going to be huge, and they will just keep increasing the more users you have. This is why the only pricing plan these days is the subscription model, just because then each user has to pay for their usage.

Don't take me wrong, I don't have anything against that way of charging users. I believe a good product or service should be paid. But back then, I felt that if I decided to stick with JS and re-use services of other people, I wouldn't be able to make it too far.

\## New year, new mindset

At the beginning of 2024, I had the opportunity to go on a long trip around South-East Asia. One of the thing that I love about long trips is that there is going to be a moment where one will simply get tired of sightseeing or strolling around, and that's were great ideas and revelations start happening!

The main revelation that happened to me was: **I want to become an AI developer**. Instead of being the user of models, I was determined to learn to make them or at least to understand in order to take the best out them.

\> Small disclosure: At the moment of writing this article I'm not even close to get to the point that I want to be, but I wanted to share my discoveries along the way, something similar to journaling.

If there is something that I learned about being in the JS community is that there is a Roadmap for almost anything you want to learn, and they were absolutely fantastic to make understand where I stand and where I want to go.

I visited and evaluated many of them, some were more oriented on a specific branch where others gave a broader perspective. The one that I found absolute fantastic, and it's the one that I'm using to learn is: [i.am.ai/roadmap](http://i.am.ai/roadmap)

!\[Roadmap Introduction\]([https://raw.githubusercontent.com/AMAI-GmbH/AI-Expert-Roadmap/main/images/intro.svg](https://raw.githubusercontent.com/AMAI-GmbH/AI-Expert-Roadmap/main/images/intro.svg))

I fully recommend checking their website because it's not only a static roadmap, many of the steps inside it has links attached to it, that will save time and effort of scrolling thought Google results.

\## Programming books are not that bad!

Since I started coding, I never liked reading programming books. For me, having the code static there without the possibility of running the code or even inspecting the source code of a library was always a downside.

While I was travelling I didn't have my computer with me, so I was not able to learn a new language the way I'm used to, which led me to acquiring a couple of books. Honestly I couldn't be happier of that!

I would suggest anyone entering a new field of programming to start with a book, rather than coding. While reading a book, you get to know not only the syntax of a function and for what is it, but also learn about how it deeply works under the hood. An example that I can give: why NumPy arrays are almost always considered better than Python arrays.

Here are the set of books that I picked to start with:

\* Automate the boring stuff with Python, by Al Sweigart: serves as an introduction to Python, showcasing easy examples for day to day tasks.

\* Python Data Science Handbook, by Jake Vanderplas: This is a must to understand the main libraries used in Data Science (and Machine Learning): NumPy, Pandas, scikit-learn and matplot.

\* Introduction to Machine Learning with Python, by Sarah Guido: great explanation of the process in ML, along with theory and practical examples.

\* Building Machine Learning powered Applications, by Emmanuel Ameisen: didn't have time yet to read it ...

On top of reading these books, I'm studying them. I found recently a very nice article highlight in Hacker News, which talks about the pitfalls when studying or giving exams, and how can we have an effective learning process. It doesn't have anything to do with AI, but I would recommend it in case you are learning something new. Link to \[How to Study\]([https://cse.buffalo.edu/~rapaport/howtostudy](https://cse.buffalo.edu/~rapaport/howtostudy))

\## Wrapping it up

This article could have easily gone for my Non-Technical blog, but I wanted to add it to my main blog just for people to understand why the sudden change of content that I write. That being said, it doesn't mean that I'm not going to write about JS anymore or side-projects, I still have lots of Open Source projects to maintain and my current position is still a Web Engineer.

In case you are in the same situation as me, learning or wanted to start AI. I have big hopes for 2024 and the content that I'm going to publish here, so keep it around because I have many ideas for future posts and projects.

Thanks for reading.