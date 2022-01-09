import asyncHandler from 'express-async-handler';
import { 
  userModel as User,
  studentModel as Student,
  businessModel as Business
} from '../models/index.js';
import generateToken from '../utils/generateToken.js';

/**
 * @description   User authentication & get token
 * @route         POST /api/users/login
 * @access        Public
 */
export const authUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * @description   Register new user
 * @route         POST /api/users
 * @access        Public
 */
export const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ 
    name,
    email,
    password,
    role
  });

  // Registration based on role
  if (role.toLowerCase() === 'student') {
    const student = await Student.create({
      user: user._id,
      name
    });
  } else if (role.toLowerCase() === 'business') {
    const business = await Business.create({
      user: user._id,
      name
    });
  }

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @desc    Return all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getUsers = asyncHandler(async(req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
