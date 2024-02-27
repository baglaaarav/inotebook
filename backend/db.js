const mongoose = require('mongoose')
const mongoUrl = "mongodb://localhost:27017/inotebook"



async function connectToMongo() {
    try {
      await mongoose.connect(mongoUrl);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

module.exports = connectToMongo;