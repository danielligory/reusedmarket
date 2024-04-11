const express = require('express');
const session = require('express-session');
const server = express();
const client = require('./db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const paymentRoutes = require('./routes/paymentRoutes');

// CORS options to allow requests from all origins.
const corsOptions = {
  origin: '*',
  credentials: true,

};
// Applying CORS middleware with the specified options.
server.use(cors(corsOptions));
// Middleware to parse JSON bodies in requests.
server.use(express.json());

// Setting up session middleware with configuration options.

server.use(
  session({
    secret: 'testing',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'none',
    },
  })
);


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

// Registering user routes and payment routes with the server.
server.use('/users', userRoutes);
server.use('/payments', paymentRoutes);

// Handling uncaught exceptions and unhandled promise rejections.
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// Starting the server on the specified port.
const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
