import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PenTool, Heart, Camera, Mic, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';
import Modal from '../components/Modal.jsx';
import ListingGenerator from '../components/tools/ListingGenerator.jsx';
import StorytellingAssistant from '../components/tools/StorytellingAssistant.jsx';
import ImageEnhancer from '../components/tools/ImageEnhancer.jsx';
import VoiceSupport from '../components/tools/VoiceSupport.jsx';
import TrendPrediction from '../components/tools/TrendPrediction.jsx';
import AuthenticityCertificate from '../components/tools/AuthenticityCertificate.jsx';

const Features = () => {
  const [activeTool, setActiveTool] = useState(null);

  const features = [
    { 
      id: 'listing',
      title: "Listing Generator", 
      desc: "AI writes compelling descriptions from a simple photo, highlighting materials and techniques.", 
      icon: <PenTool />,
      component: <ListingGenerator />
    },
    { 
      id: 'story',
      title: "Storytelling Assistant", 
      desc: "Turns heritage and personal artisan journeys into engaging marketing narratives.", 
      icon: <Heart />,
      component: <StorytellingAssistant />
    },
    { 
      id: 'image',
      title: "Image Enhancement", 
      desc: "Auto-tags and enhances photos for a professional, high-end marketplace look.", 
      icon: <Camera />,
      component: <ImageEnhancer />
    },
    { 
      id: 'voice',
      title: "Voice Support", 
      desc: "Artisans can interact via simple voice commands in their native language.", 
      icon: <Mic />,
      component: <VoiceSupport />
    },
    { 
      id: 'trend',
      title: "Trend Prediction", 
      desc: "AI suggests what designs and colors will sell next season based on global data.", 
      icon: <TrendingUp />,
      component: <TrendPrediction />
    },
    { 
      id: 'cert',
      title: "Authenticity Cert", 
      desc: "Blockchain-backed digital proof of handmade craft to build customer trust.", 
      icon: <ShieldCheck />,
      component: <AuthenticityCertificate />
    },
  ];

  return (
    <section className="py-32 bg-earth-50 text-earth-900 min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-terracotta/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-earth-800/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-800/10 text-terracotta text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Interactive AI Toolbox</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-earth-900">Powerful AI Features</h2>
          <p className="text-xl text-earth-900/60 max-w-2xl mx-auto leading-relaxed font-medium">
            Click on any tool below to experience the power of AI designed specifically for traditional artisans.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              onClick={() => setActiveTool(f)}
              className="p-10 rounded-[3rem] bg-white border border-earth-200 shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-terracotta rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                {React.cloneElement(f.icon, { className: "w-8 h-8 text-white" })}
              </div>
              <h3 className="text-2xl font-extrabold mb-4 text-earth-900 tracking-tight">{f.title}</h3>
              <p className="text-earth-900/70 leading-relaxed text-lg mb-8 font-medium">{f.desc}</p>
              <div className="flex items-center gap-2 text-earth-900 font-extrabold text-sm uppercase tracking-widest group-hover:text-terracotta transition-colors">
                Launch Tool <div className="w-4 h-px bg-terracotta group-hover:w-8 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={!!activeTool} 
        onClose={() => setActiveTool(null)}
      >
        {activeTool?.component}
      </Modal>
    </section>
  );
};

export default Features;
