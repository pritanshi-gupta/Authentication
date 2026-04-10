const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('⚠ MongoDB connection error:', error.message);
    console.log('ℹ Server running without database. Database features will fail.');
    // Don't exit - allow server to run for testing
  }
  
};

module.exports = connectDB;
