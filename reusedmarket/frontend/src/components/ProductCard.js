import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);
  };

  return (
    <div className='product-card'>
      <img src={product.imageURL} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>£{product.price}</p>
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
