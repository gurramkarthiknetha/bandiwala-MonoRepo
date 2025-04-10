
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCart: React.FC = () => {
  return (
    <div className="bandiwala-card flex flex-col items-center justify-center py-12">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <ShoppingBag size={64} className="text-bandiwala-button" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Looks like you haven't added any items to your cart yet. 
        Explore our delicious street food and home-cooked meals!
      </p>
      <Link to="/" className="bandiwala-button-primary">
        Browse Restaurants
      </Link>
    </div>
  );
};

export default EmptyCart;
