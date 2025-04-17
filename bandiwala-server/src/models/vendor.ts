import mongoose, { Document, Schema } from 'mongoose';

interface IVendor extends Document {
  name: string;
  email: string;
  password: string;
  location: {
    city: string;
    latitude: number;
    longitude: number;
  };
  products: mongoose.Types.ObjectId[];
}

const VendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Vendor = mongoose.model<IVendor>('Vendor', VendorSchema);
export default Vendor;
