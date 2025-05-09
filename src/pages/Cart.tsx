
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem, CartItemProps } from '@/components/cart/CartItem';
import { ArrowRight, CreditCard, Home, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        try {
          const items = JSON.parse(cartData);
          setCartItems(items);
        } catch (error) {
          console.error("Failed to parse cart data", error);
          setCartItems([]);
        }
      }
    };

    loadCartItems();
    
    // Listen for cart updates
    const handleCartUpdate = () => loadCartItems();
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);
  
  // Calculate subtotal, delivery fee, and total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 49.99;
  const serviceFee = 29.50;
  const total = subtotal + deliveryFee + serviceFee;
  
  // Update item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    // Notify other components about the update
    const cartCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: cartCount } }));
  };
  
  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    // Notify other components about the update
    const cartCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: cartCount } }));
    
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
      
      // Generate a random order ID
      const orderId = Math.random().toString(36).substring(2, 10);
      
      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: 0 } }));
      
      // Redirect to order tracking page
      navigate(`/track/${orderId}`);
    }, 1000);
  };
  
  return (
    <div className="container px-4 py-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-lg">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-muted mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious items from our restaurants and get them delivered to you.
          </p>
          <Button 
            className="bg-brand hover:bg-brand-dark animate-scale-in"
            onClick={() => navigate('/')}
          >
            Browse Restaurants
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-semibold text-lg mb-4">Cart Items</h2>
              <div className="space-y-4">
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
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>₹{serviceFee.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full bg-brand hover:bg-brand-dark animate-pulse"
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
