
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, ShoppingCart, User, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'seller' | null>(null);

  // Mock login - in a real app, this would be authenticated
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Handle profile click based on user type
  const handleProfileClick = () => {
    if (userType === 'customer') {
      navigate('/customer/profile');
    } else if (userType === 'seller') {
      navigate('/seller/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand">
              Tasty<span className="text-foreground">Bite</span>
            </span>
          </Link>

          {!isMobile && (
            <nav className="ml-10 hidden space-x-4 lg:flex">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-brand">
                Home
              </Link>
              <Link to="/restaurants" className="text-sm font-medium transition-colors hover:text-brand">
                Restaurants
              </Link>
              <Link to="/about" className="text-sm font-medium transition-colors hover:text-brand">
                About
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/cart')}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-white">
              0
            </span>
          </Button>

          {!isLoggedIn ? (
            <Button variant="default" onClick={handleLoginClick} className="bg-brand hover:bg-brand-dark">
              Login
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={handleProfileClick}>
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          )}

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium transition-colors hover:text-brand">
                    Home
                  </Link>
                  <Link to="/restaurants" className="text-lg font-medium transition-colors hover:text-brand">
                    Restaurants
                  </Link>
                  <Link to="/about" className="text-lg font-medium transition-colors hover:text-brand">
                    About
                  </Link>
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" className="text-lg font-medium transition-colors hover:text-brand">
                        Login
                      </Link>
                      <Link to="/signup" className="text-lg font-medium transition-colors hover:text-brand">
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link 
                        to={userType === 'seller' ? '/seller/dashboard' : '/customer/profile'} 
                        className="text-lg font-medium transition-colors hover:text-brand"
                      >
                        My Profile
                      </Link>
                      <Link to="/orders" className="text-lg font-medium transition-colors hover:text-brand">
                        My Orders
                      </Link>
                      <button className="text-lg font-medium text-left text-red-500 hover:text-red-700">
                        Logout
                      </button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
