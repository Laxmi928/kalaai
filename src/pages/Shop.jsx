import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, Star, Heart, ShoppingCart, ChevronRight, X, ArrowRight } from 'lucide-react';
import { products, categories } from '../data/products';
import { Link } from 'react-router-dom';

import { useWishlist } from '../context/WishlistContext.jsx';
import ImageWithFallback from '../components/ImageWithFallback.jsx';

const ProductCard = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-earth-50 rounded-2xl overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(123,97,255,0.08)] hover:shadow-[0_20px_40px_rgba(255,79,163,0.15)] transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <ImageWithFallback 
          src={product.images[0]} 
          alt={product.name}
          className="group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            onClick={() => onQuickView(product)}
            className="px-4 py-2 bg-white text-earth-900 rounded-xl font-bold text-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-earth-50"
          >
            Quick View
          </button>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 p-2 backdrop-blur-md rounded-full transition-all shadow-md z-10 ${
            isWishlisted ? 'bg-terracotta/10 text-terracotta border border-terracotta/20' : 'bg-white/80 text-earth-800 hover:text-terracotta hover:bg-white border border-white/40'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,79,163,0.5)]" : ""} />
        </button>
        {product.stock < 10 && (
          <div className="absolute bottom-4 left-4 px-2 py-1 bg-gradient-to-r from-terracotta to-[#FF7EB3] text-white text-[10px] font-bold rounded uppercase tracking-wider z-10 shadow-sm">
            Only {product.stock} left
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold text-earth-800 uppercase tracking-widest bg-earth-100 px-2 py-0.5 rounded-full">{product.category}</span>
          <div className="flex items-center gap-1 text-terracotta">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-serif font-bold text-earth-900 group-hover:text-earth-800 transition-colors line-clamp-1 pt-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-earth-600 line-clamp-1 italic font-medium">{product.origin}</p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-terracotta">₹{product.price.toLocaleString()}</span>
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-earth-800 to-[#9D8BFF] text-white rounded-xl hover:shadow-[0_0_15px_rgba(123,97,255,0.4)] transition-all active:scale-95 group/btn">
            <ShoppingCart size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.origin.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Rating') return b.rating - a.rating;
        return 0; // Popularity (default)
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white pt-24 pb-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-earth-800/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-earth-900 mb-2 drop-shadow-sm">Artisan Marketplace</h1>
            <p className="text-earth-600 font-medium">Discover authentic handmade treasures from across India.</p>
          </div>
          
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-terracotta" size={20} />
            <input 
              type="text"
              placeholder="Search by craft, region, or product..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-earth-200 rounded-2xl focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-all shadow-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 overflow-x-auto pb-6 scrollbar-hide mb-8">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All' 
              ? 'bg-gradient-to-r from-terracotta to-[#FF7EB3] text-white shadow-[0_0_15px_rgba(255,79,163,0.4)]' 
              : 'bg-white text-earth-600 border border-earth-200 hover:border-terracotta hover:text-terracotta'
            }`}
          >
            All Crafts
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.name 
                ? 'bg-gradient-to-r from-terracotta to-[#FF7EB3] text-white shadow-[0_0_15px_rgba(255,79,163,0.4)]' 
                : 'bg-white text-earth-600 border border-earth-200 hover:border-terracotta hover:text-terracotta'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filters & Sorting */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-earth-200 rounded-xl text-sm font-bold text-earth-700 hover:bg-earth-50 hover:border-terracotta hover:text-terracotta transition-all shadow-sm"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
            <span className="text-sm text-earth-500 font-medium">
              Showing {filteredProducts.length} products
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-earth-500 font-medium hidden sm:block">Sort by:</span>
            <select 
              className="bg-white border border-earth-200 rounded-xl px-4 py-2 text-sm font-bold text-earth-700 focus:ring-2 focus:ring-terracotta focus:border-terracotta outline-none shadow-sm transition-all"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-earth-400" />
            </div>
            <h3 className="text-xl font-serif font-bold text-earth-900 mb-2">No products found</h3>
            <p className="text-earth-600">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-6 text-earth-900 font-bold underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-earth-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(123,97,255,0.2)] max-w-4xl w-full overflow-hidden flex flex-col md:flex-row border border-white/50"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm rounded-full text-earth-900 hover:text-terracotta hover:bg-white transition-all z-10 shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="md:w-1/2 aspect-square md:aspect-auto">
                <img 
                  src={quickViewProduct.images[0]} 
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 space-y-6 overflow-y-auto max-h-[80vh] md:max-h-none bg-gradient-to-br from-earth-50 to-white">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-earth-800 uppercase tracking-widest bg-earth-100 px-2 py-0.5 rounded-full">{quickViewProduct.category}</span>
                  <h2 className="text-3xl font-serif font-bold text-earth-900 drop-shadow-sm">{quickViewProduct.name}</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-terracotta">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold text-earth-900">{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-sm text-earth-600 font-medium">{quickViewProduct.origin}</span>
                  </div>
                </div>

                <div className="text-2xl font-bold text-terracotta">₹{quickViewProduct.price.toLocaleString()}</div>

                <p className="text-earth-600 leading-relaxed line-clamp-3 font-medium">
                  {quickViewProduct.description}
                </p>

                <div className="space-y-4 pt-4">
                  <Link 
                    to={`/product/${quickViewProduct.id}`}
                    className="w-full bg-gradient-to-r from-terracotta to-[#FF7EB3] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,79,163,0.5)] hover:-translate-y-1 transition-all active:scale-95"
                  >
                    View Full Details
                    <ArrowRight size={20} />
                  </Link>
                  <button className="w-full py-4 border-2 border-earth-200 rounded-2xl font-bold text-earth-800 hover:border-terracotta hover:text-terracotta hover:bg-terracotta/5 transition-all flex items-center justify-center gap-2 active:scale-95">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
