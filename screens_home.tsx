
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShoppingBag, MapPin, Edit2, ChevronRight, Clock, Circle, X, Search, Check, User, Sparkles, Map, MessageSquare, QrCode, ChevronLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import { Header } from './components';
import { State, ScreenType } from './types';
import { INITIAL_STATE } from './data';

gsap.registerPlugin(Draggable);

const LORO_LOGO_URL = "https://raw.githubusercontent.com/marcelorm81/assets/41473fed5684cd9e84ddedc9643cdb368899d648/LOGOloro.svg";
const LORO_SYMBOL_PNG = "https://raw.githubusercontent.com/marcelorm81/LP_assets/0816650e9d350c07f88b303736084bef893d52bd/LPsymbol.png";

const CAPSULE_PRODUCTS = [
    { id: 'cp1', name: 'Valduggia Crewneck', category: 'Cashmere', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP8892/F03Y/FAP8892_F03Y_MEDIUM.jpg?sw=400&sh=533', color: 'Tundra Melange', size: 'M' },
    { id: 'cp2', name: 'Traveller Jacket', category: 'Outerwear', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP7998/1C73/FAP7998_1C73_MEDIUM.jpg?sw=400&sh=533', color: 'Deep Vicuña', size: '50' },
    { id: 'cp3', name: 'Horsey Bomber', category: 'Outerwear', image: 'https://media.loropiana.com/HYBRIS/FAM/FAM2739/W000/FAM2739_W000_MEDIUM.jpg?sw=400&sh=533', color: 'Navy Blue', size: '50' },
];

const f = (n: number) => n.toString().padStart(2, '0');

// --- Helper for Stacked Cards on Home ---
const TicketShape: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`relative ${className} drop-shadow-2xl`}>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1151 1884" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
       <path fillRule="evenodd" clipRule="evenodd" d="M6 0C2.68629 0 0 2.68631 0 6.00002V1427.02C47.4168 1434.34 83.6365 1473.81 83.6365 1521.39C83.6364 1568.98 47.4167 1608.44 0 1615.76V1877.82C0 1881.13 2.68627 1883.82 5.99998 1883.82H1145C1148.31 1883.82 1151 1881.13 1151 1877.82V1614.98C1107.77 1606.2 1075.33 1569.42 1075.33 1525.37C1075.33 1481.33 1107.77 1444.54 1151 1435.76V6C1151 2.68629 1148.31 0 1145 0H6Z" fill="#F9F8F6"/>
    </svg>
    <div className="relative z-10 h-full w-full flex flex-col">{children}</div>
  </div>
);

export const StackedCards: React.FC<{ items: any[] }> = ({ items }) => {
  const [cards, setCards] = useState(items);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => { cardsRef.current[index] = el; };

  useEffect(() => {
    if (cards.length === 0) return;
    cards.forEach((_, index) => {
       const card = cardsRef.current[index];
       if (!card) return;
       
       const existing = Draggable.get(card);
       if (existing) existing.kill();

       if (index === 0) {
          gsap.to(card, { scale: 1, y: 0, x: 0, opacity: 1, zIndex: 30, duration: 0.5, ease: "power3.out" });
          Draggable.create(card, {
             type: "x",
             trigger: card,
             inertia: true,
             zIndexBoost: false,
             onDragEnd: function() {
                const threshold = 100;
                // @ts-ignore
                const self = this;
                if (self.x > threshold || self.x < -threshold) {
                    const direction = self.x > 0 ? 1 : -1;
                    gsap.to(self.target, {
                        x: direction * window.innerWidth * 1.2,
                        rotation: direction * 15,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            setCards(prev => {
                                const newCards = [...prev];
                                const moved = newCards.shift();
                                if (moved) newCards.push(moved);
                                return newCards;
                            });
                            gsap.set(self.target, { x: 0, rotation: 0 });
                        }
                    });
                } else {
                    gsap.to(self.target, { x: 0, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.75)" });
                }
             }
          });
       } else if (index === 1) {
          gsap.to(card, { scale: 0.80, y: 12, x: 0, rotation: 0, opacity: 1, zIndex: 20, duration: 0.5, ease: "power3.out" });
       } else if (index === 2) {
          gsap.to(card, { scale: 0.70, y: 24, x: 0, rotation: 0, opacity: 0, zIndex: 10, duration: 0.5, ease: "power3.out" });
       } else {
          gsap.to(card, { scale: 0.60, y: 30, x: 0, rotation: 0, opacity: 0, zIndex: 5, duration: 0 });
       }
    });
  }, [cards]);

  return (
    <div className="relative h-[420px] w-full flex justify-center items-center perspective-card">
       {cards.map((item, i) => (
          <div key={item.id || item.title} ref={(el) => addToRefs(el, i)} className="absolute origin-bottom will-change-transform">
            <TicketShape className="w-[220px] h-[360px]">
                <div className="h-[65%] w-full relative overflow-hidden rounded-t-[1px]">
                  <img src={item.image} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-transparent to-transparent opacity-80" />
                </div>
                <div className="h-[35%] w-full flex flex-col items-center justify-center text-[#1A1A1A] p-4 text-center bg-transparent pointer-events-none">
                  <h3 className="text-lg font-serif mb-1 leading-tight select-none">{item.title}</h3>
                  <p className="text-sm font-serif italic text-[#1A1A1A] opacity-80 select-none">{item.location}</p>
                </div>
            </TicketShape>
          </div>
       ))}
    </div>
  );
};

const useAnimatedCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
};

// --- Drops Modules ---

const SearchPill: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (expanded) {
            gsap.to(containerRef.current, { width: 325, duration: 0.5, ease: "power3.out" });
            inputRef.current?.focus();
        } else {
            gsap.to(containerRef.current, { width: 40, duration: 0.5, ease: "power3.out" });
            if (inputRef.current) inputRef.current.value = '';
            inputRef.current?.blur();
        }
    }, [expanded]);

    return (
        <div 
            ref={containerRef}
            className="h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center relative overflow-hidden shadow-lg"
            style={{ width: 40 }}
        >
             <div className={`absolute left-0 h-full flex items-center justify-center pl-3 transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>
                 <Search className="w-4 h-4 text-white/60" />
             </div>

             <input 
                ref={inputRef}
                className={`w-full h-full bg-transparent border-none outline-none text-white text-[13px] pl-10 pr-10 font-sans placeholder:text-white/50 transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}
                placeholder="Search..."
            />
             <button 
                onClick={() => setExpanded(!expanded)} 
                className="w-10 h-10 flex items-center justify-center text-white shrink-0 absolute right-0 z-10 active:scale-90 transition-transform"
            >
                {expanded ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
        </div>
    );
};

const CozySection: React.FC<{ navigate: any }> = ({ navigate }) => {
    const target = useRef(new Date(Date.now() + 846729000)).current; 
    const time = useAnimatedCountdown(target);

    return (
        <section className="relative h-[80vh] w-full overflow-hidden animate-on-scroll">
            <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/a21949bbadb39167a0912d47975f1ff65239fbc9/cozy.png" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#597082]/90 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-6 right-6 text-white">
                <div className="text-sm font-sans tracking-wide mb-2 font-light opacity-80">
                    {f(time.days)} : {f(time.hours)} : {f(time.minutes)} : {f(time.seconds)}
                </div>
                <h2 className="text-[28px] font-sans font-bold mb-1 leading-[1.1]">Get Cozy</h2>
                <p className="text-[28px] font-serif italic font-light opacity-90 leading-[1.1] mb-5">
                    We think you’ll<br/>like our new<br/>après-ski style.
                </p>
                <div className="mt-6">
                    <button 
                        onClick={() => navigate('collection-landing')}
                        className="w-full py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-normal uppercase tracking-normal text-[10px] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-white/20 font-sans"
                    >
                        Discover the New Collection
                    </button>
                </div>
            </div>
        </section>
    );
};

