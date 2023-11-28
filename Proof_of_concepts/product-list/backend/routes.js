const express = require('express');
const { getDB } = require('./db');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

router.use(express.json());

// Create product
router.post('/', async(req,res) => {
    try {
        const db = getDB();
        const { name, price, description } = req.body;
        const result = await db.collection('products').insertOne({ name, price, description });
        res.status(201).json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get products
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const products = await db.collection('products').find().toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;
        const { name, price, description } = req.body;
        const result = await db.collection('products').updateOne(
            { _id: ObjectId(id) },
            { $set: { name, price, description } }
        );
        res.json({ updatedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;
        const result = await db.collection('products').deleteOne({ _id: ObjectId(id) });
        res.json({ deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

