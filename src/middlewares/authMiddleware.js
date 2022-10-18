import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import Question from '../models/Question.js';

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does not longer exists.',
        401
      )
    );
  }

  req.user = user;

  next();
});

export const questionOwner = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const question = await Question.findOne({ slug: req.params.slug }).populate(
    'owner'
  );

  if (question.owner.id.toString() !== user.id.toString()) {
    return next(new AppError('You dont have access to this resource', 403));
  }

  next();
});
