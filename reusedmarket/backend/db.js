const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbUser = process.env.DB_USER; // Use DB_USER from .env
const dbPassword = process.env.DB_PASSWORD; // Use DB_PASSWORD from .env

const dbURL = `mongodb+srv://${dbUser}:${dbPassword}@reusedmarket.sczrldh.mongodb.net/`;

const client = new MongoClient(dbURL);

client.connect()
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('MongoDB connection error: ', error);
});

module.exports = client;
