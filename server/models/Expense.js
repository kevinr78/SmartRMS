import mongoose, { model } from "mongoose";

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Expense description is required'],
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  category: {
    type: String,
    enum: ['groceries', 'utilities', 'rent', 'cleaning', 'maintenance', 'entertainment', 'other'],
    default: 'other'
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  receipt: {
    url: String,
    originalName: String,
    size: Number,
    uploadedAt: Date
  },
  splitType: {
    type: String,
    enum: ['equal', 'percentage', 'custom', 'exact'],
    default: 'equal'
  },
  splitDetails: {
    // For percentage splits
    percentages: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      percentage: {
        type: Number,
        min: 0,
        max: 100
      }
    }],
    // For custom/exact splits
    amounts: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      amount: {
        type: Number,
        min: 0
      }
    }]
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: {
    frequency: {
      type: String,
      enum: ['weekly', 'biweekly', 'monthly', 'quarterly', 'yearly']
    },
    nextDate: Date,
    endDate: Date
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['active', 'settled', 'disputed', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for expense splits
expenseSchema.virtual('splits', {
  ref: 'ExpenseSplit',
  localField: '_id',
  foreignField: 'expense'
});

expenseSchema.index({ household: 1, date: -1 });
expenseSchema.index({ paidBy: 1 });
expenseSchema.index({ category: 1 });


export default mongoose.model('Expense',expenseSchema);
