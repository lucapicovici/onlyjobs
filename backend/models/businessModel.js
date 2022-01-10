import mongoose from 'mongoose';

const businessSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    // required: true,
    unique: true
  },
  about: { type: String },
  city: { type: String },  // @TODO: include more location details
  domain: { type: String },  // ex: Computer Science,
  available: {  // Toggle business profile visibility on search results page
    type: Boolean,
    default: true
  },
  internships: [
    { type: String }
  ],
  applicants: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Student
      },
      name: { type: String },
      offer: { type: String },
      cv: { type: String }  // @TODO: file upload
    }
  ],
  images: [
    { 
      src: {
        type: String,
        required: true,
        default: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
      } 
    }
  ]
});

const Business = mongoose.model('Business', businessSchema);

export default Business;