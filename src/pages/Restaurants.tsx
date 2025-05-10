
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { RestaurantCard, RestaurantProps } from "@/components/restaurants/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Mock data for restaurants - Reusing the existing data from Index.tsx
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

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
  const [cuisineFilter, setCuisineFilter] = useState("all");

  // Handle search functionality
  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredRestaurants(mockRestaurants);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = mockRestaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.some((c) => c.toLowerCase().includes(query))
    );

    setFilteredRestaurants(results);
  };

  // Filter by cuisine type
  useEffect(() => {
    if (cuisineFilter === "all") {
      setFilteredRestaurants(mockRestaurants);
    } else if (cuisineFilter === "veg") {
      setFilteredRestaurants(mockRestaurants.filter((r) => r.isVeg));
    } else {
      setFilteredRestaurants(
        mockRestaurants.filter((r) =>
          r.cuisine.some((c) => c.toLowerCase().includes(cuisineFilter))
        )
      );
    }
  }, [cuisineFilter]);

  return (
    <div className="container px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Explore Restaurants</h1>

      {/* Search Section */}
      <div className="relative max-w-md mb-8">
        <Input
          placeholder="Search restaurants or cuisines..."
          className="pl-10 pr-4 h-12 rounded-full shadow-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Button
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 bg-brand hover:bg-brand-dark"
          onClick={handleSearch}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={cuisineFilter === "all" ? "default" : "outline"}
          onClick={() => setCuisineFilter("all")}
          className="rounded-full"
        >
          All
        </Button>
        <Button
          variant={cuisineFilter === "indian" ? "default" : "outline"}
          onClick={() => setCuisineFilter("indian")}
          className="rounded-full"
        >
          Indian
        </Button>
        <Button
          variant={cuisineFilter === "italian" ? "default" : "outline"}
          onClick={() => setCuisineFilter("italian")}
          className="rounded-full"
        >
          Italian
        </Button>
        <Button
          variant={cuisineFilter === "veg" ? "default" : "outline"}
          onClick={() => setCuisineFilter("veg")}
          className="rounded-full"
        >
          Pure Veg
        </Button>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-semibold">No restaurants found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
