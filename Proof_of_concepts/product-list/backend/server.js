const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

const URI = 'mongodb+srv://zjac296:GS75dkcUcYv2Em@reusedmarket.sczrldh.mongodb.net/';
const client = new MongoClient(URI);

let database;

client.connect(err => {
    if (err) {
        console.error('Error connecting to database', err);
        return;
    }
    console.log('Connected to database');
    database = client.db('store');
});

// Creating new product
server.post('/products', async (req, res) => {
    try {
        const collection = database.collection('products');
        const products = await collection.find().toArray();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update product by ID
server.patch('/products/:id', async (req,res) => {
    try {
        const collection = database.collection('products');
        const { id } = req.params;
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: req.body },
            { returnOriginal: false } 
        );
        res.json(result.value);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Delete product by ID
server.delete('/products/:id', async (req, res) => {
    try {
        const collection = database.collection('products');
        const { id } = req.params;
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});