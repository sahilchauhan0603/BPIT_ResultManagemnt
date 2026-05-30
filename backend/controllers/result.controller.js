import Result from '../models/Result.model.js';
import User from '../models/User.model.js';

// @desc    Get my results
// @route   GET /api/results/my-results
// @access  Private
export const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ 
      student: req.user._id,
      isPublished: true 
    }).sort({ semester: 1 });

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get result by semester
// @route   GET /api/results/semester/:semester
// @access  Private
export const getResultBySemester = async (req, res) => {
  try {
    const result = await Result.findOne({
      student: req.user._id,
      semester: req.params.semester,
      isPublished: true
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search result by enrollment number
// @route   GET /api/results/search/:enrollmentNumber
// @access  Public
export const searchResultByEnrollment = async (req, res) => {
  try {
    const user = await User.findOne({ 
      enrollmentNumber: req.params.enrollmentNumber 
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const results = await Result.find({
      student: user._id,
      isPublished: true
    }).sort({ semester: 1 });

    res.json({
      success: true,
      count: results.length,
      data: {
        student: {
          name: user.name,
          enrollmentNumber: user.enrollmentNumber,
          course: user.course
        },
        results
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
