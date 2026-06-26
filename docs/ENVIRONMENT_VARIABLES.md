# Environment variables

Required for public launch:

- `NEXT_PUBLIC_SITE_URL`: canonical origin, normally `https://iitdeveloper.com`
- `NEXT_PUBLIC_BOOKING_URL`: approved calendar destination
- `DATABASE_URL`: Neon/PostgreSQL connection for form and estimate persistence
- `RESEND_API_KEY`: email delivery
- `FROM_EMAIL`: verified sender
- `SALES_EMAIL`: internal lead notification address

Recommended:

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_X_URL`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `NEXT_PUBLIC_ENABLE_ANALYTICS`

Never expose private keys through a `NEXT_PUBLIC_` variable.
