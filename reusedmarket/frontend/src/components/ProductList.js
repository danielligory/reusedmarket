
import '../styles/ProductCards.css';
import ProductCard from './ProductCard';
import React, { useState, useEffect } from 'react';

const ProductList = ({ title }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/products')
      .then(response => response.json())
      .then(result => {
        const filteredProducts = result.filter(product => product.category.toLowerCase() === title.toLowerCase());
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div className='product-list-container'>
      <h2 className='slider-title'>{title}</h2>
      <div className='product-list'>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};


export default ProductList;