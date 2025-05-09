
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FoodItemCard, FoodItemProps } from '@/components/food/FoodItemCard';
import { Star, Clock, MapPin, Info } from 'lucide-react';

// Mock restaurant data
const mockRestaurant = {
  id: '1',
  name: 'Burger Palace',
  description: 'Home of the juiciest burgers in town. We use 100% premium beef and fresh ingredients.',
  coverImage: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?q=80&w=2070',
  logo: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=1470',
  cuisine: ['American', 'Fast Food', 'Burgers'],
  rating: 4.5,
  reviewCount: 324,
  deliveryTime: '25-30 min',
  distance: '1.2 km',
  priceRange: '$$',
  address: '123 Burger Street, Foodville',
  openingHours: '10:00 AM - 10:00 PM',
  isOpen: true,
};

// Mock food items
const mockFoodItems: FoodItemProps[] = [
  {
    id: '101',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899',
    isVeg: false,
    category: 'burgers'
  },
  {
    id: '102',
    name: 'Double Bacon Burger',
    description: 'Two beef patties with bacon strips, cheese, pickles, and smoky BBQ sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1776',
    isVeg: false,
    isSpicy: true,
    category: 'burgers'
  },
  {
    id: '103',
    name: 'Veggie Supreme Burger',
    description: 'Plant-based patty with fresh avocado, crisp lettuce, tomato, and vegan mayo',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=1854',
    isVeg: true,
    category: 'burgers'
  },
  {
    id: '201',
    name: 'Crispy Fries',
    description: 'Golden crispy fries seasoned with our special herb blend',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1576777645402-fbc0010c1254?q=80&w=1770',
    isVeg: true,
    category: 'sides'
  },
  {
    id: '202',
    name: 'Cheesy Bacon Fries',
    description: 'Crispy fries topped with melted cheese and bacon bits',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=1770',
    isVeg: false,
    category: 'sides'
  },
  {
    id: '301',
    name: 'Chocolate Milkshake',
    description: 'Creamy milkshake made with premium chocolate ice cream',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1578313611104-fa4d12dfc9fb?q=80&w=1770',
    isVeg: true,
    category: 'beverages'
  }
];

// Categories
const foodCategories = [
  { id: 'all', label: 'All' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'sides', label: 'Sides' },
  { id: 'beverages', label: 'Beverages' },
];

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? mockFoodItems 
    : mockFoodItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col">
      {/* Restaurant Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 w-full">
        <img 
          src={mockRestaurant.coverImage} 
          alt={mockRestaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Restaurant Info */}
      <div className="container px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-6">
              <img 
                src={mockRestaurant.logo} 
                alt={mockRestaurant.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{mockRestaurant.name}</h1>
                  <p className="text-muted-foreground mt-1">{mockRestaurant.cuisine.join(' • ')}</p>
                  <p className="text-sm text-muted-foreground">{mockRestaurant.address}</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Badge className="bg-brand mb-2">
                    <Star className="h-3 w-3 fill-white mr-1" />
                    <span>{mockRestaurant.rating}</span>
                    <span className="ml-1 text-xs">({mockRestaurant.reviewCount} reviews)</span>
                  </Badge>
                  
                  <div className="flex text-sm text-muted-foreground mt-1 space-x-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{mockRestaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{mockRestaurant.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-4 pt-4 border-t">
            <div className="flex items-center text-sm">
              <Badge variant="outline" className={`${mockRestaurant.isOpen ? 'text-green-600' : 'text-red-500'}`}>
                {mockRestaurant.isOpen ? 'Open Now' : 'Closed'}
              </Badge>
              <span className="ml-2 text-muted-foreground">{mockRestaurant.openingHours}</span>
            </div>
            
            <Button variant="outline" size="sm" className="ml-auto flex items-center">
              <Info className="h-4 w-4 mr-1" />
              More Info
            </Button>
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <div className="container px-4 py-8">
        <h2 className="section-title">Menu</h2>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-6">
            {foodCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="space-y-4">
            {filteredItems.map((item) => (
              <FoodItemCard key={item.id} food={item} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
