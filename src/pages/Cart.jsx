import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, RefreshCcw, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export default function Cart() {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 1 },
    { ...products[2], quantity: 2 }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const tax = subtotal * 0.12;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-earth-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/shop" className="p-2 bg-white rounded-full text-earth-600 hover:text-earth-900 shadow-sm transition-all">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-4xl font-serif font-bold text-earth-900">Your Shopping Bag</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-3xl p-6 border border-earth-100 shadow-sm flex flex-col sm:flex-row gap-6 items-center"
                  >
                    <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-earth-50 border border-earth-100">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-xl font-serif font-bold text-earth-900">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-earth-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-earth-500 font-medium">{item.category} • {item.origin}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                        <div className="flex items-center justify-center sm:justify-start border border-earth-200 rounded-xl overflow-hidden w-fit mx-auto sm:mx-0">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-earth-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 py-1 font-bold text-earth-900 w-10 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-earth-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-xl font-bold text-earth-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-earth-200">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-earth-600 shadow-sm">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-earth-900 uppercase tracking-wider">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-earth-600 shadow-sm">
                    <Truck size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-earth-900 uppercase tracking-wider">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-earth-600 shadow-sm">
                    <RefreshCcw size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-earth-900 uppercase tracking-wider">Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2.5rem] p-8 border border-earth-100 shadow-lg sticky top-24">
                <h2 className="text-2xl font-serif font-bold text-earth-900 mb-8">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-earth-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-earth-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-earth-600">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-earth-600">
                    <span>GST (12%)</span>
                    <span className="font-bold text-earth-900">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-earth-100 flex justify-between items-end">
                    <span className="text-lg font-bold text-earth-900">Total</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-earth-900">₹{total.toLocaleString()}</div>
                      <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Incl. all taxes</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Promo Code"
                      className="w-full pl-4 pr-20 py-3 bg-earth-50 border border-earth-200 rounded-xl text-sm focus:outline-none focus:border-earth-400"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-earth-900 font-bold text-sm px-4 py-1 hover:bg-earth-100 rounded-lg transition-colors">
                      Apply
                    </button>
                  </div>
                  
                  <button className="w-full bg-earth-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-earth-800 transition-all shadow-xl active:scale-95">
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </button>
                  
                  <p className="text-[10px] text-center text-earth-400 font-medium">
                    By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-earth-100 shadow-sm">
            <div className="w-24 h-24 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-8 text-earth-300">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-earth-900 mb-4">Your bag is empty</h2>
            <p className="text-earth-600 mb-12 max-w-md mx-auto">
              Looks like you haven't added any handmade treasures to your bag yet. Start exploring our artisan collections!
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center gap-2 px-10 py-4 bg-earth-900 text-white rounded-2xl font-bold hover:bg-earth-800 transition-all shadow-xl active:scale-95"
            >
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
