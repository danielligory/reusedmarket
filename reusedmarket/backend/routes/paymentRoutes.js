const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const connectDb = require('../db');

// Route to create a new payment intent.
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency, receipt_email } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email,
      payment_method_types: ['card'],
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to confirm a payment after it has been successfully processed.
router.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId, userId, products, totalAmount } = req.body;
  const db = await connectDb();
  const orders = db.collection('orders');

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Creating a new order with the payment and order details.
    const newOrder = {
      userId,
      products,
      totalAmount,
      paymentStatus: 'completed',
      stripePaymentIntentId: paymentIntentId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const orderResult = await orders.insertOne(newOrder);
    res.status(200).json({ order: orderResult.ops[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
