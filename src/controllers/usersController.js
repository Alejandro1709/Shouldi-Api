import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import generateToken from '../utils/generateToken.js';

export const register = catchAsync(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(new AppError('Email Already Taken', 400));
  }

  const newUser = await User.create({
    name,
    username,
    email,
    password,
  });

  res.status(201).json({
    name: newUser.name,
    username: newUser.username,
    email: newUser.email,
    token: generateToken(newUser.id),
  });
});
