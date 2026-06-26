# Form and email setup

Contact submissions post to `/api/leads` and include validation, sanitization, honeypot checking, in-instance rate limiting, duplicate protection, consent logging, UTM data, referrer, and landing page.

Configure:

1. Apply the schema in `frontend/src/lib/db/schema.sql` to the production database.
2. Set `DATABASE_URL`.
3. Verify the sending domain in Resend.
4. Set `RESEND_API_KEY`, `FROM_EMAIL`, `FROM_NAME`, and `SALES_EMAIL`.
5. Submit a production test and confirm both the agency notification and lead acknowledgement.

The in-memory rate limit is a baseline. For high traffic, use a shared edge-compatible rate-limit store.
