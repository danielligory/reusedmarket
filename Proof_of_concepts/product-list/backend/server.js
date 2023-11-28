const express = require('express');
const { connectDB } = require('./db'); 
const productRoutes = require('./routes');

const app = express();
const port = 3001;

app.use('/products', productRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
