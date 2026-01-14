
import React, { useState, useEffect, useRef } from 'react';
import { Home, Briefcase, Calendar, Zap, User, ChevronLeft, ArrowRight, X, Hammer, Activity, LayoutGrid, Scissors, MessageSquare, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';
import { GoogleGenAI } from "@google/genai";
import { ScreenType } from './types';
import { INITIAL_STATE } from './data';

const LORO_LOGO_URL = "https://raw.githubusercontent.com/marcelorm81/assets/41473fed5684cd9e84ddedc9643cdb368899d648/LOGOloro.svg";

// --- Adaptive Mobile Stage Component ---
export const AdaptiveStage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {/* The Backdrop: Visible only on desktop, acts as the "desk" */}
      <div className="fixed inset-0 -z-50 bg-[#e5e5e5] hidden md:block" />
      
      {/* The Canvas: The actual "device" content container */}
      <div className="
        w-full min-h-[100dvh] bg-[#F4F0EA] relative
        md:w-[var(--stage-width)] md:mx-auto md:shadow-2xl md:min-h-screen
      ">
        {children}
      </div>
    </>
  );
};

// --- Loading Screen Component ---
export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Phase 1: Idle Pulse (The Wait)
    const pulseAnim = gsap.to(logoRef.current, {
        scale: 1.05,
        opacity: 0.8,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    const startTime = Date.now();
    const minDuration = 2000; // 2.0s Minimum Duration to ensure brand presence

    const handleLoad = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDuration - elapsed);

        setTimeout(() => {
            // Phase 2: The Exit (Curtain Lift)
            pulseAnim.kill();
            
            const tl = gsap.timeline({
                onComplete: () => {
                    // Phase 3: Cleanup
                    onComplete(); 
                }
            });

            // Animation A: Content fades up/out
            tl.to([logoRef.current, textRef.current], {
                y: -40,
                opacity: 0,
                duration: 0.6,
                ease: "power2.in"
            });

            // Animation B: Curtain lifts (Standard "unveiling" physics)
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 1.1,
                ease: "power3.inOut"
            }, "-=0.2");

        }, remaining);
    };

    // Wait for Window Load (Assets) + Min Duration
    if (document.readyState === 'complete') {
        handleLoad();
    } else {
        window.addEventListener('load', handleLoad);
        // Safety timeout in case load event hangs
        setTimeout(handleLoad, 6000);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999] bg-[#1A1A1A] flex flex-col items-center justify-center mobile-stage-fixed"
    >
       <div className="flex flex-col items-center gap-8">
          <img 
            ref={logoRef} 
            src={LORO_LOGO_URL} 
            className="w-32 brightness-0 invert opacity-100" 
            alt="Loro Piana"
          />
          <div 
            ref={textRef} 
            className="text-[9px] text-white/40 font-bold uppercase tracking-[0.4em] font-sans"
          >
            Loading Assets
          </div>
       </div>
    </div>
  );
};

