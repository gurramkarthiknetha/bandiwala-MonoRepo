'use client';
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import { toast } from "sonner";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VendorGroup from '@/components/cart/VendorGroup';
import OrderSummary from '@/components/cart/OrderSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import ChatSupport from '@/components/cart/ChatSupport';
import { ShoppingCart } from 'lucide-react';
const initialCartData = {
    vendors: [
      {
        id: "v1",
        name: "Street Bites Corner",
        deliveryTime: "25-30 min",
        deliveryFee: 30,
        items: [
          {
            id: "i1",
            name: "Pav Bhaji",
            price: 120,
            quantity: 1,
            image: "https://source.unsplash.com/800x600/?pavbhaji",
            tag: "Street Food",
            notes: ""
          },
          {
            id: "i2",
            name: "Vada Pav",
            price: 40,
            quantity: 2,
            image: "https://source.unsplash.com/800x600/?vadapav",
            tag: "Street Food",
            notes: "Extra spicy"
          }
        ]
      },
      {
        id: "v2",
        name: "Homestyle Kitchen",
        deliveryTime: "35-40 min",
        deliveryFee: 40,
        items: [
          {
            id: "i3",
            name: "Dal Makhani",
            price: 180,
            quantity: 1,
            image: "https://source.unsplash.com/800x600/?dal",
            tag: "Home Food",
            notes: ""
          },
          {
            id: "i4",
            name: "Butter Naan",
            price: 30,
            quantity: 3,
            image: "https://source.unsplash.com/800x600/?naan",
            tag: "Home Food",
            notes: ""
          }
        ]
      }
    ],
    packagingFee: 20,
    tax: 50,
    discount: 0
  };
  
  const Cart: React.FC = () => {
    const navigate = useRouter();
    const [cartData, setCartData] = useState(initialCartData);
    const [isCartEmpty, setIsCartEmpty] = useState(false);
  
    // Calculate subtotal
    const calculateSubtotal = () => {
      return cartData.vendors.reduce((total, vendor) => {
        return total + vendor.items.reduce((vendorTotal, item) => {
          return vendorTotal + (item.price * item.quantity);
        }, 0);
      }, 0);
    };
  
    // Calculate total delivery charge
    const calculateDeliveryCharge = () => {
      return cartData.vendors.reduce((total, vendor) => {
        return total + vendor.deliveryFee;
      }, 0);
    };
  
    // Handle quantity update
    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
      const updatedVendors = cartData.vendors.map(vendor => {
        const updatedItems = vendor.items.map(item => {
          if (item.id === itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        return { ...vendor, items: updatedItems };
      });
  
      setCartData({ ...cartData, vendors: updatedVendors });
    };
  
    // Handle notes update
    const handleUpdateNotes = (itemId: string, newNotes: string) => {
      const updatedVendors = cartData.vendors.map(vendor => {
        const updatedItems = vendor.items.map(item => {
          if (item.id === itemId) {
            return { ...item, notes: newNotes };
          }
          return item;
        });
        return { ...vendor, items: updatedItems };
      });
  
      setCartData({ ...cartData, vendors: updatedVendors });
    };
  
    // Handle item removal
    const handleRemoveItem = (itemId: string) => {
      let vendorToRemove: string | null = null;
  
      const updatedVendors = cartData.vendors.map(vendor => {
        const updatedItems = vendor.items.filter(item => item.id !== itemId);
        
        // If this vendor has no more items, mark it for removal
        if (updatedItems.length === 0) {
          vendorToRemove = vendor.id;
        }
        
        return { ...vendor, items: updatedItems };
      });
  
      // Filter out any vendors with no items
      const filteredVendors = vendorToRemove 
        ? updatedVendors.filter(vendor => vendor.id !== vendorToRemove)
        : updatedVendors;
  
      setCartData({ ...cartData, vendors: filteredVendors });
      
      // Check if cart is now empty
      if (filteredVendors.length === 0) {
        setIsCartEmpty(true);
      }
  
      toast.success("Item removed from cart");
    };
  
    // Handle "Add More Items" button
    const handleAddMoreItems = (vendorName: string) => {
      // In a real application, this would navigate to the vendor's menu page
      toast.info(`Navigating to ${vendorName}'s menu...`);
      // navigate(`/vendor/${vendorName}`);
    };
  
    // Handle promo code application
    const handleApplyPromo = (code: string) => {
      // Mock promo code logic
      if (code.toUpperCase() === "WELCOME20") {
        const subtotal = calculateSubtotal();
        const discount = subtotal * 0.2; // 20% discount
        setCartData({ ...cartData, discount });
      } else if (code.toUpperCase() === "FLAT100") {
        setCartData({ ...cartData, discount: 100 });
      } else {
        toast.error("Invalid promo code");
      }
    };
  
    // Handle proceed to payment
    const handleProceedToPayment = () => {
      // In a real application, this would navigate to the payment page
      toast.success("Proceeding to payment...");
      // navigate('/checkout/payment');
    };
  
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart size={24} className="text-bandiwala-yellow" />
            <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          </div>
          
          {!isCartEmpty && cartData.vendors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {cartData.vendors.map(vendor => (
                  <VendorGroup
                    key={vendor.id}
                    vendorName={vendor.name}
                    deliveryTime={vendor.deliveryTime}
                    deliveryFee={vendor.deliveryFee}
                    items={vendor.items}
                    onUpdateQuantity={handleUpdateQuantity}
                    onUpdateNotes={handleUpdateNotes}
                    onRemoveItem={handleRemoveItem}
                    onAddMoreItems={handleAddMoreItems}
                  />
                ))}
              </div>
              
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={calculateSubtotal()}
                  packagingFee={cartData.packagingFee}
                  deliveryCharge={calculateDeliveryCharge()}
                  tax={cartData.tax}
                  discount={cartData.discount}
                  onApplyPromo={handleApplyPromo}
                  onProceedToPayment={handleProceedToPayment}
                  estimatedDeliveryTime="35-45 min"
                />
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </main>
        <ChatSupport />
        <Footer />
      </>
    );
  };

export default Cart;