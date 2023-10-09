const govukEleventyPlugin = require('@x-govuk/govuk-eleventy-plugin');
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
        stylesheets: ["/assets/output.css"]
    })
    eleventyConfig.addCollection("posts", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/content/blog/posts/*.md").reverse()
    })
    eleventyConfig.addWatchTarget('./tailwind.config.js')
    eleventyConfig.addWatchTarget('./src/assets/css/input.css')
    eleventyConfig.addPassthroughCopy({ './_tmp/output.css': './assets/output.css' })
    eleventyConfig.addShortcode('version', function () {
        return now
    })

    return {
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        dir: {
            input: './src/content',
            layouts: '../../node_modules/@x-govuk/govuk-eleventy-plugin/layouts',
        },
        pathPrefix: '/data-and-analytics-engineering-handbook/',
    }
};
