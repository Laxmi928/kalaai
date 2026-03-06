import React, { useState } from 'react';
import { Camera, Upload, Loader2, Wand2, ArrowRightLeft } from 'lucide-react';
import { enhanceImage } from '../../services/aiService';

const ImageEnhancer = () => {
  const [original, setOriginal] = useState(null);
  const [enhanced, setEnhanced] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setOriginal(base64);
      setEnhanced(null);
      setLoading(true);
      try {
        const result = await enhanceImage(base64, file.type);
        setEnhanced(result);
      } catch (error) {
        console.error(error);
        alert("Failed to enhance image. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-serif font-bold mb-4 text-earth-900">AI Image Enhancement</h3>
        <p className="text-earth-900/70 font-medium">Professional marketplace photos in seconds. No studio needed.</p>
      </div>

      {!original ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-earth-300 rounded-[2rem] cursor-pointer hover:bg-earth-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-12 h-12 text-earth-800 mb-4" />
            <p className="mb-2 text-sm text-earth-900 font-extrabold">Upload product photo to enhance</p>
            <p className="text-xs text-earth-900/70 font-bold">We'll remove background and improve lighting</p>
          </div>
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
        </label>
      ) : (
        <div className="space-y-8">
          <div className="relative max-w-2xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-earth-100 min-h-[400px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-earth-100/80 backdrop-blur-sm z-20">
                <Loader2 className="w-12 h-12 text-terracotta animate-spin mb-4" />
                <p className="font-bold text-earth-900">Enhancing your craft...</p>
                <p className="text-sm text-earth-900/70 font-bold">Removing background & adjusting lighting</p>
              </div>
            ) : null}

            <img 
              src={showOriginal ? original : (enhanced || original)} 
              alt="Product" 
              className="w-full h-full object-contain" 
            />

            {enhanced && !loading && (
              <button 
                onMouseDown={() => setShowOriginal(true)}
                onMouseUp={() => setShowOriginal(false)}
                onMouseLeave={() => setShowOriginal(false)}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-earth-800/80 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg hover:bg-earth-800 transition-all"
              >
                <ArrowRightLeft className="w-4 h-4" /> Hold to see Original
              </button>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <label className="btn-secondary cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload New
              <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
            </label>
            {enhanced && (
              <button className="btn-primary flex items-center gap-2">
                <Wand2 className="w-4 h-4" /> Download Enhanced
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="text-center p-4 rounded-2xl bg-earth-100">
              <div className="text-terracotta font-bold mb-1">BG Removal</div>
              <div className="text-xs text-earth-900/60 font-bold">Clean Studio Look</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-earth-100">
              <div className="text-terracotta font-bold mb-1">Auto Lighting</div>
              <div className="text-xs text-earth-900/60 font-bold">Perfect Exposure</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-earth-100">
              <div className="text-terracotta font-bold mb-1">HD Sharpness</div>
              <div className="text-xs text-earth-900/60 font-bold">Crisp Details</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEnhancer;
