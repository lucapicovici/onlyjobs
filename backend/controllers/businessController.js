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
 * @route         GET /api/businesses/:id
 * @access        Public
 */
export const getBusinessById = asyncHandler(async(req, res) => {
  const business = await Business.findById(req.params.id);

  if (business) {
    res.status(200).json(business);
  } else {
    res.status(404);
    throw new Error('Business not found');
  }
});
