import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { RestaurantCard, RestaurantProps } from '@/components/restaurants/RestaurantCard';

// Mock food items for search functionality
const mockFoodItems = [
  { name: 'Butter Chicken', restaurant: '1' },
  { name: 'Paneer Tikka', restaurant: '2' },
  { name: 'Biryani', restaurant: '3' },
  { name: 'Masala Dosa', restaurant: '4' },
  { name: 'Tandoori Roti', restaurant: '1' },
  { name: 'Gulab Jamun', restaurant: '2' }
];

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
    priceRange: '₹₹'
  },
  {
    id: '2',
    name: 'South Spice',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070',
    cuisine: ['Indian', 'South Indian'],
    rating: 4.5,
    deliveryTime: '30-35 min',
    distance: '2.2 km',
    priceRange: '₹₹',
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
    priceRange: '₹'
  },
  {
    id: '4',
    name: 'Punjab Grill',
    image: 'https://images.unsplash.com/photo-1505253668822-42074d58a7c6?q=80&w=2074',
    cuisine: ['Indian', 'Punjabi'],
    rating: 4.8,
    deliveryTime: '35-45 min',
    distance: '3.1 km',
    priceRange: '₹₹₹'
  },
  {
    id: '5',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.2,
    deliveryTime: '30-35 min',
    distance: '2.5 km',
    priceRange: '₹₹'
  },
  {
    id: '6',
    name: 'Green Leaf Vegan',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070',
    cuisine: ['Vegan', 'Healthy'],
    rating: 4.8,
    deliveryTime: '20-30 min',
    distance: '0.8 km',
    priceRange: '₹₹₹',
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Enhanced search functionality for both restaurants and food items
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredRestaurants(mockRestaurants);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    
    // First, check if the query matches any food item names
    const matchingFoodItems = mockFoodItems.filter(item => 
      item.name.toLowerCase().includes(query)
    );
    
    if (matchingFoodItems.length > 0) {
      // If food items match, show restaurants that have these items
      const restaurantIdsWithMatchingFood = matchingFoodItems.map(item => item.restaurant);
      const restaurantsWithMatchingFood = mockRestaurants.filter(restaurant => 
        restaurantIdsWithMatchingFood.includes(restaurant.id)
      );
      
      setFilteredRestaurants(restaurantsWithMatchingFood);
      
      // Display toast notification
      if (restaurantsWithMatchingFood.length > 0) {
        console.log(`Found ${restaurantsWithMatchingFood.length} restaurants serving ${searchQuery}`);
      }
      return;
    }
    
    // If no food items match, fall back to restaurant search
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
    
    // Add mouse move event listener for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
      {/* Hero Section - Enhanced with 3D animation */}
      <section className={`py-24 relative overflow-hidden transition-all duration-700 ease-in-out ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-black/5 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000')] bg-fixed bg-cover bg-center opacity-5 z-0"></div>
        
        {/* 3D Floating Elements */}
        <div className="absolute top-20 right-[20%] w-32 h-32 bg-brand/30 shape-blob opacity-70 z-0 parallax-element"
          style={{
            transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0px)`
          }}
        ></div>
        <div className="absolute bottom-20 left-[15%] w-24 h-24 bg-black/10 shape-blob-2 opacity-60 z-0 parallax-element"
          style={{
            transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0px)`
          }}
        ></div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-xl">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
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
                className="pl-10 pr-4 h-12 rounded-full shadow-md relative z-10 bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Button 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 bg-black hover:bg-gray-800 text-white z-10"
                onClick={handleSearch}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* 3D Food Plate */}
          <div className="hidden lg:block absolute right-10 top-1/2 transform -translate-y-1/2 perspective">
            <div 
              className="w-64 h-64 rounded-full bg-white shadow-xl overflow-hidden parallax-element" 
              style={{
                transform: `rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg) translate3d(${mousePosition.x * -40}px, ${mousePosition.y * -40}px, 40px)`
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1488&auto=format&fit=crop" 
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-black/5 animate-pulse-slow"
              style={{
                transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0px)`
              }}
            ></div>
          </div>
        </div>
      </section>
      
      {/* Food Categories - Enhanced with 3D animation */}
      <section className="container px-4 py-16">
        <h2 className="section-title mb-6 relative inline-block">
          Popular Categories
          <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand"></div>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {foodCategories.map((category, index) => (
            <div key={category.id} className="perspective">
              <Card 
                className="overflow-hidden card-3d cursor-pointer bg-white"
                onClick={() => navigate(`/search?category=${category.id}`)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0 relative">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="h-48 w-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white font-medium text-lg w-full text-center">
                      {category.name}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
      
      {/* Restaurants Section - Enhanced with 3D cards */}
      <section className="container px-4 py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute -right-20 top-10 w-40 h-40 bg-brand/10 shape-blob opacity-70 z-0 parallax-element"
          style={{
            transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0px)`
          }}
        ></div>
        
        <div className="flex justify-between items-center mb-8 relative">
          <h2 className="section-title mb-0 relative inline-block">
            Restaurants Near You
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand"></div>
          </h2>
          <Button variant="link" className="text-brand" onClick={() => navigate('/restaurants')}>
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
                  className="animate-fade-in perspective" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-3d">
                    <RestaurantCard restaurant={restaurant} />
                  </div>
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
                    className="animate-fade-in perspective" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="card-3d">
                      <RestaurantCard restaurant={restaurant} />
                    </div>
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
                    className="animate-fade-in perspective" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="card-3d">
                      <RestaurantCard restaurant={restaurant} />
                    </div>
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
                    className="animate-fade-in perspective" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="card-3d">
                      <RestaurantCard restaurant={restaurant} />
                    </div>
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
                    className="animate-fade-in perspective" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="card-3d">
                      <RestaurantCard restaurant={restaurant} />
                    </div>
                  </div>
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* App Promo Section - Enhanced with 3D effect */}
      <section className="bg-gradient-to-r from-yellow-500/5 to-black/5 py-20 relative overflow-hidden">
        <div className="absolute -left-20 top-1/4 w-40 h-40 bg-black/5 shape-blob-2 opacity-50"></div>
        <div className="absolute -right-10 bottom-10 w-32 h-32 bg-brand/20 shape-blob opacity-70"></div>
        
        <div className="container px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">
                Get the FastEat App
              </h2>
              <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                Download our mobile app for a better experience. Track your orders in real-time, 
                get exclusive offers, and more.
              </p>
              <div className="flex gap-4">
                <Button className="bg-black hover:bg-gray-900 text-white animate-scale-in" style={{ animationDelay: '200ms' }}>
                  App Store
                </Button>
                <Button className="bg-black hover:bg-gray-900 text-white animate-scale-in" style={{ animationDelay: '300ms' }}>
                  Google Play
                </Button>
              </div>
            </div>
            
            <div className="w-full max-w-xs relative perspective animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-brand/30 rounded-full animate-pulse-slow"></div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-black/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1000ms' }}></div>
              
              {/* 3D Phone Mockup */}
              <div 
                className="relative preserve-3d"
                style={{
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 10}deg)`
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470" 
                  alt="Mobile App" 
                  className="w-full rounded-xl shadow-2xl relative z-20 backface-hidden" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/30 to-transparent rounded-xl shadow-lg transform translate-z-5 -translate-x-2 -translate-y-2 z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
