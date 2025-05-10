
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { OrderTracker, OrderStatus } from '@/components/tracking/OrderTracker';
import { MapPin, Package, Phone, User } from 'lucide-react';
import { getOrderById, subscribeToOrderUpdates } from '@/services/orderService';
import { toast } from 'sonner';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export default function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('placed');
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      setIsLoading(true);
      try {
        const { data, error } = await getOrderById(orderId);
        if (error) throw error;
        
        if (data) {
          setOrder(data);
          setCurrentStatus(data.status as OrderStatus);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Could not load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Subscribe to order updates
  useEffect(() => {
    if (!orderId) return;

    const subscription = subscribeToOrderUpdates(
      orderId,
      (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
        if (payload.new && payload.new.status) {
          const newStatus = payload.new.status as OrderStatus;
          setCurrentStatus(newStatus);
          setOrder(prev => ({ ...prev, ...payload.new }));
          
          // Notify user about status change
          toast.info(`Order status updated to: ${newStatus}`);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="container px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p>We couldn't find the order you're looking for.</p>
          <Button onClick={() => window.history.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Calculate order totals
  const subtotal = order.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 49.99;
  const serviceFee = 29.50;
  const total = order.total || subtotal + deliveryFee + serviceFee;

  return (
    <div className="container px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Order Tracking</h1>
          <Badge variant="outline" className="text-brand border-brand">
            Order #{order.id}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Tracker */}
          <div className="md:col-span-2">
            <OrderTracker 
              currentStatus={currentStatus} 
              estimatedDelivery={order.estimated_delivery} 
            />
            
            {/* Delivery Person Info (only show when out for delivery) */}
            {(currentStatus === 'outForDelivery' || currentStatus === 'delivered') && (
              <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <h2 className="font-semibold text-lg mb-4">Delivery Person</h2>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480" 
                      alt="Delivery Person"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Raj Kumar</h3>
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
                    {order.delivery_address}
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
                    src="https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=1470" 
                    alt={order.restaurant_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{order.restaurant_name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Order placed at {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3 mb-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 text-sm">
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
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
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
