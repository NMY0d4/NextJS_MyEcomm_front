import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handle(req, res) {
  await mongooseConnect();

  const { categories, sort, ...filters } = req.query;
  const [sortfield, sortOrder] = sort.split('-');
  // console.log({ sort });

  const productsQuery = {
    category: categories.split(','),
  };

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productsQuery[`properties.${filterName}`] = filters[filterName];
    });
  }

  // console.log(productsQuery);
  res.json(
    await Product.find(productsQuery, null, {
      sort: { [sortfield]: sortOrder === 'asc' ? 1 : -1 },
    })
  );
}
