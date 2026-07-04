# Connect Your Accounts

Use this checklist to connect your existing Supabase, Stripe, and OpenAI accounts.

## 1. Supabase

In Supabase:

1. Open your project.
2. Go to SQL Editor.
3. Run `supabase-schema.sql`.
4. Go to Project Settings > API.
5. Copy:
   - Project URL
   - anon public key
   - service role key

Use the service role key only in Vercel environment variables.

## 2. OpenAI

Create an API key in your OpenAI dashboard.

Add this Vercel environment variable:

```text
OPENAI_API_KEY=...
```

The app uses `/api/rewrite-resume` so the key is never placed in browser code.

## 3. Stripe

In Stripe:

1. Create products/prices for Starter, Pro, Autopilot, and Career Plus.
2. Copy each recurring price ID.
3. Copy your Stripe secret key.

Add these Vercel environment variables:

```text
STRIPE_SECRET_KEY=...
STRIPE_STARTER_PRICE_ID=...
STRIPE_PRO_PRICE_ID=...
STRIPE_AUTOPILOT_PRICE_ID=...
STRIPE_CAREER_PLUS_PRICE_ID=...
```

## 4. Vercel

Add all values from `.env.example` as environment variables in Vercel.

Then deploy this folder.

## 5. GitHub

Create a repo and push this folder. Connect that repo to Vercel.

## What I still need from you

Do not paste secret keys into chat.

Send only:

- Your GitHub repo URL.
- Your Supabase project URL if you want me to place the public value into a frontend config file.
- Confirmation after you have added secret environment variables in Vercel.
