import mongoose, { Document, Schema } from 'mongoose';

interface ICarousel extends Document {
  image: string;
  productId: mongoose.Types.ObjectId;
  active: boolean;
}

const CarouselSchema: Schema = new Schema({
  image: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  active: { type: Boolean, default: true }
});

const Carousel = mongoose.model<ICarousel>('Carousel', CarouselSchema);
export default Carousel;
