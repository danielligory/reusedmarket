const express = require('express');
const server = express();
const mongoose = require('./db');
//const productList = require('./productList');

server.use(express.json());

server.get('/productList', async (req, res) => {
  try {
    const products = await productList.find({});
    res.json(productList);
  } catch (err) {
    res.status(500).json({ messgae: err.message})
  }
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 