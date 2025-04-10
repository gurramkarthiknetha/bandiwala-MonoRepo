
import React from 'react';
import { MapPin } from 'lucide-react';

const MapSection = () => {
  return (
    <div className="section-container">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title">Find Vendors Near You</h2>
        <p className="section-subtitle">Discover street food vendors and home chefs in your neighborhood</p>
        
        <div className="mt-8 bg-gray-200 rounded-xl overflow-hidden h-96 relative">
          {/* This is a placeholder for the actual map integration */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <MapPin className="h-16 w-16 text-bandiwala-red mb-4" />
            <p className="text-lg font-medium text-gray-700">Map Integration Coming Soon</p>
            <p className="text-gray-500 max-w-md text-center mt-2">
              Soon, you'll be able to discover and track nearby food vendors in real-time, with directions and estimated delivery times.
            </p>
          </div>
          
          {/* Decorative map markers */}
          <div className="absolute top-1/4 left-1/4">
            <div className="w-4 h-4 bg-bandiwala-red rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-1/3 right-1/3">
            <div className="w-4 h-4 bg-bandiwala-orange rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <div className="w-4 h-4 bg-bandiwala-green rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
            <MapPin className="mr-2 h-5 w-5 text-bandiwala-red" />
            Find Vendors Near Me
          </button>
          <button className="px-6 py-3 bg-bandiwala-orange text-white rounded-full font-medium hover:bg-bandiwala-red transition-colors">
            Become a Food Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
