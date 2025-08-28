import mongoose from "mongoose";
const paymentTransactionSchema = new mongoose.Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0.01, 'Amount must be greater than 0']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    required: true
  },
  relatedExpenses: [{
    expense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense'
    },
    amount: Number // Amount of this transaction applied to this expense
  }],
  method: {
    type: String,
    enum: ['cash', 'venmo', 'paypal', 'zelle', 'bank_transfer', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  transactionId: {
    type: String, // External transaction ID from payment provider
    sparse: true
  },
  notes: {
    type: String,
    maxlength: [200, 'Notes cannot exceed 200 characters']
  },
  completedAt: Date
}, {
  timestamps: true
});

// Indexes
paymentTransactionSchema.index({ payer: 1, createdAt: -1 });
paymentTransactionSchema.index({ payee: 1, createdAt: -1 });
paymentTransactionSchema.index({ household: 1, createdAt: -1 });

export default mongoose.model('PaymentTransaction', paymentTransactionSchema);