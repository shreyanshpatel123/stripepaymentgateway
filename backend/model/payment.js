const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentIntentId: { type: String, required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  receiptEmail: { type: String, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
