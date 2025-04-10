
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Search, User, ClipboardList } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-bandiwala-dark">
                <span className="text-bandiwala-yellow">Bandi</span>wala
              </span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-8">
            <Link to="/" className={`flex items-center gap-1 ${isActive('/') ? 'text-bandiwala-button font-medium border-b-2 border-bandiwala-yellow' : 'text-gray-600 hover:text-bandiwala-button'}`}>
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/browse" className={`flex items-center gap-1 ${isActive('/browse') ? 'text-bandiwala-button font-medium border-b-2 border-bandiwala-yellow' : 'text-gray-600 hover:text-bandiwala-button'}`}>
              <Search size={18} />
              <span>Browse</span>
            </Link>
            <Link to="/cart" className={`flex items-center gap-1 ${isActive('/cart') ? 'text-bandiwala-button font-medium border-b-2 border-bandiwala-yellow' : 'text-gray-600 hover:text-bandiwala-button'}`}>
              <ShoppingCart size={18} />
              <span>Cart</span>
            </Link>
            <Link to="/orders" className={`flex items-center gap-1 ${isActive('/orders') ? 'text-bandiwala-button font-medium border-b-2 border-bandiwala-yellow' : 'text-gray-600 hover:text-bandiwala-button'}`}>
              <ClipboardList size={18} />
              <span>Orders</span>
            </Link>
            <Link to="/profile" className={`flex items-center gap-1 ${isActive('/profile') ? 'text-bandiwala-button font-medium border-b-2 border-bandiwala-yellow' : 'text-gray-600 hover:text-bandiwala-button'}`}>
              <User size={18} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
