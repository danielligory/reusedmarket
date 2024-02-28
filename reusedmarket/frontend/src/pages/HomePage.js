import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import searchProducts from '../components/searchFunction';

const HomePage = ({ serverBaseUrl }) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    searchProducts('', serverBaseUrl)
      .then(products => setSuggestedProducts(products))
      .catch(error => console.error('Error fetching suggested products:', error));
  }, [serverBaseUrl]);

  return (
    <div>
      <ProductList title="Suggested" products={suggestedProducts} />
      <ProductList title="Gaming" products={suggestedProducts} />
    </div>
  );
};

export default HomePage;
