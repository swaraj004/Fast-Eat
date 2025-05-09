
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { RestaurantCard, RestaurantProps } from '@/components/restaurants/RestaurantCard';

// Mock data for restaurants
const mockRestaurants: RestaurantProps[] = [
  {
    id: '1',
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072',
    cuisine: ['American', 'Fast Food'],
    rating: 4.5,
    deliveryTime: '25-30 min',
    distance: '1.2 km',
    priceRange: '$$'
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.2,
    deliveryTime: '30-35 min',
    distance: '2.5 km',
    priceRange: '$$'
  },
  {
    id: '3',
    name: 'Green Leaf Vegan',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070',
    cuisine: ['Vegan', 'Healthy'],
    rating: 4.8,
    deliveryTime: '20-30 min',
    distance: '0.8 km',
    priceRange: '$$$',
    isVeg: true
  },
  {
    id: '4',
    name: 'Sushi Express',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.7,
    deliveryTime: '35-45 min',
    distance: '3.1 km',
    priceRange: '$$$'
  },
];

// Mock data for food categories
const foodCategories = [
  { id: 'pizza', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400' },
  { id: 'burger', name: 'Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400' },
  { id: 'sushi', name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400' },
  { id: 'dessert', name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400' },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="container px-4">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Delicious Food, <br />
              <span className="text-brand">Delivered Fast</span>
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Order from your favorite restaurants and track your delivery in real-time.
            </p>
            
            <div className="relative max-w-md">
              <Input
                placeholder="Search for food or restaurants..."
                className="pl-10 pr-4 h-12 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Button 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 bg-brand hover:bg-brand-dark"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Food Categories */}
      <section className="container px-4 py-12">
        <h2 className="section-title">Food Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {foodCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-32 w-full object-cover" 
                />
                <div className="p-3 text-center font-medium">
                  {category.name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Restaurants Section */}
      <section className="container px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title mb-0">Restaurants Near You</h2>
          <Button variant="link" className="text-brand">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fastest">Fastest Delivery</TabsTrigger>
            <TabsTrigger value="top">Top Rated</TabsTrigger>
            <TabsTrigger value="veg">Pure Veg</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="fastest" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockRestaurants
                .sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime))
                .map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="top" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockRestaurants
                .sort((a, b) => b.rating - a.rating)
                .map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="veg" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockRestaurants
                .filter((r) => r.isVeg)
                .map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* App Promo Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">
                Get the TastyBite App
              </h2>
              <p className="text-muted-foreground mb-6">
                Download our mobile app for a better experience. Track your orders in real-time, 
                get exclusive offers, and more.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                  App Store
                </Button>
                <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                  Google Play
                </Button>
              </div>
            </div>
            
            <div className="w-full max-w-xs">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470" 
                alt="Mobile App" 
                className="w-full rounded-xl shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
