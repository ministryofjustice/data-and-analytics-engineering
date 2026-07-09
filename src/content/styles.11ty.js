const sass = require('sass');
const fs = require('fs');
const path = require('path');

const pathPrefix = process.env.PATHPREFIX || '/data-and-analytics-engineering/';
const assetPath = pathPrefix.replace(/\/$/, '') + '/assets/';

module.exports = class {
    data() {
        return {
            permalink: 'styles.css',
            eleventyExcludeFromCollections: true
        };
    }

    render() {
        const scssPath = path.resolve(__dirname, '_styles.scss');
        let scssContent = fs.readFileSync(scssPath, 'utf8');

        // Inject the correct asset path for GOV.UK Frontend fonts and images,
        // so previews deployed under a different path prefix also work.
        scssContent = scssContent.replace(
            /\$govuk-assets-path:\s*"[^"]*"/,
            `$govuk-assets-path: "${assetPath}"`
        );

        const result = sass.compileString(scssContent, {
            importers: [new sass.NodePackageImporter()],
            loadPaths: [path.dirname(scssPath), './node_modules', '.'],
            quietDeps: true,
            style: 'compressed'
        });

        return result.css;
    }
};
