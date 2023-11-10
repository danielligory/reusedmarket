import React from 'react';
import '../styles/ProductCards.css';
import ProductCard from './ProductCard';
import Products from '../data/Products';

const ProductList = () => {
  return (
      <div className='product-list'>
        {Products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
  );
};

export default ProductList;