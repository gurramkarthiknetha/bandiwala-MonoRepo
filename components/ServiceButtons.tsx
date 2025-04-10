'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ShoppingBag, Utensils } from 'lucide-react';

const ServiceButtons = () => {
  const services = [
    {
      title: 'Food Delivery',
      description: 'Order your favorite food from local vendors',
      icon: <ShoppingBag className="h-8 w-8 mb-4 text-white" />,
      bgColor: 'bg-bandiwala-orange',
      action: () => console.log('Food Delivery clicked')
    },
    {
      title: 'Pickup',
      description: 'Skip the line, order ahead for pickup',
      icon: <MapPin className="h-8 w-8 mb-4 text-white" />,
      bgColor: 'bg-bandiwala-red',
      action: () => console.log('Pickup clicked')
    },
    {
      title: 'Catering',
      description: 'Perfect for events and gatherings',
      icon: <Utensils className="h-8 w-8 mb-4 text-white" />,
      bgColor: 'bg-bandiwala-brown',
      action: () => console.log('Catering clicked')
    },
  ];

  return (
    <div className="section-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div 
            key={index}
            className={`${service.bgColor} rounded-xl p-8 text-center shadow-md transform transition-all duration-300 hover:scale-105 cursor-pointer`}
            onClick={service.action}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-white text-opacity-90 mb-6">{service.description}</p>
              <Button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold">
                Order Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceButtons;
