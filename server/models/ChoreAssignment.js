import mongoose from "mongoose";
const choreAssignmentSchema = new mongoose.Schema({
  chore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chore',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  completionStatus: {
    type: String,
    enum: ['pending', 'inProgress', 'completed', 'overdue', 'skipped'],
    default: 'pending'
  },
  completedAt: Date,
  completionNotes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  completionPhotos: [{
    url: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  timeSpent: {
    type: Number, // in minutes
    min: 0
  },
  quality: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    ratedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    feedback: String
  },
  isRecurring: {
    type: Boolean,
    default: true
  },
  nextDueDate: Date // For recurring chores
}, {
  timestamps: true
});


// Indexes
choreAssignmentSchema.index({ assignedTo: 1, dueDate: 1 });
choreAssignmentSchema.index({ completionStatus: 1 });
choreAssignmentSchema.index({ dueDate: 1 });

// Update status based on due date
choreAssignmentSchema.pre('save', function(next) {
  if (this.completionStatus === 'pending' && this.dueDate < new Date()) {
    this.completionStatus = 'overdue';
  }
  next();
});

export default mongoose.model('ChoreAssignment', choreAssignmentSchema);