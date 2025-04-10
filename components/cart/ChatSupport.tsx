
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const ChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 overflow-hidden">
          <div className="bg-bandiwala-yellow p-4 flex justify-between items-center">
            <h3 className="font-bold text-bandiwala-dark">Support Chat</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-bandiwala-dark hover:text-bandiwala-button"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-64 p-4 bg-gray-50 overflow-y-auto">
            <div className="flex flex-col gap-2">
              <div className="bg-gray-200 p-2 rounded-lg rounded-tl-none max-w-[80%] self-start">
                <p className="text-sm">Hello! How can I help you today?</p>
              </div>
              <div className="bg-bandiwala-yellow p-2 rounded-lg rounded-tr-none max-w-[80%] self-end">
                <p className="text-sm text-bandiwala-dark">I have a question about my order.</p>
              </div>
              <div className="bg-gray-200 p-2 rounded-lg rounded-tl-none max-w-[80%] self-start">
                <p className="text-sm">Sure, please provide your order ID and I'll help you with that!</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="bandiwala-input flex-1 text-sm"
              />
              <button className="bandiwala-button-primary whitespace-nowrap">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-bandiwala-yellow text-bandiwala-dark p-3 rounded-full shadow-lg hover:bg-amber-400 transition-colors flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatSupport;
