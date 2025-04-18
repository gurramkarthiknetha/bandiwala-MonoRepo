import mongoose, { Document, Schema } from 'mongoose';

interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin';
  permissions: string[];
}

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['super_admin', 'admin'], required: true },
  permissions: [{ type: String }]
});

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
export default Admin;