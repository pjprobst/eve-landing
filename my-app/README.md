# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Deploying to Vercel

This app is configured for easy deployment to Vercel with serverless API functions and Vercel KV (Redis) for email storage.

### Quick Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. **IMPORTANT**: Set the Root Directory to `my-app` (click Edit button)
5. Vercel will automatically detect the Vite configuration
6. Click "Deploy"

### Setting Up Vercel KV (Required for Email Storage)

After your first deployment:

1. Go to your project dashboard on Vercel
2. Click on the "Storage" tab
3. Click "Create Database" and select "KV Database" (powered by Upstash Redis)
4. Give it a name (e.g., "eve-landing-kv")
5. Click "Create"
6. The KV database will automatically connect to your project
7. Redeploy your project for the environment variables to take effect

That's it! Your `/api/subscribe` endpoint will now store emails in Redis.

### Deployment Details

- **Frontend**: Built with Vite and output to `dist` directory
- **API**: Serverless function at `/api/subscribe` for email subscriptions
- **Database**: Vercel KV (Redis) for persistent email storage
- **Config**: The `vercel.json` configuration ensures proper routing

### Viewing Your Stored Emails

You can view stored emails in two ways:

1. **Vercel Dashboard**: Go to Storage → Your KV Database → Browse Data → Look for the `emails` key
2. **CLI**: Install Vercel CLI and use `vercel kv` commands

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
