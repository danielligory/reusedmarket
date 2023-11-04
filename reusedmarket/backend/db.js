const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://zjac296:<password>@reusedmarket.sczrldh.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
