import React, { useState } from 'react';
import Basket from '../components/Basket';
import PaymentForm from '../pages/PaymentForm';



const BasketPage = () => {
    const [isPaying, setIsPaying] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleCheckout = () => {
        // set the total amount to what the value of the basket actually is
        setTotalAmount(100);
        setIsPaying(true);
    };


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
