import mongoose, { Document, Schema } from 'mongoose';

interface IVendor extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  description: string;
  location: {
    city: string;
    latitude: number;
    longitude: number;
  };
  products: mongoose.Types.ObjectId[];
  isVerified: boolean;
  ratings: Array<{
    userId: mongoose.Types.ObjectId;
    rating: number;
    review: string;
  }>;
  averageRating: number;
}

const VendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  isVerified: { type: Boolean, default: false },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String }
  }],
  averageRating: { type: Number, default: 0 }
});

const Vendor = mongoose.model<IVendor>('Vendor', VendorSchema);
export default Vendor;
