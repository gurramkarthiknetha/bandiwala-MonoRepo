interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  cart: any[];
}

interface Vendor {
  name: string;
  email: string;
  password: string;
  phone: string;
  description: string;
  location: {
    city: string;
    latitude: number;
    longitude: number;
  };
}

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  vendorId: string;
  ratings: {
    rating: number;
    comment: string;
  }[];
}

interface CarouselItem {
  title: string;
  description: string;
  image: string;
  active: boolean;
}

export const sampleUsers: User[] = [
  {
    username: "johndoe",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone: "+1234567890",
    address: "123 Main St, City",
    cart: []
  },
  {
    username: "janesmith",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    phone: "+1987654321",
    address: "456 Oak Ave, Town",
    cart: []
  }
];

export const sampleVendors: Vendor[] = [
  {
    name: "Fresh Fruits Co",
    email: "fruits@example.com",
    password: "vendor123",
    phone: "+1122334455",
    description: "Fresh fruits delivered to your doorstep",
    location: {
      city: "Mumbai",
      latitude: 19.0760,
      longitude: 72.8777
    }
  },
  {
    name: "Vegetable Express",
    email: "veggies@example.com",
    password: "vendor456",
    phone: "+5544332211",
    description: "Local farm fresh vegetables",
    location: {
      city: "Delhi",
      latitude: 28.6139,
      longitude: 77.2090
    }
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
    ratings: [
      {
        rating: 5,
        comment: "Very fresh and sweet!"
      }
    ]
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
    title: "Summer Fruits Special",
    description: "Get fresh summer fruits at 20% off",
    image: "https://example.com/images/summer-fruits.jpg",
    active: true
  },
  {
    title: "Vegetable Bundle",
    description: "Weekly vegetable bundle at amazing prices",
    image: "https://example.com/images/veggie-bundle.jpg",
    active: true
  }
];