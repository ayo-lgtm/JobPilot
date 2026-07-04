const planToEnvKey = {
  Starter: "STRIPE_STARTER_PRICE_ID",
  Pro: "STRIPE_PRO_PRICE_ID",
  Autopilot: "STRIPE_AUTOPILOT_PRICE_ID",
  "Career Plus": "STRIPE_CAREER_PLUS_PRICE_ID",
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    response.status(500).json({ error: "STRIPE_SECRET_KEY is not configured." });
    return;
  }

  try {
    const { plan, userId, email } = request.body || {};
    const priceEnvKey = planToEnvKey[plan];
    const priceId = priceEnvKey && process.env[priceEnvKey];
    if (!priceId) {
      response.status(400).json({ error: `No Stripe price configured for ${plan}.` });
      return;
    }

    const appUrl = process.env.APP_URL || request.headers.origin || "http://localhost:3000";
    const params = new URLSearchParams();
    params.set("mode", "subscription");
    params.set("line_items[0][price]", priceId);
    params.set("line_items[0][quantity]", "1");
    params.set("success_url", `${appUrl}?billing=success`);
    params.set("cancel_url", `${appUrl}?billing=cancelled`);
    if (email) params.set("customer_email", email);
    if (userId) params.set("metadata[user_id]", userId);
    params.set("metadata[plan]", plan);

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await stripeResponse.json();
    if (!stripeResponse.ok) {
      response.status(stripeResponse.status).json({ error: data.error?.message || "Stripe request failed." });
      return;
    }

    response.status(200).json({ url: data.url, id: data.id });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
