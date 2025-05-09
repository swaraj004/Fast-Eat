
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem, CartItemProps } from '@/components/cart/CartItem';
import { ArrowRight, CreditCard, Home, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

// Mock cart items
const initialCartItems: CartItemProps[] = [
  {
    id: '101',
    name: 'Classic Cheeseburger',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899',
    quantity: 1,
    isVeg: false,
  },
  {
    id: '202',
    name: 'Cheesy Bacon Fries',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=1770',
    quantity: 1,
    isVeg: false,
  },
  {
    id: '301',
    name: 'Chocolate Milkshake',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1578313611104-fa4d12dfc9fb?q=80&w=1770',
    quantity: 1,
    isVeg: true,
  }
];

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemProps[]>(initialCartItems);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate subtotal, delivery fee, and total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const total = subtotal + deliveryFee + serviceFee;
  
  // Update item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };
  
  // Process checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/checkout');
    }, 1000);
  };
  
  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-muted mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious items from our restaurants and get them delivered to you.
          </p>
          <Button 
            className="bg-brand hover:bg-brand-dark"
            onClick={() => navigate('/restaurants')}
          >
            Browse Restaurants
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">Cart Items</h2>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full bg-brand hover:bg-brand-dark"
                onClick={handleCheckout}
                disabled={isProcessing || cartItems.length === 0}
              >
                {isProcessing ? "Processing..." : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Secure payments
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Home className="h-4 w-4 mr-2" />
                  Contactless delivery available
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
