# Publisher Documentation

This folder is for people who publish and maintain the site. It is intentionally kept at the repository root and is not included in the Eleventy build.

The public website content lives in `src/content/`. Build and publishing tooling lives at the repository root and in `.github/workflows/`.

## Guides

- [Contributing Guide](contrib.md) - how to add and review site content.
- [Index Template](index-template.md) - a starter structure for section landing pages.
- [Layouts](layouts.md) - the layouts available to published pages.
- [PR Previews](pr_previews.md) - how pull request previews are built and published.
- [Mermaid Diagrams](mermaid.md) - how to add diagrams-as-code to published content.
- [Directory Trees](dirtrees.md) - how to add directory structure visualisations.
- [Security Model](threat-model.md) - security notes for the build and publishing pipeline.

## Site Architecture

This site builds from the [ministryofjustice/data-and-analytics-engineering](https://github.com/ministryofjustice/data-and-analytics-engineering) repository. Pushes to `main` run [.github/workflows/deploy.yaml](../.github/workflows/deploy.yaml), which builds the site and deploys `_site/` to the `gh-pages` branch.

The main scripts and artefacts for publishing are:

- `src/content/` contains the public website content.
  - Write content in Markdown.
  - Use frontmatter to choose the layout and navigation position.
  - Do not include `.md` extensions in internal site links from published content.
- `eleventy.config.js` contains the Eleventy configuration, GOV.UK plugin setup, shortcodes, transforms, collections, passthrough copy rules, and path prefix.
- `src/_transforms/` contains build-time HTML transforms and shortcode helpers for features such as Mermaid, directory trees, table-of-contents injection, and copy-code buttons.
- `src/content/_includes/` contains custom layouts such as `article.njk`.
- `src/assets/` contains published static assets that are copied into `_site/assets/`.
