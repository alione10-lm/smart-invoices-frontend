import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    min: 2,
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },

  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },

  address: {
    type: String,
    required: [true, 'Address is required'],
  },

  contact: {
    type: String,
    required: [true, 'Contact person is required'],
    trim: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Suppliers = mongoose.model('Suppliers', supplierSchema);

export { Suppliers }
export default  Suppliers 