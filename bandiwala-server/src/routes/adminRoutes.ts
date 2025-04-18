import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import Admin from '../models/admin';
import Vendor from '../models/vendor';

const AdminRouter = express.Router();

// Get all admins
AdminRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
});

// Create admin (super_admin only)
AdminRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    const { password, ...adminWithoutPassword } = savedAdmin.toObject();
    res.status(201).json(adminWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: 'Error creating admin', error });
  }
});

// Verify vendor
AdminRouter.patch('/verify-vendor/:id', async (req: Request, res: Response) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { $set: { isVerified: true } },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(400).json({ message: 'Error verifying vendor', error });
  }
});

export default AdminRouter;