const NewBalanceSection: React.FC = () => {
    const target = useRef(new Date(Date.now() + 33572000)).current;
    const time = useAnimatedCountdown(target);
    const [swiped, setSwiped] = useState(false);
    
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const swipeBtnRef = useRef<HTMLDivElement>(null);
    const swipeKnobRef = useRef<HTMLDivElement>(null);
    const swipeTextRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const initialContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting && videoRef.current) { videoRef.current.play().catch(e=>console.log(e)); observer.unobserve(entry.target); }
            })
        }, { threshold: 0.4 });
        if(sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
       let draggables: Draggable[] = [];
       setTimeout(() => {
           if(swipeKnobRef.current && swipeBtnRef.current && !swiped) {
               gsap.set(swipeKnobRef.current, { x: 0 });
               const maxX = swipeBtnRef.current.offsetWidth - swipeKnobRef.current.offsetWidth - 8;
               draggables = Draggable.create(swipeKnobRef.current, {
                   type: "x", bounds: swipeBtnRef.current, inertia: true, edgeResistance: 0.8, dragClickables: true, trigger: swipeKnobRef.current,
                   onDrag: function() {
                        // @ts-ignore
                        if(swipeTextRef.current) gsap.to(swipeTextRef.current, { opacity: 1 - this.x/maxX * 1.5, duration: 0.1 });
                        // @ts-ignore
                        if(this.x > maxX * 0.95) { gsap.to(this.target, { x: maxX, duration: 0.1 }); this.endDrag(); setSwiped(true); }
                   },
                   onDragEnd: function() {
                       // @ts-ignore
                       if(this.x < maxX * 0.95) { gsap.to(this.target, { x: 0, duration: 0.5, ease: "power3.out" }); if(swipeTextRef.current) gsap.to(swipeTextRef.current, { opacity: 1, duration: 0.5 }); }
                   }
               })
           }
       }, 100);
       return () => { if(draggables) draggables.forEach(d=>d.kill()); }
    }, [swiped]);

    useEffect(() => {
        if(swiped) {
            const tl = gsap.timeline();
            tl.to(initialContentRef.current, { opacity: 0, y: -30, duration: 0.6, ease: "power3.inOut" });
            tl.fromTo(revealRef.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.2)" }, "-=0.2");
        }
    }, [swiped]);

    return (
        <section ref={sectionRef} className="bg-black h-[85vh] w-full relative overflow-hidden font-sans border-t border-white/10 animate-on-scroll">
            <video ref={videoRef} muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" src="https://raw.githubusercontent.com/marcelorm81/LP_assets/e8f8824fd2ef1a691672740c117cd943fb680f31/newbalancereveal.mp4" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute top-6 left-0 right-0 z-20 text-center">
                <div className="text-[12px] font-bold uppercase text-[#B08D57] font-sans tracking-normal">Exclusive Release</div>
            </div>
            <div ref={initialContentRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                <div className="absolute top-16 text-center">
                    <h2 className="text-[28px] font-bold text-white leading-[1.0] font-sans mb-1">New Balance x</h2>
                    <h2 className="text-[28px] font-light text-white font-serif italic leading-normal">Loro Piana</h2>
                </div>
                <div className="text-center mt-[180px]">
                    <div className="text-2xl font-sans font-light text-white tracking-wide opacity-90">{f(time.hours)} : {f(time.minutes)} : {f(time.seconds)}</div>
                </div>
                <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 w-full pointer-events-auto">
                    <div ref={swipeBtnRef} className="w-[85%] max-w-[280px] h-14 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 overflow-hidden relative shadow-2xl">
                        <div ref={swipeTextRef} className="absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase text-white/70 pointer-events-none pl-12 tracking-normal">Swipe to Unlock</div>
                        <div ref={swipeKnobRef} style={{ touchAction: 'none' }} className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg cursor-grab active:cursor-grabbing z-20"><ArrowRight className="w-5 h-5 pointer-events-none" strokeWidth={2} /></div>
                    </div>
                    <div className="w-[70%] max-w-[280px] text-center"><span className="text-[9px] text-[#B08D57] font-bold uppercase tracking-normal">4 pieces left</span></div>
                </div>
            </div>
            <div ref={revealRef} className="absolute bottom-[15px] left-0 right-0 z-30 px-8 pb-8 opacity-0 pointer-events-none flex flex-col items-center justify-end">
                 <div className="text-center space-y-1 mb-6 pointer-events-auto">
                    <div className="text-[12px] font-sans font-normal tracking-normal text-white">NBV6 LoroPiana</div>
                    <div className="text-4xl font-serif italic text-white font-light">€1,200</div>
                 </div>
                 <button className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest font-sans py-4 rounded-full pointer-events-auto active:scale-[0.98] transition-all hover:bg-white/20 shadow-lg">Purchase Pair</button>
                 <div className="mt-4 text-[9px] uppercase tracking-widest text-[#B08D57] font-bold font-sans pointer-events-auto">4 pairs left</div>
            </div>
        </section>
    );
};

// --- Screens ---

