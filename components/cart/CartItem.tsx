
import React, { useState } from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  tag: string;
  notes: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  tag,
  notes,
  onUpdateQuantity,
  onUpdateNotes,
  onRemoveItem
}) => {
  const [itemNotes, setItemNotes] = useState(notes);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemNotes(e.target.value);
    onUpdateNotes(id, e.target.value);
  };

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 bg-bandiwala-yellow px-2 py-1 text-xs font-medium text-bandiwala-dark">
          {tag}
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="text-lg font-semibold">₹{price.toFixed(2)}</div>
          
          <div className="flex items-center border border-gray-200 rounded-md">
            <button 
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 text-gray-500 hover:text-bandiwala-button"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-gray-800">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 text-gray-500 hover:text-bandiwala-button"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        <div className="mt-2">
          <input
            type="text"
            placeholder="Add special instructions..."
            value={itemNotes}
            onChange={handleNotesChange}
            className="text-sm w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-bandiwala-yellow focus:border-transparent"
          />
        </div>
      </div>
      
      <button 
        onClick={() => onRemoveItem(id)}
        className="text-gray-400 hover:text-bandiwala-error transition-colors"
        aria-label="Remove item"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;
