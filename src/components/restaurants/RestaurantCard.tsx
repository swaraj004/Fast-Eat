
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface RestaurantProps {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  distance: string;
  priceRange: string;
  isVeg?: boolean;
}

export function RestaurantCard({ restaurant }: { restaurant: RestaurantProps }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block group">
      <div className="food-card bg-white">
        <div className="relative">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {restaurant.isVeg && (
              <Badge className="bg-food-vegetarian">Pure Veg</Badge>
            )}
            <Badge className="bg-white text-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg group-hover:text-brand truncate">
            {restaurant.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            {restaurant.cuisine.join(', ')}
          </p>
          <div className="flex items-center justify-between mt-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{restaurant.distance}</span>
            </div>
            <div className="text-muted-foreground">
              {restaurant.priceRange}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
