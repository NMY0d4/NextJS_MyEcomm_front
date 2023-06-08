import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method === 'GET') {
    const { categories, ...filters } = req.query;
    console.log({ filters });
    res.json(await Product.find({ category: categories.split(',') }));
  }
}
