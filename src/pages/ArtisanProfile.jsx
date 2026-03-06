import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Star, Users, Briefcase, Heart, Share2, ChevronRight, ShoppingBag } from 'lucide-react';
import { artisans } from '../data/artisans';
import { products } from '../data/products';

import { useWishlist } from '../context/WishlistContext.jsx';
import ImageWithFallback from '../components/ImageWithFallback.jsx';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-2xl overflow-hidden border border-earth-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <ImageWithFallback 
            src={product.images[0]} 
            alt={product.name}
            className="group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 p-2 backdrop-blur-sm rounded-full transition-all shadow-sm z-10 ${
            isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-earth-600 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "scale-110 transition-transform" : ""} />
        </button>
      </div>
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-serif font-bold text-earth-900 group-hover:text-earth-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-earth-900">₹{product.price.toLocaleString()}</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ArtisanProfile() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [artisanProducts, setArtisanProducts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const foundArtisan = artisans.find(a => a.id === id);
    if (foundArtisan) {
      setArtisan(foundArtisan);
      const foundProducts = products.filter(p => p.artisanId === id);
      setArtisanProducts(foundProducts);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!artisan) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-earth-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-earth-100 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-earth-50 shadow-2xl">
                <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-earth-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                Verified Artisan
              </div>
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-earth-900 mb-2">{artisan.name}</h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-earth-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={18} />
                      <span className="font-medium">{artisan.region}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={18} />
                      <span className="font-medium">{artisan.specialization}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-center md:justify-end">
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all shadow-md active:scale-95 ${
                      isFollowing 
                      ? 'bg-earth-100 text-earth-700 border border-earth-200' 
                      : 'bg-earth-900 text-white hover:bg-earth-800'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow Artisan'}
                  </button>
                  <button className="p-3 border border-earth-200 rounded-2xl text-earth-600 hover:bg-earth-50 transition-all active:scale-95">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 py-6 border-y border-earth-100 max-w-lg mx-auto md:mx-0">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-earth-900">{artisan.experience}</div>
                  <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Experience</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-earth-900">{artisan.followers.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Followers</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-earth-900">{artisan.rating}</div>
                  <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Rating</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-earth-900">The Story</h3>
                <p className="text-earth-700 leading-relaxed italic text-lg">
                  "{artisan.story}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Artisan's Products */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif font-bold text-earth-900">Artisan's Collection</h2>
            <div className="flex items-center gap-2 text-earth-500 font-medium">
              <ShoppingBag size={20} />
              <span>{artisanProducts.length} Products</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artisanProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
