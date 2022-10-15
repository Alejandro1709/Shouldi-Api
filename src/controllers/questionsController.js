import Question from '../models/Question.js';

export const getQuestions = async (req, res) => {
  const feed = await Question.find();
  res.status(200).json(feed);
};

export const getQuestion = async (req, res) => {
  const feed = await Question.findOne({ slug: req.params.slug });
  res.status(200).json(feed);
};

export const createQuestion = async (req, res) => {
  const { title, content, upvotes, downvotes } = req.body;

  const question = await Question.create({
    title,
    content,
    upvotes,
    downvotes,
  });

  res.status(200).json(question);
};

export const updateQuestion = async (req, res) => {
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
};

export const deleteQuestion = async (req, res) => {
  const question = await Question.findOneAndRemove({ slug: req.params.slug });
  req.status(200).json({ message: 'Question Removed!' });
};
