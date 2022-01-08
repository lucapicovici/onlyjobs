import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { 
  connectDB,
  userModel as User,
  studentModel as Student,
  businessModel as Business
} from './models/index.js';

const __dirname = path.resolve();
dotenv.config({ path: `${__dirname}/config.env` });
connectDB();

// Reading JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/data/users.json`, 'utf-8')
);
const students = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/data/students.json`, 'utf-8')
);
const businesses = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/data/businesses.json`, 'utf-8')
);

const importData = async() => {
  try {
    await Business.deleteMany();
    await Student.deleteMany();
    await User.deleteMany();
    
    await User.insertMany(users);
    await Student.insertMany(students);
    await Business.insertMany(businesses);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async() => {
  try {
    await Student.deleteMany();
    await Business.deleteMany();
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