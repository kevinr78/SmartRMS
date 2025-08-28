import mongoose, { mongo } from 'mongoose';
import crypto from 'crypto'

const houseHoldSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, 'Household name is required'],
    trim: true,
    maxlength: [100, 'Household name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'US'
    }
  },
  totalResidents: {
    type: Number,
    min: [1, 'Must have at least 1 resident'],
    max: [20, 'Cannot exceed 20 residents']
  },
  houseRules: [{
    rule: {
      type: String,
      required: true,
      maxlength: [200, 'Rule cannot exceed 200 characters']
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  invitationCode: {
    type: String,
    unique: true,
    sparse: true
  },
  invitationCodeExpires: Date,
  settings: {
    choreRotationDay: {
      type: String,
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      default: 'sunday'
    },
    allowGuestExpenses: {
      type: Boolean,
      default: false
    },
    requireExpenseApproval: {
      type: Boolean,
      default: false
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

houseHoldSchema.virtual('members',{
  ref:'User',
  localField:'_id',
  foreignField: 'household'
});

houseHoldSchema.virtual('chores', {
  ref:'Chore',
  localField: '_id',
  foreignField:'household'
});

houseHoldSchema.index({createdBy:1});
houseHoldSchema.index({invitationCode:1});

houseHoldSchema.methods.generateInvitationCode = function() {
  const code  = crypto.randomBytes(3).toString('hex').toLocaleLowerCase();
  this.invitationCode = code;
  this.invitationCodeExpires = Date().now() + 7*24*60*60*1000;
  return code;
}

export default mongoose.model('Household', houseHoldSchema);