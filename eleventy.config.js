import { govukEleventyPlugin } from '@x-govuk/govuk-eleventy-plugin';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import { addShortcodes } from './src/_transforms/shortcodes.js';
import { addTransforms } from './src/_transforms/transforms.js';

const pathPrefix = process.env.PATHPREFIX || '/data-and-analytics-engineering/';
const prefixedSearchIndexPath = `${pathPrefix.replace(/\/$/, '')}/search.json`;

export default function (eleventyConfig) {
    addShortcodes(eleventyConfig);
    addTransforms(eleventyConfig);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(govukEleventyPlugin, {
        stylesheets: ['/styles.css'],
        header: {
            organisationName: 'Ministry of Justice',
            organisationLogo: 'royal-arms',
            productName: 'Data and Analytics Engineering',
            search: {
                indexPath: prefixedSearchIndexPath,
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
    eleventyConfig.addPassthroughCopy({ "./src/assets": "assets" })
    eleventyConfig.addPassthroughCopy("./src/content/**/*.{png,jpg,jpeg,gif,svg,webp,ico}")
    eleventyConfig.addShortcode('version', function () {
        return now
    })

    return {
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        dir: {
            input: './src/content',
            output: '_site',
            includes: '_includes',
        },
        pathPrefix,
    }
};
