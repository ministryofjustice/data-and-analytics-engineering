# Section Index Template

Use this as a starting point when creating a new landing page under `src/content/`.

A section index should collect links to smaller pages rather than becoming a long article itself. This keeps navigation shallow and makes it easier for readers to scan what a section contains.

## Example Frontmatter

```yaml
---
title: Section Name
layout: product
eleventyNavigation:
  key: Section Name
  parent: Home
  order: 10
---
```

Use `layout: product` for short landing pages. Use `layout: article` only when the page itself contains longer prose and benefits from a table of contents.

## Suggested Structure

```markdown
## About

- [Overview](overview/)
- [Team structure](team-structure/)

## Architecture

- [Context diagram](architecture/context/)
- [Data model](architecture/data-model/)

## Pipelines

- [Source A](pipelines/source-a/)
- [Source B](pipelines/source-b/)

## Guides

- [User guide](guides/user-guide/)
- [Support process](guides/support/)
```

## Tips

- Put the landing page at `src/content/<section>/index.md`.
- Keep links relative where possible.
- Do not include `.md` extensions in published-site links.
- Prefer several focused pages over one very long landing page.
