
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FoodItemCard, FoodItemProps } from '@/components/food/FoodItemCard';
import { Star, Clock, MapPin, Info } from 'lucide-react';

// Mock restaurant data
const mockRestaurant = {
  id: '1',
  name: 'Spice Garden',
  description: 'Authentic Indian cuisine with flavors that will transport you to the streets of Delhi.',
  coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070',
  logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200',
  cuisine: ['Indian', 'North Indian', 'South Indian'],
  rating: 4.7,
  reviewCount: 487,
  deliveryTime: '25-30 min',
  distance: '1.8 km',
  priceRange: '$$',
  address: '42 Gandhi Road, New Delhi',
  openingHours: '11:00 AM - 11:00 PM',
  isOpen: true,
};

// Mock food items - Indian cuisine
const mockFoodItems: FoodItemProps[] = [
  {
    id: '101',
    name: 'Butter Chicken',
    description: 'Tender chicken pieces in a rich, creamy tomato sauce with butter and spices',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1770',
    isVeg: false,
    category: 'mains'
  },
  {
    id: '102',
    name: 'Paneer Tikka Masala',
    description: 'Cottage cheese cubes marinated in yogurt and spices, grilled and served in a creamy tomato sauce',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1674',
    isVeg: true,
    category: 'mains'
  },
  {
    id: '103',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with tender chicken pieces, saffron, and aromatic spices',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974',
    isVeg: false,
    isSpicy: true,
    category: 'rice'
  },
  {
    id: '104',
    name: 'Masala Dosa',
    description: 'Crispy rice pancake filled with spiced potatoes, served with sambar and chutney',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1630383249896-451678a8f433?q=80&w=1974',
    isVeg: true,
    category: 'breakfast'
  },
  {
    id: '105',
    name: 'Tandoori Roti',
    description: 'Whole wheat flatbread baked in a clay oven',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?q=80&w=1780',
    isVeg: true,
    category: 'breads'
  },
  {
    id: '106',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids soaked in rose-scented sugar syrup',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1615832494873-b0c52d519696?q=80&w=1974',
    isVeg: true,
    category: 'desserts'
  }
];

// Categories
const foodCategories = [
  { id: 'all', label: 'All' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'rice', label: 'Rice & Biryani' },
  { id: 'breads', label: 'Breads' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'desserts', label: 'Desserts' },
];

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? mockFoodItems 
    : mockFoodItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Restaurant Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 w-full">
        <img 
          src={mockRestaurant.coverImage} 
          alt={mockRestaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"></div>
      </div>
      
      {/* Restaurant Info */}
      <div className="container px-4">
        <div className={`bg-white rounded-lg shadow-lg p-6 -mt-16 relative z-10 transition-all duration-300 ${isScrolled ? 'animate-scale-in' : ''}`}>
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
          <TabsList className="mb-6 overflow-x-auto flex-nowrap">
            {foodCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="animate-fade-in">
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
