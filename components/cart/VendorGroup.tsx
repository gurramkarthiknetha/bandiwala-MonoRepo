
import React from 'react';
import CartItem from './CartItem';
import { Clock, Truck } from 'lucide-react';

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  tag: string;
  notes: string;
}

interface VendorGroupProps {
  vendorName: string;
  deliveryTime: string;
  deliveryFee: number;
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onRemoveItem: (id: string) => void;
  onAddMoreItems: (vendorName: string) => void;
}

const VendorGroup: React.FC<VendorGroupProps> = ({
  vendorName,
  deliveryTime,
  deliveryFee,
  items,
  onUpdateQuantity,
  onUpdateNotes,
  onRemoveItem,
  onAddMoreItems
}) => {
  return (
    <div className="bandiwala-card mb-6">
      <div className="border-b border-gray-200 pb-3 mb-3">
        <h2 className="text-xl font-bold text-gray-800">{vendorName}</h2>
        <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-bandiwala-button" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck size={16} className="text-bandiwala-button" />
            <span>Delivery ₹{deliveryFee.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
        {items.map(item => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
            tag={item.tag}
            notes={item.notes}
            onUpdateQuantity={onUpdateQuantity}
            onUpdateNotes={onUpdateNotes}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => onAddMoreItems(vendorName)}
          className="bandiwala-button-primary text-sm"
        >
          Add More Items
        </button>
      </div>
    </div>
  );
};

export default VendorGroup;
