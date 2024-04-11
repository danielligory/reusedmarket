
import '../styles/ProductCards.css';
import ProductCard from './ProductCard';
import React, { useState, useEffect } from 'react';

// The ProductList component, responsible for displaying a list of products.
const ProductList = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect hook to fetch data whenever title or searchQuery changes.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/products');
        const result = await response.json();

        // Filtering products by category based on the title prop.
        const filteredProducts = result.filter(product => product.category.includes(title));

        // Filtering the already filtered products based on the search query.
        const searchedProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Updating the products state with the filtered and searched products.
        setProducts(searchedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [title, searchQuery]);

  // Rendering the ProductList component.
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