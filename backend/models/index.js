import mongoose from 'mongoose';
import userModel from './userModel.js';
import studentModel from './studentModel.js';
import companyModel from './companyModel.js';

mongoose.set('debug', true);

const connectDB = async() => {
  try {
    const dbURL = process.env.MONGO_URI || 'mongodb://localhost/onlyjobs';
    const conn = await mongoose.connect(dbURL);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export { 
  connectDB,
  userModel,
  studentModel,
  companyModel
};