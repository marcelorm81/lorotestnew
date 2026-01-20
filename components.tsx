
import React, { useState, useEffect, useRef } from 'react';
import { Home, Briefcase, Calendar, Zap, User, ChevronLeft, ArrowRight, X, Hammer, Activity, LayoutGrid, Scissors, MessageSquare, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';
import { GoogleGenAI } from "@google/genai";
import { ScreenType } from './types';
import { INITIAL_STATE } from './data';

const LORO_LOGO_URL = "https://raw.githubusercontent.com/marcelorm81/assets/41473fed5684cd9e84ddedc9643cdb368899d648/LOGOloro.svg";

// Custom Hanger Icon for Wardrobe
const HangerIcon = ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 75 54" 
    fill="none" 
    className={className}
  >
    <path d="M37.0641 18.0479C37.0639 17.0246 36.348 16.0288 35.0748 15.4386C33.983 14.9324 32.8287 14.1681 31.9557 12.9327C31.0741 11.6849 30.5641 10.0764 30.5641 8.03133C30.5641 4.43267 31.8599 2.21462 33.7789 1.03621C35.5397 -0.0449464 37.5259 -0.0541048 38.6364 0.0332843C39.9508 0.050581 41.784 0.536441 43.317 1.9161C44.9266 3.36471 46.0641 5.66835 46.0641 9.03133H43.0641C43.0641 6.39443 42.2006 4.94798 41.3102 4.14657C40.3719 3.30209 39.2452 3.03141 38.5641 3.03133H38.5016L38.4391 3.02645C37.5387 2.95142 36.3097 3.00156 35.3483 3.59188C34.5174 4.10207 33.5641 5.21769 33.5641 8.03133C33.5641 9.55674 33.936 10.5362 34.4059 11.2013C34.8846 11.8787 35.5524 12.3534 36.3366 12.7169C38.3033 13.6287 40.0639 15.5001 40.0641 18.0479V18.8175L72.9518 45.5391C76.2396 48.2108 74.3505 53.5313 70.1139 53.5313H4.50843C0.192333 53.5313 -1.64771 48.0439 1.79554 45.4415L37.0641 18.7843V18.0479ZM3.60414 47.835C2.45656 48.7026 3.06978 50.5313 4.50843 50.5313H70.1139C71.526 50.5313 72.1559 48.7579 71.0602 47.8673L38.5299 21.4366L3.60414 47.835Z" fill="currentColor"/>
  </svg>
);

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
    <div className="text-[10px] font-bold truncate max-w-[200px] text-center flex-1 font-sans">{title}</div>
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
    { id: 'wardrobe', label: 'Wardrobe', icon: HangerIcon },
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
  {
    keywords: ['new', 'new arrivals', 'collection', 'latest', 'just arrived', 'season', 'drop'],
    responses: [
      "We’ve just received a few beautiful pieces. You’ll find them in the Collections section.",
      "There are some new arrivals that fit your style very well. I can guide you through them if you like.",
      "If you want, I can shortlist the most relevant pieces for you and come back with a suggestion."
    ]
  },
  {
    keywords: ['exclusive', 'limited', 'early access', 'reserve', 'hold'],
    responses: [
      "There is a limited drop available right now. If anything speaks to you, I can reserve it immediately.",
      "Some pieces are quite rare. I’d suggest we secure them first and you decide calmly after.",
      "Would you like me to place a hold, or would you prefer to confirm first?"
    ]
  },
  {
    keywords: ['available', 'stock', 'sold out', 'size'],
    responses: [
      "Let me check availability for you and I’ll come back shortly.",
      "If it’s limited, I’ll secure it first and confirm details right after.",
      "Tell me the size and colour you’re considering and I’ll take care of the rest."
    ]
  },
  {
    keywords: ['mto', 'made to order', 'bespoke', 'atelier', 'timeline', 'status', 'ready', 'delayed'],
    responses: [
      "I’ll check with the atelier and come back to you with an accurate update.",
      "I prefer to confirm properly rather than guess. I’ll update you later today or tomorrow at the latest.",
      "If there’s any delay, I’ll explain clearly and propose the best option."
    ]
  },
  {
    keywords: ['event', 'invitation', 'rsvp', 'join', 'attend'],
    responses: [
      "This event takes place on the date shown in the app. Would you like me to reserve your place?",
      "If you confirm, I’ll take care of the RSVP and any preferences.",
      "I can also coordinate details around the event if you’d like."
    ]
  },
  {
    keywords: ['wardrobe', 'add item', 'organize', 'missing', 'create wardrobe'],
    responses: [
      "Of course. Tell me what this wardrobe is about and I’ll help you shape it.",
      "If something is missing, I can help locate it or add it manually.",
      "If you’d like, I can also suggest pieces that would complete this wardrobe nicely."
    ]
  },
  {
    keywords: ['measurements', 'fit', 'wife', 'kids', 'family'],
    responses: [
      "Your sizes are already saved, so you shouldn’t need to re-enter anything.",
      "We can also add profiles for your wife or family if you’d like.",
      "If you’re unsure about fit on a specific piece, send it to me and I’ll advise."
    ]
  },
  {
    keywords: ['appointment', 'book', 'visit', 'meet', 'availability'],
    responses: [
      "Of course. Tell me the reason for the visit and your preferred dates.",
      "I’ll prioritise your usual advisor and confirm availability.",
      "Once it’s confirmed, you’ll receive an update here and by email."
    ]
  },
  {
    keywords: ['repair', 'aftercare', 'fix', 'clean', 'service'],
    responses: [
      "Yes, we can take care of that. Tell me the item and what needs attention.",
      "I’ll prepare everything so it’s seamless when you arrive.",
      "I’ll update you as soon as the atelier confirms timing."
    ]
  },
  {
    keywords: ['annoyed', 'upset', 'frustrated', 'disappointed', 'worried'],
    responses: [
      "I understand. Let me take care of this now and I’ll come back to you today.",
      "I’ll handle it personally and keep you updated."
    ]
  }
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

