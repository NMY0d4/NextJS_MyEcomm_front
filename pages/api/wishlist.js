import { mongooseConnect } from '@/lib/mongoose';

export default async function handsle(req, res) {
  await mongooseConnect();

  if (req.method === 'POST') {
    const { product } = req.body;
    res.json({ product });
  }
}
