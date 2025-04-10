'use client'
import React from 'react';
import {useRouter} from 'next/navigation'
import { Button } from '@/components/ui/button';
import { MapPin, Search, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-display font-bold text-bandiwala-red">Bandi<span className="text-bandiwala-orange">wala</span></span>
            </a>
          </div>

          {/* Location selector */}
          <div className="hidden md:flex items-center text-sm">
            <MapPin className="w-4 h-4 text-bandiwala-red mr-1" />
            <span className="font-medium">Deliver to:</span>
            <button className="ml-1 text-bandiwala-orange hover:text-bandiwala-red font-semibold flex items-center">
              Current Location
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for food or vendors..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:ring-bandiwala-orange focus:border-bandiwala-orange"
              />
            </div>
          </div>

          {/* Navigation items */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <Link href="/cart" className="flex items-center">
              <Button variant="default" className="flex items-center hover:text-white hover:bg-bandiwala-red" onClick={()=>router.push('/cart')}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                Cart
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center hover:bg-bandiwala-orange hover:text-white" onClick={()=>router.push('/login')}>
              <User className="h-5 w-5 mr-2" />
              Login
            </Button>
            <Button className="bg-bandiwala-orange hover:bg-bandiwala-red text-white" onClick={()=>router.push('/signup')}>
              Sign up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
