
import React, { useState } from 'react';
import { Check, Info, Clock } from 'lucide-react';
import { toast } from "sonner";

interface OrderSummaryProps {
  subtotal: number;
  packagingFee: number;
  deliveryCharge: number;
  tax: number;
  discount: number;
  onApplyPromo: (code: string) => void;
  onProceedToPayment: () => void;
  estimatedDeliveryTime: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  packagingFee,
  deliveryCharge,
  tax,
  discount,
  onApplyPromo,
  onProceedToPayment,
  estimatedDeliveryTime
}) => {
  const [promoCode, setPromoCode] = useState('');
  const total = subtotal + packagingFee + deliveryCharge + tax - discount;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      onApplyPromo(promoCode);
      toast.success("Promo code applied successfully!");
      setPromoCode('');
    } else {
      toast.error("Please enter a valid promo code");
    }
  };

  return (
    <div className="bandiwala-card sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Item Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Packaging Fee</span>
          <span>₹{packagingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Delivery Charge</span>
          <span>₹{deliveryCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Taxes & GST</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-bandiwala-success font-medium">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={handlePromoSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="bandiwala-input flex-1 text-sm"
          />
          <button 
            type="submit" 
            className="bandiwala-button-primary whitespace-nowrap"
          >
            Apply
          </button>
        </div>
      </form>
      
      <button 
        onClick={onProceedToPayment}
        className="w-full py-3 bg-bandiwala-yellow text-bandiwala-dark font-bold rounded-lg hover:bg-amber-400 transition-colors"
      >
        Proceed to Payment
      </button>
      
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1 mb-1">
          <Clock size={16} className="text-bandiwala-button" />
          <span>Estimated delivery in {estimatedDeliveryTime}</span>
        </div>
        <div className="flex items-start gap-1">
          <Info size={16} className="text-bandiwala-button flex-shrink-0 mt-0.5" />
          <span>Need help with your order? Our support team is just a click away.</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
