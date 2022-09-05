const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/emanuel.suriano/Git/portfolio/.cache/dev-404-page.js"))),
  "component---node-modules-narative-gatsby-theme-novela-src-templates-article-template-tsx": hot(preferDefault(require("/Users/emanuel.suriano/Git/portfolio/node_modules/@narative/gatsby-theme-novela/src/templates/article.template.tsx"))),
  "component---node-modules-narative-gatsby-theme-novela-src-templates-articles-template-tsx": hot(preferDefault(require("/Users/emanuel.suriano/Git/portfolio/node_modules/@narative/gatsby-theme-novela/src/templates/articles.template.tsx"))),
  "component---src-pages-404-tsx": hot(preferDefault(require("/Users/emanuel.suriano/Git/portfolio/src/pages/404.tsx"))),
  "component---src-templates-landing-tsx": hot(preferDefault(require("/Users/emanuel.suriano/Git/portfolio/src/templates/Landing.tsx"))),
  "component---src-templates-talks-tsx": hot(preferDefault(require("/Users/emanuel.suriano/Git/portfolio/src/templates/Talks.tsx")))
}

