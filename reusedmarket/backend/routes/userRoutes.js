const express = require('express');
const router = express.Router();
const client = require('../db');
const dbName = 'onlinestore';

const db = client.db(dbName);

// Define the User Schema
const userCollection = db.collection('users');
await userCollection.createIndex({ email: 1 }, { unique: true});

router.post('/register', async (req,res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userCollection.findone({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists'});
        }

        // Create new user
        const newUser = { 
            username, 
            email, 
            password, 
            createdAt: new Date() 
        };
        await userCollection.insertOne(newUser);

        res.status(201).json({message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed'});
    }
});

router.post('login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }

        // Need to use hashs/salts for storing the password
        if (password != user.password) {
            return res.status(404).json({ message: 'Username or Password Invalid'});
        }

        // Needs to be set to a JWT, THIS IS NOT FOR PRODUCTION
        req.session.loggedIn = true;
        req.session.user = user; 

        req.status(200).json({ message: 'Logged in successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to log in'});
    }
})