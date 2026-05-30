import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
  },
  gradePoint: {
    type: Number,
    required: true
  },
  marks: {
    type: Number,
    required: true
  }
});

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enrollmentNumber: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  subjects: [subjectSchema],
  sgpa: {
    type: Number,
    required: true
  },
  cgpa: {
    type: Number
  },
  totalCredits: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pass', 'Fail', 'Pending'],
    default: 'Pending'
  },
  publishedDate: {
    type: Date
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
resultSchema.index({ student: 1, semester: 1 });
resultSchema.index({ enrollmentNumber: 1 });

const Result = mongoose.model('Result', resultSchema);

export default Result;
