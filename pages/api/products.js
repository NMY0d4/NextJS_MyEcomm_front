import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handle(req, res) {
  await mongooseConnect();

  const { categories, ...filters } = req.query;
  // console.log({ filters });
  const productsQuery = {
    category: categories.split(','),
  };
  if (Object.keys(filters).length > 0) {
    // Check for filters
    productsQuery.properties = filters;
  }
  // console.log(productsQuery);
  res.json(await Product.find(productsQuery));
}
