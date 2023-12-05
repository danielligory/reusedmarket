const express = require('express');
const router = express.Router();
const db = require('../path/to/your/db.js'); 

router.put('/:productId/updateQuantity', async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        const dbClient = await db;

        const dbInstance = dbClient.db('your_database_name');
        const productsCollection = dbInstance.collection('products');


        const parsedProductId = parseInt(productId);

        const updatedProduct = await productsCollection.findOneAndUpdate(
            { id: parsedProductId },
            { $set: { quantity: parseInt(quantity) } },
            { returnOriginal: false }
        );

        res.json(updatedProduct.value);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
