import Question from '../models/Question.js';

export const getQuestions = async (req, res) => {
  const feed = await Question.find();
  res.status(200).json(feed);
};

export const getQuestion = async (req, res) => {
  const feed = await Question.findOne({ slug: req.params.slug });
  res.status(200).json(feed);
};
