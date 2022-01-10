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
      cv: { type: String },
      offer: { type: String }
    }
  ],
  images: [
    { 
      src: {
        type: String,
        required: true,
        default: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
      } 
    }
  ]
});

const Student = mongoose.model('Student', studentSchema);

export default Student;