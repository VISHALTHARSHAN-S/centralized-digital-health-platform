const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[CHMS Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[CHMS Database Warning] Primary MongoDB connection failed: ${error.message}`);
    console.warn(`[CHMS Database Warning] Application running with memory/mock fallback capability if MongoDB is not active locally.`);
    return null;
  }
};

module.exports = connectDB;
