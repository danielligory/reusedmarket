const express = require('express');
const { connectDB } = require('./db'); 
const productRoutes = require('./routes');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors())

app.use('/products', productRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
