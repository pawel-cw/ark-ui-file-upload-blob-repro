# Ark UI FileUpload reproduction

## Run locally

Use Node.js 22.12 or newer and npm.

```sh
git clone <github-repository-url> ark-ui-file-upload-repro
cd ark-ui-file-upload-repro
npm ci
npm run dev
```

Open the local URL printed by Vite in Chrome/Chromium. Follow the reproduction steps in [BUG_REPORT.md](./BUG_REPORT.md).

To check TypeScript and build:

```sh
npm run build
```

Keep the parent effect and `acceptedFiles={[...files]}` in `src/App.tsx`. They trigger re-renders while retaining the same `File` objects.

## Publish on GitHub

Upload the contents of this directory as the root of a standalone repository, including `package-lock.json` and `.gitignore`. Do not upload `node_modules` or `dist`.

Replace `REPLACE_WITH_GITHUB_REPOSITORY_URL` in `BUG_REPORT.md` with the published repository URL before submitting the issue.
