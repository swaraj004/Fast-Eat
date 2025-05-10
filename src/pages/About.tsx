
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  
  return (
    <div className="container px-4 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About FastEat</h1>
        
        <div className="relative mb-12 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070" 
            alt="About FastEat" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h2 className="text-2xl font-semibold mb-2">Connecting Food Lovers with Great Restaurants</h2>
              <p className="text-white/90">Established in 2024</p>
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            FastEat is a premier food delivery platform that connects food lovers with the best 
            restaurants in your city. Our mission is to make quality food accessible to everyone, 
            anytime, anywhere.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Our Story</h2>
          <p className="mb-6">
            Founded in 2024, FastEat began with a simple idea: make it easier for people to enjoy 
            their favorite foods without leaving the comfort of their homes or offices. What started as 
            a small operation has grown into a platform that partners with hundreds of restaurants, 
            delivering thousands of meals daily.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="bg-muted p-6 rounded-lg text-center animate-fade-in">
              <div className="text-4xl font-bold text-brand mb-2">500+</div>
              <p className="text-muted-foreground">Restaurant Partners</p>
            </div>
            <div className="bg-muted p-6 rounded-lg text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="text-4xl font-bold text-brand mb-2">50,000+</div>
              <p className="text-muted-foreground">Orders Delivered</p>
            </div>
            <div className="bg-muted p-6 rounded-lg text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl font-bold text-brand mb-2">15+</div>
              <p className="text-muted-foreground">Cities Covered</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="bg-brand text-white p-1 rounded-full mr-3 mt-1">✓</span>
              <div>
                <strong>Quality First:</strong> We partner only with restaurants that meet our high standards for food quality and preparation.
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-brand text-white p-1 rounded-full mr-3 mt-1">✓</span>
              <div>
                <strong>Reliable Service:</strong> We strive for on-time delivery and accurate orders, every time.
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-brand text-white p-1 rounded-full mr-3 mt-1">✓</span>
              <div>
                <strong>Customer Satisfaction:</strong> Your happiness is our success. We're committed to resolving any issues promptly.
              </div>
            </li>
          </ul>
          
          <div className="bg-muted p-8 rounded-lg my-10">
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p className="mb-6">
              Whether you're a food lover looking for your next great meal or a restaurant 
              owner wanting to expand your reach, FastEat is here for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/restaurants')}
                className="bg-brand hover:bg-brand-dark"
              >
                Explore Restaurants
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = 'mailto:partners@fasteat.com'}
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
