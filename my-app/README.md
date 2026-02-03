# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Deploying to Vercel

This app is configured for easy deployment to Vercel with serverless API functions.

### Quick Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect the Vite configuration
5. Click "Deploy"

### Deployment Details

- Frontend: Built with Vite and output to `dist` directory
- API: Serverless function at `/api/subscribe` for email subscriptions
- The `vercel.json` configuration ensures proper routing

### Important Note on Data Persistence

The current email subscription API uses file-based storage (`emails.json`), which doesn't persist well with serverless functions. For production, consider using:
- Vercel KV (Redis)
- Vercel Postgres
- MongoDB Atlas
- Any other database service

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
