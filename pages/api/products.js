import { mongooseConnect } from '@/lib/mongoose';
import React from 'react';

export default async function handle(req, res) {
  await mongooseConnect();
  const { category } = req.query;
  res.json(await Product.find({ category }));
}
