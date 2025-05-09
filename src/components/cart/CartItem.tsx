
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isVeg: boolean;
}

export function CartItem({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: CartItemProps;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpdateQuantity(item.id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const handleRemove = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      onRemove(item.id);
      setIsUpdating(false);
    }, 300);
  };
  
  return (
    <div className="flex py-4 border-b last:border-0">
      <div className="w-16 h-16">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-1 ml-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              ${item.price.toFixed(2)}
            </p>
          </div>
          <div className="text-brand font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7"
              disabled={isUpdating || item.quantity <= 1}
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7"
              disabled={isUpdating}
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
            disabled={isUpdating}
            onClick={handleRemove}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
