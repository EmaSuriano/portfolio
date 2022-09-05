var plugins = [{
      plugin: require('/Users/emanuel.suriano/Git/portfolio/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/emanuel.suriano/Git/portfolio/node_modules/gatsby-plugin-theme-ui/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/emanuel.suriano/Git/portfolio/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                title\n                description\n                siteUrl\n                site_url: siteUrl\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                allArticle(sort: {order: DESC, fields: date}) {\n                  edges {\n                    node {\n                      body\n                      excerpt\n                      date\n                      slug\n                      title\n                      author\n                      secret\n                    }\n                  }\n                }\n              }\n              ","output":"/rss.xml"}]},
    },{
      plugin: require('/Users/emanuel.suriano/Git/portfolio/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":10000,"linkImagesToOriginal":false,"quality":80,"withWebp":true}},{"resolve":"@raae/gatsby-remark-oembed","options":{"providers":{"include":["Instagram"]}}},{"resolve":"gatsby-remark-embed-video","options":{"width":680,"ratio":1.77,"height":400,"related":false,"noIframeBorder":true,"urlOverrides":[{"id":"youtube"}]}},{"resolve":"gatsby-remark-copy-linked-files"},{"resolve":"gatsby-remark-numbered-footnotes"},{"resolve":"gatsby-remark-smartypants"},{"resolve":"gatsby-remark-external-links","options":{"target":"_blank","rel":"noreferrer"}}],"remarkPlugins":[null]},
    },{
      plugin: require('/Users/emanuel.suriano/Git/portfolio/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Ema Suriano Portfolio","short_name":"Ema Suriano","start_url":"/","background_color":"#fff","theme_color":"#fff","display":"standalone","icon":"src/assets/favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"76f8768252b43f685086108520a3410a"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
