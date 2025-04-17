import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  vendorId: mongoose.Types.ObjectId;
  images: string[];
  ratings: Array<{ userId: mongoose.Types.ObjectId, rating: number, review: string }>;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  images: [String],
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      review: { type: String }
    }
  ]
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
