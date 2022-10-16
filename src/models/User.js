import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email address'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    trim: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('User', userSchema);
