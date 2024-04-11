import React, { useState, useEffect } from 'react';
import axios from 'axios';

// The Basket component, used to display and manage the user's shopping basket.
const Basket = ({ setTotalAmount }) => {
    const [basket, setBasket] = useState([]);

    // Function to fetch basket items from the server.
    const fetchBasket = async () => {
        try {
            const response = await axios.get('http://localhost:5001/users/basket', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setBasket(response.data);
        } catch (error) {
            console.error('Error fetching basket:', error);
        }
    };

    // Function to calculate the total amount of items in the basket.
    const calculateTotal = () => {
        return basket.reduce((total, item) => total + item.quantity * item.product.price, 0);

    };

    // useEffect hook to fetch basket data when the component mounts.
    useEffect(() => {
        fetchBasket();
    }, []);

    // useEffect hook to update the total amount whenever the basket changes.
    useEffect(() => {
        updateTotalAmount();
    }, [basket]);

    // Function to handle quantity updates for a specific product in the basket.
    const handleUpdateQuantity = async (productId, newQuantity) => {
        try {
            await axios.put('http://localhost:5001/users/basket/update',
                { productId, quantity: newQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            fetchBasket();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Function to update the total amount.
    const updateTotalAmount = () => {
        const newTotal = calculateTotal();
        setTotalAmount(newTotal);
    };

    // Function to handle the removal of a product from the basket.
    const handleRemoveProduct = async (productId) => {
        try {
            await axios.delete('http://localhost:5001/users/basket/remove',
                {
                    data: { productId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            fetchBasket();
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    // Render the Basket component.
    return (
        <div>
            <h2>Your Basket</h2>
            {basket.map((item, index) => (
                <div key={`${item.productId}_${index}`}>
                    <p>{item.product.name} - Quantity: {item.quantity}</p>
                    <button onClick={() => handleUpdateQuantity(item.productId, Math.max(item.quantity + 1, 1))}>+</button>
                    <button onClick={() => handleUpdateQuantity(item.productId, Math.max(item.quantity - 1, 1))}>-</button>
                    <button onClick={() => handleRemoveProduct(item.productId)}>Remove</button>
                </div>
            ))}
            <h3>Total Amount: £{calculateTotal().toFixed(2)}</h3>
        </div>
    );
};

export default Basket;
