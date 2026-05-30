import User from '../models/User.model.js';
import Result from '../models/Result.model.js';

// ============ STUDENT MANAGEMENT ============

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private (Admin)
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student by ID
// @route   GET /api/admin/students/:id
// @access  Private (Admin)
export const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new student
// @route   POST /api/admin/students
// @access  Private (Admin)
export const createStudent = async (req, res) => {
  try {
    const { name, email, password, enrollmentNumber, course, semester } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Student already exists'
      });
    }

    const student = await User.create({
      name,
      email,
      password,
      role: 'student',
      enrollmentNumber,
      course,
      semester
    });

    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update student
// @route   PUT /api/admin/students/:id
// @access  Private (Admin)
export const updateStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.enrollmentNumber = req.body.enrollmentNumber || student.enrollmentNumber;
    student.course = req.body.course || student.course;
    student.semester = req.body.semester || student.semester;
    student.isActive = req.body.isActive !== undefined ? req.body.isActive : student.isActive;

    const updatedStudent = await student.save();

    res.json({
      success: true,
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/admin/students/:id
// @access  Private (Admin)
export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await student.deleteOne();

    res.json({
      success: true,
      message: 'Student removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ============ RESULT MANAGEMENT ============

// @desc    Get all results
// @route   GET /api/admin/results
// @access  Private (Admin)
export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('student', 'name email enrollmentNumber')
      .sort({ createdAt: -1 });

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

// @desc    Create new result
// @route   POST /api/admin/results
// @access  Private (Admin)
export const createResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);

    res.status(201).json({
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

// @desc    Update result
// @route   PUT /api/admin/results/:id
// @access  Private (Admin)
export const updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

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

// @desc    Delete result
// @route   DELETE /api/admin/results/:id
// @access  Private (Admin)
export const deleteResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    await result.deleteOne();

    res.json({
      success: true,
      message: 'Result removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Publish/Unpublish result
// @route   PUT /api/admin/results/:id/publish
// @access  Private (Admin)
export const publishResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    result.isPublished = !result.isPublished;
    if (result.isPublished) {
      result.publishedDate = new Date();
    }

    await result.save();

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

// ============ ANALYTICS ============

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private (Admin)
export const getAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalResults = await Result.countDocuments();
    const publishedResults = await Result.countDocuments({ isPublished: true });

    // Get pass/fail statistics
    const passCount = await Result.countDocuments({ status: 'Pass', isPublished: true });
    const failCount = await Result.countDocuments({ status: 'Fail', isPublished: true });

    // Get average CGPA
    const cgpaStats = await Result.aggregate([
      { $match: { isPublished: true, cgpa: { $exists: true } } },
      {
        $group: {
          _id: null,
          avgCGPA: { $avg: '$cgpa' },
          maxCGPA: { $max: '$cgpa' },
          minCGPA: { $min: '$cgpa' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        students: {
          total: totalStudents,
          active: activeStudents,
          inactive: totalStudents - activeStudents
        },
        results: {
          total: totalResults,
          published: publishedResults,
          unpublished: totalResults - publishedResults
        },
        performance: {
          pass: passCount,
          fail: failCount,
          passPercentage: totalResults > 0 ? ((passCount / totalResults) * 100).toFixed(2) : 0
        },
        cgpa: cgpaStats.length > 0 ? cgpaStats[0] : { avgCGPA: 0, maxCGPA: 0, minCGPA: 0 }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
