import React from 'react';
import { motion } from 'motion/react';
import { Heart, Globe, Users, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-earth-100 text-earth-700 rounded-full text-xs font-bold uppercase tracking-widest">
              Our Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-earth-900 leading-tight">
              Empowering the Hands that Create.
            </h1>
            <p className="text-xl text-earth-600 leading-relaxed">
              KalaAI is more than a marketplace. It's a bridge between ancient craft traditions and the digital future, designed to give local artisans the tools they need to thrive in a global economy.
            </p>
            <div className="flex gap-4">
              <Link to="/shop" className="px-8 py-4 bg-earth-900 text-white rounded-2xl font-bold hover:bg-earth-800 transition-all shadow-xl">
                Explore Crafts
              </Link>
              <Link to="/contact" className="px-8 py-4 border border-earth-200 rounded-2xl font-bold text-earth-600 hover:bg-earth-50 transition-all">
                Join Us
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1590736961649-71144539755b?auto=format&fit=crop&q=80&w=800" alt="Artisan at work" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-earth-100 max-w-xs hidden md:block">
              <div className="text-4xl font-serif font-bold text-earth-900 mb-2">10,000+</div>
              <p className="text-earth-600 font-medium">Artisans empowered across 24 states of India.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-earth-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-serif font-bold text-earth-900">Our Core Values</h2>
            <p className="text-earth-600 text-lg">We believe in a world where technology serves tradition, not replaces it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Heart className="text-red-500" />,
                title: "Preserving Heritage",
                desc: "We work directly with artisans to ensure traditional techniques are documented and passed down to future generations."
              },
              {
                icon: <ShieldCheck className="text-emerald-500" />,
                title: "Fair Trade Always",
                desc: "By removing middlemen, we ensure that the majority of every sale goes directly into the hands of the creator."
              },
              {
                icon: <Sparkles className="text-amber-500" />,
                title: "AI for Good",
                desc: "Our AI tools are designed to handle the 'boring' parts of business, letting artisans focus on what they do best: creating."
              }
            ].map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-earth-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-earth-50 rounded-2xl flex items-center justify-center mb-8">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-earth-900 mb-4">{v.title}</h3>
                <p className="text-earth-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=400" alt="" className="rounded-3xl shadow-lg mt-12" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400" alt="" className="rounded-3xl shadow-lg" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl font-serif font-bold text-earth-900">How KalaAI Started</h2>
            <p className="text-earth-600 text-lg leading-relaxed">
              KalaAI began in a small pottery village in Rajasthan. We saw master craftsmen struggling to reach customers beyond their local markets, hampered by language barriers and the complexities of digital marketing.
            </p>
            <p className="text-earth-600 text-lg leading-relaxed">
              We realized that while these artisans were masters of their craft, the digital divide was growing. We built KalaAI to bridge that gap—using cutting-edge AI to handle product listings, storytelling, and global logistics, so the artisans can stay focused on their wheels, looms, and brushes.
            </p>
            <div className="pt-4">
              <Link to="/artisans" className="inline-flex items-center gap-2 text-earth-900 font-bold hover:underline underline-offset-8">
                Meet the Artisans <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="bg-earth-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Ready to support a story?</h2>
            <p className="text-xl text-white/70">Every purchase on KalaAI is a direct investment in a family, a community, and a heritage.</p>
            <div className="pt-8">
              <Link to="/shop" className="px-10 py-5 bg-white text-earth-900 rounded-2xl font-bold text-lg hover:bg-earth-50 transition-all shadow-2xl">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
