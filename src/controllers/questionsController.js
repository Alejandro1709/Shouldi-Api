import Question from '../models/Question.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const getQuestions = catchAsync(async (req, res, next) => {
  const feed = await Question.find().populate('owner');
  res.status(200).json(feed);
});

export const getQuestion = catchAsync(async (req, res, next) => {
  const feed = await Question.findOne({ slug: req.params.slug });

  if (!feed) {
    return next(new AppError('This question does not exists!', 404));
  }

  res.status(200).json(feed);
});

export const createQuestion = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  const user = await User.findById(req.user.id).select('-password');

  const question = await Question.create({
    title,
    content,
    owner: user,
  });

  user.questions.push(question.id);

  await user.save();

  res.status(200).json(question);
});

export const updateQuestion = catchAsync(async (req, res, next) => {
  const { title, content, upvotes, downvotes } = req.body;

  const question = await Question.findOneAndUpdate(
    { slug: req.params.slug },
    {
      title,
      content,
      upvotes,
      downvotes,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!question) {
    return next(new AppError('This question does not exists!', 404));
  }

  res.status(200).json(question);
});

export const deleteQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findOneAndRemove({ slug: req.params.slug });

  const user = await User.findById(req.user.id).select('-password');

  if (!question) {
    return next(new AppError('This question does not exists!', 404));
  }

  user.questions.splice(user.questions.indexOf(question), 1);

  await user.save();

  res.status(200).json({ message: 'Question Removed!' });
});

export const upvoteQuestion = catchAsync(async (req, res) => {
  // If the user already upvoted, throw an error saying that he cant upvote a question again
});

export const downvoteQuestion = catchAsync(async (req, res) => {
  // If the user already upvoted, throw an error saying that he cant downvote a question again
});
