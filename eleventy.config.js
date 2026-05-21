const { govukEleventyPlugin } = require('@x-govuk/govuk-eleventy-plugin');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(govukEleventyPlugin, {
        header: {
            organisationName: 'Ministry of Justice',
            organisationLogo: 'royal-arms',
            productName: 'Data and Analytics Engineering',
            search: {
                indexPath: '/search.json',
                sitemapPath: '/sitemap'
            }
        },
        templates: {
            sitemap: false,
            searchIndex: {
                permalink: '/search.json'
            }
        }
    })
    eleventyConfig.addCollection("posts", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/content/blog/posts/*.md").reverse()
    })
    eleventyConfig.addPassthroughCopy({ './src/assets/css/input.css': 'assets/custom.css' })
    eleventyConfig.addTransform('customStylesheetLink', function (content, outputPath) {
        if (!outputPath || !outputPath.endsWith('.html')) {
            return content
        }

        const customStylesheet = '<link rel="stylesheet" href="/data-and-analytics-engineering/assets/custom.css">\n'
        return content.replace('</head>', `  ${customStylesheet}</head>`)
    })
    eleventyConfig.addPassthroughCopy("./src/**/*.png")
    eleventyConfig.addShortcode('version', function () {
        return now
    })

    return {
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        dir: {
            input: './src/content',
        },
        pathPrefix: '/data-and-analytics-engineering/',
    }
};
