const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const client = require('../db');
const dbName = 'onlinestore';
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const db = client.db(dbName);

// Define the User Schema
const userCollection = db.collection('users');

// Creating an index on the email field to ensure uniqueness.
(async () => {
    await userCollection.createIndex({ email: 1 }, { unique: true });
})();

// Function to generate a unique ID for a user's basket.
function generateUniqueBasketId() {
    return 'BASKET_' + Math.random().toString(36).substring(2, 9);
}

const JWT_SECRET = process.env.JWT_SECRET;

// Route for user registration.
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const basketId = generateUniqueBasketId();

        // Creating new user object.
        const newUser = {
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            basketId: basketId,
            basket: []
        };
        await userCollection.insertOne(newUser);

        // Creating JWT token.
        const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, { httpOnly: true, sameSite: true });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
});


// Route for user login.
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


        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '24h' });
        // res.cookie('token', token, { httpOnly: true, sameSite: true });

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to log in', error: error.message });
    }
});

// Middleware for verifying the JWT token.
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (token == null) return res.status(401).send('Unauthorized: No token provided');

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Unauthorized: Invalid token');
        req.user = user;
        next();
    });
};

// Route to get a user's basket.
router.get('/basket', verifyToken, async (req, res) => {
    try {
        const user = await userCollection.findOne({ _id: new ObjectId(req.user._id) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const basket = user.basket || [];
        const productIds = basket.map(item => new ObjectId(item.productId));

        const productsCollection = db.collection('products');

        const products = await productsCollection.find({ _id: { $in: productIds } }).toArray();

        if (!products) {
            return res.status(404).json({ message: 'Products not found' });
        }

        const basketDetails = basket.map(item => {
            const product = products.find(p => p._id.equals(item.productId));
            return {
                ...item,
                product,
            };
        });

        res.json(basketDetails);
    } catch (error) {
        console.error('Error fetching user basket:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Route to add a product to a user's basket.
router.post('/basket/add', verifyToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        console.log(`Adding product to basket: productId=${productId}, quantity=${quantity}`);

        const userId = req.user._id;

        if (!ObjectId.isValid(productId) || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid product ID or quantity' });
        }

        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        console.log(`User before update: ${JSON.stringify(user)}`);

        const basket = user.basket || [];

        const productIndex = basket.findIndex(item => item.productId === productId);

        if (productIndex !== -1) {
            basket[productIndex].quantity += quantity;
        } else {
            basket.push({ productId: new ObjectId(productId), quantity });
        }

        await userCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { basket } });

        console.log(`User after update: ${JSON.stringify(await userCollection.findOne({ _id: new ObjectId(userId) }))}`);

        res.status(200).json({ message: 'Product added to basket successfully' });
    } catch (error) {
        console.error('Error adding product to basket:', error);
        res.status(500).json({ message: 'Error adding product to basket', error: error.message });
    }
});


// Route to update the quantity of a product in a user's basket.
router.put('/basket/update', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    console.log(`Updating product quantity in basket: productId=${productId}, quantity=${quantity}`);

    try {
        const result = await userCollection.updateOne(
            {
                _id: new ObjectId(req.user._id),
                'basket.productId': new ObjectId(productId),
            },
            { $set: { 'basket.$.quantity': quantity } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Product not found in basket or no update needed' });
        }

        console.log(`Basket updated successfully: ${result}`);
        res.json({ message: 'Basket updated successfully' });
    } catch (error) {
        console.error('Error updating product in basket:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Route to remove a product from a user's basket.
router.delete('/basket/remove', verifyToken, async (req, res) => {
    const { productId } = req.body;
    console.log(`Removing product from basket: productId=${productId}`);

    try {
        const result = await userCollection.updateOne(
            { _id: new ObjectId(req.user._id) },
            { $pull: { basket: { productId: new ObjectId(productId) } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Product not found in basket' });
        }

        console.log(`Product removed from basket: ${result}`);
        res.json({ message: 'Product removed from basket' });
    } catch (error) {
        console.error('Error removing product from basket:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


module.exports = router;