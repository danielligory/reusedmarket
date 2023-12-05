import React, { useState } from 'react';
import SmartTv from '../assets/productIcons/smart-tv.jpg';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);
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
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
