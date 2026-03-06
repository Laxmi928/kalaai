import React, { useState, useRef } from 'react';
import { ShieldCheck, Download, Loader2, QrCode as QrIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AuthenticityCertificate = () => {
  const [formData, setFormData] = useState({
    artisanName: '',
    craftOrigin: '',
    productName: '',
    materials: ''
  });
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const certRef = useRef(null);

  const generateCert = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate generation delay
    setTimeout(() => {
      const uniqueId = 'KALA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setCertificate({
        ...formData,
        id: uniqueId,
        date: new Date().toLocaleDateString()
      });
      setLoading(false);
    }, 1500);
  };

  const downloadPDF = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#f5f2ed'
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Certificate-${certificate.id}.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-serif font-bold mb-4 text-earth-900">Digital Authenticity Certificate</h3>
        <p className="text-earth-900/70 font-medium">Build trust with global customers through verified craft origins.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <form onSubmit={generateCert} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-earth-900">Artisan Name</label>
            <input 
              type="text" 
              required
              value={formData.artisanName}
              onChange={(e) => setFormData({...formData, artisanName: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none" 
              placeholder="e.g. Ramesh Kumar" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-earth-900">Craft Origin</label>
            <input 
              type="text" 
              required
              value={formData.craftOrigin}
              onChange={(e) => setFormData({...formData, craftOrigin: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none" 
              placeholder="e.g. Jaipur, Rajasthan" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-earth-900">Product Name</label>
            <input 
              type="text" 
              required
              value={formData.productName}
              onChange={(e) => setFormData({...formData, productName: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none" 
              placeholder="e.g. Hand-painted Terracotta Vase" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-earth-900">Materials Used</label>
            <input 
              type="text" 
              required
              value={formData.materials}
              onChange={(e) => setFormData({...formData, materials: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-earth-100 border-none focus:ring-2 focus:ring-terracotta outline-none" 
              placeholder="e.g. Natural Clay, Organic Pigments" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
            Generate Certificate
          </button>
        </form>

        <div className="relative">
          {certificate ? (
            <div className="space-y-6">
              <div 
                ref={certRef}
                className="aspect-[1.414/1] bg-earth-100 rounded-[2rem] p-12 border-8 border-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
                style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #fdfcfb 0%, #f5f2ed 100%)'}}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-earth-800/20 rounded-tl-[2rem]" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-earth-800/20 rounded-br-[2rem]" />
                
                <div className="text-center space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-earth-800 rounded-2xl flex items-center justify-center text-white">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-earth-900 tracking-widest uppercase">Certificate of Authenticity</h2>
                  <div className="h-px w-32 bg-terracotta mx-auto" />
                </div>

                <div className="space-y-6 text-center">
                  <p className="text-earth-900/80 font-serif italic text-lg">This document certifies that the following item is a genuine handmade creation by</p>
                  <h3 className="text-4xl font-serif font-bold text-earth-800">{certificate.artisanName}</h3>
                  <div className="grid grid-cols-2 gap-8 text-left max-w-md mx-auto pt-4">
                    <div>
                      <div className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest mb-1">Product</div>
                      <div className="text-sm font-bold text-earth-900">{certificate.productName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest mb-1">Origin</div>
                      <div className="text-sm font-bold text-earth-900">{certificate.craftOrigin}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-8">
                  <div className="text-left">
                    <div className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest mb-1">Certificate ID</div>
                    <div className="text-xs font-mono font-bold text-earth-900">{certificate.id}</div>
                    <div className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest mt-2">Date Issued</div>
                    <div className="text-xs font-bold text-earth-900">{certificate.date}</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-earth-200">
                    <QRCodeSVG value={`https://kalaai.com/verify/${certificate.id}`} size={64} />
                  </div>
                </div>
              </div>
              <button 
                onClick={downloadPDF}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> Download PDF Certificate
              </button>
            </div>
          ) : (
            <div className="h-full min-h-[400px] bg-earth-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-10 border border-earth-200 opacity-40">
              <ShieldCheck className="w-20 h-20 text-earth-800 mb-6" />
              <p className="font-bold text-earth-900">Your certificate will appear here</p>
              <p className="text-sm">Fill the artisan and product details to generate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticityCertificate;
