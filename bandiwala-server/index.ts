import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import mongoose from 'mongoose';
import cors, { CorsRequest } from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import UserRouter from './src/routes/userRoutes';
import VendorRouter from './src/routes/vendorRoutes';
import ProductsRouter from './src/routes/productRoutes';
import CarouselRouter from './src/routes/carouselRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', UserRouter);
app.use('/api/vendors', VendorRouter);
app.use('/api/products', ProductsRouter);
app.use('/api/carousel', CarouselRouter);

// Health check route
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// MongoDB connection and server start
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startServer();
