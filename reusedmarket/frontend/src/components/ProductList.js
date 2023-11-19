
import '../styles/ProductCards.css';
import ProductCard from './ProductCard';
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/products') //this needs to be changed
      .then(response => response.json())
      .then(result => {
        setProducts(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div className='product-list'>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};




// const ProductList = () => {
//   return (
//       <div className='product-list'>
//         {Products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//   );
// };

export default ProductList;