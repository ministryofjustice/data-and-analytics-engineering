# Project Guidelines

## Overview

GOV.UK-themed Eleventy static documentation site for MOJ Data and Analytics Engineering. All content lives under `src/content/`. The generated `_site/` is deployed to GitHub Pages.

## Build and Test

```bash
npm ci            # install dependencies (clean)
npm run build     # clean _site/ and generate static site
npm run serve     # local dev server with live reload
```

No linter or formatter is configured — follow existing code style.

## Architecture

- **Static site generator:** Eleventy 3 with Nunjucks templating
- **Design system:** GOV.UK Frontend + MOJ Frontend + `@x-govuk/govuk-eleventy-plugin`
- **Content dir:** `src/content/` — Markdown files with YAML frontmatter
- **Layouts/includes:** `src/content/_includes/`
- **Transforms:** `src/_transforms/` — build-time HTML post-processing (Mermaid injection, TOC generation)
- **Output:** `_site/` (gitignored)

## Content Conventions

### Frontmatter

Every `.md` file needs YAML frontmatter with at minimum:

```yaml
---
title: Page Title
layout: page # page | article | product | sub-navigation
eleventyNavigation:
  key: Unique Key
  parent: Parent Key # omit for top-level pages
  order: 1 # optional sort order
---
```

### Layouts

| Layout    | When to Use                                                      |
| --------- | ---------------------------------------------------------------- |
| `product` | Homepages, portfolio overview pages                              |
| `article` | Long docs with sections — auto-generates TOC from h2/h3 headings |

### File structure

- One `index.md` per directory as a landing page
- kebab-case or snake_case for directory names (match existing siblings)
- No `.md` extensions in internal links — Eleventy converts them to `/path/index.html`
- ADRs follow the template in `content/architecture_decision_records/adr000-template/`

### Shortcodes

```nunjucks
{# Card grid for portfolio/section landing pages #}
{% set items = [{url: "about/", title: "About", description: "..."}] %}
{% cardGrid items %}

{# Mermaid diagrams #}
{% mermaid %}
graph TD
  A --> B
{% endmermaid %}

{# Directory tree visualisation #}
{% dirtree %}
folder/
    file.txt
{% enddirtree %}
```

### Custom Mermaid icons

Drop `.svg` files into `docs/assets/icons/` — they are auto-discovered at build time and registered as a Mermaid icon pack. Use them via `icon-name` in diagrams.

## CI/CD

- **Push to `main`** → builds and deploys to `gh-pages` branch (GitHub Pages)
- **Pull requests** → builds a preview at `pr-preview/pr-{number}/` on `gh-pages`, posts preview link as PR comment
- **Dependabot** — daily npm update checks in `docs/`

## Site Architecture Documentation

Refer to the files in `src/content/site/` for detailed documentation of the Eleventy site architecture, including the build process, custom shortcodes, transforms, and layout structure.

## Key Files

| File                                 | Purpose                                                             |
| ------------------------------------ | ------------------------------------------------------------------- |
| `eleventy.config.js`                 | Eleventy config — plugins, shortcodes, transforms, passthrough copy |
| `src/_transforms/shortcodes.js`      | `cardGrid`, `mermaid`, `dirtree` shortcode definitions              |
| `src/_transforms/transforms.js`      | HTML transforms (Mermaid script injection, TOC injection)           |
| `src/_transforms/toc-generator.js`   | Extracts h2/h3 headings and builds TOC HTML                         |
| `src/_transforms/mermaid-init.js`    | Mermaid initialisation with icon packs                              |
| `src/_transforms/svg-icon-loader.js` | Auto-discovers SVGs in `assets/icons/`                              |
| `src/content/_includes/article.njk`  | Article layout with TOC sidebar container                           |
