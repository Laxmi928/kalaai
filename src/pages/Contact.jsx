import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-earth-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 bg-earth-100 text-earth-700 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            Get in Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold text-earth-900"
          >
            We'd Love to Hear from You
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-earth-600"
          >
            Whether you're an artisan looking to join or a customer with a question, our team is here to help.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-earth-100 shadow-sm space-y-8">
              <h3 className="text-2xl font-serif font-bold text-earth-900">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-earth-50 rounded-2xl flex items-center justify-center text-earth-900 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-earth-500 uppercase tracking-widest">Email Us</div>
                    <div className="text-lg font-bold text-earth-900">hello@kalaai.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-earth-50 rounded-2xl flex items-center justify-center text-earth-900 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-earth-500 uppercase tracking-widest">Call Us</div>
                    <div className="text-lg font-bold text-earth-900">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-earth-50 rounded-2xl flex items-center justify-center text-earth-900 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-earth-500 uppercase tracking-widest">Visit Us</div>
                    <div className="text-lg font-bold text-earth-900">Artisan Hub, Jaipur, Rajasthan, India</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-earth-50">
                <div className="text-sm font-bold text-earth-500 uppercase tracking-widest mb-4">Follow Our Journey</div>
                <div className="flex gap-4">
                  {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map(social => (
                    <a key={social} href="#" className="w-10 h-10 rounded-full bg-earth-50 flex items-center justify-center hover:bg-earth-900 hover:text-white transition-all">
                      <div className="w-5 h-5 border border-current rounded-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-earth-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <h4 className="text-xl font-serif font-bold mb-4 relative z-10">Are you an Artisan?</h4>
              <p className="text-white/70 mb-8 relative z-10">
                Join our community of 10,000+ master craftsmen and take your heritage to the global stage.
              </p>
              <button className="w-full py-4 bg-white text-earth-900 rounded-2xl font-bold hover:bg-earth-100 transition-all flex items-center justify-center gap-2">
                Register as Artisan
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-earth-100 shadow-xl">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Send size={32} />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-earth-900">Message Sent!</h2>
                  <p className="text-earth-600 max-w-md mx-auto">
                    Thank you for reaching out. Our team will get back to you within 24-48 hours.
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-earth-900 font-bold underline underline-offset-8"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-earth-900">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-earth-900">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">Subject</label>
                    <select className="w-full px-6 py-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 outline-none transition-all appearance-none">
                      <option>General Inquiry</option>
                      <option>Artisan Registration</option>
                      <option>Order Support</option>
                      <option>Partnership Opportunities</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-900">Your Message</label>
                    <textarea 
                      required
                      placeholder="How can we help you today?"
                      className="w-full px-6 py-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 outline-none transition-all h-48 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full bg-earth-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-earth-800 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Globe className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
