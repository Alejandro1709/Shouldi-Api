import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Provide a title for this question'],
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
      required: [true, 'Provide a content for this question'],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    upvoters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downvoters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    next();
  }

  this.slug = slugify(this.title).toLowerCase();
  next();
});

export default mongoose.model('Question', questionSchema);
