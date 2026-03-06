import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Users, Briefcase, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { artisans } from '../data/artisans';

const ArtisanCard = ({ artisan }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white rounded-[2.5rem] p-6 border border-earth-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-earth-50 shadow-lg">
        <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div>
        <h3 className="text-xl font-serif font-bold text-earth-900">{artisan.name}</h3>
        <div className="flex items-center justify-center gap-1 text-earth-500 text-sm font-medium">
          <MapPin size={14} />
          {artisan.region}
        </div>
      </div>
      <div className="px-4 py-1 bg-earth-50 rounded-full text-[10px] font-bold text-earth-700 uppercase tracking-widest border border-earth-100">
        {artisan.specialization}
      </div>
      <p className="text-sm text-earth-600 line-clamp-2 italic">
        "{artisan.story}"
      </p>
      <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-earth-50">
        <div>
          <div className="text-lg font-bold text-earth-900">{artisan.rating}</div>
          <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Rating</div>
        </div>
        <div>
          <div className="text-lg font-bold text-earth-900">{artisan.followers.toLocaleString()}</div>
          <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Followers</div>
        </div>
      </div>
      <Link 
        to={`/artisan/${artisan.id}`}
        className="w-full py-3 bg-earth-900 text-white rounded-2xl font-bold text-sm hover:bg-earth-800 transition-all flex items-center justify-center gap-2"
      >
        View Profile
        <ArrowRight size={16} />
      </Link>
    </div>
  </motion.div>
);

export default function Artisans() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtisans = artisans.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-earth-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl font-serif font-bold text-earth-900 mb-4">Meet Our Master Artisans</h1>
            <p className="text-earth-600 text-lg">
              Every product on KalaAI is handcrafted by skilled artisans who carry centuries of tradition in their hands.
            </p>
          </div>
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" size={20} />
            <input 
              type="text"
              placeholder="Search artisans by name, region, or craft..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-earth-200 rounded-2xl focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredArtisans.map(artisan => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>

        {filteredArtisans.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-serif font-bold text-earth-900 mb-2">No artisans found</h3>
            <p className="text-earth-600">Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
