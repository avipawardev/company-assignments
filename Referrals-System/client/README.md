# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Deployment (static hosting)

This project builds to `dist/`. Any host that serves static sites (Netlify, Vercel, Render Static Sites, GitHub Pages) can host the built output.

Important:

- Vite exposes only environment variables that start with `VITE_`. Set `VITE_API_BASE` to your API URL (for example `https://refer-employee.onrender.com`) in the host's environment settings.
- Build command: `npm run build`
- Publish directory: `dist`

Render (Static Site) example:

- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Set `VITE_API_BASE` in Render's Environment variables.

If you want a small `render.yaml` example for deploying the static site, see `client/render.yaml`.
