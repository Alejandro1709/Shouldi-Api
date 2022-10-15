import Question from '../models/Question.js';
import catchAsync from '../utils/catchAsync.js';

export const getQuestions = catchAsync(async (req, res, next) => {
  const feed = await Question.find();
  res.status(200).json(feed);
});

export const getQuestion = catchAsync(async (req, res) => {
  const feed = await Question.findOne({ slug: req.params.slug });
  res.status(200).json(feed);
});

export const createQuestion = catchAsync(async (req, res) => {
  const { title, content, upvotes, downvotes } = req.body;

  const question = await Question.create({
    title,
    content,
    upvotes,
    downvotes,
  });

  res.status(200).json(question);
});

export const updateQuestion = catchAsync(async (req, res) => {
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

  res.status(200).json(question);
});

export const deleteQuestion = catchAsync(async (req, res) => {
  const question = await Question.findOneAndRemove({ slug: req.params.slug });
  req.status(200).json({ message: 'Question Removed!' });
});

export const upvoteQuestion = catchAsync(async (req, res) => {
  // If the user already upvoted, throw an error saying that he cant upvote a question again
});

export const downvoteQuestion = catchAsync(async (req, res) => {
  // If the user already upvoted, throw an error saying that he cant downvote a question again
});
