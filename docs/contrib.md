# Contributing Documentation

This site is set up to make documentation easy to propose, review, preview, and publish.

## Workflow

1. Clone the [repository](https://github.com/ministryofjustice/data-and-analytics-engineering).
2. Create a branch for your documentation change.
3. Create or update Markdown files under `src/content/`.
   - If you know where the page belongs, put it in the correct section straight away.
   - If you are drafting, place it somewhere sensible under `src/content/` and agree the final location during review.
4. Add or update frontmatter.
   - Every published Markdown page should set at least `title`, `layout`, and `eleventyNavigation.key`.
   - Use `eleventyNavigation.parent` when the page should appear under another navigation item.
5. Raise a pull request and send it to your reviewer.
6. Wait for the PR preview workflow to post a preview link on the pull request.
7. Once the content and navigation are agreed, merge the pull request.
8. The deploy workflow publishes the updated site to GitHub Pages after the merge to `main`.

## Content Conventions

- Use one `index.md` per directory when creating a landing page.
- Use kebab-case for new directories unless matching an existing sibling convention.
- Do not include `.md` extensions in internal published-site links.
- Use the `product` layout for short landing pages and the `article` layout for longer documentation pages.
- Keep this root `docs/` folder for publisher guidance only; public content belongs in `src/content/`.
