import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, Heart, ShoppingBag, MapPin, CreditCard, 
  User, Bell, HelpCircle, LogOut, ChevronRight, 
  Trash2, Plus, Minus, ArrowRight, Edit2, CheckCircle2,
  Clock, MessageSquare, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { products } from '../data/products';
import ImageWithFallback from '../components/ImageWithFallback.jsx';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('orders');
  const [trackingOrder, setTrackingOrder] = useState(null);
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  // Mock Data with Local Storage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('kala_cart');
    return saved ? JSON.parse(saved) : [
      { ...products[0], quantity: 1 },
      { ...products[1], quantity: 2 }
    ];
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('kala_addresses');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Home', address: '123 Artisan Street, Craftsville, CR 12345', isDefault: true },
      { id: 2, name: 'Work', address: '456 Maker Avenue, Buildtown, BT 67890', isDefault: false }
    ];
  });

  const [paymentMethods, setPaymentMethods] = useState(() => {
    const saved = localStorage.getItem('kala_payments');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
      { id: 2, type: 'UPI', id_str: 'user@upi', isDefault: false }
    ];
  });

  const [orders] = useState(() => {
    const saved = localStorage.getItem('kala_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-2026-001',
        date: 'March 1, 2026',
        status: 'Delivered',
        total: 4500,
        items: [products[0]]
      },
      {
        id: 'ORD-2026-002',
        date: 'March 4, 2026',
        status: 'In Transit',
        total: 12500,
        items: [products[2], products[3]]
      }
    ];
  });

  const [notifications] = useState(() => {
    const saved = localStorage.getItem('kala_notifications');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Order Delivered', desc: 'Your order ORD-2026-001 has been delivered.', time: '2 days ago', read: false },
      { id: 2, title: 'Price Drop Alert', desc: 'A product in your wishlist is now on sale!', time: '1 week ago', read: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('kala_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('kala_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('kala_payments', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'cart', label: 'Cart', icon: ShoppingBag },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'account', label: 'Account Details', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleLogout = () => {
    // Mock logout
    navigate('/');
  };

  // Cart Functions
  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-earth-900 mb-6">My Orders</h2>
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm">
                <div className="flex flex-wrap justify-between items-center border-b border-earth-100 pb-4 mb-4 gap-4">
                  <div>
                    <p className="text-sm text-earth-500 font-medium">Order ID: {order.id}</p>
                    <p className="text-sm text-earth-500 font-medium">Placed on: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-earth-900">₹{order.total.toLocaleString()}</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-earth-50 flex-shrink-0">
                        <ImageWithFallback src={item.images[0]} alt={item.name} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif font-bold text-earth-900">{item.name}</h4>
                        <p className="text-sm text-earth-500">{item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-6 pt-4 border-t border-earth-100">
                  {order.status === 'In Transit' && (
                    <button 
                      onClick={() => setTrackingOrder(trackingOrder === order.id ? null : order.id)}
                      className="flex-1 py-2 border border-earth-900 text-earth-900 rounded-xl font-bold hover:bg-earth-50 transition-colors"
                    >
                      {trackingOrder === order.id ? 'Hide Tracking' : 'Track Order'}
                    </button>
                  )}
                  <button className="flex-1 py-2 bg-earth-900 text-white rounded-xl font-bold hover:bg-earth-800 transition-colors">
                    Buy Again
                  </button>
                </div>
                
                {/* Tracking Placeholder */}
                <AnimatePresence>
                  {trackingOrder === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 p-4 bg-earth-50 rounded-xl border border-earth-200">
                        <h5 className="font-bold text-earth-900 mb-4">Tracking Information</h5>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-earth-300 before:to-transparent">
                          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-earth-900 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                              <Package size={16} />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-earth-200 bg-white shadow-sm">
                              <div className="flex items-center justify-between space-x-2 mb-1">
                                <div className="font-bold text-earth-900">Order Shipped</div>
                                <time className="text-xs font-medium text-earth-500">Today, 10:00 AM</time>
                              </div>
                              <div className="text-sm text-earth-600">Your package has left the artisan's workshop.</div>
                            </div>
                          </div>
                          
                          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-earth-200 text-earth-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                              <Truck size={16} />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-earth-200 bg-white shadow-sm opacity-60">
                              <div className="flex items-center justify-between space-x-2 mb-1">
                                <div className="font-bold text-earth-900">Out for Delivery</div>
                                <time className="text-xs font-medium text-earth-500">Pending</time>
                              </div>
                              <div className="text-sm text-earth-600">Package will be delivered soon.</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 text-center">
                          <a href="#" className="text-sm font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4">
                            View on Courier Website (Dummy Link)
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-earth-900 mb-6">My Wishlist</h2>
            {wishlist.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-earth-200">
                <Heart className="mx-auto text-earth-300 mb-4" size={48} />
                <p className="text-earth-600">Your wishlist is empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {wishlist.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl p-4 border border-earth-200 shadow-sm flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-earth-50 flex-shrink-0">
                      <ImageWithFallback src={product.images[0]} alt={product.name} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-earth-900 line-clamp-1">{product.name}</h4>
                        <p className="text-lg font-bold text-earth-900">₹{product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="flex-1 py-1.5 bg-earth-900 text-white rounded-lg text-xs font-bold hover:bg-earth-800 transition-colors">
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-1.5 border border-earth-200 rounded-lg text-earth-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'cart':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-earth-900 mb-6">My Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-earth-200">
                <ShoppingBag className="mx-auto text-earth-300 mb-4" size={48} />
                <p className="text-earth-600">Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl p-4 border border-earth-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-earth-50 flex-shrink-0">
                        <ImageWithFallback src={item.images[0]} alt={item.name} />
                      </div>
                      <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-center sm:text-left">
                          <h4 className="font-serif font-bold text-earth-900">{item.name}</h4>
                          <p className="text-lg font-bold text-earth-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-earth-200 rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-earth-50">
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1 font-bold text-earth-900 w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-earth-50">
                              <Plus size={14} />
                            </button>
                          </div>
                          <button onClick={() => removeCartItem(item.id)} className="p-2 text-earth-400 hover:text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-earth-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-earth-200 text-sm">Total Amount</p>
                    <p className="text-2xl font-bold">₹{cartSubtotal.toLocaleString()}</p>
                  </div>
                  <button className="w-full sm:w-auto px-8 py-3 bg-white text-earth-900 rounded-xl font-bold hover:bg-earth-100 transition-colors flex items-center justify-center gap-2">
                    Checkout <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-earth-900">Saved Addresses</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-earth-900 text-white rounded-xl font-bold text-sm hover:bg-earth-800 transition-colors">
                <Plus size={16} /> Add New
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map(addr => (
                <div key={addr.id} className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm relative">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
                      Default
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-earth-500" />
                    <h4 className="font-bold text-earth-900">{addr.name}</h4>
                  </div>
                  <p className="text-earth-600 text-sm mb-6 pr-12">{addr.address}</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-earth-200 rounded-lg text-sm font-bold text-earth-600 hover:bg-earth-50 transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 border border-earth-200 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-earth-900">Payment Methods</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-earth-900 text-white rounded-xl font-bold text-sm hover:bg-earth-800 transition-colors">
                <Plus size={16} /> Add New
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paymentMethods.map(method => (
                <div key={method.id} className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm relative flex items-center gap-4">
                  {method.isDefault && (
                    <span className="absolute top-4 right-4 px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
                      Default
                    </span>
                  )}
                  <div className="w-12 h-12 bg-earth-50 rounded-xl flex items-center justify-center text-earth-600">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-earth-900">{method.type}</h4>
                    <p className="text-earth-500 text-sm">
                      {method.last4 ? `**** **** **** ${method.last4}` : method.id_str}
                    </p>
                    {method.expiry && <p className="text-earth-400 text-xs mt-1">Expires {method.expiry}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-earth-900 mb-6">Account Details</h2>
            <div className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-earth-100">
                <div className="w-24 h-24 bg-earth-200 rounded-full flex items-center justify-center text-earth-500 text-3xl font-serif font-bold relative">
                  JD
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-earth-900 text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-earth-800 transition-colors">
                    <Edit2 size={14} />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-earth-900">John Doe</h3>
                  <p className="text-earth-500">Member since 2025</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-500">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:outline-none focus:border-earth-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-500">Email Address</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:outline-none focus:border-earth-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-500">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:outline-none focus:border-earth-400" />
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <button className="px-6 py-2 bg-earth-900 text-white rounded-xl font-bold hover:bg-earth-800 transition-colors">
                  Save Changes
                </button>
                <button className="px-6 py-2 border border-earth-200 text-earth-600 rounded-xl font-bold hover:bg-earth-50 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-earth-900 mb-6">Notifications</h2>
            <div className="space-y-4">
              {notifications.map(notif => (
                <div key={notif.id} className={`bg-white rounded-2xl p-4 border shadow-sm flex gap-4 ${notif.read ? 'border-earth-100' : 'border-earth-300 bg-earth-50/50'}`}>
                  <div className="w-10 h-10 rounded-full bg-earth-100 flex items-center justify-center text-earth-600 flex-shrink-0">
                    <Bell size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-bold ${notif.read ? 'text-earth-700' : 'text-earth-900'}`}>{notif.title}</h4>
                      <span className="text-xs text-earth-400">{notif.time}</span>
                    </div>
                    <p className="text-sm text-earth-500 mt-1">{notif.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-earth-900 mb-6">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                <MessageSquare className="mx-auto text-earth-600 mb-4" size={32} />
                <h4 className="font-bold text-earth-900 mb-2">Chat with us</h4>
                <p className="text-sm text-earth-500">Get instant help from our support team.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                <AlertCircle className="mx-auto text-earth-600 mb-4" size={32} />
                <h4 className="font-bold text-earth-900 mb-2">Raise a Complaint</h4>
                <p className="text-sm text-earth-500">Report an issue with your order or account.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm">
              <h3 className="text-lg font-bold text-earth-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {['How do I track my order?', 'What is the return policy?', 'How can I become an artisan?'].map((q, i) => (
                  <div key={i} className="pb-4 border-b border-earth-100 last:border-0 last:pb-0 cursor-pointer hover:text-earth-600 transition-colors flex justify-between items-center">
                    <span className="font-medium">{q}</span>
                    <ChevronRight size={16} className="text-earth-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-3xl p-4 border border-earth-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-4 p-4 mb-4 border-b border-earth-100">
                <div className="w-12 h-12 bg-earth-200 rounded-full flex items-center justify-center text-earth-500 font-serif font-bold text-xl">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-earth-900">John Doe</h3>
                  <p className="text-xs text-earth-500">john.doe@example.com</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-earth-900 text-white shadow-md' 
                          : 'text-earth-600 hover:bg-earth-50 hover:text-earth-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="font-bold text-sm">{tab.label}</span>
                      </div>
                      <ChevronRight size={16} className={isActive ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  );
                })}
                
                <div className="pt-4 mt-4 border-t border-earth-100">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
