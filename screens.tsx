
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Plus, Search, Heart, Clock, ArrowRight, Zap, Briefcase, MapPin, Bell, UserPlus, QrCode, CheckCircle2, ChevronRight, ChevronLeft, MoreHorizontal, X, MessageSquare, Edit2, ShieldCheck, Sparkles, Scan, Layout, Check, Calendar, Hammer, Wrench, Scissors, History, Eye, Smartphone, ShoppingBag, Palette } from 'lucide-react';
import { Header } from './components';
import { State, ScreenType, Wardrobe, WardrobeItem } from './types';
import { LORO_PRODUCTS } from './data';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const LORO_LOGO_URL = "https://raw.githubusercontent.com/marcelorm81/assets/41473fed5684cd9e84ddedc9643cdb368899d648/LOGOloro.svg";
const LORO_SYMBOL_PNG = "https://raw.githubusercontent.com/marcelorm81/LP_assets/0816650e9d350c07f88b303736084bef893d52bd/LPsymbol.png";

const f = (n: number) => n.toString().padStart(2, '0');

// --- Helpers & Shared Components ---

const TicketShape: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`relative ${className} drop-shadow-2xl`}>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1151 1884" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
       <path fillRule="evenodd" clipRule="evenodd" d="M6 0C2.68629 0 0 2.68631 0 6.00002V1427.02C47.4168 1434.34 83.6365 1473.81 83.6365 1521.39C83.6364 1568.98 47.4167 1608.44 0 1615.76V1877.82C0 1881.13 2.68627 1883.82 5.99998 1883.82H1145C1148.31 1883.82 1151 1881.13 1151 1877.82V1614.98C1107.77 1606.2 1075.33 1569.42 1075.33 1525.37C1075.33 1481.33 1107.77 1444.54 1151 1435.76V6C1151 2.68629 1148.31 0 1145 0H6Z" fill="#F9F8F6"/>
    </svg>
    <div className="relative z-10 h-full w-full flex flex-col">{children}</div>
  </div>
);

