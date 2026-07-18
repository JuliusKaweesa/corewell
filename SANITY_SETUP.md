# CoreWell Article Studio

The CoreWell website keeps its existing design. Sanity only replaces the manual article-editing workflow.

## What the editor can do

- Create and save article drafts
- Upload and crop the main image
- Add headings, paragraphs, lists, links and quotations
- Preview article cards in the Studio list
- Publish or unpublish an article

## Connection details

The website expects a public Sanity dataset named `production` and these environment variables:

```text
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

The local Studio uses:

```text
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

## Editor commands

```bash
pnpm studio:dev
pnpm studio:deploy
```

`studio:deploy` publishes the editor to a secure `*.sanity.studio` address. Only invited Sanity project members can sign in and edit content.

If Sanity is temporarily unavailable or has not been connected yet, the six existing articles remain visible as a built-in fallback.
