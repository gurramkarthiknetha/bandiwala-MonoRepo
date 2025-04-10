
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Plus } from 'lucide-react';

const TrendingDishes = () => {
  const dishes = [
    {
      id: 1,
      name: "Pani Puri Platter",
      image: "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
      vendor: "Ali's Street Food Corner",
      price: 149,
      rating: 4.8,
      reviewCount: 120,
      category: "Street Food"
    },
    {
      id: 2,
      name: "Home Style Butter Chicken",
      image: "https://source.unsplash.com/photo-1493962853295-0fd70327578a",
      vendor: "Maya's Home Kitchen",
      price: 299,
      rating: 4.9,
      reviewCount: 98,
      category: "Home Food"
    },
    {
      id: 3,
      name: "Hakka Noodles Special",
      image: "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
      vendor: "Street Wok Masters",
      price: 179,
      rating: 4.7,
      reviewCount: 86,
      category: "Street Food"
    },
    {
      id: 4,
      name: "Hyderabadi Chicken Biryani",
      image: "https://source.unsplash.com/photo-1493962853295-0fd70327578a",
      vendor: "Biryani House",
      price: 249,
      rating: 4.9,
      reviewCount: 156,
      category: "Home Food"
    },
    {
      id: 5,
      name: "Mumbai Vada Pav",
      image: "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
      vendor: "Ali's Street Food Corner",
      price: 89,
      rating: 4.6,
      reviewCount: 75,
      category: "Street Food"
    },
    {
      id: 6,
      name: "Home-style Dal Makhani",
      image: "https://source.unsplash.com/photo-1493962853295-0fd70327578a",
      vendor: "Maya's Home Kitchen",
      price: 199,
      rating: 4.8,
      reviewCount: 64,
      category: "Home Food"
    },
  ];

  // Group dishes by category
  const categories = dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {} as Record<string, typeof dishes>);

  return (
    <div className="section-container">
      <h2 className="section-title">Trending Dishes</h2>
      <p className="section-subtitle">Discover what's popular in your area right now</p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(categories).map((category) => (
          <button 
            key={category}
            className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:border-bandiwala-orange hover:text-bandiwala-orange transition-colors font-medium text-sm"
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <Card key={dish.id} className="overflow-hidden card-hover">
            <div className="relative h-48">
              <img 
                src={dish.image} 
                alt={dish.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-bandiwala-red">
                {dish.category}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{dish.name}</h3>
              <p className="text-gray-500 text-sm">{dish.vendor}</p>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{dish.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({dish.reviewCount} reviews)</span>
                </div>
                
                <p className="font-semibold">₹{dish.price}</p>
              </div>
              
              <button className="mt-4 w-full bg-bandiwala-orange hover:bg-bandiwala-red text-white rounded-full py-2 font-medium transition-colors flex items-center justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <button className="bg-white hover:bg-gray-50 text-bandiwala-red border border-bandiwala-red px-6 py-2 rounded-full font-medium inline-flex items-center transition-colors">
          Explore More Dishes
        </button>
      </div>
    </div>
  );
};

export default TrendingDishes;
