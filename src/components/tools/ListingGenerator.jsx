import React, { useState } from 'react';
import { Camera, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { generateListing } from '../../services/aiService';

const ListingGenerator = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setImage(base64);
      setLoading(true);
      try {
        const data = await generateListing(base64, file.type);
        setResult(data);
      } catch (error) {
        console.error(error);
        alert("Failed to generate listing. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-serif font-bold mb-4 text-earth-900">AI Listing Generator</h3>
        <p className="text-earth-900/70 font-medium">Upload a photo and let AI write your product details.</p>
      </div>

      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-earth-300 rounded-[2rem] cursor-pointer hover:bg-earth-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-12 h-12 text-earth-800 mb-4" />
            <p className="mb-2 text-sm text-earth-900 font-extrabold">Click to upload product photo</p>
            <p className="text-xs text-earth-900/70 font-bold">PNG, JPG or WEBP</p>
          </div>
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
        </label>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
            <img src={image} alt="Uploaded product" className="w-full h-full object-cover" />
            {loading && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p className="font-medium">AI is analyzing your craft...</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {result ? (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-earth-900 uppercase tracking-wider">Product Title</label>
                  <input 
                    type="text" 
                    value={result.title} 
                    onChange={(e) => setResult({...result, title: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none font-bold text-lg" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-earth-900 uppercase tracking-wider">Description</label>
                  <textarea 
                    value={result.description} 
                    onChange={(e) => setResult({...result, description: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none h-40 resize-none leading-relaxed" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-earth-900 uppercase tracking-wider">Materials</label>
                    <div className="flex flex-wrap gap-2">
                      {result.materials.map((m, i) => (
                        <span key={i} className="px-3 py-1 bg-earth-800 text-white text-xs rounded-full">{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-earth-900 uppercase tracking-wider">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-terracotta text-white text-xs rounded-full">#{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Save Listing
                </button>
              </>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-earth-200 rounded-[2rem]">
                <p className="text-earth-900/60 italic font-medium">Waiting for AI analysis...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingGenerator;
