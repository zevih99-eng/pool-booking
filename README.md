# Iceland Industrial Group — Website

Marketing website for **Iceland Industrial Group**, a firm that acquires and
operates income-producing industrial real estate with a focus on long-term
value, strategic location, and institutional-grade management.

## Tech

- [React](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Netlify](https://www.netlify.com) (config in `netlify.toml`)

## Editing the content

All page copy lives in **`src/content.js`** — headlines, the approach pillars,
investment focus, leadership bios, and contact details. Edit that one file to
update most of the site without touching layout code.

## Local development

```bash
npm install     # install dependencies
npm run dev     # start a local preview at http://localhost:5173
npm run build   # produce the production build in dist/
npm run lint    # run the linter
```

## How it goes live

Netlify is connected to this repository. Every push rebuilds and republishes
the site automatically — no servers to manage.
