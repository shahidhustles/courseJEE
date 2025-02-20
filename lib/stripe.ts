import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("stripe sc key not set up");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
});

export default stripe;
