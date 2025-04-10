
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4">
              Bandi<span className="text-bandiwala-orange">wala</span>
            </h2>
            <p className="text-gray-400 mb-4">
              Connecting food lovers with authentic street food vendors and home chefs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Vendors</a></li>
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Food Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Pickup Orders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Catering Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Become a Vendor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-bandiwala-orange">Partner With Us</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p className="mb-2">123 Street Food Lane</p>
              <p className="mb-2">Mumbai, Maharashtra 400001</p>
              <p className="mb-2">India</p>
            </address>
            <p className="text-gray-400 mt-4">
              <a href="tel:+919876543210" className="hover:text-bandiwala-orange">+91 98765 43210</a>
            </p>
            <p className="text-gray-400">
              <a href="mailto:info@bandiwala.com" className="hover:text-bandiwala-orange">info@bandiwala.com</a>
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Bandiwala. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