export const ChatBottomSheet: React.FC<{ onClose: () => void; ca: { name: string; avatar: string; status: string } }> = ({ onClose, ca }) => {
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

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/50 backdrop-blur-sm">
        <div className="bg-[#F4F0EA] rounded-t-[32px] h-[85vh] flex flex-col shadow-2xl overflow-hidden relative mobile-stage-fixed">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#1A1A1A]/5 flex justify-between items-center bg-[#F4F0EA]">
                 <div className="flex items-center gap-3">
                     <div className="relative">
                         <img src={ca.avatar} className="w-10 h-10 rounded-full object-cover border border-white/50" />
                         <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#F4F0EA] ${ca.status === 'Online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                     </div>
                     <div>
                         <div className="text-sm font-bold text-[#1A1A1A] font-sans">{ca.name}</div>
                         <div className="text-[10px] text-[#1A1A1A]/60 font-serif italic">Loro Piana Advisor</div>
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
                      <img src={ca.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 self-end mb-1" />
                      <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm text-sm font-serif text-[#1A1A1A] max-w-[80%] leading-relaxed">
                          Hello Andrea, how can I assist you today with your wardrobe?
                      </div>
                 </div>

                 {messages.map((msg, i) => (
                     <div key={i} className={`flex gap-4 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                         {!msg.isUser && <img src={ca.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 self-end mb-1" />}
                         <div className={`p-4 rounded-2xl shadow-sm text-sm font-serif max-w-[80%] leading-relaxed ${msg.isUser ? 'bg-[#1A1A1A] text-white rounded-br-none' : 'bg-white text-[#1A1A1A] rounded-bl-none'}`}>
                             {msg.text}
                         </div>
                     </div>
                 ))}
                 {loading && (
                      <div className="flex gap-4">
                          <img src={ca.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 self-end mb-1" />
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
