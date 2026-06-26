# Deployment

The repository is configured for Netlify using `@netlify/plugin-nextjs`.

1. Set the base directory to `frontend` (already in `netlify.toml`).
2. Configure all required environment variables.
3. Run `npm run type-check`, `npm run lint`, and `npm run build`.
4. Deploy to a preview and verify forms, redirects, metadata, mobile navigation, and the 404 page.
5. Attach `iitdeveloper.com` as the canonical domain.
6. Configure `www.iitdeveloper.com` to permanently redirect to `https://iitdeveloper.com`.
7. Do not change DNS until the preview is approved.

Rollback by selecting the previous successful Netlify deploy and publishing it.
