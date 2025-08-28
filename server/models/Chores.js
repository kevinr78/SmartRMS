import mongoose from 'mongoose';


const choreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Chore name is required'],
    trim: true,
    maxlength: [100, 'Chore name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['cleaning', 'kitchen', 'bathroom', 'laundry', 'outdoor', 'maintenance', 'pets', 'other'],
    default: 'other'
  },
  difficultyLevel: {
    type: Number,
    min: [1, 'Difficulty must be at least 1'],
    max: [5, 'Difficulty cannot exceed 5'],
    default: 3
  },
  estimatedTime: {
    type: Number, // in minutes
    min: [5, 'Estimated time must be at least 5 minutes'],
    max: [480, 'Estimated time cannot exceed 8 hours'],
    default: 30
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'biweekly', 'monthly', 'asNeeded'],
    required: true
  },
  instructions: {
    type: String,
    maxlength: [1000, 'Instructions cannot exceed 1000 characters']
  },
  supplies: [{
    type: String,
    maxlength: [100, 'Supply name cannot exceed 100 characters']
  }],
  isRecurring: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  pointValue: {
    type: Number,
    default: function() {
      return this.difficultyLevel * (this.estimatedTime / 15); // Base calculation
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for current assignments
choreSchema.virtual('assignments', {
  ref: 'ChoreAssignment',
  localField: '_id',
  foreignField: 'chore'
});

// Indexes
choreSchema.index({ household: 1 });
choreSchema.index({ category: 1 });
choreSchema.index({ frequency: 1 });

export default mongoose.model('Chore', choreSchema);