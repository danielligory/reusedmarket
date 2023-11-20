const express = require('express');
const router = express.Router();
const client = require('../db');
const dbName = 'onlinestore';

router.post('/register', async (req,res) => {
    try {
        const db = client.db(dbName);

        // Define the User Schema
        const userCollection = db.collection('users');
        await userCollection.createIndex({ email: 1 }, { unique: true});

        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await usersCollection.findone({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists'});
        }

        // Create new user
        const newUser = { username, email, password, createdAt: new DataTransfer() };
        await userCollection.insertOne(newUser);

        res.status(201).json({message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed'});
    }
});