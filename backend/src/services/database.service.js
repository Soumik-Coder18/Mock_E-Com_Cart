import mongoose from "mongoose";

class DatabaseService {
  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }

  getConnectionStatus() {
    return mongoose.connection.readyState;
  }
}

export default new DatabaseService();