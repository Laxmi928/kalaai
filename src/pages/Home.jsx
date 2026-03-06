import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Star, ShoppingBag, ArrowRight, Sparkles, Users, Globe, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { artisans } from '../data/artisans';
import ImageWithFallback from '../components/ImageWithFallback.jsx';

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: "Reviving Ancient Crafts for Modern Homes",
      subtitle: "Direct from the hands of India's finest artisans to your doorstep.",
      image: "https://images.unsplash.com/photo-1590736961649-71144539755b?auto=format&fit=crop&q=80&w=1920",
      cta: "Shop Collection",
    },
    {
      title: "Authentic Blue Pottery from Jaipur",
      subtitle: "Hand-painted treasures that tell a story of heritage and skill.",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=1920",
      cta: "Explore Blue Pottery",
    },
    {
      title: "The Softness of Pure Pashmina",
      subtitle: "Woven with love in the valleys of Kashmir.",
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=1920",
      cta: "View Textiles",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const floatingCards = [
    { title: "Pottery", subtitle: "Blue Pottery", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400", delay: 0, y: -20, x: -20 },
    { title: "Textiles", subtitle: "Pashmina", image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=400", delay: 0.2, y: 40, x: 20 },
    { title: "Paintings", subtitle: "Madhubani Folk Art", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400", delay: 0.4, y: -40, x: 60 },
    { title: "Jewelry", subtitle: "Handcrafted", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400", delay: 0.6, y: 60, x: -40 },
  ];

  const trustBadges = [
    "Handmade Authentic",
    "Direct from Artisans",
    "Pan-India Shipping",
    "Secure Payments"
  ];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-terracotta via-earth-800 to-earth-900 pt-20">
      {/* Background Image with Parallax & Gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={slides[current].image} 
            alt="Artisans crafting" 
            className="w-full h-full object-cover object-center mix-blend-overlay opacity-40"
            referrerPolicy="no-referrer"
          />
          {/* Soft dark gradient overlay with warm cultural tones */}
          <div className="absolute inset-0 bg-gradient-to-r from-earth-900/90 via-earth-800/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 via-transparent to-transparent z-10" />
          
          {/* Subtle Indian Art Pattern Overlay */}
          <div className="absolute inset-0 opacity-20 z-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          {/* Floating Gradient Blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta/40 rounded-full blur-[100px] animate-pulse-glow z-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-earth-800/40 rounded-full blur-[100px] animate-pulse-glow z-10" style={{ animationDelay: '1s' }} />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text & CTA */}
          <div className="space-y-8 py-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={current}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6 relative"
              >
                {/* Subtle glowing effect behind heading */}
                <div className="absolute -inset-4 bg-white/10 blur-3xl rounded-full z-0 opacity-50"></div>
                
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {slides[current].title}
                </h1>
                <p className="text-xl text-white/90 font-medium max-w-lg relative z-10 drop-shadow-md">
                  {slides[current].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-8 relative z-10"
            >
              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/shop"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-terracotta to-[#FF7EB3] text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_rgba(255,79,163,0.5)] hover:-translate-y-1 transition-all active:scale-95"
                >
                  Shop Collection
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/artisans"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-earth-800 to-[#9D8BFF] text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_rgba(123,97,255,0.5)] hover:-translate-y-1 transition-all active:scale-95"
                >
                  Explore Artisans
                  <Users size={20} className="group-hover:scale-110 transition-transform" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <ShieldCheck size={12} className="text-white drop-shadow-md" />
                    </div>
                    <span className="text-xs font-bold tracking-wide drop-shadow-sm">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Floating Product Cards */}
          <div className="hidden lg:block relative h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {floatingCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: card.y,
                    x: card.x
                  }}
                  transition={{ 
                    delay: 0.5 + card.delay, 
                    duration: 1,
                    type: "spring",
                    stiffness: 50
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    zIndex: 50,
                    boxShadow: "0 25px 50px -12px rgba(255, 79, 163, 0.3)"
                  }}
                  className="absolute w-48 bg-earth-50 rounded-2xl p-3 shadow-[0_10px_30px_rgba(123,97,255,0.2)] border border-white/40 backdrop-blur-md cursor-pointer group"
                  style={{
                    zIndex: 10 + idx
                  }}
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 relative">
                    <ImageWithFallback 
                      src={card.image} 
                      alt={card.title}
                      className="group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-serif font-bold text-earth-900 text-center">{card.title}</h3>
                  <p className="text-xs text-earth-800 text-center font-medium">{card.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${current === idx ? 'w-8 bg-terracotta shadow-[0_0_10px_rgba(255,79,163,0.8)]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

const CategoryCard = ({ category }) => (
  <Link 
    to={`/shop?category=${category.name}`}
    className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md hover:shadow-[0_20px_40px_rgba(123,97,255,0.3)] transition-all duration-500 border border-white/50"
  >
    <img 
      src={category.image} 
      alt={category.name} 
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 via-earth-800/40 to-transparent" />
    <div className="absolute bottom-6 left-6 right-6">
      <div className="text-3xl mb-2 drop-shadow-md">{category.icon}</div>
      <h3 className="text-2xl font-serif font-bold text-white drop-shadow-md">{category.name}</h3>
      <div className="flex items-center gap-2 text-white/90 text-sm mt-2 font-bold group-hover:text-white transition-colors">
        Shop Now <ChevronRight size={16} />
      </div>
    </div>
  </Link>
);

import { useWishlist } from '../context/WishlistContext.jsx';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-earth-50 rounded-2xl overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(123,97,255,0.08)] hover:shadow-[0_20px_40px_rgba(255,79,163,0.15)] transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <ImageWithFallback 
            src={product.images[0]} 
            alt={product.name} 
            className="group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 backdrop-blur-md rounded-full transition-all shadow-md z-10 ${
            isWishlisted ? 'bg-terracotta/10 text-terracotta border border-terracotta/20' : 'bg-white/80 text-earth-800 hover:text-terracotta hover:bg-white border border-white/40'
          }`}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,79,163,0.5)]" : ""} />
        </button>
      </div>
      <div className="p-4 space-y-1">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold text-earth-800 uppercase tracking-widest bg-earth-100 px-2 py-0.5 rounded-full">{product.category}</span>
          <div className="flex items-center gap-1 text-terracotta">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h4 className="font-serif font-bold text-earth-900 line-clamp-1 hover:text-earth-800 transition-colors pt-1">{product.name}</h4>
        </Link>
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-terracotta">₹{product.price.toLocaleString()}</p>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-earth-800 to-[#9D8BFF] text-white rounded-xl hover:shadow-[0_0_15px_rgba(123,97,255,0.4)] transition-all active:scale-95">
            <ShoppingBag size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const trendingProducts = products.slice(0, 4);
  const spotlightArtisan = artisans[0];

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif font-bold text-earth-900">Shop by Category</h2>
            <p className="text-earth-600">Explore diverse craft traditions from every corner of India.</p>
          </div>
          <Link to="/shop" className="text-earth-900 font-bold flex items-center gap-2 hover:underline underline-offset-8">
            View All <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-gradient-to-b from-earth-50 to-white py-24 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-earth-800/5 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-serif font-bold text-earth-900 drop-shadow-sm">Trending Now</h2>
              <p className="text-earth-600 font-medium">Most loved handmade creations this week.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-[3rem] overflow-hidden group shadow-[0_10px_30px_rgba(123,97,255,0.15)] border border-white/50">
            <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-earth-900/80 to-transparent flex items-center p-12">
              <div className="max-w-xs space-y-4">
                <span className="text-terracotta text-xs font-bold uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full shadow-sm">New Arrival</span>
                <h3 className="text-4xl font-serif font-bold text-white drop-shadow-md">The Indigo Series</h3>
                <p className="text-white/90 font-medium drop-shadow-sm">Hand-dyed textiles using ancient natural indigo techniques.</p>
                <Link to="/shop?category=Textiles" className="inline-flex items-center gap-2 text-white font-bold hover:text-terracotta transition-colors group/link">
                  Shop Collection <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-[3rem] overflow-hidden group shadow-[0_10px_30px_rgba(255,79,163,0.15)] border border-white/50">
            <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-earth-900/80 to-transparent flex items-center p-12">
              <div className="max-w-xs space-y-4">
                <span className="text-earth-800 text-xs font-bold uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full shadow-sm">Limited Edition</span>
                <h3 className="text-4xl font-serif font-bold text-white drop-shadow-md">Bastar Metal Art</h3>
                <p className="text-white/90 font-medium drop-shadow-sm">Intricate Dhokra figurines from the heart of tribal India.</p>
                <Link to="/shop?category=Metalcraft" className="inline-flex items-center gap-2 text-white font-bold hover:text-earth-300 transition-colors group/link">
                  Shop Collection <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-earth-900 via-earth-800 to-[#4c1d95] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(123,97,255,0.3)] relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-earth-400/20 rounded-full blur-[80px]" />
          
          <div className="grid lg:grid-cols-2 items-center relative z-10">
            <div className="p-12 lg:p-20 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-terracotta/20 to-earth-800/20 text-white rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 shadow-inner backdrop-blur-sm">
                <Sparkles size={14} className="text-terracotta" />
                Artisan Spotlight
              </div>
              <h2 className="text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">
                Master of Blue Pottery: {spotlightArtisan.name}
              </h2>
              <p className="text-xl text-earth-100 italic leading-relaxed drop-shadow-sm">
                "{spotlightArtisan.story}"
              </p>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-terracotta drop-shadow-sm">{spotlightArtisan.experience}</div>
                  <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-earth-300 drop-shadow-sm">{spotlightArtisan.rating}</div>
                  <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">Rating</div>
                </div>
              </div>
              <div className="pt-6">
                <Link 
                  to={`/artisan/${spotlightArtisan.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-earth-900 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all active:scale-95 group"
                >
                  View Artisan Profile
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-terracotta" />
                </Link>
              </div>
            </div>
            <div className="h-full min-h-[400px]">
              <img 
                src={spotlightArtisan.image} 
                alt={spotlightArtisan.name} 
                className="w-full h-full object-cover mix-blend-overlay opacity-80 hover:opacity-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-earth-800/5 rounded-full blur-[100px] -translate-y-1/2 -z-10" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-[100px] -translate-y-1/2 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-serif font-bold text-earth-900 text-center mb-16 drop-shadow-sm">What Our Community Says</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ananya Iyer", role: "Interior Designer", text: "The quality of the Blue Pottery vase I ordered is exceptional. It's not just a product, it's a piece of art that has transformed my living room." },
              { name: "Vikram Mehta", role: "Art Collector", text: "Finding authentic Dhokra art was always a challenge until I found this platform. The direct connection to artisans makes all the difference." },
              { name: "Sarah Jenkins", role: "Sustainable Fashion Blogger", text: "I love the transparency here. Knowing the story of the weaver behind my Pashmina shawl makes it so much more special." }
            ].map((t, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-earth-50 to-white rounded-[2rem] border border-earth-200 shadow-[0_8px_30px_rgb(123,97,255,0.05)] hover:shadow-[0_20px_40px_rgba(255,79,163,0.1)] transition-all duration-300 space-y-6 group">
                <div className="flex text-terracotta gap-1">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" className="drop-shadow-sm" />)}
                </div>
                <p className="text-earth-700 italic leading-relaxed group-hover:text-earth-900 transition-colors">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-terracotta/20 to-earth-800/20 rounded-full border border-white shadow-inner" />
                  <div>
                    <div className="font-bold text-earth-900">{t.name}</div>
                    <div className="text-xs text-earth-800 font-bold uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-y border-earth-200">
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-16 h-16 bg-gradient-to-br from-earth-50 to-earth-100 rounded-full flex items-center justify-center text-terracotta shadow-inner group-hover:scale-110 transition-transform border border-white">
              <Globe size={32} className="drop-shadow-sm" />
            </div>
            <div>
              <h4 className="font-bold text-earth-900">Global Delivery</h4>
              <p className="text-sm text-earth-600 font-medium">Bringing Indian crafts to the world.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-16 h-16 bg-gradient-to-br from-earth-50 to-earth-100 rounded-full flex items-center justify-center text-earth-800 shadow-inner group-hover:scale-110 transition-transform border border-white">
              <ShieldCheck size={32} className="drop-shadow-sm" />
            </div>
            <div>
              <h4 className="font-bold text-earth-900">100% Authentic</h4>
              <p className="text-sm text-earth-600 font-medium">Verified handmade products only.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-16 h-16 bg-gradient-to-br from-earth-50 to-earth-100 rounded-full flex items-center justify-center text-terracotta shadow-inner group-hover:scale-110 transition-transform border border-white">
              <Users size={32} className="drop-shadow-sm" />
            </div>
            <div>
              <h4 className="font-bold text-earth-900">Empowering Artisans</h4>
              <p className="text-sm text-earth-600 font-medium">Direct fair-trade earnings.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-16 h-16 bg-gradient-to-br from-earth-50 to-earth-100 rounded-full flex items-center justify-center text-earth-800 shadow-inner group-hover:scale-110 transition-transform border border-white">
              <Sparkles size={32} className="drop-shadow-sm" />
            </div>
            <div>
              <h4 className="font-bold text-earth-900">AI-Powered Support</h4>
              <p className="text-sm text-earth-600 font-medium">Modern tools for ancient crafts.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-16">
        <div className="bg-gradient-to-br from-earth-50 via-white to-earth-100 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-white shadow-[0_20px_50px_rgba(123,97,255,0.1)]">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-earth-800/10 rounded-full blur-[80px]" />
          
          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-earth-900 drop-shadow-sm">Join the Circle</h2>
            <p className="text-xl text-earth-600 font-medium">Subscribe to get updates on new artisan collections, stories, and exclusive offers.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-2xl bg-white border border-earth-200 focus:ring-2 focus:ring-terracotta focus:border-terracotta outline-none shadow-sm transition-all"
              />
              <button className="px-10 py-4 bg-gradient-to-r from-terracotta to-[#FF7EB3] text-white rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(255,79,163,0.5)] hover:-translate-y-1 transition-all active:scale-95">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-earth-500 font-medium italic">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
