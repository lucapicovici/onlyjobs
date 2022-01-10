import asyncHandler from 'express-async-handler';
import { studentModel as Student } from '../models/index.js';

/**
 * @desc    Return single student by user ID
 * @route   GET /api/students/:userId
 * @access  Private
 */
export const getStudentByUserId = asyncHandler(async(req, res) => {
  const student = await Student.findOne({ user: req.params.userId });

  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

/**
 * @desc    Return all students
 * @route   GET /api/students
 * @access  Public
 */
export const getStudents = asyncHandler(async(req, res) => {
  const students = await Student.find({});
  res.status(200).json(students);
});

/**
 * @desc    Student apply for internship
 * @route   POST /api/students/apply/:businessId
 * @access  Public
 */
export const studentApply = asyncHandler(async(req, res) => {
  const { studentUserId, name, offer, cv } = req.body;

  // Find student with given user ID
  const student = await Student.findOne({ user: studentUserId });

  // Push to applications array
  const newApplication = {
    id: req.params.businessId,
    name,
    offer,
    cv
  };

  student.applications.push(newApplication);
  student.save();

  res.status(201).json(student);
});