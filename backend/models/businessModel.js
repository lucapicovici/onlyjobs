import mongoose from 'mongoose';

const businessSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  about: { type: String }
});

const Business = mongoose.model('Business', businessSchema);

export default Business;