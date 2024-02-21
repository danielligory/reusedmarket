const express = require('express');
const server = express();
const client = require('./db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const corsOptions = {
  origin: '*',

};

server.use(cors(corsOptions));

server.use(express.json());

server.use('/users', userRoutes);

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


const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 