module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-theme-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":10000,"linkImagesToOriginal":false,"quality":80,"withWebp":true}},{"resolve":"@raae/gatsby-remark-oembed","options":{"providers":{"include":["Instagram"]}}},{"resolve":"gatsby-remark-embed-video","options":{"width":680,"ratio":1.77,"height":400,"related":false,"noIframeBorder":true,"urlOverrides":[{"id":"youtube"}]}},{"resolve":"gatsby-remark-copy-linked-files"},{"resolve":"gatsby-remark-numbered-footnotes"},{"resolve":"gatsby-remark-smartypants"},{"resolve":"gatsby-remark-external-links","options":{"target":"_blank","rel":"noreferrer"}}],"remarkPlugins":[null]},
    },{
      plugin: require('../node_modules/@narative/gatsby-theme-novela/gatsby-browser.js'),
      options: {"plugins":[],"contentPosts":"content/posts","contentAuthors":"content/about","rootPath":"/","basePath":"/blog","authorsPage":false,"mailchimp":true,"sources":{"local":true}},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Ema Suriano Portfolio","short_name":"Ema Suriano","start_url":"/","background_color":"#fff","theme_color":"#fff","display":"standalone","icon":"src/assets/favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"76f8768252b43f685086108520a3410a"},
    }]
