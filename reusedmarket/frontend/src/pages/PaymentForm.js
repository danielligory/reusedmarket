import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/Basket.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  hidePostalCode: true,
};

const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setError(null);
    setLoading(true);

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

      const response = await fetch('http://localhost:5001/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: totalAmount * 100,
          currency: 'gbp',
          receipt_email: 'test@email.com', // Make so it uses the user that is logged in email address
          paymentMethodId: paymentMethod.id,
        }),
      });

      if (!response.ok) {
        setError(`Payment failed: ${response.statusText}`);
        setLoading(false);
        return;
      }

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        // Add an alert box so the user knows that there was an error
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded:', result.paymentIntent);
          // need to handle in the database when they payment is successful. So add an order with referece, how much was paid, the users id, etc..
          // need to also clear the basket
        }
      }
    setLoading(false);
  };

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
