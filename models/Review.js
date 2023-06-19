import { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema(
  {
    title: String,
    description: String,
    stars: Number,
    product: {type: Schema.Types.ObjectId, ref: 'Product' }
  },
  { timestamps: true }
);

export const Review = models?.Review || model('Review', ReviewSchema);
