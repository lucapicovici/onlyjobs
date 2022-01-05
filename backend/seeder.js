import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import path from 'path';
import { 
  connectDB,
  userModel as User,
  studentModel as Student,
  companyModel as Company
} from './models/index.js';

const __dirname = path.resolve();
dotenv.config({ path: `${__dirname}/config.env` });
connectDB();

const importData = async() => {
};

const destroyData = async() => {
  try {
    await Student.deleteMany();
    await Company.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}