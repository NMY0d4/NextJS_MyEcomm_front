import { mongooseConnect } from '@/lib/mongoose';
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';

export default async function handler(req, res) {
  const endpointSecret = process.env.STRIPE_ES;
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      console.log(orderId);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

export const config = {
  api: { bodyParser: false },
};
