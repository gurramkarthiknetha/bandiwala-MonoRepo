import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import HeroInput from './HeroInput';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-amber-50 to-white">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
        {/* Text Content */}
        <div className="flex flex-col justify-center z-10 animate-fade-in">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Discover the Taste of <span className="text-bandiwala-orange">Street Food</span> & <span className="text-bandiwala-red">Home Cooking</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              From authentic street food to homemade delicacies. Order delivery, pickup, or book catering services - all in one place.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 flex">
              <div className="w-full max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <HeroInput/>
              </div>
              <Button className="bg-bandiwala-orange hover:bg-bandiwala-red text-white rounded-r-full px-8 h-auto">
                Search
              </Button>
            </div>
            
            {/* Statistics */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-bandiwala-orange">1000+</p>
                <p className="text-sm text-gray-600">Vendors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-bandiwala-orange">5000+</p>
                <p className="text-sm text-gray-600">Dishes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-bandiwala-orange">20+</p>
                <p className="text-sm text-gray-600">Cities</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="hidden md:flex items-center justify-center relative animate-fade-in">
          <div className="relative w-full h-full">
            {/* Main image */}
            <Image 
              src="https://source.unsplash.com/photo-1493962853295-0fd70327578a"
              fill={true} 
              alt="Street food vendor" 
              className="rounded-3xl shadow-xl z-10 w-full h-[400px] object-cover animate-pulse-subtle"
              priority
            />
            
            {/* Floating food cards */}
            <div className="absolute -top-10 -left-10 bg-white p-3 rounded-xl shadow-lg rotate-[-5deg]">
              <Image 
                src="https://source.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Delicious dish"
                fill={true} 
                className="w-32 h-32 object-cover rounded-lg"
                priority
              />
              <p className="text-sm font-medium mt-1">Spicy Street Tacos</p>
              <div className="flex items-center text-sm mt-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-xs text-gray-600 ml-1">(128)</span>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-xl shadow-lg rotate-[5deg]">
              <Image 
                src="https://source.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Home-cooked meal"
                fill={true}
                className="w-32 h-32 object-cover rounded-lg"
                priority
              />
              <p className="text-sm font-medium mt-1">Home-style Biryani</p>
              <div className="flex items-center text-sm mt-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-xs text-gray-600 ml-1">(86)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="white" className="w-full">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