const StackedCards: React.FC<{ items: any[] }> = ({ items }) => {
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

// --- Feature Modules (Shared) ---

const CozySection: React.FC = () => {
    const target = useRef(new Date(Date.now() + 846729000)).current; 
    const time = useAnimatedCountdown(target);

    return (
        <section className="relative h-[80vh] w-full overflow-hidden animate-on-scroll">
            <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/a21949bbadb39167a0912d47975f1ff65239fbc9/cozy.png" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#597082]/90 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-6 right-6 text-white">
                <div className="text-sm font-sans tracking-widest mb-2 font-light opacity-80">
                    {f(time.days)} : {f(time.hours)} : {f(time.minutes)} : {f(time.seconds)}
                </div>
                <h2 className="text-3xl font-sans font-bold mb-1 tracking-tight">Get Cozy</h2>
                <p className="text-xl font-serif italic font-light opacity-90 leading-tight mb-5">
                    We think you’ll like our<br/>new après-ski style.
                </p>
                <div className="flex justify-end">
                    <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 active:bg-white/30 transition-colors">
                        <ArrowRight className="w-4 h-4 text-white" strokeWidth={1} />
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
    
    const swipeBtnRef = useRef<HTMLDivElement>(null);
    const swipeKnobRef = useRef<HTMLDivElement>(null);
    const swipeTextRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const initialContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let draggables: Draggable[] = [];
        if (swipeKnobRef.current && swipeBtnRef.current && !swiped) {
            const maxX = swipeBtnRef.current.clientWidth - swipeKnobRef.current.clientWidth - 6; 
            draggables = Draggable.create(swipeKnobRef.current, {
                type: "x",
                bounds: swipeBtnRef.current,
                inertia: true,
                edgeResistance: 0.9,
                onDrag: function() {
                    // @ts-ignore
                    const self = this;
                    const progress = self.x / maxX;
                    if (swipeTextRef.current) gsap.to(swipeTextRef.current, { opacity: 1 - progress, duration: 0.1 });
                    if (self.x > maxX * 0.95) {
                        gsap.to(self.target, { x: maxX, duration: 0.1 });
                        self.endDrag();
                        setSwiped(true);
                    }
                },
                onDragEnd: function() {
                    // @ts-ignore
                    const self = this;
                    if (self.x < maxX * 0.95) {
                        gsap.to(self.target, { x: 0, duration: 0.5, ease: "power3.out" });
                        if (swipeTextRef.current) gsap.to(swipeTextRef.current, { opacity: 1, duration: 0.5 });
                    }
                }
            });
        }
        return () => {
            if(draggables) draggables.forEach(d => d.kill());
        }
    }, [swiped]);

    useEffect(() => {
        if (swiped) {
            const tl = gsap.timeline();
            tl.to(initialContentRef.current, { opacity: 0, y: -30, duration: 0.6, ease: "power3.inOut" });
            tl.fromTo(revealRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "-=0.2");
        }
    }, [swiped]);

    return (
        <section className="bg-black h-[85vh] w-full relative overflow-hidden font-sans border-t border-white/10 animate-on-scroll">
            <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/535683b2683745d86037c79c476ef55db071f4eb/newbalance.jpg" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* Exclusive Release - Center Top */}
            <div className="absolute top-6 left-0 right-0 z-20 text-center">
                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#B08D57] font-sans">Exclusive Release</div>
            </div>

            <div ref={initialContentRef} className="absolute inset-0 z-20 flex flex-col justify-between py-12 px-8">
                {/* Title Fixed Top */}
                <div className="text-center pt-8">
                    <h2 className="text-3xl font-bold text-white leading-none font-sans mb-1">New Balance x</h2>
                    <h2 className="text-3xl font-light text-white font-sans italic">Loro Piana</h2>
                </div>

                {/* Countdown Center - Smaller and moved down 40px */}
                <div className="text-center mt-10">
                    <div className="text-3xl font-sans font-light text-white tracking-widest opacity-90">
                        {f(time.hours)} : {f(time.minutes)} : {f(time.seconds)}
                    </div>
                </div>
                
                {/* Swipe Button Container Center Bottom */}
                <div className="flex flex-col items-center gap-2 w-full mb-4">
                    <div ref={swipeBtnRef} className="w-[85%] max-w-[280px] h-14 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 overflow-hidden relative shadow-2xl">
                        <div ref={swipeTextRef} className="absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 pointer-events-none pr-2">
                             Swipe to Unlock
                        </div>
                        <div ref={swipeKnobRef} className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg cursor-grab active:cursor-grabbing z-20">
                           <ArrowRight className="w-4 h-4" strokeWidth={2} />
                        </div>
                    </div>
                    {/* "4 pieces left" below the swipe */}
                    <div className="w-[70%] max-w-[280px] text-center">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#B08D57] font-bold">4 pieces left</span>
                    </div>
                </div>
            </div>

            <div ref={revealRef} className="absolute bottom-[15px] left-0 right-0 z-30 p-6 opacity-0 pointer-events-none">
                 <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    <div className="flex justify-between items-end mb-5">
                        <div className="space-y-1">
                            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#B08D57] font-sans">Collection 2025</div>
                            <h2 className="text-xl font-medium text-white font-sans leading-tight">990v6 Loro Piana</h2>
                            <div className="text-[10px] text-white/60 font-sans">Muted Grey / Cashmere / Suede</div>
                        </div>
                        <div className="text-right">
                             <div className="text-xl font-normal text-white font-sans">€1,200</div>
                        </div>
                    </div>
                    <button className="w-full bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] font-sans py-4 rounded-full active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 hover:bg-[#F5F2ED] pointer-events-auto">
                        <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} /> Purchase Pair
                    </button>
                </div>
            </div>
        </section>
    );
};


// --- Screens ---

export const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-[100dvh] relative flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-black text-white">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
        <source src="https://raw.githubusercontent.com/marcelorm81/LP_assets/490c9785908429651e7c97d9cb6792ec1c021c4c/loronew.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none" />
      <div className="relative z-10 w-full flex justify-center pt-safe">
         <img src={LORO_LOGO_URL} className="w-[120px] brightness-0 invert opacity-90" alt="Loro Piana" /> 
      </div>
      <div className="relative z-10 w-full flex flex-col items-center gap-8 mb-safe animate-luxury-fade">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-normal font-sans tracking-wide">Welcome to</h1>
          <h2 className="text-4xl font-serif italic font-light tracking-wide">the Loop</h2>
        </div>
        <button onClick={onStart} className="w-full max-w-xs bg-[#1A1A1A]/90 backdrop-blur-md text-white py-4 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 active:scale-95 transition-transform shadow-lg font-sans">
          Send me my code
        </button>
      </div>
    </div>
  );
};

