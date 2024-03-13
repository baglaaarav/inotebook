require('dotenv').config();
const mongoose = require('mongoose')

console.log(process.env.REACT_APP_DB_HOST);
const mongoUrl = process.env.REACT_APP_DB_HOST;


async function connectToMongo() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongo;