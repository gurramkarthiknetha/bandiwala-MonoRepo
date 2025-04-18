interface Admin {
  username: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin';
  permissions: string[];
}

interface User {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  cart: Array<{ productId: string; quantity: number }>;
}

interface Vendor {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  description: string;
  location: {
    city: string;
    latitude: number;
    longitude: number;
  };
  isVerified: boolean;
  ratings: Array<{
    rating: number;
    review: string;
  }>;
}

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  vendorId: string;
  ratings: Array<{
    rating: number;
    review: string;
  }>;
}

interface CarouselItem {
  image: string;
  productId: string;
  active: boolean;
}

export const sampleAdmins: Admin[] = [
  {
    username: "superadmin",
    email: "superadmin@bandiwala.com",
    password: "admin123",
    role: "super_admin",
    permissions: ["all"]
  },
  {
    username: "admin1",
    email: "admin1@bandiwala.com",
    password: "admin456",
    role: "admin",
    permissions: ["manage_vendors", "manage_products"]
  }
];

export const sampleUsers: User[] = [
  {
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
    phoneNumber: "+1234567890",
    address: "123 Main St, City",
    cart: []
  },
  {
    username: "janesmith",
    email: "jane@example.com",
    password: "password456",
    phoneNumber: "+1987654321",
    address: "456 Oak Ave, Town",
    cart: []
  }
];

export const sampleVendors: Vendor[] = [
  {
    name: "Fresh Fruits Co",
    email: "fruits@example.com",
    password: "vendor123",
    phoneNumber: "+1122334455",
    description: "Fresh fruits delivered to your doorstep",
    location: {
      city: "Mumbai",
      latitude: 19.0760,
      longitude: 72.8777
    },
    isVerified: true,
    ratings: []
  },
  {
    name: "Vegetable Express",
    email: "veggies@example.com",
    password: "vendor456",
    phoneNumber: "+5544332211",
    description: "Local farm fresh vegetables",
    location: {
      city: "Delhi",
      latitude: 28.6139,
      longitude: 77.2090
    },
    isVerified: false,
    ratings: []
  }
];

export const sampleProducts: Product[] = [
  {
    name: "Fresh Apples",
    description: "Sweet and juicy red apples",
    price: 120,
    category: "Fruits",
    imageUrl: "https://example.com/images/apples.jpg",
    vendorId: "", // Will be replaced with actual vendor ID during population
    ratings: []
  },
  {
    name: "Organic Tomatoes",
    description: "Fresh organic tomatoes",
    price: 40,
    category: "Vegetables",
    imageUrl: "https://example.com/images/tomatoes.jpg",
    vendorId: "", // Will be replaced with actual vendor ID during population
    ratings: []
  }
];

export const sampleCarouselItems: CarouselItem[] = [
  {
    image: "https://example.com/images/summer-fruits.jpg",
    productId: "", // Will be replaced with actual product ID during population
    active: true
  },
  {
    image: "https://example.com/images/veggie-bundle.jpg",
    productId: "", // Will be replaced with actual product ID during population
    active: true
  }
];