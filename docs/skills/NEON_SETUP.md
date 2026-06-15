# 🚀 Neon Database Setup (5 Minutes)

## Why Neon?

✅ **Free tier**: 0.5 GB storage, perfect for startups  
✅ **PostgreSQL**: Compatible with your existing code  
✅ **Serverless**: Auto-scales, instant cold starts  
✅ **Edge-compatible**: Works on Cloudflare, Netlify, Vercel  
✅ **No credit card**: Free forever tier  

---

## Step 1: Create Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Click "Sign Up"
3. Sign up with GitHub (recommended) or email
4. **No credit card required!**

---

## Step 2: Create Your Database

1. After login, click **"Create Project"**
2. Fill in:
   - **Project name**: `iitdeveloper`
   - **Region**: Select closest to your users (e.g., US East, EU West)
   - **PostgreSQL version**: 15 or 16 (default)
3. Click **"Create Project"**

---

## Step 3: Get Connection String

After creating the project, you'll see:

```
Connection String (with pooling):
postgresql://username:password@ep-xxx-xxx-xxx.us-east-2.aws.neon.tech/iitdeveloper?sslmode=require
```

**Copy this entire string!** 📋

---

## Step 4: Update Your `.env.local`

Open `frontend/.env.local` and add:

```env
# Neon Database (Production & Development)
DATABASE_URL=postgresql://username:password@ep-xxx-xxx-xxx.us-east-2.aws.neon.tech/iitdeveloper?sslmode=require
```

**Replace with your actual connection string from Neon!**

**Comment out the local database settings:**
```env
# Local PostgreSQL (not needed if using Neon)
# POSTGRES_HOST=localhost
# POSTGRES_PORT=5432
# POSTGRES_DB=iitdeveloper
# POSTGRES_USER=postgres
# POSTGRES_PASSWORD=postgres
```

---

## Step 5: Run Database Migrations

Now initialize your database schema:

```bash
cd frontend

# Option 1: Using psql (if installed)
psql "postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/iitdeveloper?sslmode=require" < src/lib/db/schema.sql

# Option 2: Via Neon Console
# Copy the contents of src/lib/db/schema.sql
# Paste into Neon Console SQL Editor
# Click "Run"
```

---

## Step 6: Test Connection

Restart your dev server:

```bash
npm run dev
```

Test the contact form:
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing Neon database"
  }'
```

Should see:
```json
{
  "success": true,
  "message": "Lead created successfully"
}
```

✅ **Done! Your database is now accessible from anywhere!**

---

## 🌐 Deploy to Cloudflare/Netlify/Vercel

When deploying, just add the `DATABASE_URL` environment variable:

### Cloudflare Pages:
1. Dashboard > Pages > your-project > Settings > Environment Variables
2. Add: `DATABASE_URL` = `your-neon-connection-string`

### Netlify:
1. Site Settings > Environment Variables
2. Add: `DATABASE_URL` = `your-neon-connection-string`

### Vercel:
1. Project Settings > Environment Variables
2. Add: `DATABASE_URL` = `your-neon-connection-string`

---

## 📊 Neon Console Features

Access at: [console.neon.tech](https://console.neon.tech)

- **SQL Editor**: Run queries directly
- **Monitoring**: View connection stats
- **Backups**: Automatic point-in-time recovery
- **Branching**: Create database branches for testing

---

## 🆓 Free Tier Limits

- **Storage**: 0.5 GB (plenty for most apps)
- **Compute**: Shared resources
- **Active time**: Unlimited
- **Projects**: 1 project
- **Branches**: 10 branches

For a contact form + leads database: **Well within free tier!**

---

## 🔄 Alternative Free Databases

If you want to explore other options:

### 1. **Supabase** (PostgreSQL)
- Website: [supabase.com](https://supabase.com)
- Free tier: 500 MB, 2 GB bandwidth
- Includes: Auth, Storage, Realtime

### 2. **PlanetScale** (MySQL)
- Website: [planetscale.com](https://planetscale.com)
- Free tier: 5 GB storage
- Note: Would require changing from PostgreSQL to MySQL

### 3. **MongoDB Atlas** (NoSQL)
- Website: [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Free tier: 512 MB
- Note: Would require rewriting queries for NoSQL

### 4. **Turso** (SQLite)
- Website: [turso.tech](https://turso.tech)
- Free tier: 9 GB storage
- Note: Would require some code changes

**Recommendation**: Stick with **Neon** - it works perfectly with your existing PostgreSQL code!

---

## 🐛 Troubleshooting

### Connection refused / timeout
- Check if `DATABASE_URL` is correct
- Ensure `?sslmode=require` is at the end
- Verify region selection (closer = faster)

### Schema not found
- Run migrations in Neon Console SQL Editor
- Copy/paste contents of `src/lib/db/schema.sql`

### Too many connections
- Use connection pooling URL (default in Neon)
- Reduce `max` in pool config if needed

---

## 📚 Resources

- [Neon Documentation](https://neon.tech/docs/introduction)
- [Connection Pooling](https://neon.tech/docs/connect/connection-pooling)
- [Node.js Guide](https://neon.tech/docs/guides/node)

---

**You're all set!** 🎉

Your database now works everywhere:
- ✅ Local development
- ✅ Cloudflare Pages
- ✅ Netlify
- ✅ Vercel
- ✅ Any hosting platform

No more "connection refused" errors!
