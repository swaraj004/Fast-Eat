
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, ShoppingCart, User, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  cartCount?: number;
}

const Header = ({ cartCount = 0 }: HeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'seller' | null>(null);
  const [localCartCount, setLocalCartCount] = useState(cartCount);
  const [scrolled, setScrolled] = useState(false);

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

  // Load cart count from local storage on initial render
  useEffect(() => {
    const loadCartCount = () => {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const cartItems = JSON.parse(cartData);
        setLocalCartCount(cartItems.length);
      }
    };

    // Load cart count initially
    loadCartCount();

    // Listen for cart update events
    const handleCartUpdated = (event: CustomEvent) => {
      setLocalCartCount(event.detail.count);
    };

    // Handle scroll for header background change
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('cart-updated', handleCartUpdated as EventListener);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdated as EventListener);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-sm supports-[backdrop-filter]:bg-white/60' : 'bg-transparent border-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-brand">Fast</span>
              <span className={scrolled ? "text-black" : "text-white"}>Eat</span>
            </span>
          </Link>

          {!isMobile && (
            <nav className="ml-10 hidden space-x-4 lg:flex">
              <Link to="/" className={`text-sm font-medium transition-colors hover:text-brand ${scrolled ? '' : 'text-white'}`}>
                Home
              </Link>
              <Link to="/restaurants" className={`text-sm font-medium transition-colors hover:text-brand ${scrolled ? '' : 'text-white'}`}>
                Restaurants
              </Link>
              <Link to="/about" className={`text-sm font-medium transition-colors hover:text-brand ${scrolled ? '' : 'text-white'}`}>
                About
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className={`hidden md:flex ${scrolled ? 'bg-white' : 'bg-white/20 backdrop-blur'}`} onClick={() => navigate('/search')}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Button 
            variant={scrolled ? "ghost" : "outline"}
            size="icon"
            onClick={() => navigate('/cart')}
            className={`relative ${scrolled ? '' : 'text-white bg-white/20 backdrop-blur hover:bg-white/30'}`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
              {localCartCount}
            </span>
          </Button>

          {!isLoggedIn ? (
            <Button variant="default" onClick={handleLoginClick} className="bg-brand hover:bg-brand-dark text-black">
              Login
            </Button>
          ) : (
            <Button variant={scrolled ? "ghost" : "outline"} size="icon" onClick={handleProfileClick} className={scrolled ? '' : 'text-white bg-white/20'}>
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          )}

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={scrolled ? "outline" : "outline"} size="icon" aria-label="Menu" className={scrolled ? '' : 'text-white bg-white/20 backdrop-blur'}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <div className="flex items-center mb-8">
                  <span className="text-xl font-bold">
                    <span className="text-brand">Fast</span>
                    <span className="text-black">Eat</span>
                  </span>
                </div>
                <nav className="flex flex-col gap-4">
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
