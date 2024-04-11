import React, { useState } from 'react';
import Basket from '../components/Basket';
import PaymentForm from '../pages/PaymentForm';
import '../styles/Basket.css';

// The BasketPage component represents the page where users view and manage their shopping basket.
const BasketPage = () => {
    const [isPaying, setIsPaying] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    // Function to handle the checkout process.
    const handleCheckout = () => {
        setIsPaying(true);
    };

    // Rendering the BasketPage component.
    return (
        <div>
            <h1>Your Basket</h1>
            <Basket setTotalAmount={setTotalAmount} />
            {!isPaying && (
                <button onClick={handleCheckout}>Proceed to Payment</button>
            )}
            {isPaying && <PaymentForm totalAmount={totalAmount} />}
        </div>
    );
};

export default BasketPage;
