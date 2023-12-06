import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products')
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }, []);

    return (
        <div>
            <h1>ProductList</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - $ {product.price}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default App;