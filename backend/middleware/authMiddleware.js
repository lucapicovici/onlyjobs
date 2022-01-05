import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { userModel as User } from '../models/index.js';

const protect = asyncHandler(async(req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
  
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      req.user = await User.findById(decodedToken.id).select('-password');
  
      console.log('decodedToken is');
      console.log(decodedToken);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = asyncHandler(async(req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
});

export { 
  protect,
  admin
};