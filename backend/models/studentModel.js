import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  about: { type: String },
  cv: {
    type: Boolean,
    default: false
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;