
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, ArrowRight } from 'lucide-react';

const FeaturedVendors = () => {
  const vendors = [
    {
      id: 1,
      name: "Ali's Street Food Corner",
      image: "https://source.unsplash.com/photo-1493962853295-0fd70327578a",
      cuisine: "Street Food, Chaat",
      rating: 4.8,
      reviewCount: 240,
      deliveryTime: "20-30 min",
      isOpen: true,
      featured: true,
    },
    {
      id: 2,
      name: "Maya's Home Kitchen",
      image: "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
      cuisine: "Homemade, North Indian",
      rating: 4.9,
      reviewCount: 186,
      deliveryTime: "30-40 min",
      isOpen: true,
      featured: true,
    },
    {
      id: 3,
      name: "Street Wok Masters",
      image: "https://source.unsplash.com/photo-1493962853295-0fd70327578a",
      cuisine: "Chinese, Thai",
      rating: 4.6,
      reviewCount: 320,
      deliveryTime: "25-35 min",
      isOpen: true,
      featured: false,
    },
    {
      id: 4,
      name: "Biryani House",
      image: "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
      cuisine: "Biryani, Mughlai",
      rating: 4.7,
      reviewCount: 156,
      deliveryTime: "35-45 min",
      isOpen: true,
      featured: false,
    }
  ];

  return (
    <div className="section-container bg-gray-50">
      <h2 className="section-title">Featured Vendors</h2>
      <p className="section-subtitle">Discover the most popular food vendors on Bandiwala</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="overflow-hidden card-hover">
            <div className="relative h-48">
              <img 
                src={vendor.image} 
                alt={vendor.name} 
                className="w-full h-full object-cover"
              />
              {vendor.featured && (
                <div className="absolute top-2 right-2 bg-bandiwala-yellow px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                  Featured
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{vendor.name}</h3>
                <div className="flex items-center bg-green-50 px-2 py-1 rounded text-xs text-green-800 font-medium">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                  Open
                </div>
              </div>
              <p className="text-gray-500 text-sm">{vendor.cuisine}</p>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{vendor.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({vendor.reviewCount})</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-xs">{vendor.deliveryTime}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-sm text-bandiwala-red hover:text-bandiwala-orange cursor-pointer font-medium">
                  View Menu
                </span>
                <ArrowRight className="h-4 w-4 text-bandiwala-red" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <button className="bg-white hover:bg-gray-50 text-bandiwala-red border border-bandiwala-red px-6 py-2 rounded-full font-medium inline-flex items-center transition-colors">
          View All Vendors
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedVendors;
