import React, { useState } from 'react';
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
        if (response.status === 200) {
          console.log('Product added to basket successfully:',response.data);
          window.alert('Product added to basket');
        } else {
          console.error('Response not succesful:', response.data);
          window.alert('Response not succesful. Please try again.');
        }

    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        window.alert(`Error adding product to basket: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        window.alert('No response, check network connection.');
      } else {
        console.error ('Error message:', error.message);
        window.alert('Error setting up request. Please try again');
      }

    }
};
  return (
    <div className='product-card'>
      {/* <img src={product.imageURL} alt={product.name} /> */}
      <img className='product-image' src={`http://localhost:3000/media/${product.imageURL}`} alt={product.name} />
      {/* <img className='product-image' src={SmartTv} alt={product.name} /> */}
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