export const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-[100dvh] relative flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-black text-white">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80"><source src="https://raw.githubusercontent.com/marcelorm81/LP_assets/490c9785908429651e7c97d9cb6792ec1c021c4c/loronew.mp4" type="video/mp4" /></video>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none" />
      <div className="relative z-10 w-full flex justify-center pt-safe"><img src={LORO_LOGO_URL} className="w-[120px] brightness-0 invert opacity-90" alt="Loro Piana" /></div>
      
      {/* Updated Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end pb-8 mb-safe animate-luxury-fade px-6 flex-1">
        <div className="text-center space-y-1 mb-10"><h1 className="text-4xl font-bold font-sans tracking-tight leading-none mb-2">Welcome to</h1><h2 className="text-2xl font-serif italic font-light tracking-wide leading-none">the Loop</h2></div>
        
        <div className="w-full flex flex-col items-center gap-5">
            <button 
                onClick={onStart} 
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white p-4 rounded-full flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-normal font-sans active:scale-95 transition-transform shadow-2xl"
            >
                Send me my code
            </button>
            <button className="text-[10px] font-normal font-sans text-white/50 uppercase tracking-widest underline underline-offset-4 decoration-white/20 hover:text-white transition-colors">LOST YOUR CARD?</button>
        </div>
      </div>
    </div>
  );
};

export const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  // ... (Existing Login logic) ...
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (index: number, value: string) => { if (!/^[a-zA-Z0-9]*$/.test(value)) return; const newCode = [...code]; newCode[index] = value.toUpperCase().slice(-1); setCode(newCode); if (value && index < 3) inputs.current[index + 1]?.focus(); setError(false); };
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => { if (e.key === 'Backspace' && !code[index] && index > 0) inputs.current[index - 1]?.focus(); };
  useEffect(() => { if (code.every(char => char !== '')) { const fullCode = code.join('').toUpperCase(); if (fullCode === 'F3F3') { const timer = setTimeout(() => onLogin(), 500); return () => clearTimeout(timer); } else { const timer = setTimeout(() => { setCode(['', '', '', '']); setError(true); inputs.current[0]?.focus(); }, 500); return () => clearTimeout(timer); } } }, [code, onLogin]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-between p-10 py-16 text-center text-white overflow-hidden relative lp-gradient-bg">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"><img src="https://images.unsplash.com/photo-1551524164-687a55ea112c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" /></div>
      <div className="relative z-10 w-full flex flex-col items-center"><img src={LORO_LOGO_URL} className="w-[155px] mb-6 brightness-0 invert opacity-80" alt="Loro Piana" /><div className="text-[9px] tracking-[0.5em] uppercase opacity-30 font-bold font-sans">The Lounge</div></div>
      <div className="relative z-10 space-y-10 w-full flex flex-col items-center"><div className="space-y-3"><h1 className="text-lg font-light tracking-[0.2em] leading-tight uppercase font-sans">Private Entry</h1><p className="text-[9px] opacity-30 italic font-light tracking-[0.2em] uppercase font-sans">Enter VIC Credentials</p></div><div className="flex gap-4 justify-center">{code.map((char, i) => (<input key={i} ref={el => { inputs.current[i] = el; }} type="text" maxLength={1} value={char} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} className={`w-14 h-20 bg-white/5 border-b text-center text-3xl font-light focus:outline-none transition-colors rounded-t-md font-sans ${error ? 'border-red-500/50 text-red-200' : 'border-white/20 focus:border-[#B08D57] text-white'}`} autoFocus={i === 0} />))}</div></div>
      <div className="relative z-10 w-full space-y-4"><div className="text-[8px] uppercase tracking-[0.4em] opacity-20 font-bold font-sans">Bespoke Excellence Since 1924</div><div className="w-1 h-1 bg-[#B08D57] rounded-full mx-auto opacity-30"></div></div>
    </div>
  );
};

export const DropsScreen: React.FC<{ state: State; navigate: any }> = ({ state, navigate }) => {
  return (
    <div className="animate-luxury-fade bg-[#1A1A1A] flex flex-col min-h-[100dvh] font-sans text-white pb-28 relative">
        <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-safe py-6 pointer-events-none flex justify-center items-center">
            <div className="text-[13px] font-bold tracking-normal uppercase opacity-80 font-sans text-white drop-shadow-md pointer-events-auto">Exclusive Pieces</div>
            <div className="absolute right-6 pointer-events-auto"><SearchPill /></div>
        </div>
        <CozySection navigate={navigate} />
        <NewBalanceSection />
    </div>
  );
};

// --- Home Screen Components ---

const GREETING_STYLE = {
    color: 'rgba(247, 245, 241, 0.80)',
    textShadow: '100px 188px 59px rgba(60, 55, 47, 0.00), 64px 120px 54px rgba(60, 55, 47, 0.01), 36px 68px 46px rgba(60, 55, 47, 0.04), 16px 30px 34px rgba(60, 55, 47, 0.07), 4px 8px 19px rgba(60, 55, 47, 0.08)',
    fontFamily: '"GT America", sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '120%',
    textTransform: 'none' as const, // Changed to none for Title Case
    letterSpacing: '0.05em'
};

const StoreKeyWidget = ({ navigate, user }: any) => (
    <div onClick={() => navigate('store-key')} className="w-full h-32 rounded-xl relative overflow-hidden shadow-lg active:scale-[0.99] transition-transform cursor-pointer">
        <div className="absolute inset-0 bg-[#A64B3E]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")', backgroundBlendMode: 'multiply' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20 pointer-events-none" />
        <div className="absolute top-4 left-5 space-y-0.5">
            <div className="text-[8px] opacity-70 font-sans tracking-widest uppercase text-white">Store Key</div>
            <div className="text-lg font-serif italic text-white/90">{user.name}</div>
            <div className="text-[10px] font-serif italic text-white/60">N° 029381</div>
        </div>
        <div className="absolute right-4 bottom-4 opacity-90">
            <img src={LORO_SYMBOL_PNG} className="w-10 opacity-60 mix-blend-multiply" alt="Loro Piana Crest" />
        </div>
        <div className="absolute top-4 right-4">
             <QrCode className="w-5 h-5 text-white/40" />
        </div>
    </div>
);

const MTOWidget = ({ navigate }: any) => (
    <div onClick={() => navigate('mto')} className="w-full h-32 bg-[#F9F8F6] p-1 rounded-xl shadow-lg flex active:scale-[0.99] transition-transform relative overflow-hidden cursor-pointer">
        <div className="absolute inset-2 border border-dashed border-black/10 rounded-lg pointer-events-none z-10" />
        <div className="flex-1 p-4 flex flex-col justify-center text-[#1A1A1A] relative z-20 pl-6">
            <div className="text-[8px] text-[#A64B3E] font-sans font-bold tracking-wide mb-1">André Shirt</div>
            <div className="text-sm font-serif leading-tight mb-3 pr-2">Your Cash Denim<br/>jacket is ready</div>
            <div className="bg-[#A64B3E] text-white text-[8px] px-2 py-1 rounded-full w-max font-serif tracking-wide">Delivered</div>
        </div>
        <div className="w-[45%] h-full relative overflow-hidden">
            <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/ab1bc08d9d5af798814ab6f1bd91f7f1c432a15c/MTO.png" className="w-[140%] max-w-none h-auto object-cover mix-blend-multiply opacity-90 absolute -top-8 -left-4" />
        </div>
    </div>
);

// --- New Infinite Stack for Widgets ---
const HomeWidgetStack: React.FC<{ navigate: any; user: any }> = ({ navigate, user }) => {
    // We alternate 2 widgets. To make it feel infinite, we just keep rotating the array state.
    // [0] is Top, [1] is Bottom.
    const [widgets, setWidgets] = useState(['key', 'mto']);
    const containerRef = useRef<HTMLDivElement>(null);
    const topCardRef = useRef<HTMLDivElement>(null);
    const bottomCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!topCardRef.current) return;

        // Reset positions
        gsap.set(topCardRef.current, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 });
        // CLOSER STACK: y reduced to 6px, scale increased to 0.96
        if(bottomCardRef.current) gsap.set(bottomCardRef.current, { x: 0, y: 6, scale: 0.96, opacity: 1, zIndex: 0 });

        const drag = Draggable.create(topCardRef.current, {
            type: "x",
            trigger: topCardRef.current,
            inertia: true,
            zIndexBoost: false,
            onDrag: function() {
                const rot = (this.x / window.innerWidth) * 15;
                gsap.set(this.target, { rotation: rot });
            },
            onDragEnd: function() {
                const threshold = 100;
                // @ts-ignore
                if (Math.abs(this.x) > threshold) {
                    // Swipe away
                    // @ts-ignore
                    const dir = this.x > 0 ? 1 : -1;
                    gsap.to(this.target, {
                        x: dir * window.innerWidth * 1.2,
                        rotation: dir * 30,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            // Rotate state
                            setWidgets(prev => {
                                const [first, ...rest] = prev;
                                return [...rest, first]; // Move top to bottom
                            });
                        }
                    });
                    
                    // Animate bottom card up
                    if (bottomCardRef.current) {
                        gsap.to(bottomCardRef.current, {
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: "power3.out"
                        });
                    }

                } else {
                    // Spring back
                    gsap.to(this.target, {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.75)"
                    });
                }
            }
        });

        return () => {
            if (drag[0]) drag[0].kill();
        };
    }, [widgets]);

    const renderWidget = (type: string, isTop: boolean) => {
        // Wrapper for the widget component
        return (
            <div 
                ref={isTop ? topCardRef : bottomCardRef}
                className="absolute inset-0 w-full h-full rounded-xl shadow-xl will-change-transform bg-transparent"
                style={{ 
                    zIndex: isTop ? 20 : 10,
                    // Updated default styles to match GSAP
                    transform: isTop ? 'none' : 'translateY(6px) scale(0.96)'
                }}
            >
                {type === 'key' ? (
                    <StoreKeyWidget navigate={navigate} user={user} />
                ) : (
                    <MTOWidget navigate={navigate} />
                )}
            </div>
        );
    };

    // We only ever render the first 2 items of the "infinite" list visually
    const topType = widgets[0];
    const bottomType = widgets[1];

    return (
        <div ref={containerRef} className="relative w-full h-32 my-2 perspective-card">
            {/* Render in reverse order so z-index works naturally if not forced, but we force it. */}
            {renderWidget(bottomType, false)}
            {renderWidget(topType, true)}
        </div>
    );
};

