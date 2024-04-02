require('dotenv').config();
const mongoose = require('mongoose')

const mongoUrl = "mongodb+srv://aarav:bagla@cluster0.boqgw5e.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0";


async function connectToMongo() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongo;