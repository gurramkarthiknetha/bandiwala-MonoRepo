import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import User from '../models/users';

const UserRouter = express.Router();

// Get all users
UserRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Get user by ID
UserRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Create user
UserRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    const { password, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// Update user
UserRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

// Delete user
UserRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// Update cart
UserRouter.post('/:id/cart', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { cart: req.body.cart } },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating cart', error });
  }
});

export default UserRouter;