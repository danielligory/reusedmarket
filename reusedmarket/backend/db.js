const { MongoClient } = require('mongodb');
require('dotenv').config();

// Retrieving database user and password from environment variables.
const dbUser = process.env.DB_USER; // Use DB_USER from .env
const dbPassword = process.env.DB_PASSWORD; // Use DB_PASSWORD from .env

// Constructing the MongoDB connection URL using the user and password.
const dbURL = `mongodb+srv://${dbUser}:${dbPassword}@reusedmarket.sczrldh.mongodb.net/`;

// Creating a new MongoClient instance with the connection URL.
const client = new MongoClient(dbURL);

// Connecting to the MongoDB server.
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('MongoDB connection error: ', error);
  });

module.exports = client;
