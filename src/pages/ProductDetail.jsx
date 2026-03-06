import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Heart, ShoppingCart, ShieldCheck, Truck, RefreshCcw, ChevronRight, User, MapPin, Info } from 'lucide-react';
import { products } from '../data/products';
import { artisans } from '../data/artisans';
import { useWishlist } from '../context/WishlistContext.jsx';
import ImageWithFallback from '../components/ImageWithFallback.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [artisan, setArtisan] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      const foundArtisan = artisans.find(a => a.id === foundProduct.artisanId);
      setArtisan(foundArtisan);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white pt-24 pb-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-earth-800/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-earth-600 mb-8 font-medium">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-earth-900 font-bold truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-earth-200 shadow-[0_10px_30px_rgba(123,97,255,0.08)]">
              <ImageWithFallback 
                src={product.images[activeImage]} 
                alt={product.name}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all shadow-sm ${
                    activeImage === idx ? 'border-terracotta shadow-[0_0_10px_rgba(255,79,163,0.3)]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-earth-100 to-earth-200 text-earth-800 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm border border-emerald-200">
                  Authentic Handmade
                </span>
              </div>
              
              <h1 className="text-4xl font-serif font-bold text-earth-900 leading-tight drop-shadow-sm">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-terracotta">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="drop-shadow-sm" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-earth-900">{product.rating}</span>
                  <span className="ml-1 text-sm text-earth-600 font-medium">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-earth-700 font-medium">
                  <MapPin size={16} className="text-earth-500" />
                  <span>{product.origin}</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-terracotta drop-shadow-sm">
                ₹{product.price.toLocaleString()}
                <span className="ml-2 text-sm font-medium text-earth-500 line-through">₹{(product.price * 1.2).toLocaleString()}</span>
                <span className="ml-2 text-sm font-bold text-emerald-600">20% OFF</span>
              </div>
            </div>

            <p className="text-earth-600 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-earth-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-earth-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-bold text-earth-900 w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-earth-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-earth-500 font-medium">
                  {product.stock} units available in stock
                </span>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-earth-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-earth-800 transition-all shadow-lg active:scale-95">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border rounded-2xl transition-all active:scale-95 ${
                    isWishlisted 
                      ? 'border-red-200 bg-red-50 text-red-500' 
                      : 'border-earth-200 text-earth-600 hover:bg-earth-50 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "scale-110 transition-transform" : ""} />
                </button>
              </div>
              <button className="w-full bg-amber-600 text-white py-4 rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-lg active:scale-95">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-earth-100">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 bg-earth-50 rounded-full flex items-center justify-center text-earth-600">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-bold text-earth-900 uppercase tracking-wider">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 bg-earth-50 rounded-full flex items-center justify-center text-earth-600">
                  <Truck size={20} />
                </div>
                <span className="text-[10px] font-bold text-earth-900 uppercase tracking-wider">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 bg-earth-50 rounded-full flex items-center justify-center text-earth-600">
                  <RefreshCcw size={20} />
                </div>
                <span className="text-[10px] font-bold text-earth-900 uppercase tracking-wider">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Artisan Section */}
        {artisan && (
          <div className="mt-24 bg-earth-50 rounded-[3rem] p-8 md:p-12 border border-earth-100">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-earth-900">Meet the Artisan: {artisan.name}</h2>
                    <p className="text-earth-600 font-medium">{artisan.specialization} • {artisan.region}</p>
                  </div>
                  <Link 
                    to={`/artisan/${artisan.id}`}
                    className="px-6 py-2 bg-white text-earth-900 border border-earth-200 rounded-full font-bold text-sm hover:bg-earth-900 hover:text-white transition-all shadow-sm"
                  >
                    View Profile
                  </Link>
                </div>
                <p className="text-earth-700 leading-relaxed italic">
                  "{artisan.story}"
                </p>
                <div className="flex items-center justify-center md:justify-start gap-8 pt-2">
                  <div>
                    <div className="text-2xl font-bold text-earth-900">{artisan.experience}</div>
                    <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-earth-900">{artisan.followers.toLocaleString()}</div>
                    <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-earth-900">{artisan.rating}</div>
                    <div className="text-[10px] font-bold text-earth-500 uppercase tracking-widest">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Tabs */}
        <div className="mt-24 space-y-12">
          <div className="border-b border-earth-100 flex gap-8">
            <button className="pb-4 border-b-2 border-earth-900 font-bold text-earth-900">Product Details</button>
            <button className="pb-4 text-earth-500 font-medium hover:text-earth-900 transition-colors">Materials & Care</button>
            <button className="pb-4 text-earth-500 font-medium hover:text-earth-900 transition-colors">Shipping & Returns</button>
            <button className="pb-4 text-earth-500 font-medium hover:text-earth-900 transition-colors">Reviews ({product.reviews})</button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-earth-900">Craft Technique</h3>
              <p className="text-earth-600 leading-relaxed">
                {product.technique}. This product is made using traditional methods passed down through generations. Every piece is unique and carries the mark of the artisan's hand.
              </p>
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <Info className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                <p className="text-sm text-amber-800 italic">
                  Note: As this is a handmade product, slight variations in color, size, and pattern are natural and part of its unique charm.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-earth-900">Materials Used</h3>
              <ul className="grid grid-cols-2 gap-4">
                {product.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2 text-earth-700">
                    <div className="w-1.5 h-1.5 bg-earth-400 rounded-full" />
                    {mat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
