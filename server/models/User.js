import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
   email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
  },
  profilePicture: {
    type: String, // URL to profile image
    default: null
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    default: null
  },
  role: {
    type: String,
    enum: ['admin', 'resident'],
    default: 'resident'
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      choreReminders: {
        type: Boolean,
        default: true
      },
      expenseAlerts: {
        type: Boolean,
        default: true
      },
      weeklyReports: {
        type: Boolean,
        default: true
      }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: {
    type: Date,
    default: null
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

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});


userSchema.index({email:1});
userSchema.index({household: 1});

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(inputPassword) { 
  return await bcrypt.compare(inputPassword, this.password);
};

export default mongoose.model('User', userSchema);