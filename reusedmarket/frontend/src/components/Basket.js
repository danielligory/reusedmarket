// Basket.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Basket = () => {
    const [basket, setBasket] = useState([]);

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

    useEffect(() => {
        fetchBasket();
    }, []);

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

    const handleRemoveProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5001/users/basket/remove/${productId}`, 
                {
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

    return (
        <div>
            <h2>Your Basket</h2>
            {basket.map(item => (
                <div key={item.productId}>
                    <p>{item.product.name} - Quantity: {item.quantity}</p>
                    <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
                    <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>-</button>
                    <button onClick={() => handleRemoveProduct(item.productId)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Basket;
