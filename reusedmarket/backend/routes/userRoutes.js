const express = require('express');
const router = express.Router();
const client = require('../db');
const dbName = 'onlinestore';
const bcrypt = require('bcrypt');

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

        // Create new user
        const newUser = { 
            username, 
            email, 
            password: hashedPassword, 
            createdAt: new Date() 
        };
        await userCollection.insertOne(newUser);

        res.status(201).json({message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed'});
    }
});

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

module.exports = router ;