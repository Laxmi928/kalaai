import React from 'react';
import { motion } from 'motion/react';
import { Camera, Sparkles, MessageSquare, Globe, ShoppingBag } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { title: "Upload Photo", desc: "Artisan takes a photo of their craft using our mobile app.", icon: <Camera /> },
    { title: "AI Analysis", desc: "AI enhances the image and identifies materials and patterns.", icon: <Sparkles /> },
    { title: "Content Creation", desc: "AI generates a story, description, and marketing tags.", icon: <MessageSquare /> },
    { title: "Global Publish", desc: "Product goes live on the global marketplace instantly.", icon: <Globe /> },
    { title: "Direct Sale", desc: "Customer buys, and artisan receives payment directly.", icon: <ShoppingBag /> },
  ];

  return (
    <section className="py-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6">Simple 5-Step Process</h2>
          <p className="text-xl text-earth-900/60 max-w-2xl mx-auto">
            We've simplified the complex world of e-commerce into a few easy steps for our artisans.
          </p>
        </motion.div>
        <div className="relative">
          {/* Progress Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-earth-100 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-white border-8 border-earth-100 rounded-full flex items-center justify-center text-earth-800 shadow-xl mb-8 relative z-10">
                  {React.cloneElement(step.icon, { className: "w-10 h-10" })}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-terracotta text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                </div>
                <h4 className="text-2xl font-serif italic text-earth-800 mb-4">{step.title}</h4>
                <p className="text-earth-900/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
