const express = require ('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express ();

const dbUser = process.env.DB_USER; // Use DB_USER from .env
const dbPassword = process.env.DB_PASSWORD; // Use DB_PASSWORD from .env

const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@reusedmarket.sczrldh.mongodb.net/`;
const client = new MongoClient(mongoURI);

app.use(express.json());
app.use(cors());

client.connect().then(() => {
    const db = client.db('testonlinestore');
    const usersCollection = db.collection('users');

    // Register endpoint
    app.post('/register', async (req, res) => {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await usersCollection.insertOne({ email, password: hashedPassword });
            res.status(201).send('User registered successfully');
        } catch (error) {
            res.status(500).send('User registration failed');
        }
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await usersCollection.findOne({ email });

            if (!user) {
                return res.status(404).send('User not found');
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return res.status(404).send('Incorrect password');
            }

            const token = jwt.sign({ userId: user._id }, 'secret_key');
            res.status(200).send({ token });
        } catch (error) {
            res.status(500).send('Error logging in');
        }
    });

// Port that server listens to
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});