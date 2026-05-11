import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },

  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suppliers',
    required: true
  },

  amount: {
    type: Number,
    min: [0.01, "Most be grader then 0"],
    required: true
  },

  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },

  description: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: ['paid', 'unpaid', 'partially_paid', 'overdue'],
    default: 'unpaid'
  }

}, { timestamps: true })

const Invoices = mongoose.model('Invoices', invoiceSchema);


export { Invoices }
export default Invoices