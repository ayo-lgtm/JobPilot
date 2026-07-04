# Lovable Environment Variables

Add these values in Lovable's environment/secrets settings.

## Required Now

```text
NEXT_PUBLIC_SUPABASE_URL=https://bzndqxamjqioiayaydbn.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
OPENAI_API_KEY=your_new_openai_api_key
```

`OPENAI_API_KEY` must be a fresh key. Do not reuse any key that was pasted into chat.

## Required For Paid Plans

```text
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_AUTOPILOT_PRICE_ID=price_...
STRIPE_CAREER_PLUS_PRICE_ID=price_...
```

## Server/Admin Only

```text
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Never expose `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, or `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
