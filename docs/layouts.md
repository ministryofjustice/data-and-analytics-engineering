# Layouts for Documentation

## Overview

The xGovUK-Eleventy Plugin that this site uses comes with a number of inbuilt layouts for pages. The full list of these can be seen on the [xGovUK-Eleventy Plugin GitHub layouts directory](https://github.com/x-govuk/govuk-eleventy-plugin/tree/main/docs/layouts).

You can also view the GOV.UK Eleventy Plugin documentation [on their website](https://govuk-eleventy-plugin.x-govuk.org/)

The two common layouts this site uses are:

**Product**: Used mainly for the Home Page.
**Article**: A custom layout that provides a table of contents for the page.

Layouts are set in the YAML frontmatter of a markdown page. For example, this page's frontmatter is:

```yaml
title: Layouts for Documentation
layout: article
eleventyNavigation:
  key: Layouts
  parent: Using This Site
```

Published pages use the same frontmatter shape in files under `src/content/`.

## The Custom "Article" Layout

This site also provides a custom `article` layout (which this page uses). The main utility this provides is a contents side bar. The side bar is automatically generated from any h2(##) and h3(###) headings in your markdown file.

### How Custom Layouts work

The custom `article` layout works through a multi-step transform pipeline at build time:

**1. Layout Template** (`src/content/_includes/article.njk`)
The layout extends the GOV.UK base template and includes an empty navigation container: `<nav id="toc-sidebar">`. This container is the key trigger for the TOC generation system.

**2. Build-Time Transform** (`src/_transforms/toc-transform.js`)
After Eleventy renders your markdown to HTML, the TOC transform scans all pages looking for the `#toc-sidebar` element. When found, it triggers the heading extraction and TOC generation process.

**3. Heading Extraction** (`src/_transforms/toc-generator.js`)
Using Cheerio (a server-side HTML parser), the generator extracts all `<h2>` and `<h3>` headings that have IDs. It builds a hierarchical structure where h3s are nested under their parent h2, then generates clean HTML with anchor links. The TOC only appears if your page has at least 2 headings.

**4. Interactive Scrollspy** (`src/_transforms/toc-scrollspy.js`)
A JavaScript snippet is injected into pages with TOC that uses the Intersection Observer API to track which heading is currently visible. As you scroll, the corresponding TOC link highlights automatically.

**5. Layout Resolution**
The `article.njk` layout lives in `src/content/_includes/` — Eleventy's configured includes directory. When a page specifies `layout: article` in its frontmatter, Eleventy finds it there automatically via standard layout resolution. The layout extends `layouts/base.njk`, which is provided by the `@x-govuk/govuk-eleventy-plugin` via virtual templates and Nunjucks search paths.

## Recommendations

Since the sub-navigation layout only shows the top two levels of the site, it's not very useful if you're somewhere deeply nested. For this reason we'd recommend:

- Use the `product` layout if your page is short and doesn't require navigating by a contents sidebar
- Use the `article` layout for longer pages, and use your h2(##) and h3(###) blocks to create your contents bar.
- For navigation, rely on the search bar and the breadcrumb trail at top of pages for navigating.
