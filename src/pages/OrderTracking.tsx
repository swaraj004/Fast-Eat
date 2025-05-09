
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { OrderTracker, OrderStatus } from '@/components/tracking/OrderTracker';
import { MapPin, Package, Phone, User } from 'lucide-react';

// Mock order data
const mockOrder = {
  id: 'ORD123456',
  restaurant: {
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=1470',
  },
  items: [
    {
      id: '101',
      name: 'Classic Cheeseburger',
      price: 9.99,
      quantity: 1,
    },
    {
      id: '202',
      name: 'Cheesy Bacon Fries',
      price: 5.99,
      quantity: 1,
    },
    {
      id: '301',
      name: 'Chocolate Milkshake',
      price: 4.99,
      quantity: 1,
    }
  ],
  subtotal: 20.97,
  deliveryFee: 2.99,
  serviceFee: 1.50,
  total: 25.46,
  orderDate: '2023-05-09T14:30:00',
  estimatedDelivery: '2:55 PM',
  deliveryAddress: '123 Main Street, Apt 4B, Cityville',
  deliveryPerson: {
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480',
  }
};

export default function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('placed');
  const [processingSteps, setProcessingSteps] = useState({
    placed: true,
    confirmed: false,
    preparing: false,
    outForDelivery: false,
    delivered: false,
  });

  // Simulate order status progression
  useEffect(() => {
    const statusProgression: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'outForDelivery', 'delivered'];
    
    // Set initial status as 'placed'
    setCurrentStatus('placed');
    
    // Update status every few seconds to simulate progress
    const intervals = [3000, 4000, 6000, 8000];
    
    let timeouts: NodeJS.Timeout[] = [];
    
    for (let i = 1; i < statusProgression.length; i++) {
      const delay = intervals.slice(0, i).reduce((sum, val) => sum + val, 0);
      
      const timeout = setTimeout(() => {
        const newStatus = statusProgression[i];
        setCurrentStatus(newStatus);
        setProcessingSteps(prev => ({
          ...prev,
          [newStatus]: true,
        }));
      }, delay);
      
      timeouts.push(timeout);
    }
    
    // Clean up timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="container px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Order Tracking</h1>
          <Badge variant="outline" className="text-brand border-brand">
            Order #{mockOrder.id}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Tracker */}
          <div className="md:col-span-2">
            <OrderTracker 
              currentStatus={currentStatus} 
              estimatedDelivery={mockOrder.estimatedDelivery} 
            />
            
            {/* Delivery Person Info (only show when out for delivery) */}
            {(currentStatus === 'outForDelivery' || currentStatus === 'delivered') && (
              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="font-semibold text-lg mb-4">Delivery Person</h2>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                    <img 
                      src={mockOrder.deliveryPerson.image} 
                      alt={mockOrder.deliveryPerson.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{mockOrder.deliveryPerson.name}</h3>
                      <Button size="sm" variant="outline" className="flex items-center text-brand border-brand">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Order will be left at your door. We'll send you a notification when it arrives.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Delivery Address */}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Delivery Address</h3>
                  <p className="text-muted-foreground">
                    {mockOrder.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded overflow-hidden mr-4">
                  <img 
                    src={mockOrder.restaurant.image} 
                    alt={mockOrder.restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{mockOrder.restaurant.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Order placed at {new Date(mockOrder.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3 mb-4">
                {mockOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${mockOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${mockOrder.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>${mockOrder.serviceFee.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${mockOrder.total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full mt-4" variant="outline">
              Need Help?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
