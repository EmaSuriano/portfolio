---
publishedAt: 2024-06-19
title: Simplifying project navigation with git-open
summary: Git-open is a CLI tool I use that opens the current project's
  repository in my browser with a simple command
---
If you are the kind of person that works in different projects at the same time and have a folder of bookmarks with the links to the repositories, then `git-open` is the CLI for you!

Once installed, the only thing you have to do is run `git open` from your project folder, and you will see a new browser tab open with the repository linked to it (it takes this information from the `origin`) with even the branch you are currently working.

!\[Demo\]([https://user-images.githubusercontent.com/39191/33507513-f60041ae-d6a9-11e7-985c-ab296d6a5b0f.gif](https://user-images.githubusercontent.com/39191/33507513-f60041ae-d6a9-11e7-985c-ab296d6a5b0f.gif))

To install it simply run:

```
npm install -g git-open
```

Because it's installed globally, you can access the tool from any project you are working on. Once you get used to the command, it becomes quite natural to use it to have quick access to PRs or issues.

Oh, it works with many providers:

*   [github.com](http://github.com)
    
*   [gist.github.com](http://gist.github.com)
    
*   [gitlab.com](http://gitlab.com)
    
*   [bitbucket.org](http://bitbucket.org)
    

You can find the official repository in GitHub at: [https://github.com/paulirish/git-open](https://github.com/paulirish/git-open)

Thanks for reading.