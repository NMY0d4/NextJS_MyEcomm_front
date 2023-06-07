import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: [
    {
      name: { type: String },
      values: { type: [String] },
    },
  ],
  collectionName: {
    type: String,
    default: 'categories',
  },
});

CategorySchema.set('toJSON', {
  versionKey: false,
});

export const Category = models?.Category || model('Category', CategorySchema);