export const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z]*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.toUpperCase().slice(-1);
    setCode(newCode);
    if (value && index < 3) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) inputs.current[index - 1]?.focus();
  };

  useEffect(() => {
    if (code.every(char => char !== '')) {
      const timer = setTimeout(() => onLogin(), 500);
      return () => clearTimeout(timer);
    }
  }, [code, onLogin]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-between p-10 py-16 text-center text-white overflow-hidden relative lp-gradient-bg">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"><img src="https://images.unsplash.com/photo-1551524164-687a55ea112c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" /></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <img src={LORO_LOGO_URL} className="w-[155px] mb-6 brightness-0 invert opacity-80" alt="Loro Piana" />
        <div className="text-[9px] tracking-[0.5em] uppercase opacity-30 font-bold font-sans">The Lounge</div>
      </div>
      <div className="relative z-10 space-y-10 w-full flex flex-col items-center">
        <div className="space-y-3">
          <h1 className="text-lg font-light tracking-[0.2em] leading-tight uppercase font-sans">Private Entry</h1>
          <p className="text-[9px] opacity-30 italic font-light tracking-[0.2em] uppercase font-sans">Enter VIC Credentials</p>
        </div>
        <div className="flex gap-4 justify-center">
          {code.map((char, i) => (
            <input key={i} ref={el => { inputs.current[i] = el; }} type="text" maxLength={1} value={char} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} className="w-10 h-14 bg-white/5 border-b border-white/20 text-center text-xl font-light focus:outline-none focus:border-[#B08D57] transition-colors rounded-t-md font-sans" autoFocus={i === 0} />
          ))}
        </div>
      </div>
      <div className="relative z-10 w-full space-y-4">
        <div className="text-[8px] uppercase tracking-[0.4em] opacity-20 font-bold font-sans">Bespoke Excellence Since 1924</div>
        <div className="w-1 h-1 bg-[#B08D57] rounded-full mx-auto opacity-30"></div>
      </div>
    </div>
  );
};

