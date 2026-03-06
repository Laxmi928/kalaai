import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, PlusCircle, Package, ShoppingBag, 
  TrendingUp, MessageSquare, Settings, LogOut,
  Mic, Image as ImageIcon, FileText, DollarSign,
  Star, Sparkles, Languages, Upload, CheckCircle,
  MapPin, Camera, CreditCard
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const earningsData = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 4500 },
  { name: 'May', earnings: 6000 },
  { name: 'Jun', earnings: 5500 },
];

const bestSellingData = [
  { name: 'Terracotta Pot', sales: 120 },
  { name: 'Silk Saree', sales: 98 },
  { name: 'Madhubani Art', sales: 86 },
  { name: 'Brass Lamp', sales: 75 },
];

const ordersData = [
  { id: 'ORD-001', product: 'Hand-painted Terracotta Vase', buyer: 'Rahul Sharma', status: 'Pending', payment: 'Paid', image: 'https://picsum.photos/seed/vase/100/100' },
  { id: 'ORD-002', product: 'Banarasi Silk Saree', buyer: 'Priya Patel', status: 'Shipped', payment: 'Paid', image: 'https://picsum.photos/seed/saree/100/100' },
  { id: 'ORD-003', product: 'Madhubani Wall Art', buyer: 'Amit Kumar', status: 'Pending', payment: 'Pending', image: 'https://picsum.photos/seed/art/100/100' },
];

