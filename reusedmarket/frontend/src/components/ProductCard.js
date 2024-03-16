import React, { useState } from 'react';
import SmartTv from '../assets/productIcons/smart-tv.jpg';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);
  };

  const addToBasket = async () => {
    try {
        const response = await axios.post('http://localhost:5001/users/basket/add', {
            productId: product._id,
            quantity,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log(response.data);
        window.alert('Product added to basket');
    } catch (error) {
        console.error('Error adding product to basket:', error.response.data);
        window.alert('Failed to add product to basket. Please try again.');
    }
};
  return (
    <div className='product-card'>
      {/* <img src={product.imageURL} alt={product.name} /> */}
      <img className='product-image' src={SmartTv} alt={product.name} />
      <h2 className='product-name'>{product.name}</h2>
      <p className='product-description'>{product.description}</p>
      <p className='product-price'>£{product.price}</p>
      <div className="quantity-controls">
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default ProductCard;
