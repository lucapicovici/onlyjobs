import asyncHandler from 'express-async-handler';
import { businessModel as Business } from '../models/index.js';

/**
 * @description   Return all businesses
 * @route         GET /api/businesses
 * @access        Public
 */
export const getBusinesses = asyncHandler(async(req, res) => {
  // Limit elements on page
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;

  // Filtering
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {};

  const reqQuery = { ...req.query, ...keyword };
  const removeFields = ['pageNumber', 'keyword'];
  removeFields.forEach(param => delete reqQuery[param]);

  const count = await Business.countDocuments(reqQuery);

  // Search for all businesses in database
  const businesses = await Business.find(reqQuery)
    .limit(pageSize)
    .skip(pageSize * (page-1));

  res.status(200).json({
    count,
    businesses,
    page,
    pages: Math.ceil(count / pageSize)
  });
});

/**
 * @description   Return business by ID
 * @route         GET /api/businesses/:userId
 * @access        Public
 */
export const getBusinessByUserId = asyncHandler(async(req, res) => {
  const business = await Business.findOne({ user: req.params.userId });

  if (business) {
    res.status(200).json(business);
  } else {
    res.status(404);
    throw new Error('Business not found');
  }
});

/**
 * @desc    Student apply for internship - business side
 * @route   POST /api/businesses/apply/:studentId
 * @access  Public
 */
export const studentApplyForInternship = asyncHandler(async(req, res) => {
  const { businessUserId, name, offer, cv } = req.body;

  // Find business with given user ID
  const business = await Business.findOne({ user: businessUserId });

  // Push to applications array
  const newApplicant = {
    id: req.params.studentId,
    name,
    offer,
    cv
  };

  business.applicants.push(newApplicant);
  business.save();

  res.status(201).json(business);
});
