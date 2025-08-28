import mongoose from "mongoose";

const expenseSplitSchema = new mongoose.Schema({
  expense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amountOwed: {
    type: Number,
    required: true,
    min: 0
  },
  amountPaid: {
    type: Number,
    default: 0,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'disputed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'venmo', 'paypal', 'zelle', 'bank_transfer', 'other']
  },
  paidAt: Date,
  notes: {
    type: String,
    maxlength: [200, 'Notes cannot exceed 200 characters']
  }
}, {
  timestamps: true
});

// Virtual for remaining balance
expenseSplitSchema.virtual('remainingBalance').get(function() {
  return Math.max(0, this.amountOwed - this.amountPaid);
});

// Indexes
expenseSplitSchema.index({ user: 1, paymentStatus: 1 });
expenseSplitSchema.index({ expense: 1 });

// Update payment status based on amounts
expenseSplitSchema.pre('save', function(next) {
  if (this.amountPaid >= this.amountOwed) {
    this.paymentStatus = 'paid';
    if (!this.paidAt) this.paidAt = new Date();
  } else if (this.amountPaid > 0) {
    this.paymentStatus = 'partial';
  } else {
    this.paymentStatus = 'pending';
  }
  next();
});

export default mongoose.model('ExpenseSplit', expenseSplitSchema);