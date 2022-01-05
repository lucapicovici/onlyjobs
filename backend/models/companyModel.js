import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  about: { type: String }
});

const Company = mongoose.model('Company', companySchema);

export default Company;