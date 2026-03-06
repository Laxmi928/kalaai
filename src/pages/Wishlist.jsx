import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-earth-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <Heart className="text-earth-900" size={32} fill="currentColor" />
          <h1 className="text-4xl font-serif font-bold text-earth-900">Your Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-earth-100 shadow-sm">
            <div className="w-24 h-24 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-earth-300" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-earth-900 mb-4">Your wishlist is empty</h2>
            <p className="text-earth-600 text-lg mb-8 max-w-md mx-auto">
              Discover authentic handcrafted treasures and save your favorites here.
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-earth-900 text-white rounded-2xl font-bold hover:bg-earth-800 transition-all shadow-xl"
            >
              Explore Collection
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {wishlist.map(product => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-earth-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">{product.category}</span>
                    </div>
                    <Link to={`/product/${product.id}`} className="block mb-2">
                      <h3 className="font-serif font-bold text-earth-900 group-hover:text-earth-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="text-lg font-bold text-earth-900 mb-4">₹{product.price.toLocaleString()}</div>
                    
                    <div className="mt-auto flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-earth-900 text-white rounded-xl font-bold text-sm hover:bg-earth-800 transition-all shadow-md active:scale-95">
                        <ShoppingCart size={16} />
                        Move to Cart
                      </button>
                      <button 
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-3 border border-earth-200 rounded-xl text-earth-500 hover:text-red-500 hover:bg-red-50 transition-all active:scale-95"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
