
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface HeaderProps {
  cartCount?: number;
}

const Header = ({ cartCount = 0 }: HeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userType, signOut } = useAuth();
  const [localCartCount, setLocalCartCount] = useState(cartCount);
  const [scrolled, setScrolled] = useState(false);

  // Handle login click
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

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      
      // If on a restricted page, redirect to home
      if (location.pathname.includes('/customer/') || 
          location.pathname.includes('/seller/')) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to log out');
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
      scrolled ? 'bg-white/95 shadow-sm supports-[backdrop-filter]:bg-white/60' : 'bg-white/80 border-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-brand">Fast</span>
              <span className="text-black">Eat</span>
            </span>
          </Link>

          {!isMobile && (
            <nav className="ml-10 hidden space-x-4 lg:flex">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-brand text-black">
                Home
              </Link>
              <Link to="/restaurants" className="text-sm font-medium transition-colors hover:text-brand text-black">
                Restaurants
              </Link>
              <Link to="/about" className="text-sm font-medium transition-colors hover:text-brand text-black">
                About
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="hidden md:flex bg-white" onClick={() => navigate('/search')}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
            className="relative text-black"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
              {localCartCount}
            </span>
          </Button>

          {!user ? (
            <Button variant="default" onClick={handleLoginClick} className="bg-brand hover:bg-brand-dark text-black">
              Login
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={handleProfileClick} className="text-black">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          )}

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Menu" className="text-black bg-white">
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
                  {!user ? (
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
                      <button 
                        onClick={handleLogout}
                        className="text-lg font-medium text-left text-red-500 hover:text-red-700"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          {/* Non-mobile logout button */}
          {!isMobile && user && (
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-black">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
