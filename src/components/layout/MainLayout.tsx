
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    // Get initial cart count
    const cart = localStorage.getItem('cart');
    if (cart) {
      try {
        const items = JSON.parse(cart);
        setCartCount(items.length);
      } catch (error) {
        console.error("Failed to parse cart data", error);
      }
    }
    
    // Listen for cart updates
    const handleCartUpdate = (e: any) => {
      setCartCount(e.detail.count);
    };
    
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartCount={cartCount} />
      <main className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
