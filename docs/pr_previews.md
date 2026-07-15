# PR Previews

Pull request previews let reviewers inspect rendered site changes before a branch is merged.

## Workflow

[.github/workflows/preview-site.yaml](../.github/workflows/preview-site.yaml) runs when a pull request is opened, updated, reopened, or closed.

When a pull request is open, the workflow:

1. Checks out the repository.
2. Installs dependencies with `npm ci` from the repository root.
3. Builds the site with `npm run build`.
4. Sets `PATHPREFIX` to `/pr-preview/pr-{PR_NUMBER}/` so links and assets work under the preview path.
5. Deploys `_site/` to the `gh-pages` branch under `pr-preview/pr-{PR_NUMBER}/`.
6. Posts or updates a pull request comment with the preview link.

When a pull request is closed, the associated preview is removed.

## URLs

The main site is published at:

```text
https://ministryofjustice.github.io/data-and-analytics-engineering/
```

Pull request previews use this format:

```text
https://ministryofjustice.github.io/data-and-analytics-engineering/pr-preview/pr-{PR_NUMBER}/
```

## Notes for Publishers

- You do not need to build the site locally to review a content change, although local builds are useful for checking larger changes before raising a PR.
- Preview links update each time commits are pushed to the pull request branch.
- If assets appear broken in a preview, check that links are relative or path-prefix aware.
