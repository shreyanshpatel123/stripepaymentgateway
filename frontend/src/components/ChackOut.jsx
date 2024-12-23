import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';  
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();  // To access the cart from state
  const navigate = useNavigate();  

 
  const cart = location.state?.cart || [];

  const handleCheckout = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, email }),  
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { id } = await response.json();
      const stripe = await loadStripe('pk_test_51QYNg8EREpaS1SNtAJjAqzUmdHvZzgYq6X6ZxbJFdxKYd5qMEEyalOHzWfnjx8fZg9m8AB3r7qpu1m1t6MZMLoJH00C8JQ69EB');
      await stripe.redirectToCheckout({ sessionId: id });

      navigate('/success');      } catch (error) {
      console.error('Error during checkout:', error.message);
      alert('Something went wrong during checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <label>Email:</label>
        <input type="email" value={email}onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
      </div>
      <Button variant="success" onClick={handleCheckout} disabled={isProcessing}> {isProcessing ? 'Processing...' : 'Proceed to Checkout'}</Button>
    </div>
  );
};

export default CheckoutPage;