const ConciergeStoreWidget = ({ toggleChat, navigate, ca, user }: any) => {
    const isCAAvailable = ca.status === 'Available';
    const displayCA = isCAAvailable ? ca : {
      name: ca.replacementName || "Replacement",
      status: 'Available', 
      avatar: ca.replacementAvatar || ca.avatar
    };
    const statusColor = 'bg-green-500';

    return (
        <div className="bg-[#F9F8F6] rounded-xl shadow-lg overflow-hidden divide-y divide-[#1A1A1A]/5">
            {/* Concierge Section */}
            <div onClick={toggleChat} className="p-4 flex items-center justify-between cursor-pointer active:bg-black/5 transition-colors">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full overflow-hidden relative">
                         <img src={displayCA.avatar} className="w-full h-full object-cover" />
                         <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#F9F8F6] ${statusColor}`} />
                     </div>
                     <div>
                         <div className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 font-sans">Concierge</div>
                         <div className="text-sm font-serif italic text-[#1A1A1A]">{displayCA.name}</div>
                     </div>
                 </div>
                 <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-[#1A1A1A]" strokeWidth={1.5} />
                 </div>
            </div>

            {/* Store Section */}
            <div onClick={() => navigate('plan-visit')} className="p-4 flex items-center justify-between cursor-pointer active:bg-black/5 transition-colors">
                <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-[#E8E2D9] rounded-full flex items-center justify-center text-[#1A1A1A]">
                        <MapPin className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 font-sans">Home Store</div>
                        <div className="text-sm font-serif italic text-[#1A1A1A]">{user.homeStore.name}</div>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[#1A1A1A]" strokeWidth={1.5} />
                </div>
            </div>
        </div>
    )
}

export const HomeScreen: React.FC<{ state: State; navigate: (s: ScreenType, p?: any) => void; toggleChat: () => void }> = ({ state, navigate, toggleChat }) => {
  const experiences = [
    { id: 'exp1', title: 'Bitter, Sweet', location: 'at Bob Milano', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/a21949bbadb39167a0912d47975f1ff65239fbc9/ticket.jpg' },
    { id: 'exp2', title: 'Aperitivo', location: 'at Villa d\'Este', image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=800' },
    { id: 'exp3', title: 'Private View', location: 'Galleria Borghese', image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=800' },
    { id: 'exp4', title: 'Jazz Night', location: 'Blue Note Milano', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800' }
  ];

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-luxury-fade bg-[#1A1A1A] flex flex-col min-h-[100dvh] font-sans text-white">
      <section className="lp-gradient-bg px-5 pt-safe pb-8 rounded-b-[40px] shadow-2xl relative z-20 space-y-6 animate-on-scroll">
         
         {/* Greeting - Updated to Normal Caps */}
         <div className="pt-4 pb-2 px-1">
             <h1 style={GREETING_STYLE}>Good Morning, {state.user.name.split(' ')[0]}</h1>
         </div>

         {/* Stacked Swipeable Widgets */}
         <div className="px-1 pb-2">
             <HomeWidgetStack navigate={navigate} user={state.user} />
         </div>
         
         {/* Merged Concierge & Home Store Widget */}
         <ConciergeStoreWidget toggleChat={toggleChat} navigate={navigate} ca={state.ca} user={state.user} />

      </section>
      
      <section className="bg-[#0B121E] pt-12 pb-10 px-6 space-y-4 relative overflow-hidden animate-on-scroll">
         <div className="space-y-0.5 relative z-10">
            <h2 className="text-[28px] font-sans font-bold leading-[1.1] text-white tracking-[-0.025em]">
              Set Foot<br/>
              aboard My Song,<br/>
              <span className="font-serif italic font-light">at Loro Piana<br/>Giraglia</span>
            </h2>
         </div>
         <div className="aspect-[4/5] w-full relative rounded-lg overflow-hidden shadow-2xl">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover"><source src="https://raw.githubusercontent.com/marcelorm81/LP_assets/535683b2683745d86037c79c476ef55db071f4eb/loronew.mp4" type="video/mp4" /></video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
               <div><div className="text-[10px] font-sans text-white/80">09-19 June</div><div className="text-[10px] font-sans text-white">Confirmed</div></div>
               <button onClick={() => navigate('events')} className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-sans py-2.5 px-4 rounded-full active:bg-white/20 transition-colors tracking-wide">Confirm Now</button>
            </div>
         </div>
      </section>

      {/* Exclusive Access Restored */}
      <section className="bg-[#8B3A3A] py-14 px-0 relative overflow-hidden animate-on-scroll">
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/woven.png")' }}></div>
        <div className="relative z-10 px-8 mb-6 text-center space-y-1">
          <h2 className="text-2xl font-serif font-light text-[#E8E2D9]">Exclusive Access</h2>
          <p className="text-[9px] font-sans opacity-70 text-[#E8E2D9] max-w-xs mx-auto leading-relaxed">Curated experiences for our most valued clients</p>
        </div>
        <div className="relative z-10 w-full flex justify-center pb-4"><StackedCards items={experiences} /></div>
        <div className="text-center pb-2 relative z-10"><button className="text-[8px] uppercase tracking-[0.2em] border-b border-[#1A1A1A]/30 pb-0.5 font-sans text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors">See All Access</button></div>
      </section>
    </div>
  );
};

export const AccountScreen: React.FC<{ state: State; navigate: any }> = ({ state, navigate }) => {
  return (
    <div className="bg-[#F4F0EA] min-h-screen pb-28 animate-luxury-fade font-sans">
      <Header title="My Account" showBack={false} />
      <div className="p-6 space-y-8">
        <div className="flex items-center gap-4">
          <img src={state.user.avatar} className="w-20 h-20 rounded-full object-cover border border-black/10" />
          <div>
            <h2 className="text-xl font-serif italic text-[#1A1A1A]">{state.user.name}</h2>
            <p className="text-xs text-[#1A1A1A]/60 font-sans uppercase tracking-wider">VIC Member</p>
          </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A1A] font-sans">My Profile</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div onClick={() => navigate('personal-preferences')} className="flex items-center justify-between p-5 border-b border-[#1A1A1A]/5 cursor-pointer active:bg-[#F9F8F6]">
                    <span className="text-sm text-[#1A1A1A]">Personal Preferences</span>
                    <ChevronRight className="w-4 h-4 text-[#1A1A1A]/40" />
                </div>
                <div onClick={() => navigate('my-size')} className="flex items-center justify-between p-5 border-b border-[#1A1A1A]/5 cursor-pointer active:bg-[#F9F8F6]">
                    <span className="text-sm text-[#1A1A1A]">My Sizes</span>
                    <ChevronRight className="w-4 h-4 text-[#1A1A1A]/40" />
                </div>
                 <div onClick={() => navigate('store-key')} className="flex items-center justify-between p-5 cursor-pointer active:bg-[#F9F8F6]">
                    <span className="text-sm text-[#1A1A1A]">Digital Store Key</span>
                    <QrCode className="w-4 h-4 text-[#1A1A1A]/40" />
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A1A] font-sans">Orders & Services</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div onClick={() => navigate('order-history')} className="flex items-center justify-between p-5 border-b border-[#1A1A1A]/5 cursor-pointer active:bg-[#F9F8F6]">
                    <span className="text-sm text-[#1A1A1A]">Order History</span>
                    <ChevronRight className="w-4 h-4 text-[#1A1A1A]/40" />
                </div>
                <div onClick={() => navigate('mto')} className="flex items-center justify-between p-5 cursor-pointer active:bg-[#F9F8F6]">
                    <span className="text-sm text-[#1A1A1A]">Made to Order</span>
                    <ChevronRight className="w-4 h-4 text-[#1A1A1A]/40" />
                </div>
            </div>
        </div>
        
        <button onClick={() => navigate('login')} className="w-full py-4 border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-full text-xs font-bold uppercase tracking-widest">
            Log Out
        </button>
      </div>
    </div>
  );
};

export const CollectionLandingScreen: React.FC<{ navigate: any }> = ({ navigate }) => {
    return (
        <div className="bg-[#EAE6DF] min-h-screen relative animate-luxury-fade">
             {/* Close Button - Fixed to be always accessible */}
            <div className="fixed top-6 right-6 z-50">
                <button onClick={() => navigate('drops')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A1A1A] shadow-lg active:scale-90 transition-transform">
                    <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
            </div>

            {/* Image Background - Fixed at back */}
            <div className="fixed inset-0 z-0">
                <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/5d610e368e69907849ba1f1cb8184c3e6f3c4da7/ss26_imagemood4.avif" className="w-full h-full object-cover" />
            </div>

            {/* Scroll Container - Relative on top of fixed image */}
            {/* The content flow starts here */}
            <div className="relative z-10 w-full flex flex-col">
                 {/* Spacer to reveal image - 65vh height means content starts at 35vh from bottom */}
                 {/* Requirement: max-h-[35vh] visible initially -> spacer needs to be 65vh */}
                 <div className="h-[65vh] w-full pointer-events-none" />

                 {/* The Sheet Content - Scrolls up over the image */}
                 <div className="bg-[#F4F0EA] rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] pb-40">
                     {/* Visual Handle */}
                     <div className="pt-4 pb-2">
                        <div className="w-12 h-1 bg-[#1A1A1A]/10 rounded-full mx-auto" />
                     </div>

                     {/* Content */}
                     <div className="px-8 pt-4 space-y-8">
                         {/* Header Info */}
                         <div>
                             <h2 className="text-xl font-bold font-sans text-[#1A1A1A] mb-1">The SS26 Collection</h2>
                             <p className="text-sm font-serif text-[#1A1A1A]/60">Estimated launch date: <span className="italic">Feb 15th, 2026</span></p>
                         </div>

                         {/* Centered Title Block - Specific 24px Size */}
                         <div className="text-center pt-2">
                             <h1 className="text-[24px] font-bold font-sans text-[#1A1A1A] leading-[0.95]">The Spring/</h1>
                             <h1 className="text-[24px] font-bold font-sans text-[#1A1A1A] leading-[0.95]">Summer</h1>
                             <h1 className="text-[24px] font-serif italic font-light text-[#1A1A1A] mt-1">2026 Collection</h1>
                         </div>

                         {/* Divider */}
                         <div className="h-6 border-l border-dashed border-[#A64B3E] mx-auto w-px opacity-50" />

                         {/* Paragraph */}
                         <p className="text-[13px] font-serif font-light text-[#1A1A1A]/70 leading-relaxed text-center">
                            The Loro Piana Spring/Summer 2026 Collection is captured in the heart of Provence, between the iconic Colombe d’Or and the Fondation Maeght in Saint-Paul-de-Vence. Both are spaces where creatives feel at home, inspiration takes root, and beauty is shared – filled with history and a certain savoir-vivre that lies at the core of the Maison.
                            <br/><br/>
                            Interacting with this living texture of art is the House’s new-season wardrobe. Exploring the metamorphic powers of colour, it presents a curation of elongated and effortless silhouettes, dyed in hues that are as distinct as their weaves. Light wools and fluid linens balance drape, ease, and sensoriality, exuding an elegance that feels unstudied.
                         </p>

                         {/* Button */}
                         <button onClick={() => navigate('capsule-carousel')} className="w-full py-5 bg-[#A64B3E] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-[0.98] transition-all font-sans hover:bg-[#8C4D42]">
                            Pre-order
                         </button>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export const CapsuleCarouselScreen: React.FC<{ navigate: any }> = ({ navigate }) => {
    const [active, setActive] = useState(0);
    return (
        <div className="bg-[#EAE6DF] min-h-screen flex flex-col animate-luxury-fade">
            <Header title="The Gift of Kings" showBack onBack={() => navigate('collection-landing')} />
            
            <div className="flex-1 flex flex-col justify-center pb-20 overflow-hidden">
                <div className="relative w-full h-[55vh] perspective-[1000px]">
                    {CAPSULE_PRODUCTS.map((item, index) => {
                         const offset = index - active;
                         const isActive = index === active;
                         return (
                             <div 
                                key={item.id}
                                className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out"
                                style={{ 
                                    transform: `translateX(${offset * 100}%) scale(${isActive ? 1 : 0.8}) opacity(${isActive ? 1 : 0.5})`,
                                    zIndex: isActive ? 10 : 1
                                }}
                                onClick={() => setActive(index)}
                             >
                                 <div className="w-[80%] h-full bg-white rounded-[4px] shadow-xl overflow-hidden relative">
                                     <img src={item.image} className="w-full h-full object-cover" />
                                     <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                                         <h3 className="text-2xl font-serif italic">{item.name}</h3>
                                         <p className="text-[10px] uppercase tracking-widest opacity-80">{item.category}</p>
                                     </div>
                                 </div>
                             </div>
                         )
                    })}
                </div>
                
                <div className="mt-8 px-8 space-y-4">
                     <div className="flex justify-between items-center px-4">
                         <div>
                             <div className="text-xs text-[#1A1A1A]/60 font-sans">Available Size</div>
                             <div className="text-lg font-serif italic text-[#1A1A1A]">{CAPSULE_PRODUCTS[active].size}</div>
                         </div>
                         <div className="text-right">
                             <div className="text-xs text-[#1A1A1A]/60 font-sans">Color</div>
                             <div className="text-lg font-serif italic text-[#1A1A1A]">{CAPSULE_PRODUCTS[active].color}</div>
                         </div>
                     </div>
                     <button onClick={() => navigate('capsule-confirm', { selectedCapsuleItemId: CAPSULE_PRODUCTS[active].id })} className="w-full py-4 bg-[#1A1A1A] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg active:scale-[0.98] transition-all font-sans">
                        Request Availability
                     </button>
                </div>
            </div>
        </div>
    );
};

export const CapsuleConfirmScreen: React.FC<{ state: State; navigate: any }> = ({ state, navigate }) => {
    return (
        <div className="bg-[#EAE6DF] min-h-screen flex flex-col items-center justify-center p-8 animate-luxury-fade text-center">
            <div className="w-20 h-20 bg-[#A64B3E] rounded-full flex items-center justify-center text-white shadow-xl mb-6 animate-bounce">
                <Check className="w-8 h-8" strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-serif italic text-[#1A1A1A] mb-2">Request Sent</h1>
            <p className="text-sm font-sans text-[#1A1A1A]/70 max-w-xs mx-auto leading-relaxed mb-10">
                Your concierge has been notified about your interest in the <span className="font-bold">{state.selectedCapsuleItemId ? CAPSULE_PRODUCTS.find(p=>p.id===state.selectedCapsuleItemId)?.name : 'Item'}</span>. They will confirm availability shortly.
            </p>
            <button onClick={() => navigate('home')} className="px-10 py-4 border border-[#1A1A1A]/20 text-[#1A1A1A] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors">
                Return Home
            </button>
        </div>
    );
};
