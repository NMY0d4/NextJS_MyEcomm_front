import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: [{ type: Object }],
  collectionName: {
    type: String,
    default: 'categories',
  },
});

CategorySchema.set('toJSON', {
  versionKey: false,
});

export const Category = models?.Category || model('Category', CategorySchema);
