import mongoose from 'mongoose';

const businessSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  about: { type: String },
  city: { type: String },  // @TODO: include more location details
  domain: { type: String },  // ex: Computer Science,
  available: {  // Toggle business profile visibility on search results page
    type: Boolean,
    default: true
  },
  applicants: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      },
      name: { type: String },
      cv: { type: String }  // @TODO: file upload
    }
  ]
});

const Business = mongoose.model('Business', businessSchema);

export default Business;