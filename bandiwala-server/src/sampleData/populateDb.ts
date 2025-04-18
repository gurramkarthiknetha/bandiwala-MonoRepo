import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/users';
import Vendor from '../models/vendor';
import Product from '../models/products';
import Carousel from '../models/curousel';
import Admin from '../models/admin';
import { sampleUsers, sampleVendors, sampleProducts, sampleCarouselItems, sampleAdmins } from './sampledata';

dotenv.config();

const populateDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Vendor.deleteMany({});
    await Product.deleteMany({});
    await Carousel.deleteMany({});
    await Admin.deleteMany({});

    // Insert sample admins
    const admins = await Admin.insertMany(sampleAdmins);
    console.log('Sample admins added');

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log('Sample users added');

    // Insert sample vendors
    const vendors = await Vendor.insertMany(sampleVendors);
    console.log('Sample vendors added');

    // Update product data with real vendor IDs
    const productsWithRealIds = sampleProducts.map((product, index) => ({
      ...product,
      vendorId: vendors[index % vendors.length]._id,
      ratings: product.ratings.map(rating => ({
        ...rating,
        userId: users[0]._id
      }))
    }));

    // Insert sample products
    const products = await Product.insertMany(productsWithRealIds);
    console.log('Sample products added');

    // Update carousel items with real product IDs
    const carouselWithRealIds = sampleCarouselItems.map((item, index) => ({
      ...item,
      productId: products[index % products.length]._id
    }));

    // Insert sample carousel items
    await Carousel.insertMany(carouselWithRealIds);
    console.log('Sample carousel items added');

    console.log('Database populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
};

populateDb();