
import React, { useState, useEffect, useRef } from 'react';
import { Home, Briefcase, Calendar, Zap, User, ChevronLeft, ArrowRight, X, Hammer, Activity, LayoutGrid, Scissors, MessageSquare, ShoppingBag, Map } from 'lucide-react';
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
            className="text-[9px] text-white/40 font-bold font-sans"
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
    <div className="text-[10px] font-bold truncate max-w-[200px] text-center flex-1 font-sans tracking-normal">{title}</div>
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
    { id: 'wardrobe', label: 'Wardrobe', icon: Briefcase },
    { id: 'drops', label: 'Shop', icon: ShoppingBag },
    { id: 'mto', label: 'MTO', icon: Scissors },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none mobile-stage-fixed px-4">
      {/* Refined Glass Effect: 10% black, heavy blur, subtle border */}
      <div className="pointer-events-auto bg-black/10 backdrop-blur-2xl border border-white/20 rounded-full py-4 px-7 flex items-center justify-between gap-6 shadow-2xl">
        
        {navItems.map((item) => {
          // Highlight logic to include sub-screens
          const isActive = 
            current === item.id || 
            (item.id === 'wardrobe' && current === 'wardrobe-detail') ||
            (item.id === 'drops' && ['collection-landing', 'capsule-carousel', 'capsule-confirm'].includes(current));

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

// --- Offline Script Data ---
const OFFLINE_SCRIPT = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'how are you', 'sophia', 'sofia'],
    responses: [
      "Hello. Always nice to hear from you. How can I help today?",
      "Hi, I’m here. What would you like to look at?",
      "Good evening. I hope your day went well. Tell me what you need and I’ll take care of it."
    ]
  },
  // ... existing script content ...
];

const FALLBACK_RESPONSES = [
  "Of course. Just to be sure I guide you properly, is this about a product, an order, or an event?",
  "I’m here. Tell me a bit more and I’ll handle it.",
  "Let me know what you’d like to do and I’ll take care of the details."
];

const getOfflineResponse = (text: string) => {
  const lowerText = text.toLowerCase();
  for (const category of OFFLINE_SCRIPT) {
    if (category.keywords.some(k => lowerText.includes(k))) {
      return category.responses[Math.floor(Math.random() * category.responses.length)];
    }
  }
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
};

export const ChatBottomSheet: React.FC<{ onClose: () => void; ca: { name: string; avatar: string; status: string; replacementName?: string; replacementAvatar?: string } }> = ({ onClose, ca }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setLoading(true);

    try {
        if (!process.env.API_KEY) {
            // Fallback to offline script if no key
             setTimeout(() => {
                const response = getOfflineResponse(userMsg);
                setMessages(prev => [...prev, { text: response, isUser: false }]);
                setLoading(false);
             }, 1000);
             return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: `You are ${ca.name}, a helpful and sophisticated client advisor for Loro Piana. You are polite, concise, and helpful. Answer in plain text.`,
            },
            history: messages.map(m => ({
                role: m.isUser ? 'user' : 'model',
                parts: [{ text: m.text }]
            }))
        });

        const result = await chat.sendMessage({ message: userMsg });
        const responseText = result.text;
        
        setMessages(prev => [...prev, { text: responseText || "I'm listening.", isUser: false }]);
    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback to offline script on error
        const response = getOfflineResponse(userMsg);
        setMessages(prev => [...prev, { text: response, isUser: false }]);
    } finally {
        setLoading(false);
    }
  };

  // Determine active contact for UI
  const activeCA = ca.status === 'On Leave' && ca.replacementName ? {
      name: ca.replacementName,
      avatar: ca.replacementAvatar || ca.avatar,
      role: `Covering for ${ca.name}`,
      statusColor: 'bg-green-500' // Replacement is available
  } : {
      name: ca.name,
      avatar: ca.avatar,
      role: 'Loro Piana Advisor',
      statusColor: ca.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/50 backdrop-blur-sm">
        <div className="bg-[#F4F0EA] rounded-t-[32px] h-[85vh] flex flex-col shadow-2xl overflow-hidden relative mobile-stage-fixed">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#1A1A1A]/5 flex justify-between items-center bg-[#F4F0EA]">
                 <div className="flex items-center gap-3">
                     <div className="relative">
                         <img src={activeCA.avatar} className="w-10 h-10 rounded-full object-cover border border-white/50" />
                         <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#F4F0EA] ${activeCA.statusColor}`} />
                     </div>
                     <div>
                         <div className="text-sm font-bold text-[#1A1A1A] font-sans">{activeCA.name}</div>
                         <div className="text-[10px] text-[#1A1A1A]/60 font-serif italic">{activeCA.role}</div>
                     </div>
                 </div>
                 <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A]/10 transition-colors">
                     <X className="w-4 h-4" />
                 </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F4F0EA]">
                 <div className="text-center text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest font-sans py-4">Today</div>
                 {/* Intro message */}
                 <div className="flex gap-4">
                      <img src={activeCA.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 self-end mb-1" />
                      <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm text-sm font-serif text-[#1A1A1A] max-w-[80%] leading-relaxed">
                          {ca.status === 'On Leave' 
                            ? `Hello Andrea, I'm ${activeCA.name}, covering for ${ca.name} while she is away. How can I assist you today?` 
                            : `Hello Andrea, how can I assist you today with your wardrobe?`}
                      </div>
                 </div>

                 {messages.map((msg, i) => (
                     <div key={i} className={`flex gap-4 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                         {!msg.isUser && <img src={activeCA.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 self-end mb-1" />}
                         <div className={`p-4 rounded-2xl shadow-sm text-sm font-serif max-w-[80%] leading-relaxed ${msg.isUser ? 'bg-[#1A1A1A] text-white rounded-br-none' : 'bg-white text-[#1A1A1A] rounded-bl-none'}`}>
                             {msg.text}
                         </div>
                     </div>
                 ))}
                 {loading && (
                      <div className="flex gap-4">
                          <img src={activeCA.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 self-end mb-1" />
                          <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center h-10">
                              <div className="w-1.5 h-1.5 bg-[#1A1A1A]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-1.5 h-1.5 bg-[#1A1A1A]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-1.5 h-1.5 bg-[#1A1A1A]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                      </div>
                 )}
                 <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[#1A1A1A]/5 pb-8">
                 <div className="flex items-center gap-2 bg-[#F4F0EA] rounded-full px-2 py-2 pr-2">
                     <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent px-4 py-2 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none font-sans"
                        autoFocus
                     />
                     <button onClick={handleSend} disabled={!input.trim()} className="w-10 h-10 bg-[#A64B3E] rounded-full flex items-center justify-center text-white shadow-md disabled:opacity-50 disabled:shadow-none transition-all active:scale-95">
                         <ArrowRight className="w-4 h-4" />
                     </button>
                 </div>
            </div>
        </div>
    </div>
  );
};
