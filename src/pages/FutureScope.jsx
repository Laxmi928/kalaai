import React from 'react';
import { motion } from 'motion/react';

const FutureScope = () => (
  <section className="py-32 bg-earth-100 min-h-screen flex items-center">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[4rem] p-16 md:p-24 shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full -mr-48 -mt-48" />
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-earth-900 leading-tight">The Future of Craft</h2>
            <p className="text-xl text-earth-900/70 mb-12 leading-relaxed">
              We're not just building a marketplace; we're building a sustainable ecosystem for the next generation of traditional artisans, preserving culture through innovation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "AR/VR Virtual Showrooms",
                "Blockchain Authenticity",
                "AI Design Recommendations",
                "Digital Skill Workshops",
                "Global Logistics Network",
                "Community Hubs"
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 text-lg font-medium text-earth-800"
                >
                  <div className="w-2 h-2 bg-terracotta rounded-full" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600" 
              alt="Future tech and craft" 
              className="rounded-[3rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FutureScope;
