import { mongooseConnect } from '@/lib/mongoose';
import { WishedProduct } from '@/models/WishedProduct';
import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handle(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    const { product } = req.body;
    const wishedDoc = await WishedProduct.findOne({
      userEmail: user.email,
      product,
    });
    console.log(wishedDoc);
    if (wishedDoc) {
      await WishedProduct.findByIdAndDelete(wishedDoc._id);
      res.json('deleted');
    } else {
      await WishedProduct.create({ userEmail: user.email, product });
      res.json('created');
    };
  }
}
