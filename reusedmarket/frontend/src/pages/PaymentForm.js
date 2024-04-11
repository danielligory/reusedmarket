import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/Basket.css';
import { useNavigate } from 'react-router-dom';

// Options for the card element style.
const CARD_OPTIONS = {
  iconStyle: 'solid',
  hidePostalCode: true,
};

// PaymentForm component for handling payments.
const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setError(null);
    setLoading(true);

    // Getting the CardElement and creating a payment method.
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Creating payment intent on the server.
      const response = await fetch('http://localhost:5001/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: totalAmount * 100,
          currency: 'gbp',
          receipt_email: 'test@email.com',
          paymentMethodId: paymentMethod.id,
        }),
      });

      if (!response.ok) {
        setError(`Payment failed: ${response.statusText}`);
        setLoading(false);
        return;
      }

      const { clientSecret } = await response.json();

      // Confirming the card payment with Stripe.
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        alert(result.error.message);
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded:', result.paymentIntent);
          navigate('/');
          alert('Payment successful! Thank you for your purchase.');
          // Future task: Handle successful payment in the database and clear the basket.
        }
      }
    setLoading(false);
  };

  // Rendering the payment form.
  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_OPTIONS}/>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing…' : `Pay $${(totalAmount).toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
