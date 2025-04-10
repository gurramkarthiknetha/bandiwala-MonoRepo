
import React from 'react';
import { Facebook, Twitter, Instagram, Smartphone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bandiwala-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-bandiwala-yellow">Bandi</span>wala
            </h3>
            <p className="text-gray-300 mb-4">
              Bringing the authentic taste of street food and home-cooked meals right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-bandiwala-yellow">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-bandiwala-yellow">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-bandiwala-yellow">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-bandiwala-yellow">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-bandiwala-yellow">Partner With Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-bandiwala-yellow">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-bandiwala-yellow">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-bandiwala-yellow">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-bandiwala-yellow">Safety Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-bandiwala-yellow">Community Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <p className="flex items-center text-gray-300">
                <Smartphone size={18} className="mr-2" />
                <span>+91 1234567890</span>
              </p>
              <p className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2" />
                <span>support@bandiwala.com</span>
              </p>
            </div>
            <div className="mt-4">
              <h5 className="font-medium mb-2">Download App</h5>
              <div className="flex space-x-2">
                <a href="#" className="bg-gray-700 text-white text-xs px-3 py-2 rounded hover:bg-gray-600">
                  Google Play
                </a>
                <a href="#" className="bg-gray-700 text-white text-xs px-3 py-2 rounded hover:bg-gray-600">
                  App Store
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Bandiwala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
