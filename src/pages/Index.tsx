
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { RestaurantCard, RestaurantProps } from '@/components/restaurants/RestaurantCard';

// Mock data for restaurants - Adding Indian restaurants
const mockRestaurants: RestaurantProps[] = [
  {
    id: '1',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070',
    cuisine: ['Indian', 'North Indian'],
    rating: 4.7,
    deliveryTime: '25-30 min',
    distance: '1.8 km',
    priceRange: '$$'
  },
  {
    id: '2',
    name: 'South Spice',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070',
    cuisine: ['Indian', 'South Indian'],
    rating: 4.5,
    deliveryTime: '30-35 min',
    distance: '2.2 km',
    priceRange: '$$',
    isVeg: true
  },
  {
    id: '3',
    name: 'Delhi Delights',
    image: 'https://images.unsplash.com/photo-1514412076816-d228b5c0973c?q=80&w=2070',
    cuisine: ['Indian', 'Street Food'],
    rating: 4.3,
    deliveryTime: '20-30 min',
    distance: '1.5 km',
    priceRange: '$'
  },
  {
    id: '4',
    name: 'Punjab Grill',
    image: 'https://images.unsplash.com/photo-1505253668822-42074d58a7c6?q=80&w=2074',
    cuisine: ['Indian', 'Punjabi'],
    rating: 4.8,
    deliveryTime: '35-45 min',
    distance: '3.1 km',
    priceRange: '$$$'
  },
  {
    id: '5',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.2,
    deliveryTime: '30-35 min',
    distance: '2.5 km',
    priceRange: '$$'
  },
  {
    id: '6',
    name: 'Green Leaf Vegan',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070',
    cuisine: ['Vegan', 'Healthy'],
    rating: 4.8,
    deliveryTime: '20-30 min',
    distance: '0.8 km',
    priceRange: '$$$',
    isVeg: true
  },
];

// Mock data for food categories with updated categories
const foodCategories = [
  { id: 'biryani', name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974' },
  { id: 'curry', name: 'Curry', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1674' },
  { id: 'thali', name: 'Thali', image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=1964' },
  { id: 'dessert', name: 'Desserts', image: 'https://images.unsplash.com/photo-1615832494873-b0c52d519696?q=80&w=1974' },
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
  const [heroLoaded, setHeroLoaded] = useState(false);
  
  // Handle search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredRestaurants(mockRestaurants);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = mockRestaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query) || 
      restaurant.cuisine.some(c => c.toLowerCase().includes(query))
    );
    
    setFilteredRestaurants(results);
  };
  
  useEffect(() => {
    // Simulate loading animation
    const timer = setTimeout(() => {
      setHeroLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter by cuisine type
  const filterByCuisine = (cuisineType: string) => {
    if (cuisineType === 'all') {
      setFilteredRestaurants(mockRestaurants);
    } else if (cuisineType === 'veg') {
      setFilteredRestaurants(mockRestaurants.filter(r => r.isVeg));
    } else {
      setFilteredRestaurants(
        mockRestaurants.filter(r => r.cuisine.some(c => c.toLowerCase().includes(cuisineType)))
      );
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced with animation */}
      <section className={`py-20 relative overflow-hidden transition-all duration-700 ease-in-out ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/10 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000')] bg-fixed bg-cover bg-center opacity-10 z-0"></div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-xl">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Taste the Authentic <br />
                <span className="text-brand">Indian Flavors</span>
              </h1>
              <p className="text-lg mb-8 text-muted-foreground">
                Order your favorite dishes from the best Indian restaurants and experience the rich flavors of India.
              </p>
            </div>
            
            <div className="relative max-w-md animate-scale-in">
              <Input
                placeholder="Search for dishes or restaurants..."
                className="pl-10 pr-4 h-12 rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Button 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 bg-brand hover:bg-brand-dark"
                onClick={handleSearch}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Food Categories - Enhanced with animation */}
      <section className="container px-4 py-12">
        <h2 className="section-title mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {foodCategories.map((category, index) => (
            <Card 
              key={category.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer"
              onClick={() => navigate(`/search?category=${category.id}`)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0 relative">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-40 w-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white font-medium text-lg w-full text-center">
                    {category.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Restaurants Section - Enhanced with better tabs and filtering */}
      <section className="container px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title mb-0">Restaurants Near You</h2>
          <Button variant="link" className="text-brand">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="animate-fade-in">
          <TabsList className="mb-6 bg-gray-100 p-1 rounded-full">
            <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
            <TabsTrigger value="indian" className="rounded-full">Indian</TabsTrigger>
            <TabsTrigger value="veg" className="rounded-full">Pure Veg</TabsTrigger>
            <TabsTrigger value="fastest" className="rounded-full">Fastest Delivery</TabsTrigger>
            <TabsTrigger value="top" className="rounded-full">Top Rated</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant, index) => (
                <div 
                  key={restaurant.id} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="indian" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredRestaurants
                .filter(r => r.cuisine.some(c => c.toLowerCase().includes('indian')))
                .map((restaurant, index) => (
                  <div 
                    key={restaurant.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="fastest" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {[...filteredRestaurants]
                .sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime))
                .map((restaurant, index) => (
                  <div 
                    key={restaurant.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="top" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {[...filteredRestaurants]
                .sort((a, b) => b.rating - a.rating)
                .map((restaurant, index) => (
                  <div 
                    key={restaurant.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="veg" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredRestaurants
                .filter((r) => r.isVeg)
                .map((restaurant, index) => (
                  <div 
                    key={restaurant.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* App Promo Section */}
      <section className="bg-gradient-to-r from-orange-500/10 to-red-500/10 py-16">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">
                Get the TastyBite App
              </h2>
              <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                Download our mobile app for a better experience. Track your orders in real-time, 
                get exclusive offers, and more.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gray-800 hover:bg-gray-900 text-white animate-scale-in" style={{ animationDelay: '200ms' }}>
                  App Store
                </Button>
                <Button className="bg-gray-800 hover:bg-gray-900 text-white animate-scale-in" style={{ animationDelay: '300ms' }}>
                  Google Play
                </Button>
              </div>
            </div>
            
            <div className="w-full max-w-xs relative animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-brand/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-brand/20 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470" 
                alt="Mobile App" 
                className="w-full rounded-xl shadow-2xl relative z-10 hover-scale" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
