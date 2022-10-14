import mongoose, { Schema } from 'mongoose';

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

export default mongoose.model('User', userSchema);
