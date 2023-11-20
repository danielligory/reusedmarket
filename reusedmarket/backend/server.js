const express = require('express');
const server = express();
const client = require('./db');
const cors = require('cors');

const corsProductList = {
  origin: 'http://localhost:5000/products',
};

server.use(cors());

server.use(express.json());


// Route to get Products from reUsedMarket database
server.get('/products', async (req, res) => {
  try {
    const database = client.db('onlinestore');
    const collection = database.collection('products');

    const result = await collection.find({}).toArray();

    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 