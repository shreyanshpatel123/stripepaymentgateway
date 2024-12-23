const express = require('express');
const router = express.Router();
const { createCheckoutSession, savePaymentDetails } = require('../controller/paymentController');

router.post('/create-checkout-session', createCheckoutSession);
router.post('/save-payment', savePaymentDetails);

module.exports = router;

