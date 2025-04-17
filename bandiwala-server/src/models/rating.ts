import mongoose from 'mongoose';

interface IRating {
  userId: mongoose.Types.ObjectId;
  rating: number;
  review: string;
}

export { IRating };
