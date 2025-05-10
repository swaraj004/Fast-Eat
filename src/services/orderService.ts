
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'outForDelivery' | 'delivered';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_id: string;
  restaurant_id: string;
  restaurant_name: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  created_at: string;
  estimated_delivery: string;
  delivery_address: string;
  delivery_person?: {
    name: string;
    phone: string;
    image: string;
  };
}

// Create a new order
export const createOrder = async (orderData: Omit<Order, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_id: orderData.customer_id,
          restaurant_id: orderData.restaurant_id,
          restaurant_name: orderData.restaurant_name,
          items: orderData.items,
          status: 'placed',
          total: orderData.total,
          estimated_delivery: orderData.estimated_delivery,
          delivery_address: orderData.delivery_address
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating order:', error);
    return { data: null, error };
  }
};

// Get order by ID
export const getOrderById = async (orderId: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { data: null, error };
  }
};

// Get orders for a customer
export const getCustomerOrders = async (customerId: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    return { data: null, error };
  }
};

// Get orders for a restaurant
export const getRestaurantOrders = async (restaurantId: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching restaurant orders:', error);
    return { data: null, error };
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { data: null, error };
  }
};

// Subscribe to order status changes
export const subscribeToOrderUpdates = (orderId: string, callback: (payload: any) => void) => {
  const subscription = supabase
    .channel(`order:${orderId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return subscription;
};
