import express from 'express';
import cors, { CorsOptions } from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminRouter from './routes/adminRoutes';
import VendorRouter from './routes/vendorRoutes';
import UserRouter from './routes/userRoutes';

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000', 'http://localhost'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Register routes
app.use('/api/admin', AdminRouter);
app.use('/api/vendors', VendorRouter);
app.use('/api/users', UserRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;