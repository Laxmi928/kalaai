import React, { useState, useEffect } from 'react';
import { TrendingUp, Loader2, ArrowUpRight, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getTrendData } from '../../services/aiService';

const TrendPrediction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const trends = await getTrendData();
        setData(trends);
      } catch (error) {
        console.error(error);
        // Fallback data
        setData([
          { name: 'Pottery', demand: 85, growth: 12 },
          { name: 'Textiles', demand: 92, growth: 8 },
          { name: 'Jewelry', demand: 78, growth: 15 },
          { name: 'Woodwork', demand: 65, growth: 5 },
          { name: 'Paintings', demand: 70, growth: 10 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  const COLORS = ['#FF6321', '#5A5A40', '#D1C4AF', '#3D3D2B', '#E8E2D6'];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-serif font-bold mb-4 text-earth-900">Market Trend Prediction</h3>
        <p className="text-earth-900/70 font-medium">AI-driven insights to help you decide what to create next.</p>
      </div>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-terracotta animate-spin" />
          <p className="font-bold text-earth-900">Analyzing global market data...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-earth-200">
            <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-terracotta" /> Demand Forecast by Category
            </h4>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#3d3d2b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#3d3d2b', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f5f2ed'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="demand" radius={[10, 10, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-earth-800 text-white p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden">
              <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-white/10" />
              <h4 className="text-lg font-extrabold mb-4 relative z-10">AI Recommendation</h4>
              <p className="text-white/90 text-sm leading-relaxed mb-6 relative z-10 font-medium">
                Based on current trends, we suggest focusing on <span className="text-white font-bold underline decoration-terracotta underline-offset-4">Eco-friendly Home Decor</span>. 
                Demand for sustainable handicrafts is up 24% this month.
              </p>
              <button className="w-full py-3 bg-terracotta rounded-xl text-sm font-bold hover:bg-terracotta/90 transition-all">
                View Design Ideas
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-earth-900 px-2">Top Growing Categories</h4>
              {data.sort((a, b) => b.growth - a.growth).slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-earth-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-earth-100 flex items-center justify-center text-earth-800 font-bold">
                      {idx + 1}
                    </div>
                    <span className="font-bold text-earth-900">{item.name}</span>
                  </div>
                  <div className="flex items-center text-green-600 font-bold text-sm">
                    <ArrowUpRight className="w-4 h-4" /> {item.growth}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendPrediction;