export const DropsScreen: React.FC<{ state: State; navigate: any }> = ({ state, navigate }) => {
  return (
    <div className="animate-luxury-fade bg-[#1A1A1A] flex flex-col min-h-[100dvh] font-sans text-white pb-28">
        <CozySection />
        <NewBalanceSection />
    </div>
  );
};

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
    <div className="animate-luxury-fade bg-[#1A1A1A] flex flex-col min-h-[100dvh] font-sans text-white pb-28">
      <section className="lp-gradient-bg px-5 pt-safe pb-8 rounded-b-[40px] shadow-2xl relative z-20 space-y-6 animate-on-scroll">
         <div className="pt-4 pb-2 px-1">
             <h1 className="text-3xl font-serif italic text-white/90">Good Morning,</h1>
             <h1 className="text-3xl font-serif text-white">Andrea</h1>
         </div>
         <div onClick={() => navigate('store-key')} className="w-full aspect-[2.1] rounded-xl relative overflow-hidden shadow-lg active:scale-[0.99] transition-transform">
            <div className="absolute inset-0 bg-[#A64B3E]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")', backgroundBlendMode: 'multiply' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20 pointer-events-none" />
            <div className="absolute top-5 left-5 space-y-0.5">
               <div className="text-[8px] opacity-70 font-sans tracking-widest uppercase">Your Store Key</div>
               <div className="text-lg font-serif italic text-white/90">Andrea Sparks</div>
               <div className="text-xs font-serif italic text-white/90">Client since 2005</div>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-90">
               <img src={LORO_SYMBOL_PNG} className="w-16 opacity-80 mix-blend-multiply" alt="Loro Piana Crest" />
            </div>
         </div>
         <div onClick={toggleChat} className="bg-[#F9F8F6] p-1 rounded-xl shadow-lg flex active:scale-[0.99] transition-transform relative overflow-hidden h-32">
            <div className="absolute inset-2 border border-dashed border-black/10 rounded-lg pointer-events-none z-10" />
            <div className="flex-1 p-4 flex flex-col justify-center text-[#1A1A1A] relative z-20 pl-6">
               <div className="text-[8px] text-[#A64B3E] font-sans font-bold tracking-wide mb-1">André Shirt</div>
               <div className="text-sm font-serif leading-tight mb-3 pr-2">Your Cash Denim<br/>jacket is ready</div>
               <div className="bg-[#A64B3E] text-white text-[8px] px-2 py-1 rounded-full w-max font-serif tracking-wide">Delivered</div>
            </div>
            <div className="w-[45%] h-full relative overflow-hidden"><img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/ab1bc08d9d5af798814ab6f1bd91f7f1c432a15c/MTO.png" className="w-[140%] max-w-none h-auto object-cover mix-blend-multiply opacity-90 absolute -top-8 -left-4" /></div>
         </div>
         
         {/* Concierge Module without Picture */}
         <div onClick={toggleChat} className="flex items-center justify-between gap-3 bg-[#4E3E38]/30 backdrop-blur-md p-3 rounded-full border border-white/5 cursor-pointer active:bg-[#4E3E38]/50 transition-colors px-6">
            <span className="text-[9px] text-white/60 font-sans tracking-wide uppercase">Concierge</span>
            <span className="text-sm text-[#C5A572] font-serif italic tracking-wide">Sofia Giordano</span>
         </div>

         {/* Book a store visit button */}
         <button className="w-full bg-[#F9F8F6] p-4 rounded-xl shadow-lg flex items-center justify-between active:scale-[0.99] transition-transform group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#E8E2D9] rounded-full flex items-center justify-center text-[#1A1A1A]">
                    <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="text-left">
                    <div className="text-sm font-bold text-[#1A1A1A] font-sans">Book a store visit</div>
                    <div className="text-[10px] text-[#1A1A1A]/60 font-serif italic">Ginza Tower, Tokyo</div>
                </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </div>
         </button>
      </section>

      {/* Moved CozySection and NewBalanceSection to DropsScreen */}
      
      <section className="bg-[#0B121E] pt-12 pb-10 px-6 space-y-4 relative overflow-hidden animate-on-scroll">
         <div className="space-y-0.5 relative z-10">
            <h2 className="text-2xl font-sans font-bold leading-tight text-white tracking-tight">Set foot aboard<br/>My Song, at the<br/><span className="font-serif italic font-light">next Loro Piana Giraglia</span></h2>
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

      <section className="bg-[#8B3A3A] py-14 px-0 relative overflow-hidden animate-on-scroll">
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/woven.png")' }}></div>
        <div className="relative z-10 px-8 mb-6 text-center space-y-1">
          <h2 className="text-2xl font-serif font-light text-[#E8E2D9]">Exclusive Access</h2>
          <p className="text-[9px] font-sans opacity-70 text-[#E8E2D9] max-w-xs mx-auto leading-relaxed">Lorem ipsum dolor sit amet parabellum pacit</p>
        </div>
        <div className="relative z-10 w-full flex justify-center pb-4"><StackedCards items={experiences} /></div>
        <div className="text-center pb-2 relative z-10"><button className="text-[8px] uppercase tracking-[0.2em] border-b border-white/30 pb-0.5 font-sans text-white hover:border-white transition-colors">See All Access</button></div>
      </section>
    </div>
  );
};

