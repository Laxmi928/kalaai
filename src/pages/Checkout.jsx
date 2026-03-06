import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ShieldCheck, Truck, CreditCard, CheckCircle2, ArrowRight, MapPin, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-earth-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-earth-200 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                step >= s ? 'bg-earth-900 text-white' : 'bg-white text-earth-400 border-2 border-earth-200'
              }`}
            >
              {step > s ? <CheckCircle2 size={20} /> : s}
              <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap ${
                step >= s ? 'text-earth-900' : 'text-earth-400'
              }`}>
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Complete'}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-earth-100 shadow-xl"
            >
              <h2 className="text-3xl font-serif font-bold text-earth-900 mb-8 flex items-center gap-3">
                <Truck className="text-earth-600" />
                Shipping Information
              </h2>
              <form onSubmit={nextStep} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-900">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-900">Street Address</label>
                  <input 
                    type="text" 
                    name="address"
                    required
                    className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">City</label>
                    <input 
                      type="text" 
                      name="city"
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">State</label>
                    <input 
                      type="text" 
                      name="state"
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">ZIP Code</label>
                    <input 
                      type="text" 
                      name="zip"
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-earth-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-earth-800 transition-all shadow-xl mt-8"
                >
                  Continue to Payment
                  <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-earth-100 shadow-xl"
            >
              <h2 className="text-3xl font-serif font-bold text-earth-900 mb-8 flex items-center gap-3">
                <CreditCard className="text-earth-600" />
                Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="p-4 border-2 border-earth-900 rounded-2xl flex flex-col items-center gap-2 bg-earth-50">
                  <CreditCard className="text-earth-900" />
                  <span className="text-xs font-bold uppercase tracking-widest text-earth-900">Credit Card</span>
                </button>
                <button className="p-4 border-2 border-earth-100 rounded-2xl flex flex-col items-center gap-2 hover:border-earth-200 transition-all">
                  <div className="w-6 h-6 bg-earth-200 rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-widest text-earth-400">UPI / Net Banking</span>
                </button>
              </div>
              <form onSubmit={nextStep} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-900">Name on Card</label>
                  <input 
                    type="text" 
                    name="cardName"
                    required
                    className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-900">Card Number</label>
                  <input 
                    type="text" 
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    required
                    className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">Expiry Date</label>
                    <input 
                      type="text" 
                      name="expiry"
                      placeholder="MM/YY"
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">CVV</label>
                    <input 
                      type="password" 
                      name="cvv"
                      placeholder="***"
                      required
                      className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-earth-500 outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800">
                  <ShieldCheck size={20} />
                  <span className="text-sm font-medium">Your payment information is encrypted and secure.</span>
                </div>
                <div className="flex gap-4 pt-8">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-4 border border-earth-200 rounded-2xl font-bold text-earth-600 hover:bg-earth-50 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] bg-earth-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-earth-800 transition-all shadow-xl"
                  >
                    Complete Purchase
                    <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-earth-100 shadow-2xl"
            >
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-earth-900 mb-4">Order Confirmed!</h2>
              <p className="text-earth-600 text-lg mb-12 max-w-md mx-auto">
                Thank you for supporting local artisans. Your order #KALA-82931 has been placed and is being prepared for shipment.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12">
                <div className="p-4 bg-earth-50 rounded-2xl border border-earth-100">
                  <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest mb-1">Estimated Delivery</div>
                  <div className="text-lg font-bold text-earth-900">March 12 - 15</div>
                </div>
                <div className="p-4 bg-earth-50 rounded-2xl border border-earth-100">
                  <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest mb-1">Carrier</div>
                  <div className="text-lg font-bold text-earth-900">Kala Express</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/shop"
                  className="px-8 py-4 bg-earth-900 text-white rounded-2xl font-bold hover:bg-earth-800 transition-all shadow-xl"
                >
                  Continue Shopping
                </Link>
                <button className="px-8 py-4 border border-earth-200 rounded-2xl font-bold text-earth-600 hover:bg-earth-50 transition-all">
                  Track Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
