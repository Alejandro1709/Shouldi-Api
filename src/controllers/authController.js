import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      name: user.name,
      username: user.username,
      email: user.email,
      token: undefined,
    });
  } else {
    return next(new AppError('Invalid Credentials', 401));
  }
});
