import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handle(req, res) {
  await mongooseConnect();

  const { categories, ...filters } = req.query;
  // console.log({ filters });

  const productsQuery = {
    category: categories.split(','),
  };

  let filteredProducts = await Product.find(productsQuery);

  if (Object.keys(filters).length > 0) {
    // Apply additional filters
    filteredProducts = filteredProducts.filter((product) => {
      for (const key in filters) {
        if (product.properties[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  }
  
  res.json(filteredProducts);
}
