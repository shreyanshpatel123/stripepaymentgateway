const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../model/payment');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || 'No description provided',
          images: [item.image],
        },
        unit_amount: item.price * 100,  
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/failure',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.savePaymentDetails = async (req, res) => {
  try {
    const { session_id } = req.body;

    const session = await stripe.checkout.sessions.retrieve(session_id);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    const newPayment = new Payment({
      paymentIntentId: session.payment_intent,
      userId: session.metadata?.userId || 'unknown',
      amount: session.amount_total / 100,  
      currency: session.currency,
      status: paymentIntent.status,
      receiptEmail: session.customer_details.email,
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment saved successfully' });
  } catch (error) {
    console.error('Error saving payment details:', error.message);
    res.status(500).json({ message: error.message });
  }
};


