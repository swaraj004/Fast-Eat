
-- This file is for reference only and shows the SQL needed to create the orders table in Supabase

-- Create orders table
CREATE TABLE public.orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id uuid REFERENCES auth.users(id) NOT NULL,
    restaurant_id VARCHAR NOT NULL,
    restaurant_name VARCHAR NOT NULL,
    items JSONB NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'placed',
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    estimated_delivery VARCHAR,
    delivery_address VARCHAR,
    delivery_person JSONB
);

-- Add RLS policies
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy for restaurant users (can see orders for their restaurant)
CREATE POLICY "Restaurant users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid() 
        AND profiles.user_type = 'seller'
        AND restaurant_id = restaurant_id
    )
);

-- Policy for customers (can see their own orders)
CREATE POLICY "Customers can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
    customer_id = auth.uid()
);

-- Restaurant users can insert orders (for testing)
CREATE POLICY "Restaurant users can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid() 
        AND profiles.user_type = 'seller'
    )
);

-- Customers can insert orders
CREATE POLICY "Customers can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
    customer_id = auth.uid()
);

-- Restaurant users can update orders
CREATE POLICY "Restaurant users can update orders" 
ON public.orders 
FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid() 
        AND profiles.user_type = 'seller'
        AND restaurant_id = restaurant_id
    )
);

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
