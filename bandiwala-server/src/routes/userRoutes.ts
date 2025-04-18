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

// Update user profile
UserRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
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

// Add item to cart
UserRouter.post('/:id/cart', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { cart: req.body } },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error adding item to cart', error });
  }
});

// Update cart item quantity
UserRouter.patch('/:id/cart/:productId', async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { 
        _id: req.params.id,
        'cart.productId': req.params.productId 
      },
      { $set: { 'cart.$.quantity': req.body.quantity } },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User or cart item not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating cart item', error });
  }
});

// Remove item from cart
UserRouter.delete('/:id/cart/:productId', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { cart: { productId: req.params.productId } } },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error removing item from cart', error });
  }
});

export default UserRouter;