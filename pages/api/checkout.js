import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
const stripe = require('stripe')('')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const { name, email, city, postalCode, streetAddress, country, products } =
    req.body;
  await mongooseConnect();
  const productsIds = products.split(',');
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });
  let line_items = [];
  uniqueIds.forEach((productId) => {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {
            name: productInfo.productName,
          },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  });

  const orderDoc = Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  res.json({ line_items });
}
