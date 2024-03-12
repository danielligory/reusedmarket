const express = require('express');
const router = express.Router();
const client = require('../db');
const dbName = 'onlinestore';
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');

const db = client.db(dbName);

// Define the User Schema
const userCollection = db.collection('users');

(async () => {
    await userCollection.createIndex({ email: 1 }, { unique: true});
})();



router.post('/register', async (req,res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const basketId = generateUniqueBasketId();
        
        // Create new user
        const newUser = { 
            username, 
            email, 
            password: hashedPassword, 
            createdAt: new Date(),
            basketId,
        };
        await userCollection.insertOne(newUser);

        res.status(201).json({message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed'});
    }
});

function generateUniqueBasketId() {
    return 'BASKET_' + Math.random().toString(36).substring(2, 9);
}

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Needs to be set to a JWT, THIS IS NOT FOR PRODUCTION
        req.session.loggedIn = true;
        req.session.user = user; 

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to log in', error: error.message });
    }
});

router.get('/users/basket', async (req, res) => {
    try {
        const user = await userCollection.findOne({ _id: ObjectID(req.session.user._id) });
        const basket = user.basket || [];

        const products = await productsCollection.find({ _id: { $in: basket.map(item => ObjectID(item.productId)) } }).toArray();

        const basketDetails = basket.map(item => {
            const product = products.find(p => p._id.toString() === item.productId);
            return {
                ...item,
                product,
            };
        });

        res.json(basketDetails);
    } catch (error) {
        console.error('Error fetching user basket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/users/basket/add', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        await userCollection.updateOne(
            { _id: ObjectID(req.session.user._id) },
            { $addToSet: { basket: { productId, quantity } } }
        );

        // res.json({ message: 'Product added to basket' });
        res.status(200).json({ message: 'Product added to basket successfully' });
    } catch (error) {
        console.error('Error adding product to basket:', error);
        res.status(500).json({ error: 'Internal server error',  details: error.message });
    }
});

router.put('/users/basket/update', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        await userCollection.updateOne(
            {
                _id: ObjectID(req.session.user._id),
                'basket.productId': productId,
            },
            { $set: { 'basket.$.quantity': quantity } }
        );

        res.json({ message: 'Basket updated successfully' });
    } catch (error) {
        console.error('Error updating product in basket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/users/basket/remove', async (req, res) => {
    const { productId } = req.body;

    try {
        await userCollection.updateOne(
            { _id: ObjectID(req.session.user._id) },
            { $pull: { basket: { productId } } }
        );

        res.json({ message: 'Product removed from basket' });
    } catch (error) {
        console.error('Error removing product from basket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router ;