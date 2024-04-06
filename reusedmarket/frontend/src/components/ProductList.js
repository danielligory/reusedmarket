
import '../styles/ProductCards.css';
import ProductCard from './ProductCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/products');
        const result = response.data;

        const filteredProducts = result.filter(product => product.category.includes(title));
        const searchedProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setProducts(searchedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [title, searchQuery]);

  return (
    <div className='product-list-container'>
      <h2 className='slider-title'>{title}</h2>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='product-list'>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};


export default ProductList;