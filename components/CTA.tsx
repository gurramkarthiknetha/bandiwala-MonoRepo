
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ShoppingBag } from 'lucide-react';

const CTA = () => {
  return (
    <div className="bg-gradient-to-r from-bandiwala-orange to-bandiwala-red py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Explore Street Food & Home Cooking?
        </h2>
        <p className="text-white text-opacity-90 text-lg mb-8 max-w-2xl mx-auto">
          Download our app to discover the best street food vendors and home chefs near you. Order food delivery, pickup, or book catering services.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white hover:bg-gray-100 text-bandiwala-red px-6 py-6 h-auto font-semibold">
            <Download className="mr-2 h-5 w-5" />
            Download App
          </Button>
          <Button className="bg-bandiwala-brown hover:bg-bandiwala-brown/90 text-white px-6 py-6 h-auto font-semibold">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Order Now
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">15K+</h3>
            <p className="text-white text-opacity-80">Food Items</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">10K+</h3>
            <p className="text-white text-opacity-80">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">1K+</h3>
            <p className="text-white text-opacity-80">Vendors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