export const WardrobeScreen: React.FC<{ state: State; navigate: any }> = ({ state, navigate }) => {
  return (
    <div className="bg-[#F5F2ED] min-h-screen pb-28">
      <Header title="My Wardrobes" action={<button onClick={() => navigate('create-wardrobe')}><Plus className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1} /></button>} />
      <div className="p-6 grid grid-cols-2 gap-4 animate-luxury-fade">
        {state.wardrobes.map((wardrobe) => (
          <div key={wardrobe.id} onClick={() => navigate('wardrobe-detail', { selectedWardrobeId: wardrobe.id })} className="group">
            <div className="aspect-[3/4] overflow-hidden rounded-sm relative mb-3">
              <img src={wardrobe.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
            <h3 className="text-sm font-serif text-[#1A1A1A]">{wardrobe.name}</h3>
            <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">{wardrobe.items.length} Items</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WardrobeDetailScreen: React.FC<{ state: State; navigate: any; goBack: any; toggleChat: any }> = ({ state, navigate, goBack, toggleChat }) => {
  const wardrobe = state.wardrobes.find(w => w.id === state.selectedWardrobeId);
  if (!wardrobe) return null;

  return (
    <div className="bg-[#F5F2ED] min-h-screen pb-28">
      <Header title={wardrobe.name} showBack onBack={goBack} action={<button onClick={() => navigate('add-item-method')}><Plus className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1} /></button>} />
      <div className="p-6 grid grid-cols-2 gap-x-4 gap-y-8 animate-luxury-fade">
        {wardrobe.items.map((item, idx) => (
          <div key={`${item.id}-${idx}`} onClick={() => navigate('product-detail', { selectedProductId: item.id })}>
            <div className="aspect-[3/4] bg-white mb-3 overflow-hidden relative">
               <img src={item.image} className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="space-y-1">
               <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">{item.category}</p>
               <h4 className="text-xs font-serif text-[#1A1A1A] line-clamp-1">{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CreateWardrobeScreen: React.FC<{ goBack: any; onSave: any; navigate: any }> = ({ goBack, onSave, navigate }) => {
    const [name, setName] = useState('');
    const handleSave = () => {
        if(!name) return;
        onSave({
            id: `w-${Date.now()}`,
            name,
            type: 'Custom',
            coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
            items: []
        });
        goBack();
    };

    return (
        <div className="bg-[#F5F2ED] min-h-screen pb-28">
            <Header title="New Wardrobe" showBack onBack={goBack} />
            <div className="p-8 space-y-8 animate-luxury-fade">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">Wardrobe Name</label>
                    <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2 text-xl font-serif text-[#1A1A1A] focus:outline-none focus:border-[#B08D57]"
                        placeholder="e.g. Summer Villa"
                        autoFocus
                    />
                </div>
                <button onClick={handleSave} className="w-full bg-[#1A1A1A] text-white py-4 rounded-full text-xs font-bold tracking-widest uppercase">
                    Create Wardrobe
                </button>
            </div>
        </div>
    );
};

export const AddItemMethodScreen: React.FC<{ goBack: any; navigate: any; toggleChat: any }> = ({ goBack, navigate, toggleChat }) => {
    return (
        <div className="bg-[#F5F2ED] min-h-screen pb-28">
            <Header title="Add Item" showBack onBack={goBack} />
            <div className="p-6 space-y-4 animate-luxury-fade h-[calc(100vh-100px)] flex flex-col justify-center">
                 <button onClick={() => navigate('scan-item')} className="w-full bg-white p-6 rounded-xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F5F2ED] rounded-full flex items-center justify-center"><Scan className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1} /></div>
                        <div className="text-left">
                            <h3 className="text-sm font-bold text-[#1A1A1A] font-sans">Scan Tag</h3>
                            <p className="text-[10px] text-[#1A1A1A]/60 mt-0.5">Use camera to scan NFC or QR</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#1A1A1A]/30" />
                 </button>
                 <button onClick={() => navigate('add-item-selection')} className="w-full bg-white p-6 rounded-xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F5F2ED] rounded-full flex items-center justify-center"><Search className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1} /></div>
                        <div className="text-left">
                            <h3 className="text-sm font-bold text-[#1A1A1A] font-sans">Browse Catalog</h3>
                            <p className="text-[10px] text-[#1A1A1A]/60 mt-0.5">Search Loro Piana collection</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#1A1A1A]/30" />
                 </button>
            </div>
        </div>
    );
};

export const ScanItemScreen: React.FC<{ goBack: any; onAdd: (item: any) => void }> = ({ goBack, onAdd }) => {
    useEffect(() => {
        // Mock scanning process
        const timer = setTimeout(() => {
            onAdd(LORO_PRODUCTS[0]);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onAdd]);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col relative">
            <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center">
                 <button onClick={goBack} className="p-2 bg-black/20 backdrop-blur-md rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1550926715-46b72942b036?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                <div className="w-64 h-64 border border-white/30 rounded-lg relative z-10 flex items-center justify-center animate-pulse">
                    <div className="w-60 h-60 border-[2px] border-white/80 rounded-sm" />
                    <div className="absolute w-full h-0.5 bg-[#B08D57] top-1/2 shadow-[0_0_15px_rgba(176,141,87,0.8)] animate-pulse" />
                </div>
                <p className="relative z-10 mt-8 text-xs font-sans tracking-widest uppercase">Align tag within frame</p>
            </div>
        </div>
    );
};

export const AddItemSelectionScreen: React.FC<{ state: State; goBack: any; onAdd: (item: any) => void }> = ({ state, goBack, onAdd }) => {
    return (
        <div className="bg-[#F5F2ED] min-h-screen pb-28">
            <Header title="Select Item" showBack onBack={goBack} />
            <div className="p-6 grid grid-cols-2 gap-4 animate-luxury-fade">
                {LORO_PRODUCTS.map((item) => (
                    <div key={item.id} onClick={() => onAdd(item)} className="bg-white p-2 pb-4 shadow-sm active:scale-95 transition-transform">
                        <div className="aspect-[3/4] overflow-hidden mb-3">
                            <img src={item.image} className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        <h4 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wide text-center">{item.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ProductDetailScreen: React.FC<{ state: State; goBack: any; toggleChat: any }> = ({ state, goBack, toggleChat }) => {
    const product = LORO_PRODUCTS.find(p => p.id === state.selectedProductId) || LORO_PRODUCTS[0];

    return (
        <div className="bg-[#F5F2ED] min-h-screen pb-28">
            <div className="relative h-[60vh] w-full">
                <img src={product.image} className="w-full h-full object-cover" />
                <button onClick={goBack} className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full"><ChevronLeft className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1} /></button>
            </div>
            <div className="px-6 py-8 -mt-10 relative bg-[#F5F2ED] rounded-t-[30px] space-y-6 animate-luxury-fade shadow-2xl">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">{product.category}</p>
                        <h1 className="text-2xl font-serif text-[#1A1A1A]">{product.name}</h1>
                    </div>
                    <button className="p-3 border border-[#1A1A1A]/10 rounded-full text-[#1A1A1A]"><Heart className="w-5 h-5" strokeWidth={1} /></button>
                 </div>
                 
                 <div className="space-y-4 pt-4 border-t border-[#1A1A1A]/5">
                     <div className="flex justify-between items-center py-2 border-b border-[#1A1A1A]/5">
                         <span className="text-xs font-sans text-[#1A1A1A]/60">Material</span>
                         <span className="text-xs font-sans text-[#1A1A1A]">100% Cashmere</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-[#1A1A1A]/5">
                         <span className="text-xs font-sans text-[#1A1A1A]/60">Origin</span>
                         <span className="text-xs font-sans text-[#1A1A1A]">Made in Italy</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-[#1A1A1A]/5">
                         <span className="text-xs font-sans text-[#1A1A1A]/60">Care</span>
                         <span className="text-xs font-sans text-[#1A1A1A]">Dry Clean Only</span>
                     </div>
                 </div>

                 <div className="pt-6 flex gap-4">
                     <button onClick={toggleChat} className="flex-1 bg-[#1A1A1A] text-white py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">Contact Advisor</button>
                     <button className="flex-1 border border-[#1A1A1A] text-[#1A1A1A] py-4 rounded-full text-xs font-bold tracking-widest uppercase">Styling</button>
                 </div>
            </div>
        </div>
    );
};

export const MTOScreen: React.FC<{ state: State; goBack: any; navigate: any; toggleChat: any }> = ({ state, goBack, toggleChat }) => {
    return (
        <div className="bg-[#F5F2ED] min-h-screen pb-28">
            <Header title="Made to Order" showBack onBack={goBack} />
            <div className="p-6 space-y-8 animate-luxury-fade">
                <div className="bg-white p-6 rounded-xl shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                         <div>
                             <h2 className="text-lg font-serif text-[#1A1A1A]">{state.mto.name}</h2>
                             <p className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest mt-1">Order #883921</p>
                         </div>
                         <div className="bg-[#B08D57]/10 text-[#B08D57] px-2 py-1 text-[9px] font-bold uppercase tracking-wide rounded-sm">{state.mto.status}</div>
                    </div>
                    
                    <div className="relative pl-4 space-y-8 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#1A1A1A]/10">
                        {state.mto.timeline.map((step, i) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[15px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#B08D57] ring-4 ring-white" />
                                <div className="text-xs font-bold text-[#1A1A1A] font-sans">{step.stage}</div>
                                <div className="text-[10px] text-[#1A1A1A]/60 mt-0.5">{step.date}</div>
                                {step.note && <div className="mt-2 text-[10px] italic text-[#1A1A1A]/80 bg-[#F5F2ED] p-2 rounded-md">{step.note}</div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/40">Your creation</h3>
                    <img src="https://media.loropiana.com/HYBRIS/FAO/FAO8041/6EAEEA9E-3E4D-4029-858D-E40840D27097/FAO8041_F7A7_MEDIUM.jpg?sw=800&sh=800" className="w-full rounded-xl shadow-sm" />
                </div>
            </div>
        </div>
    );
};

export const EventsScreen: React.FC<{ state: State; navigate: any }> = ({ state, navigate }) => {
    return (
        <div className="bg-[#1A1A1A] min-h-screen pb-28 text-white">
            <Header title="Events" dark />
            <div className="p-6 space-y-6 animate-luxury-fade">
                {state.events.map(event => (
                    <div key={event.id} onClick={() => navigate('event-detail', { selectedEventId: event.id })} className="group relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer">
                        <img src={event.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                             <div className="flex justify-between items-end mb-1">
                                 <h3 className="text-xl font-serif italic">{event.title}</h3>
                                 <span className={`text-[9px] uppercase tracking-widest border px-2 py-1 rounded-full ${event.status === 'confirmed' ? 'border-[#B08D57] text-[#B08D57]' : 'border-white/30 text-white/70'}`}>
                                     {event.status === 'confirmed' ? 'Going' : 'Invite'}
                                 </span>
                             </div>
                             <p className="text-[10px] font-sans text-white/60">{event.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const EventDetailScreen: React.FC<{ state: State; goBack: any; toggleChat: any }> = ({ state, goBack, toggleChat }) => {
    const event = state.events.find(e => e.id === state.selectedEventId);
    if (!event) return null;

    return (
        <div className="bg-[#1A1A1A] min-h-screen pb-28 text-white">
             <div className="relative h-[50vh] w-full">
                <img src={event.image} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#1A1A1A]" />
                <button onClick={goBack} className="absolute top-6 left-6 p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10"><ChevronLeft className="w-6 h-6 text-white" strokeWidth={1} /></button>
            </div>
            <div className="px-6 relative -mt-20 space-y-8 animate-luxury-fade">
                 <div className="space-y-2">
                     <span className="px-3 py-1 bg-[#B08D57] text-black text-[9px] font-bold uppercase tracking-widest rounded-sm">{event.date}</span>
                     <h1 className="text-3xl font-serif italic">{event.title}</h1>
                 </div>
                 
                 <p className="text-sm font-light leading-relaxed text-white/80 font-serif">{event.description}</p>
                 
                 {event.privileges.length > 0 && (
                     <div className="space-y-4 pt-4 border-t border-white/10">
                         <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Your Privileges</h3>
                         <ul className="space-y-3">
                             {event.privileges.map((priv, i) => (
                                 <li key={i} className="flex gap-3 items-start text-xs font-light text-white/80">
                                     <Sparkles className="w-4 h-4 text-[#B08D57] shrink-0" strokeWidth={1} />
                                     {priv}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 )}

                 <div className="pt-6">
                     <button onClick={toggleChat} className="w-full bg-white text-black py-4 rounded-full text-xs font-bold tracking-widest uppercase">Concierge Request</button>
                 </div>
            </div>
        </div>
    );
};

export const StoreKeyScreen: React.FC<{ goBack: any }> = ({ goBack }) => {
    return (
        <div className="bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center p-8 relative">
             <button onClick={goBack} className="absolute top-6 right-6 p-2 text-white/50"><X className="w-6 h-6" /></button>
             
             <div className="w-full max-w-sm bg-[#F9F8F6] rounded-xl overflow-hidden shadow-2xl animate-luxury-fade">
                 <div className="p-8 pb-12 text-center space-y-4 bg-[#F9F8F6] relative">
                     <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }}></div>
                     <img src={LORO_LOGO_URL} className="w-24 mx-auto opacity-80" />
                     <div className="pt-6">
                         <h2 className="text-2xl font-serif text-[#1A1A1A]">Andrea Sparks</h2>
                         <p className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] mt-1 font-bold">V.I.C. Access</p>
                     </div>
                 </div>
                 <div className="bg-white p-8 flex flex-col items-center justify-center border-t border-dashed border-black/10 relative">
                     <div className="absolute -top-3 left-0 w-6 h-6 bg-[#1A1A1A] rounded-full translate-x-[-50%]" />
                     <div className="absolute -top-3 right-0 w-6 h-6 bg-[#1A1A1A] rounded-full translate-x-[50%]" />
                     <QrCode className="w-40 h-40 text-[#1A1A1A] opacity-90" strokeWidth={1} />
                     <p className="mt-6 text-[9px] text-[#1A1A1A]/40 uppercase tracking-widest">Scan at entrance</p>
                 </div>
             </div>
        </div>
    );
};
