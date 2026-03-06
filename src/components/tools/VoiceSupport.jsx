import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, CheckCircle2, Trash2, Play, Square, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { extractDetailsFromSpeech } from '../../services/aiService';

const VoiceSupport = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const transcriptRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-IN';

      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        setError(null);
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone permission denied. Please enable it in your browser settings.');
        } else {
          setError(`Error: ${event.error}. Please try again.`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    } else {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
    }
  }, []);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const startRecording = () => {
    if (recognition) {
      try {
        setTranscript('');
        setDetails(null);
        setError(null);
        setShowSuccess(false);
        recognition.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
        setError('Failed to start recording. Please refresh and try again.');
      }
    }
  };

  const stopRecording = async () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
      setShowSuccess(true);
      
      if (transcript.length > 10) {
        setLoading(true);
        try {
          const result = await extractDetailsFromSpeech(transcript);
          setDetails(result);
        } catch (error) {
          console.error(error);
          setError('AI failed to process the transcript. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setDetails(null);
    setShowSuccess(false);
  };

  const handleTranscriptChange = (e) => {
    setTranscript(e.target.value);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h3 className="text-4xl font-serif font-bold text-earth-900">Voice-Powered Listing</h3>
        <p className="text-earth-900/70 max-w-md mx-auto font-medium">Describe your craft naturally. Our AI will extract the technical details for your marketplace listing.</p>
      </div>

      <div className="space-y-8">
        {/* Mic Visualizer Area */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative z-10 ${
              isListening ? 'bg-terracotta scale-110 animate-pulse-glow' : 'bg-earth-800'
            }`}>
              {isListening ? (
                <MicOff className="w-16 h-16 text-white animate-pulse" />
              ) : (
                <Mic className="w-16 h-16 text-white" />
              )}
            </div>
            
            {/* Waveform Animation */}
            {isListening && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 h-8">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="waveform-bar" 
                    style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 20 + 10}px` }} 
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!isListening ? (
              <button 
                onClick={startRecording}
                className="flex items-center gap-2 px-8 py-4 bg-earth-800 text-white rounded-full font-bold hover:bg-earth-900 transition-all shadow-lg group"
              >
                <Play className="w-5 h-5 fill-current" /> Start Recording
              </button>
            ) : (
              <button 
                onClick={stopRecording}
                className="flex items-center gap-2 px-8 py-4 bg-terracotta text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg animate-bounce"
              >
                <Square className="w-5 h-5 fill-current" /> Stop Recording
              </button>
            )}
            
            <button 
              onClick={clearTranscript}
              disabled={!transcript || isListening}
              className="p-4 text-earth-900/40 hover:text-terracotta transition-colors disabled:opacity-20"
              title="Clear Transcript"
            >
              <RotateCcw className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          {isListening && (
            <div className="flex items-center gap-2 text-terracotta font-bold animate-pulse">
              <div className="w-2 h-2 rounded-full bg-terracotta" />
              Listening...
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 animate-shake">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Transcript Box */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest">Live Transcript</label>
            {showSuccess && !isListening && (
              <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3" /> Recording Complete
              </div>
            )}
          </div>
          <div className="relative group">
            <textarea
              ref={transcriptRef}
              value={transcript}
              onChange={handleTranscriptChange}
              placeholder='Tell us about your craft... e.g. "I am making a hand-carved wooden elephant from Saharanpur teak wood. It takes 3 days to complete..."'
              className="w-full h-48 p-8 bg-earth-100 rounded-[2.5rem] border-2 border-transparent focus:border-earth-300 focus:bg-white transition-all text-xl text-earth-900 leading-relaxed italic resize-none outline-none no-scrollbar"
            />
            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-[10px] font-extrabold text-earth-900/40 uppercase tracking-widest italic">You can edit this text manually</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-white/50 rounded-[2.5rem] border-2 border-dashed border-earth-200">
            <Loader2 className="w-12 h-12 text-terracotta animate-spin" />
            <div className="text-center">
              <p className="text-earth-900 font-bold">AI Processing</p>
              <p className="text-earth-900/60 text-xs italic font-medium">Extracting product details from your voice...</p>
            </div>
          </div>
        )}

        {details && !isListening && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-10 bg-white rounded-[3rem] border border-earth-200 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-[5rem] -mr-8 -mt-8" />
              
              <div className="flex justify-between items-start relative z-10">
                <h4 className="text-2xl font-serif font-bold text-earth-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  AI Extracted Details
                </h4>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest">Product Type</div>
                  <div className="p-5 bg-earth-50 rounded-2xl font-bold text-earth-800 border border-earth-100">{details.productType}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest">Origin</div>
                  <div className="p-5 bg-earth-50 rounded-2xl font-bold text-earth-800 border border-earth-100">{details.origin}</div>
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest">Materials Used</div>
                  <div className="p-5 bg-earth-50 rounded-2xl flex flex-wrap gap-3 border border-earth-100">
                    {details.materials.map((m, i) => (
                      <span key={i} className="px-4 py-2 bg-earth-800 text-white text-xs font-bold rounded-xl shadow-sm">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="text-[10px] font-extrabold text-earth-900/60 uppercase tracking-widest">Listing Summary</div>
                  <div className="p-6 bg-earth-50 rounded-2xl text-earth-900/70 leading-relaxed border border-earth-100 italic">
                    "{details.summary}"
                  </div>
                </div>
              </div>
            </div>
            
            <button className="btn-primary w-full py-6 text-xl shadow-2xl shadow-earth-800/20 flex items-center justify-center gap-3">
              Confirm & Create Listing <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VoiceSupport;
