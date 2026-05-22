const { govukEleventyPlugin } = require('@x-govuk/govuk-eleventy-plugin');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { addShortcodes } = require('./src/_transforms/shortcodes.js');

module.exports = function (eleventyConfig) {
    addShortcodes(eleventyConfig);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(govukEleventyPlugin, {
        stylesheets: ['/styles.css'],
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
        pathPrefix: process.env.PATHPREFIX || '/data-and-analytics-engineering/',
    }
};
