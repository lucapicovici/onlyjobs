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