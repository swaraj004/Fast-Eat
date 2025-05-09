
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, Utensils, DollarSign, Clock, ArrowUpRight, CheckCheck, ChefHat } from 'lucide-react';

// Mock data for restaurant dashboard
const mockRestaurant = {
  name: 'Burger Palace',
  todayOrders: 24,
  totalRevenue: 528.75,
  pendingOrders: 3,
};

const mockOrders = [
  {
    id: 'ORD1001',
    customer: 'Michael Johnson',
    items: ['Classic Cheeseburger', 'Fries', 'Chocolate Shake'],
    total: 22.47,
    time: '10 mins ago',
    status: 'pending',
  },
  {
    id: 'ORD1002',
    customer: 'Sarah Williams',
    items: ['Double Bacon Burger', 'Onion Rings', 'Soda'],
    total: 25.99,
    time: '15 mins ago',
    status: 'preparing',
  },
  {
    id: 'ORD1003',
    customer: 'David Thompson',
    items: ['Veggie Burger', 'Sweet Potato Fries', 'Lemonade'],
    total: 19.50,
    time: '25 mins ago',
    status: 'ready',
  },
  {
    id: 'ORD1004',
    customer: 'Emma Davis',
    items: ['Classic Burger', 'Chicken Wings', 'Iced Tea'],
    total: 28.75,
    time: '40 mins ago',
    status: 'completed',
  },
  {
    id: 'ORD1005',
    customer: 'Robert Wilson',
    items: ['BBQ Burger', 'Cheese Fries', 'Milkshake'],
    total: 26.50,
    time: '1 hour ago',
    status: 'completed',
  },
];

const orderStatusMap = {
  pending: {
    label: 'New Order',
    color: 'bg-blue-100 text-blue-800',
    icon: Package,
  },
  preparing: {
    label: 'Preparing',
    color: 'bg-amber-100 text-amber-800',
    icon: ChefHat,
  },
  ready: {
    label: 'Ready for Delivery',
    color: 'bg-green-100 text-green-800',
    icon: CheckCheck,
  },
  completed: {
    label: 'Completed',
    color: 'bg-gray-100 text-gray-800',
    icon: CheckCheck,
  },
};

export default function SellerDashboard() {
  const [orders, setOrders] = useState(mockOrders);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Restaurant Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {mockRestaurant.name}
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
              <span className="text-2xl font-bold">{mockRestaurant.todayOrders}</span>
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
              <span className="text-2xl font-bold">${mockRestaurant.totalRevenue.toFixed(2)}</span>
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
              <span className="text-2xl font-bold">{mockRestaurant.pendingOrders}</span>
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
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">New Orders</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {orders.map((order) => {
                const statusConfig = orderStatusMap[order.status as keyof typeof orderStatusMap];
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div key={order.id} className="bg-white border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <h3 className="font-medium">{order.customer}</h3>
                            <Badge variant="outline" className="ml-2">
                              {order.id}
                            </Badge>
                          </div>
                          <Badge className={`${statusConfig.color}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-2">
                          {order.items.join(', ')}
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <div className="text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {order.time}
                          </div>
                          <div className="font-medium">
                            ${order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      {order.status !== 'completed' && (
                        <div className="flex flex-shrink-0 space-x-2">
                          {order.status === 'pending' && (
                            <Button 
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                            >
                              Accept & Prepare
                            </Button>
                          )}
                          {order.status === 'preparing' && (
                            <Button 
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                            >
                              Mark as Ready
                            </Button>
                          )}
                          {order.status === 'ready' && (
                            <Button 
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                            >
                              Complete Order
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {orders.filter(order => order.status === 'pending').map((order) => {
                const statusConfig = orderStatusMap[order.status as keyof typeof orderStatusMap];
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div key={order.id} className="bg-white border rounded-lg p-4">
                    {/* Order content (similar to above) */}
                  </div>
                );
              })}
            </TabsContent>
            
            {/* Similar TabsContent for other statuses */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
