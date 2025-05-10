
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function About() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="container px-4 py-16 animate-fade-in relative">
      {/* Background decorative elements */}
      <div className="absolute -right-10 top-20 w-40 h-40 bg-brand/10 shape-blob opacity-60 z-0 parallax-element"
        style={{
          transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0px)`
        }}
      ></div>
      <div className="absolute -left-10 bottom-40 w-32 h-32 bg-black/5 shape-blob-2 opacity-50 z-0 parallax-element"
        style={{
          transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0px)`
        }}
      ></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl font-bold mb-8 relative inline-block">
          About FastEat
          <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand"></div>
        </h1>
        
        <div className="relative mb-16 rounded-xl overflow-hidden perspective">
          <div 
            className="preserve-3d"
            style={{
              transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070" 
              alt="About FastEat" 
              className="w-full h-96 object-cover shadow-2xl rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-2xl font-semibold mb-2">Connecting Food Lovers with Great Restaurants</h2>
                <p className="text-white/90">Established in 2024</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-8">
            FastEat is a premier food delivery platform that connects food lovers with the best 
            restaurants in your city. Our mission is to make quality food accessible to everyone, 
            anytime, anywhere.
          </p>
          
          <h2 className="text-3xl font-semibold mb-6 mt-12 relative inline-block">
            Our Story
            <div className="absolute -bottom-2 left-0 w-1/4 h-1 bg-brand"></div>
          </h2>
          <p className="mb-8">
            Founded in 2024, FastEat began with a simple idea: make it easier for people to enjoy 
            their favorite foods without leaving the comfort of their homes or offices. What started as 
            a small operation has grown into a platform that partners with hundreds of restaurants, 
            delivering thousands of meals daily.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
            <div className="card-3d bg-white p-8 rounded-xl text-center border border-gray-100 shadow-lg">
              <div className="text-5xl font-bold text-brand mb-4">500+</div>
              <p className="text-muted-foreground">Restaurant Partners</p>
            </div>
            <div className="card-3d bg-white p-8 rounded-xl text-center border border-gray-100 shadow-lg" style={{ animationDelay: '100ms' }}>
              <div className="text-5xl font-bold text-brand mb-4">50,000+</div>
              <p className="text-muted-foreground">Orders Delivered</p>
            </div>
            <div className="card-3d bg-white p-8 rounded-xl text-center border border-gray-100 shadow-lg" style={{ animationDelay: '200ms' }}>
              <div className="text-5xl font-bold text-brand mb-4">15+</div>
              <p className="text-muted-foreground">Cities Covered</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-semibold mb-6 relative inline-block">
            Our Values
            <div className="absolute -bottom-2 left-0 w-1/4 h-1 bg-brand"></div>
          </h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start bg-white p-6 rounded-xl shadow-sm card-3d">
              <span className="bg-black text-white p-3 rounded-full mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-5"><path d="m5 12 5 5L20 7"/></svg>
              </span>
              <div>
                <strong className="text-xl block mb-1">Quality First:</strong>
                <p className="text-muted-foreground">We partner only with restaurants that meet our high standards for food quality and preparation.</p>
              </div>
            </li>
            <li className="flex items-start bg-white p-6 rounded-xl shadow-sm card-3d">
              <span className="bg-black text-white p-3 rounded-full mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-5"><path d="m5 12 5 5L20 7"/></svg>
              </span>
              <div>
                <strong className="text-xl block mb-1">Reliable Service:</strong>
                <p className="text-muted-foreground">We strive for on-time delivery and accurate orders, every time.</p>
              </div>
            </li>
            <li className="flex items-start bg-white p-6 rounded-xl shadow-sm card-3d">
              <span className="bg-black text-white p-3 rounded-full mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-5"><path d="m5 12 5 5L20 7"/></svg>
              </span>
              <div>
                <strong className="text-xl block mb-1">Customer Satisfaction:</strong>
                <p className="text-muted-foreground">Your happiness is our success. We're committed to resolving any issues promptly.</p>
              </div>
            </li>
          </ul>
          
          <div className="bg-gradient-to-r from-yellow-50 to-white p-12 rounded-2xl shadow-lg my-16 perspective">
            <div 
              className="preserve-3d"
              style={{
                transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
              }}
            >
              <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
              <p className="mb-8 text-lg">
                Whether you're a food lover looking for your next great meal or a restaurant 
                owner wanting to expand your reach, FastEat is here for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/restaurants')}
                  className="bg-brand hover:bg-brand-dark text-black"
                >
                  Explore Restaurants
                </Button>
                <Button 
                  variant="outline"
                  className="border-brand text-black hover:bg-brand/10"
                  onClick={() => window.location.href = 'mailto:partners@fasteat.com'}
                >
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