export default function ArtisanDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'add-product', label: 'Add New Product', icon: PlusCircle },
    { id: 'my-products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders Received', icon: ShoppingBag },
    { id: 'analytics', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'messages', label: 'Customer Messages', icon: MessageSquare },
    { id: 'settings', label: 'Profile Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} />;
      case 'add-product':
        return <AddProduct />;
      case 'orders':
        return <OrdersReceived />;
      case 'analytics':
        return <SalesAnalytics />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-earth-400">Coming Soon</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 pt-20 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-earth-200 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out pt-20 lg:pt-0 flex flex-col`}>
        <div className="p-6 border-b border-earth-100">
          <h2 className="text-xl font-serif font-bold text-earth-900">Artisan Studio</h2>
          <p className="text-sm text-earth-500">Welcome back, Ramesh</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                ? 'bg-gradient-to-r from-terracotta/10 to-[#FF7EB3]/10 text-terracotta border border-terracotta/20' 
                : 'text-earth-600 hover:bg-earth-50 hover:text-earth-900'
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-terracotta' : 'text-earth-400'} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-earth-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-terracotta text-white rounded-full shadow-xl"
      >
        <LayoutDashboard size={24} />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Sub-components

const DashboardHome = ({ setActiveTab }) => (
  <div className="space-y-8">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-serif font-bold text-earth-900 mb-2">Dashboard Overview</h1>
        <p className="text-earth-600">Here's what's happening with your store today.</p>
      </div>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Total Earnings', value: '₹45,200', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { title: 'Orders This Month', value: '24', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Product Ratings', value: '4.8/5', icon: Star, color: 'text-amber-600', bg: 'bg-amber-100' },
        { title: 'AI Suggestion', value: 'Trending: Brass Lamps', icon: Sparkles, color: 'text-terracotta', bg: 'bg-terracotta/10' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
            <stat.icon size={24} className={stat.color} />
          </div>
          <div>
            <p className="text-sm font-medium text-earth-500">{stat.title}</p>
            <p className="text-xl font-bold text-earth-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Quick Actions */}
    <div>
      <h2 className="text-xl font-bold text-earth-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        <button onClick={() => setActiveTab('add-product')} className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl border border-earth-200 hover:border-terracotta hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-full bg-earth-50 flex items-center justify-center group-hover:bg-terracotta/10 transition-colors">
            <PlusCircle size={24} className="text-earth-600 group-hover:text-terracotta" />
          </div>
          <span className="font-medium text-earth-800">Add Product</span>
        </button>
        <button onClick={() => setActiveTab('add-product')} className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl border border-earth-200 hover:border-terracotta hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-full bg-earth-50 flex items-center justify-center group-hover:bg-terracotta/10 transition-colors">
            <Mic size={24} className="text-earth-600 group-hover:text-terracotta" />
          </div>
          <span className="font-medium text-earth-800">Add via Voice</span>
        </button>
        <button onClick={() => setActiveTab('add-product')} className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl border border-earth-200 hover:border-terracotta hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-full bg-earth-50 flex items-center justify-center group-hover:bg-terracotta/10 transition-colors">
            <ImageIcon size={24} className="text-earth-600 group-hover:text-terracotta" />
          </div>
          <span className="font-medium text-earth-800">Upload Photo</span>
        </button>
      </div>
    </div>
  </div>
);

const AddProduct = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-earth-900 mb-2">Add New Product</h1>
        <p className="text-earth-600">Follow the simple steps to list your craft.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-earth-200 -z-10 rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-terracotta -z-10 rounded-full transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white transition-colors ${step >= s ? 'bg-terracotta text-white' : 'bg-earth-200 text-earth-500'}`}>
            {s}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-earth-100">
        {step === 1 && (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-bold text-earth-900">Step 1: Upload Product Image</h2>
            <div className="border-2 border-dashed border-earth-300 rounded-2xl p-12 hover:bg-earth-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center">
                <Upload size={32} className="text-earth-500" />
              </div>
              <div>
                <p className="font-medium text-earth-900">Click to upload or drag and drop</p>
                <p className="text-sm text-earth-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="btn-primary w-full max-w-xs mx-auto">Next Step</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-earth-900">Step 2: Enter Product Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Product Name</label>
                <input type="text" className="w-full px-4 py-2 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" placeholder="e.g. Hand-painted Terracotta Vase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none">
                    <option>Pottery</option>
                    <option>Textiles</option>
                    <option>Paintings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1">Price (₹)</label>
                  <input type="number" className="w-full px-4 py-2 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" placeholder="e.g. 1500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Material Used</label>
                <input type="text" className="w-full px-4 py-2 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" placeholder="e.g. Natural Clay, Organic Colors" />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="px-6 py-2 rounded-xl font-bold text-earth-600 bg-earth-100 hover:bg-earth-200 w-full">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary w-full">Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-earth-900">Step 3: AI Assistance</h2>
            <p className="text-earth-600">Let AI help you create a compelling listing.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 border border-earth-200 rounded-xl hover:border-terracotta hover:bg-terracotta/5 transition-all text-left">
                <div className="p-2 bg-terracotta/10 rounded-lg text-terracotta"><FileText size={20} /></div>
                <div>
                  <p className="font-bold text-earth-900">Generate Description</p>
                  <p className="text-xs text-earth-500">Auto-write product details</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-earth-200 rounded-xl hover:border-terracotta hover:bg-terracotta/5 transition-all text-left">
                <div className="p-2 bg-terracotta/10 rounded-lg text-terracotta"><Sparkles size={20} /></div>
                <div>
                  <p className="font-bold text-earth-900">Generate Craft Story</p>
                  <p className="text-xs text-earth-500">Tell the cultural background</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-earth-200 rounded-xl hover:border-terracotta hover:bg-terracotta/5 transition-all text-left">
                <div className="p-2 bg-terracotta/10 rounded-lg text-terracotta"><DollarSign size={20} /></div>
                <div>
                  <p className="font-bold text-earth-900">Suggest Best Price</p>
                  <p className="text-xs text-earth-500">Based on market trends</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-earth-200 rounded-xl hover:border-terracotta hover:bg-terracotta/5 transition-all text-left">
                <div className="p-2 bg-terracotta/10 rounded-lg text-terracotta"><Languages size={20} /></div>
                <div>
                  <p className="font-bold text-earth-900">Translate Listing</p>
                  <p className="text-xs text-earth-500">Reach global customers</p>
                </div>
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={() => setStep(2)} className="px-6 py-2 rounded-xl font-bold text-earth-600 bg-earth-100 hover:bg-earth-200 w-full">Back</button>
              <button onClick={() => setStep(4)} className="btn-primary w-full">Next Step</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center py-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-earth-900">Ready to Publish!</h2>
            <p className="text-earth-600 max-w-md mx-auto">Your product listing looks great. It's ready to be shown to customers worldwide.</p>
            
            <div className="flex gap-4 justify-center pt-4">
              <button onClick={() => setStep(3)} className="px-6 py-2 rounded-xl font-bold text-earth-600 bg-earth-100 hover:bg-earth-200">Review Again</button>
              <button className="btn-primary px-8">Publish Product</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OrdersReceived = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-serif font-bold text-earth-900 mb-2">Orders Received</h1>
      <p className="text-earth-600">Manage and ship your customer orders.</p>
    </div>

    <div className="bg-white rounded-3xl shadow-sm border border-earth-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-earth-50 border-b border-earth-200">
              <th className="p-4 font-bold text-earth-700 text-sm">Order ID</th>
              <th className="p-4 font-bold text-earth-700 text-sm">Product</th>
              <th className="p-4 font-bold text-earth-700 text-sm">Buyer</th>
              <th className="p-4 font-bold text-earth-700 text-sm">Status</th>
              <th className="p-4 font-bold text-earth-700 text-sm">Payment</th>
              <th className="p-4 font-bold text-earth-700 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order, i) => (
              <tr key={i} className="border-b border-earth-100 hover:bg-earth-50/50 transition-colors">
                <td className="p-4 text-sm font-medium text-earth-900">{order.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={order.image} alt={order.product} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="text-sm font-medium text-earth-900">{order.product}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-earth-600">{order.buyer}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    order.status === 'Shipped' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    order.payment === 'Paid' ? 'bg-blue-100 text-blue-700' : 'bg-earth-100 text-earth-700'
                  }`}>
                    {order.payment}
                  </span>
                </td>
                <td className="p-4">
                  {order.status === 'Pending' ? (
                    <button className="px-4 py-2 bg-earth-900 text-white text-xs font-bold rounded-lg hover:bg-earth-800 transition-colors">
                      Ship Now
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-earth-100 text-earth-600 text-xs font-bold rounded-lg hover:bg-earth-200 transition-colors">
                      Track
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const SalesAnalytics = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-serif font-bold text-earth-900 mb-2">Sales Analytics</h1>
      <p className="text-earth-600">Track your store's performance and growth.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-earth-100">
        <h3 className="text-lg font-bold text-earth-900 mb-6">Monthly Earnings</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`₹${value}`, 'Earnings']}
              />
              <Line type="monotone" dataKey="earnings" stroke="#FF4FA3" strokeWidth={3} dot={{ r: 4, fill: '#FF4FA3' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Best Selling Products */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-earth-100">
        <h3 className="text-lg font-bold text-earth-900 mb-6">Best Selling Products</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bestSellingData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f9fafb' }}
              />
              <Bar dataKey="sales" fill="#7B61FF" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Customer Location Map Placeholder */}
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-earth-100">
      <h3 className="text-lg font-bold text-earth-900 mb-6">Customer Locations</h3>
      <div className="h-64 bg-earth-50 rounded-2xl border border-earth-200 flex flex-col items-center justify-center text-earth-500">
        <MapPin size={48} className="mb-4 opacity-50" />
        <p className="font-medium">Interactive Map View</p>
        <p className="text-sm">Most of your customers are from Mumbai, Delhi, and Bangalore.</p>
      </div>
    </div>
  </div>
);