export const Header: React.FC<{ title: string; showBack?: boolean; onBack?: () => void; action?: React.ReactNode; dark?: boolean; showProfile?: boolean }> = ({ title, showBack, onBack, action, dark, showProfile = true }) => (
  // Header is sticky, which works naturally inside the flow of the Canvas.
  // Standardized padding and height alignment
  <div className={`flex items-center justify-between px-6 py-5 sticky top-0 backdrop-blur-md z-40 border-b pt-safe transition-colors duration-300 ${dark ? 'bg-[#1A1A1A]/90 border-white/5 text-white' : 'bg-[#F4F0EA]/90 border-black/5 text-[#1A1A1A]'}`}>
    <div className="w-10 flex items-center justify-start">
      {showBack && (
        <button onClick={onBack} className="p-1 -ml-1 active:opacity-50 transition-opacity">
          <ChevronLeft className="w-6 h-6" strokeWidth={1} />
        </button>
      )}
    </div>
    <div className="text-[10px] font-bold tracking-[0.3em] uppercase truncate max-w-[200px] text-center flex-1 font-sans">{title}</div>
    <div className="w-10 flex justify-end items-center">
      {action ? action : (showProfile && (
        // Solid background to prevent transparency issues
        <div className="w-8 h-8 rounded-full p-[1px] bg-white border border-black/5 shadow-sm overflow-hidden">
           <img src={INITIAL_STATE.user.avatar} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </div>
);

export const TabNavigation: React.FC<{ current: ScreenType; onNavigate: (s: ScreenType) => void }> = ({ current, onNavigate }) => {
  // Config for the menu items
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wardrobe', label: 'Wardrobe', icon: LayoutGrid },
    { id: 'drops', label: 'Shop', icon: ShoppingBag },
    { id: 'mto', label: 'MTO', icon: Scissors },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none mobile-stage-fixed px-4">
      {/* Refined Glass Effect: 10% black, heavy blur, subtle border */}
      <div className="pointer-events-auto bg-black/10 backdrop-blur-2xl border border-white/20 rounded-full py-4 px-7 flex items-center justify-between gap-6 shadow-2xl">
        
        {navItems.map((item) => {
          const isActive = current === item.id || (item.id === 'wardrobe' && current === 'wardrobe-detail');
          const Icon = item.icon;
          return (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id as ScreenType)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isActive ? 'text-white scale-110 drop-shadow-md' : 'text-white/60 hover:text-white'}`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-[1px] h-6 bg-white/20" />

        {/* Avatar / Account */}
        <button 
          onClick={() => onNavigate('account')}
          className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all shadow-sm ${current === 'account' ? 'border-white opacity-100' : 'border-white/30 opacity-80 hover:opacity-100'}`}
        >
          <img src={INITIAL_STATE.user.avatar} className="w-full h-full object-cover bg-white" alt="Profile" />
        </button>

      </div>
    </div>
  );
};

export const ChatBottomSheet: React.FC<{ onClose: () => void; ca: any }> = ({ onClose, ca }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: `Good evening, Andrea. How may I assist you with your Loro Piana collection today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMsg }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are Sofia Giordano, a world-class luxury client advisor for Loro Piana. Tone: sophisticated, discreet, helpful. Keep responses concise but elegant.`,
        }
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'll check that for you." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Please forgive me, I'm experiencing a brief connection issue." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Added 'mobile-stage-fixed' to align sheet correctly on desktop
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm mobile-stage-fixed">
      <div className="bg-[#F4F0EA] w-full max-w-lg rounded-t-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-luxury-fade">
        <div className="p-8 border-b border-black/5 flex items-center justify-center relative">
          <div className="flex flex-col items-center gap-2">
            <img src={ca.avatar} className="w-16 h-16 rounded-full object-cover border border-black/5 shadow-md bg-white" />
            <div className="text-center">
              <div className="text-[10px] font-bold text-[#B08D57] uppercase tracking-[0.4em] font-sans">Client Advisor</div>
              <div className="text-xl font-serif italic text-[#1A1A1A] mt-1">{ca.name}</div>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-black/5 rounded-full active:scale-90 transition-transform"><X className="w-5 h-5" strokeWidth={1} /></button>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 rounded-xl text-sm leading-relaxed font-sans ${m.role === 'user' ? 'bg-[#1A1A1A] text-white rounded-tr-none shadow-xl' : 'bg-white text-[#1A1A1A] rounded-tl-none shadow-sm'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-8 pb-12 bg-white/50 backdrop-blur-xl border-t border-black/5">
          <div className="relative flex items-center">
            <input 
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Speak with Sofia..."
              className="w-full bg-[#F4F0EA] py-5 px-8 rounded-full text-sm focus:outline-none font-sans"
            />
            <button onClick={handleSend} className="absolute right-3 p-3 bg-[#1A1A1A] text-white rounded-full active:scale-90 transition-transform shadow-lg"><ArrowRight className="w-4 h-4" strokeWidth={1} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
