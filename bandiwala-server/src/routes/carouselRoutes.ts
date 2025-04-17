import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import Carousel from '../models/curousel';

const CarouselRouter = express.Router();

// Get all active carousel items
CarouselRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const carouselItems = await Carousel.find({ active: true }).populate('productId');
    res.json(carouselItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carousel items', error });
  }
});

// Get carousel item by ID
CarouselRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const carouselItem = await Carousel.findById(req.params.id).populate('productId');
    if (!carouselItem) {
      return res.status(404).json({ message: 'Carousel item not found' });
    }
    res.json(carouselItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carousel item', error });
  }
});

// Create carousel item
CarouselRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newCarouselItem = new Carousel(req.body);
    const savedCarouselItem = await newCarouselItem.save();
    res.status(201).json(savedCarouselItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating carousel item', error });
  }
});

// Update carousel item
CarouselRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedCarouselItem = await Carousel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedCarouselItem) {
      return res.status(404).json({ message: 'Carousel item not found' });
    }
    res.json(updatedCarouselItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating carousel item', error });
  }
});

// Delete carousel item
CarouselRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedCarouselItem = await Carousel.findByIdAndDelete(req.params.id);
    if (!deletedCarouselItem) {
      return res.status(404).json({ message: 'Carousel item not found' });
    }
    res.json({ message: 'Carousel item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting carousel item', error });
  }
});

// Toggle carousel item active status
CarouselRouter.patch('/:id/toggle', async (req: Request, res: Response) => {
  try {
    const carouselItem = await Carousel.findById(req.params.id);
    if (!carouselItem) {
      return res.status(404).json({ message: 'Carousel item not found' });
    }
    
    carouselItem.active = !carouselItem.active;
    await carouselItem.save();
    
    res.json(carouselItem);
  } catch (error) {
    res.status(400).json({ message: 'Error toggling carousel item status', error });
  }
});

export default CarouselRouter;