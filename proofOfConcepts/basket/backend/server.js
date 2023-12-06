const express = require('express');
const { connectDB } = require('./db');
const { getProducts } = require('./products');
const { addToCart, removeFromCart } = require('./cart');
const cors = require('cors');

const app = express();
const port = 3001;

// Connect to MongoDB
connectDB();

app.use(cors());

// Routes
app.get('/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/cart/add/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const result = await addToCart(productId);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.delete('/cart/remove/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const result = await removeFromCart(productId);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
