import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  about: { type: String },
  cv: { type: String },  // @TODO: file upload
  city: { type: String },  // @TODO: include more location details
  domains: [
    { type: String }
  ],
  applications: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Business
      },
      name: { type: String },
      cv: { type: String }
    }
  ]
});

const Student = mongoose.model('Student', studentSchema);

export default Student;