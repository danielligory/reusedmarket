const { MongoClient } = require('mongodb');

const dbURL = 'mongodb+srv://zjac296:GS75dkcUcYv2Em@reusedmarket.sczrldh.mongodb.net/?retryWrites=true&w=majority'
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
