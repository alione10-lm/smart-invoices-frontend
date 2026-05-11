import mongoose from 'mongoose';


const paymentSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoices',
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },

  amount: {
    type: Number,
    min: [0.01, 'amount Must be grater then 0'],
    required: [true, 'amount is required']
  },

  paymentDate: {
    type: Date,
    required: [true, 'payment date is required']
  },

  note: {
    type: String,
  },

  mode: {
    type: String,
    enum: {
      values: ['especes', 'cheque', 'virement'],
      message: `Payment mode must be one of: especes or cheque or virement`
    },
    required: [true, 'mode is required']
  }
})


const Payments = mongoose.model('Payments', paymentSchema);


export { Payments }
export default Payments