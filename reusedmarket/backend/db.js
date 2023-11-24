const { MongoClient } = require('mongodb');

const dbURL = 'mongodb+srv://zjac296:GS75dkcUcYv2Em@reusedmarket.sczrldh.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(dbURL);

client.connect()
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('MongoDB connection error: ', error);
});

module.exports = client;
