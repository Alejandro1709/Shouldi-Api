import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Provide a title for this question'],
      maxLength: 45,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
      required: [true, 'Provide a content for this question'],
      maxLength: 60,
    },
    upvotes: {
      type: Number,
      default: 0,
      min: 1,
    },
    downvotes: {
      type: Number,
      default: 0,
      min: 1,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Question', questionSchema);
