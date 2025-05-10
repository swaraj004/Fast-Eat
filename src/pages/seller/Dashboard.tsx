
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, DollarSign, Clock, ChefHat, CheckCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getRestaurantOrders, updateOrderStatus, OrderStatus } from '@/services/orderService';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Order status configurations
const orderStatusMap = {
  placed: {
    label: 'New Order',
    color: 'bg-blue-100 text-blue-800',
    icon: Package,
  },
  confirmed: {
    label: 'Confirmed',
    color: 'bg-blue-100 text-blue-800',
    icon: Package,
  },
  preparing: {
    label: 'Preparing',
    color: 'bg-amber-100 text-amber-800',
    icon: ChefHat,
  },
  outForDelivery: {
    label: 'Out for Delivery',
    color: 'bg-green-100 text-green-800',
    icon: CheckCheck,
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-gray-100 text-gray-800',
    icon: CheckCheck,
  },
};

export default function SellerDashboard() {
  const { user, userType } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  // Restaurant stats
  const todayOrders = orders.filter(order => {
    const orderDate = new Date(order.created_at);
    const today = new Date();
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }).length;
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => 
    order.status === 'placed' || order.status === 'confirmed' || order.status === 'preparing'
  ).length;

  // Fetch orders for the restaurant
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would get the restaurant ID from the user profile
        // For now, we'll use a mock restaurant ID
        const restaurantId = "1";
        
        const { data, error } = await getRestaurantOrders(restaurantId);
        if (error) throw error;
        
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Could not load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Subscribe to order updates
  useEffect(() => {
    if (!user) return;

    // In a real app, we would get the restaurant ID from the user profile
    const restaurantId = "1";
    
    const subscription = supabase
      .channel('order_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `restaurant_id=eq.${restaurantId}`
        },
        (payload) => {
          // Update orders based on the change type
          if (payload.eventType === 'INSERT') {
            setOrders(prev => [payload.new as any, ...prev]);
            toast.info("New order received!");
          } else if (payload.eventType === 'UPDATE') {
            setOrders(prev => 
              prev.map(order => 
                order.id === payload.new.id ? { ...order, ...payload.new } : order
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setOrders(prev => prev.filter(order => order.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { data, error } = await updateOrderStatus(orderId, newStatus);
      
      if (error) throw error;
      
      // Order will be updated via subscription
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  // Filter orders based on active tab
  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">FastEat Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Restaurant Partner
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button variant="outline">View Menu</Button>
          <Button className="bg-brand hover:bg-brand-dark">Add New Item</Button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Package className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{todayOrders}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{pendingOrders}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Orders Management */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Management</CardTitle>
          <CardDescription>
            View and manage your incoming orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="placed">New Orders</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="outForDelivery">Out for Delivery</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">Loading orders...</div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-8">No orders found</div>
              ) : (
                filteredOrders.map((order) => {
                  const statusConfig = orderStatusMap[order.status as keyof typeof orderStatusMap] || orderStatusMap.placed;
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div key={order.id} className="bg-white border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <h3 className="font-medium">Customer #{order.customer_id.substring(0, 8)}</h3>
                              <Badge variant="outline" className="ml-2">
                                #{order.id.substring(0, 8)}
                              </Badge>
                            </div>
                            <Badge className={`${statusConfig.color}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusConfig.label}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-2">
                            {order.items.map((item: any) => `${item.quantity}x ${item.name}`).join(', ')}
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <div className="text-muted-foreground">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="font-medium">
                              ₹{order.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        
                        {order.status !== 'delivered' && (
                          <div className="flex flex-shrink-0 space-x-2">
                            {order.status === 'placed' && (
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                              >
                                Confirm Order
                              </Button>
                            )}
                            {order.status === 'confirmed' && (
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, 'preparing')}
                              >
                                Start Preparing
                              </Button>
                            )}
                            {order.status === 'preparing' && (
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, 'outForDelivery')}
                              >
                                Send for Delivery
                              </Button>
                            )}
                            {order.status === 'outForDelivery' && (
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateStatus(order.id, 'delivered')}
                              >
                                Mark as Delivered
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
