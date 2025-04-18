import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  cart: Array<{ productId: mongoose.Types.ObjectId, quantity: number }>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
