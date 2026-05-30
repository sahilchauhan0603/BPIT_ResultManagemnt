import User from '../models/User.model.js';

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private (Student)
export const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);

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

// @desc    Update student profile
// @route   PUT /api/students/profile
// @access  Private (Student)
export const updateStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);

    if (student) {
      student.name = req.body.name || student.name;
      student.course = req.body.course || student.course;
      student.semester = req.body.semester || student.semester;

      const updatedStudent = await student.save();

      res.json({
        success: true,
        data: updatedStudent
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
