
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

export function FoodItemCard({ food }: { food: FoodItemProps }) {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`Added ${food.name} to cart`);
    }, 500);
  };
  
  return (
    <div className="food-card bg-white">
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
            ${food.price.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {food.description}
          </p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 border-brand text-brand hover:bg-brand hover:text-white"
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
