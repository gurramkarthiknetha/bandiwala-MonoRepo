
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      image: "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
      rating: 5,
      text: "Absolutely loved the home-cooked butter chicken! It reminded me of my grandmother's recipe. Will definitely order again.",
      date: "2 days ago",
      vendor: "Maya's Home Kitchen"
    },
    {
      id: 2,
      name: "Rahul Patel",
      image: "https://source.unsplash.com/photo-1493962853295-0fd70327578a",
      rating: 4,
      text: "The pani puri was authentic and super fresh. Delivery was quick too. Just wish there was a bit more filling.",
      date: "1 week ago",
      vendor: "Ali's Street Food Corner"
    },
    {
      id: 3,
      name: "Sneha Gupta",
      image: "https://source.unsplash.com/photo-1618160702438-9b02ab6515c9",
      rating: 5,
      text: "Best biryani in town! The catering service for our family gathering was excellent. Everyone loved the food.",
      date: "2 weeks ago",
      vendor: "Biryani House"
    }
  ];

  return (
    <div className="section-container bg-gray-50">
      <h2 className="section-title">What Our Customers Say</h2>
      <p className="section-subtitle">Read reviews from our satisfied customers</p>

      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        {reviews.map((review) => (
          <Card key={review.id} className="flex-1 card-hover">
            <CardContent className="p-6">
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-700 mb-4">"{review.text}"</p>

              {/* Reviewer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="text-xs text-bandiwala-orange font-medium">
                  {review.vendor}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="bg-white hover:bg-gray-50 text-bandiwala-red border border-bandiwala-red px-6 py-2 rounded-full font-medium inline-flex items-center transition-colors">
          Read More Reviews
        </button>
      </div>
    </div>
  );
};

export default Reviews;
