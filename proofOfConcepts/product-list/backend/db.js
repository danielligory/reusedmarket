const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbUser = process.env.DB_USER; // Use DB_USER from .env
const dbPassword = process.env.DB_PASSWORD; // Use DB_PASSWORD from .env

const dbURL = `mongodb+srv://${dbUser}:${dbPassword}@reusedmarket.sczrldh.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(dbURL);

let db;

const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('testonlinestore');
    } catch (error){
        console.error('MongoDB connection error:', error);
    }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