const ProfileSettings = () => (
  <div className="space-y-8 max-w-4xl">
    <div>
      <h1 className="text-3xl font-serif font-bold text-earth-900 mb-2">Profile Settings</h1>
      <p className="text-earth-600">Manage your public artisan profile and account details.</p>
    </div>

    <div className="bg-white rounded-3xl shadow-sm border border-earth-100 overflow-hidden">
      <div className="p-8 border-b border-earth-100 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img src="https://picsum.photos/seed/artisan/150/150" alt="Artisan" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-earth-100 text-earth-600 hover:text-terracotta transition-colors">
            <Camera size={16} />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-earth-900">Ramesh Kumar</h2>
          <p className="text-earth-600">Master Potter • 15 Years Experience</p>
        </div>
        <button className="sm:ml-auto px-6 py-2 bg-earth-100 text-earth-900 font-bold rounded-xl hover:bg-earth-200 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Full Name</label>
            <input type="text" defaultValue="Ramesh Kumar" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Village / Region</label>
            <input type="text" defaultValue="Jaipur, Rajasthan" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Craft Specialization</label>
            <input type="text" defaultValue="Blue Pottery" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Years of Experience</label>
            <input type="number" defaultValue="15" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1">About Your Craft (Story)</label>
          <textarea rows="4" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none resize-none" defaultValue="I learned the art of blue pottery from my grandfather. Every piece I make carries the tradition of our family and the vibrant colors of Rajasthan."></textarea>
        </div>

        <div className="pt-6 border-t border-earth-100">
          <h3 className="text-lg font-bold text-earth-900 mb-4 flex items-center gap-2">
            <CreditCard size={20} className="text-earth-500" />
            Bank Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-1">Account Holder Name</label>
              <input type="text" defaultValue="Ramesh Kumar" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-1">Account Number</label>
              <input type="password" defaultValue="1234567890" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-1">IFSC Code</label>
              <input type="text" defaultValue="SBIN0001234" className="w-full px-4 py-2 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-terracotta outline-none" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="btn-primary px-8">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
);
