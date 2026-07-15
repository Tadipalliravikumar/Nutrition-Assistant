require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function clearUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    const result = await User.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} user(s).`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
}

clearUsers();
