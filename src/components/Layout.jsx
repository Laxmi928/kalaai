import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Menu, X, ShoppingCart, User, Search, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Artisans', href: '/artisans' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Seller Panel', href: '/artisan-dashboard' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-terracotta/90 to-earth-800/90 backdrop-blur-lg py-3 shadow-lg border-b border-white/20' : 'bg-gradient-to-r from-terracotta to-earth-800 py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner">
            <Palette className="text-white w-6 h-6 drop-shadow-md" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-white drop-shadow-md">KalaAI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.href} 
              className={({ isActive }) => 
                `text-sm font-bold transition-all hover:text-white relative py-1 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/70'}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Icons & Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4">
            <button className="p-2 text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-terracotta text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
          
          <Link to="/cart" className="p-2 text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-terracotta text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
              3
            </span>
          </Link>
          
          <Link to="/profile" className="p-2 text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
            <User size={20} />
          </Link>

          <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-earth-100 border-b border-earth-200 p-6 lg:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href} 
                  className={({ isActive }) => 
                    `text-lg font-medium transition-colors ${isActive ? 'text-terracotta' : 'text-earth-900'}`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <button className="btn-primary w-full mt-4">Join as Artisan</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gradient-to-b from-earth-900 to-[#2e0a43] text-white pt-24 pb-12 relative overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-[100px] -z-10" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-earth-800/10 rounded-full blur-[100px] -z-10" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-inner">
              <Palette className="text-white w-6 h-6 drop-shadow-md" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight drop-shadow-md">KalaAI</span>
          </div>
          <p className="text-white/70 leading-relaxed font-medium">
            Empowering the hands that create. KalaAI is a mission-driven marketplace dedicated to bringing India's rich artisan heritage to the global digital stage.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-terracotta hover:to-[#FF7EB3] hover:text-white transition-all shadow-sm border border-white/10 hover:border-transparent hover:shadow-[0_0_15px_rgba(255,79,163,0.5)]">
                <span className="sr-only">{social}</span>
                <div className="w-5 h-5 border border-current rounded-sm" />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-8 drop-shadow-sm">Shop Marketplace</h4>
          <ul className="space-y-4 text-white/70 font-medium">
            <li><Link to="/shop" className="hover:text-terracotta transition-colors">All Collections</Link></li>
            <li><Link to="/shop?category=Pottery" className="hover:text-terracotta transition-colors">Pottery & Ceramics</Link></li>
            <li><Link to="/shop?category=Textiles" className="hover:text-terracotta transition-colors">Hand-woven Textiles</Link></li>
            <li><Link to="/shop?category=Paintings" className="hover:text-terracotta transition-colors">Traditional Paintings</Link></li>
            <li><Link to="/artisans" className="hover:text-terracotta transition-colors">Meet the Artisans</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 drop-shadow-sm">Artisan Tools</h4>
          <ul className="space-y-4 text-white/70 font-medium">
            <li><Link to="/ai-tools" className="hover:text-earth-300 transition-colors">AI Listing Generator</Link></li>
            <li><Link to="/ai-tools" className="hover:text-earth-300 transition-colors">Storytelling Assistant</Link></li>
            <li><Link to="/ai-tools" className="hover:text-earth-300 transition-colors">Price Suggester</Link></li>
            <li><Link to="/ai-tools" className="hover:text-earth-300 transition-colors">Trend Dashboard</Link></li>
            <li><Link to="/contact" className="hover:text-earth-300 transition-colors">Join as Artisan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 drop-shadow-sm">Newsletter</h4>
          <p className="text-sm text-white/70 mb-6 font-medium">Subscribe to get updates on new collections and artisan stories.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
            />
            <button className="bg-gradient-to-r from-terracotta to-[#FF7EB3] text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-[0_0_15px_rgba(255,79,163,0.5)] transition-all active:scale-95">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/50 font-medium">
        <p>© 2026 KalaAI Marketplace. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-terracotta transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-terracotta transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-terracotta transition-colors">Shipping Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen selection:bg-terracotta selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
