import React, { useState } from 'react';
import { Heart, Loader2, Send, Sparkles } from 'lucide-react';
import { generateStory } from '../../services/aiService';

const StorytellingAssistant = () => {
  const [formData, setFormData] = useState({
    name: '',
    craftType: '',
    experience: '',
    background: ''
  });
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateStory(formData);
      setStory(result);
    } catch (error) {
      console.error(error);
      alert("Failed to generate story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-serif font-bold mb-4 text-earth-900">Craft Storytelling Assistant</h3>
        <p className="text-earth-900/70 font-medium">Turn your personal journey into a powerful brand narrative.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-earth-900">Artisan Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none" 
              placeholder="e.g. Ramesh Kumar" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-earth-900">Craft Type</label>
            <input 
              type="text" 
              required
              value={formData.craftType}
              onChange={(e) => setFormData({...formData, craftType: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none" 
              placeholder="e.g. Blue Pottery" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-earth-900">Years of Experience</label>
            <input 
              type="number" 
              required
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none" 
              placeholder="e.g. 25" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-earth-900">Cultural Background</label>
            <textarea 
              required
              value={formData.background}
              onChange={(e) => setFormData({...formData, background: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none h-32 resize-none" 
              placeholder="e.g. Third generation artisan from Jaipur, learned from my grandfather..." 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate My Story
          </button>
        </form>

        <div className="relative">
          <div className="h-full min-h-[400px] bg-earth-100 rounded-[2.5rem] p-10 border border-earth-200 relative overflow-hidden">
            <Heart className="absolute -bottom-10 -right-10 w-40 h-40 text-terracotta/5" />
            
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="w-12 h-12 text-terracotta animate-spin" />
                <p className="text-earth-900/70 font-bold italic">Weaving your story together...</p>
              </div>
            ) : story ? (
              <div className="space-y-6 relative z-10">
                <h4 className="text-2xl font-serif font-bold text-earth-800 italic">Your Brand Narrative</h4>
                <div className="prose prose-earth max-w-none">
                  <p className="text-earth-900/80 leading-relaxed whitespace-pre-wrap">{story}</p>
                </div>
                <button className="flex items-center gap-2 text-terracotta font-bold hover:underline">
                  <Send className="w-4 h-4" /> Copy to Marketplace
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                <Sparkles className="w-12 h-12 text-earth-800" />
                <p className="font-medium">Fill the form to see your story come to life.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorytellingAssistant;
