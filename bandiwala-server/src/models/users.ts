import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'vendor';
  phoneNumber?: string;
  address?: string;
  cart: Array<{ productId: mongoose.Types.ObjectId, quantity: number }>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'vendor'], default: 'user' },
  phoneNumber: { type: String },
  address: { type: String },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
