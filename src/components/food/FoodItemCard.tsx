
import { Button } from '@/components/ui/button';
import { ShoppingCart, CircleDot } from 'lucide-react';
import { useState } from 'react';
import { toast } from "sonner";

export interface FoodItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isSpicy?: boolean;
  category: string;
}

// Create a cart context/service to manage cart items
const addToCart = (item: FoodItemProps) => {
  // Get current cart from localStorage
  const currentCart = localStorage.getItem('cart');
  let cartItems = currentCart ? JSON.parse(currentCart) : [];
  
  // Check if item already exists in cart
  const existingItemIndex = cartItems.findIndex((cartItem: any) => cartItem.id === item.id);
  
  if (existingItemIndex >= 0) {
    // Increment quantity if item already exists
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // Add new item with quantity 1
    cartItems.push({ ...item, quantity: 1 });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
  
  return cartItems.length;
};

export function FoodItemCard({ food }: { food: FoodItemProps }) {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add to cart
    const cartCount = addToCart(food);
    
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`Added ${food.name} to cart`);
      
      // Dispatch custom event to notify header about cart update
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: cartCount } }));
    }, 500);
  };
  
  return (
    <div className="food-card bg-white hover:shadow-lg transition-all duration-300">
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex items-center gap-1 mb-1">
            <CircleDot 
              className={`h-4 w-4 ${food.isVeg ? 'text-food-vegetarian' : 'text-food-nonVegetarian'}`} 
              fill={food.isVeg ? '#4CAF50' : '#E53935'} 
            />
            <span className="text-xs text-muted-foreground">
              {food.isVeg ? 'Veg' : 'Non-veg'}
            </span>
            {food.isSpicy && (
              <span className="text-xs text-orange-500 ml-2">• Spicy</span>
            )}
          </div>
          
          <h3 className="font-semibold">{food.name}</h3>
          <p className="text-brand font-medium">
            ₹{food.price.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {food.description}
          </p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 border-brand text-brand hover:bg-brand hover:text-white animate-fade-in"
            disabled={isAdding}
            onClick={handleAddToCart}
          >
            {isAdding ? 'Adding...' : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
        
        <div className="w-24 h-24 sm:w-32 sm:h-32">
          <img 
            src={food.image} 
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
