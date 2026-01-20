
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShoppingBag, MapPin, Edit2, ChevronRight, Clock, Circle, X, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import { Header } from './components';
import { State, ScreenType } from './types';

gsap.registerPlugin(Draggable);

const LORO_LOGO_URL = "https://raw.githubusercontent.com/marcelorm81/assets/41473fed5684cd9e84ddedc9643cdb368899d648/LOGOloro.svg";
const LORO_SYMBOL_PNG = "https://raw.githubusercontent.com/marcelorm81/LP_assets/0816650e9d350c07f88b303736084bef893d52bd/LPsymbol.png";

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
                <h2 className="text-[28px] font-sans font-bold mb-1 tracking-[-0.025em] leading-[1.1]">Get Cozy</h2>
                <p className="text-[28px] font-serif italic font-light opacity-90 leading-[1.1] mb-5">
                    We think you’ll<br/>like our new<br/>après-ski style.
                </p>
                <div className="mt-6">
                    <button className="w-full py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold uppercase tracking-normal text-[10px] border border-white/20 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-white/20 font-sans">
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
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && videoRef.current) {
                        videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let draggables: Draggable[] = [];
        
        // Wait for layout to be stable before initializing draggable
        const initDraggable = setTimeout(() => {
            if (swipeKnobRef.current && swipeBtnRef.current && !swiped) {
                // FORCE RESET POSITION on init to prevent "jumping" bug
                gsap.set(swipeKnobRef.current, { x: 0 });

                const containerWidth = swipeBtnRef.current.offsetWidth;
                const knobWidth = swipeKnobRef.current.offsetWidth;
                const maxX = containerWidth - knobWidth - 8; // 8px for padding margin (left 4px + right 4px)

                draggables = Draggable.create(swipeKnobRef.current, {
                    type: "x",
                    bounds: swipeBtnRef.current,
                    inertia: true,
                    edgeResistance: 0.8,
                    dragClickables: true,
                    // Use the knob itself as trigger but ensure bounds are respected
                    trigger: swipeKnobRef.current, 
                    onDrag: function() {
                        // @ts-ignore
                        const self = this;
                        const progress = self.x / maxX;
                        if (swipeTextRef.current) gsap.to(swipeTextRef.current, { opacity: 1 - progress * 1.5, duration: 0.1 });
                        
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
        }, 100);

        return () => {
            clearTimeout(initDraggable);
            if(draggables) draggables.forEach(d => d.kill());
        }
    }, [swiped]);

    useEffect(() => {
        if (swiped) {
            const tl = gsap.timeline();
            tl.to(initialContentRef.current, { opacity: 0, y: -30, duration: 0.6, ease: "power3.inOut" });
            tl.fromTo(revealRef.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.2)" }, "-=0.2");
        }
    }, [swiped]);

    return (
        <section ref={sectionRef} className="bg-black h-[85vh] w-full relative overflow-hidden font-sans border-t border-white/10 animate-on-scroll">
            <video 
                ref={videoRef}
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                src="https://raw.githubusercontent.com/marcelorm81/LP_assets/e8f8824fd2ef1a691672740c117cd943fb680f31/newbalancereveal.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* Exclusive Release - Center Top Absolute */}
            <div className="absolute top-6 left-0 right-0 z-20 text-center">
                <div className="text-[12px] font-bold uppercase text-[#B08D57] font-sans tracking-normal">Exclusive Release</div>
            </div>

            <div ref={initialContentRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                {/* Title Fixed Top-ish */}
                <div className="absolute top-16 text-center">
                    <h2 className="text-[28px] font-bold text-white leading-[1.0] font-sans mb-1">New Balance x</h2>
                    <h2 className="text-[28px] font-light text-white font-serif italic leading-normal">Loro Piana</h2>
                </div>

                {/* Countdown Center */}
                <div className="text-center mt-[180px]">
                    <div className="text-2xl font-sans font-light text-white tracking-widest opacity-90">
                        {f(time.hours)} : {f(time.minutes)} : {f(time.seconds)}
                    </div>
                </div>
                
                {/* Swipe Button Container Center Bottom */}
                <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 w-full pointer-events-auto">
                    {/* H-14 is 56px height. To have a circular knob inside with padding, knob must be square. */}
                    <div ref={swipeBtnRef} className="w-[85%] max-w-[280px] h-14 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 overflow-hidden relative shadow-2xl">
                        <div ref={swipeTextRef} className="absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase text-white/70 pointer-events-none pl-12">
                             Swipe to Unlock
                        </div>
                        {/* Knob: h-14 parent (56px) - 2*top/bottom(4px) = 48px height. width w-12 is 48px. 
                            Strictly square to ensure perfect circle. */}
                        <div 
                            ref={swipeKnobRef} 
                            style={{ touchAction: 'none' }} 
                            className="absolute left-1 top-1 bottom-1 w-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg cursor-grab active:cursor-grabbing z-20"
                        >
                           <ArrowRight className="w-5 h-5 pointer-events-none" strokeWidth={2} />
                        </div>
                    </div>
                    {/* "4 pieces left" below the swipe */}
                    <div className="w-[70%] max-w-[280px] text-center">
                        <span className="text-[9px] text-[#B08D57] font-bold uppercase">4 pieces left</span>
                    </div>
                </div>
            </div>

            <div ref={revealRef} className="absolute bottom-[15px] left-0 right-0 z-30 px-8 pb-8 opacity-0 pointer-events-none flex flex-col items-center justify-end">
                 {/* Simplified Layout without background container */}
                 <div className="text-center space-y-1 mb-6 pointer-events-auto">
                    <div className="text-[12px] font-sans font-normal tracking-normal text-white">NBV6 LoroPiana</div>
                    <div className="text-4xl font-serif italic text-white font-light">€1,200</div>
                 </div>
                 
                 <button className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest font-sans py-4 rounded-full pointer-events-auto active:scale-[0.98] transition-all hover:bg-white/20 shadow-lg">
                    Purchase Pair
                 </button>
                 
                 <div className="mt-4 text-[9px] uppercase tracking-widest text-[#B08D57] font-bold font-sans pointer-events-auto">
                    4 pairs left
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
          <h1 className="text-4xl font-bold font-sans tracking-tight leading-none mb-2">Welcome to</h1>
          <h2 className="text-2xl font-serif italic font-light tracking-wide leading-none">the Loop</h2>
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
  const [error, setError] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.toUpperCase().slice(-1);
    setCode(newCode);
    if (value && index < 3) inputs.current[index + 1]?.focus();
    setError(false);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) inputs.current[index - 1]?.focus();
  };

  useEffect(() => {
    if (code.every(char => char !== '')) {
      const fullCode = code.join('').toUpperCase();
      if (fullCode === 'F3F3') {
          const timer = setTimeout(() => onLogin(), 500);
          return () => clearTimeout(timer);
      } else {
          // Reset on wrong code
          const timer = setTimeout(() => {
              setCode(['', '', '', '']);
              setError(true);
              inputs.current[0]?.focus();
          }, 500);
          return () => clearTimeout(timer);
      }
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
            <input 
                key={i} 
                ref={el => { inputs.current[i] = el; }} 
                type="text" 
                maxLength={1} 
                value={char} 
                onChange={e => handleChange(i, e.target.value)} 
                onKeyDown={e => handleKeyDown(i, e)} 
                className={`w-14 h-20 bg-white/5 border-b text-center text-3xl font-light focus:outline-none transition-colors rounded-t-md font-sans ${error ? 'border-red-500/50 text-red-200' : 'border-white/20 focus:border-[#B08D57] text-white'}`} 
                autoFocus={i === 0} 
            />
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
    <div className="animate-luxury-fade bg-[#1A1A1A] flex flex-col min-h-[100dvh] font-sans text-white pb-28 relative">
        {/* Header - No Close Button, Centered Text, Updated Typography, Search Pill */}
        <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-safe py-6 pointer-events-none flex justify-center items-center">
            {/* Title */}
            <div className="text-[13px] font-bold tracking-normal uppercase opacity-80 font-sans text-white drop-shadow-md pointer-events-auto">Exclusive Pieces</div>
            
            {/* Search Pill Right */}
            <div className="absolute right-6 pointer-events-auto">
                <SearchPill />
            </div>
        </div>
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

  // Determine availability color/status for Home
  const statusColor = state.ca.status === 'Online' ? 'bg-green-500' : state.ca.status === 'Away' ? 'bg-yellow-500' : 'bg-red-500';

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
         <div className="pt-4 pb-2 px-1">
             <h1 className="text-[28px] font-sans font-bold text-white/90 tracking-[-0.025em] leading-[1.1]">Good Morning,</h1>
             <h1 className="text-[28px] font-serif italic font-light text-white leading-[1.1]">Andrea</h1>
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
         <div onClick={() => navigate('mto')} className="bg-[#F9F8F6] p-1 rounded-xl shadow-lg flex active:scale-[0.99] transition-transform relative overflow-hidden h-32">
            <div className="absolute inset-2 border border-dashed border-black/10 rounded-lg pointer-events-none z-10" />
            <div className="flex-1 p-4 flex flex-col justify-center text-[#1A1A1A] relative z-20 pl-6">
               <div className="text-[8px] text-[#A64B3E] font-sans font-bold tracking-wide mb-1">André Shirt</div>
               <div className="text-sm font-serif leading-tight mb-3 pr-2">Your Cash Denim<br/>jacket is ready</div>
               <div className="bg-[#A64B3E] text-white text-[8px] px-2 py-1 rounded-full w-max font-serif tracking-wide">Delivered</div>
            </div>
            <div className="w-[45%] h-full relative overflow-hidden"><img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/ab1bc08d9d5af798814ab6f1bd91f7f1c432a15c/MTO.png" className="w-[140%] max-w-none h-auto object-cover mix-blend-multiply opacity-90 absolute -top-8 -left-4" /></div>
         </div>
         
         {/* Concierge Module with availability sign */}
         <div onClick={toggleChat} className="flex items-center justify-between gap-3 bg-[#4E3E38]/30 backdrop-blur-md p-3 rounded-full border border-white/5 cursor-pointer active:bg-[#4E3E38]/50 transition-colors px-6">
            <div className="flex items-center gap-3">
               <span className="text-[9px] text-white/60 font-sans tracking-wide uppercase">Concierge</span>
               <div className={`w-1.5 h-1.5 rounded-full ${statusColor} shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-pulse`} />
            </div>
            <span className="text-sm text-[#C5A572] font-serif italic tracking-wide">Sofia Giordano</span>
         </div>

         {/* Book a store visit button */}
         <button onClick={() => navigate('plan-visit')} className="w-full bg-[#F9F8F6] p-4 rounded-xl shadow-lg flex items-center justify-between active:scale-[0.99] transition-transform group">
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

      <section className="bg-[#8B3A3A] pt-14 pb-32 px-0 relative overflow-hidden animate-on-scroll">
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

const SettingRow = ({ label, type, onClick, value }: { label: string; type?: 'arrow' | 'toggle'; onClick?: () => void; value?: string }) => (
    <div onClick={onClick} className="flex items-center justify-between p-4 cursor-pointer active:bg-black/5 transition-colors">
        <span className="text-sm font-sans text-[#1A1A1A]">{label}</span>
        {type === 'toggle' ? (
             <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${label.includes('location') ? 'bg-[#A64B3E]' : 'bg-[#E5E5E5]'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${label.includes('location') ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        ) : (
            <div className="flex items-center gap-2">
                {value && <span className="text-xs font-serif italic text-[#A64B3E]">{value}</span>}
                <ChevronRight className="w-5 h-5 text-[#1A1A1A]/30" strokeWidth={1.5} />
            </div>
        )}
    </div>
);

export const AccountScreen: React.FC<{ state: State; navigate: any }> = ({ state, navigate }) => {
  // Logic for availability display
  const statusColor = state.ca.status === 'Online' ? 'bg-green-500' : state.ca.status === 'Away' ? 'bg-yellow-500' : 'bg-red-500';
  const statusText = state.ca.status === 'Online' ? 'Available now' : state.ca.status === 'Away' ? 'Away' : 'Busy';
  const backupText = state.ca.status === 'Away' ? 'Backup: Marco Rossi' : null;

  return (
    <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans pb-32 animate-luxury-fade">
        {/* Top Dark Section */}
        <div className="bg-gradient-to-b from-[#2D0A0A] to-[#1A0505] pt-safe px-6 pb-20 text-white relative overflow-hidden">
            {/* Background Texture/Gradient effects could be added here */}
            
            {/* Header User Info */}
            <div className="flex items-center gap-4 mt-4 mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 p-1 relative">
                    <img src={state.user.avatar} className="w-full h-full rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#6B6B6B] rounded-full flex items-center justify-center border border-black">
                        <Edit2 className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold font-sans">{state.user.name}</h1>
                    <div className="flex items-center gap-1 opacity-70 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs font-sans">{state.user.location}</span>
                    </div>
                </div>
            </div>

            {/* Membership Card */}
            <div className="w-full aspect-[4/5] max-w-[340px] mx-auto bg-[#A64B3E] rounded-lg shadow-2xl relative overflow-hidden flex flex-col items-center justify-between py-12 text-[#E8E2D9]">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
                 <div className="text-center space-y-2 relative z-10">
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase">Andrea Sparks</div>
                    <div className="text-[8px] font-serif italic opacity-70">N° 02</div>
                 </div>
                 
                 <div className="w-48 h-48 opacity-20 mix-blend-multiply bg-black rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                 <img src={LORO_SYMBOL_PNG} className="w-40 opacity-30 relative z-10 mix-blend-soft-light" />

                 <div className="w-8 h-8 rounded-full border border-[#E8E2D9]/30 flex items-center justify-center relative z-10">
                    <ArrowRight className="w-4 h-4" />
                 </div>
            </div>
        </div>

        {/* White Content Area */}
        <div className="flex-1 bg-[#F4F0EA] -mt-10 rounded-t-[32px] relative z-10 px-6 pt-3 space-y-6">
            <div className="w-10 h-1 bg-black/10 rounded-full mx-auto mb-4" />

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-4 relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                         <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/b0f3d1a55dd1259a27955c7c020478361f332bdf/ginzatokio.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[#1A1A1A]">Store information</h3>
                        <p className="text-[10px] text-[#1A1A1A]/60 font-serif italic mt-1">Ginza, Tokyo</p>
                        <p className="text-[9px] text-[#1A1A1A]/40 uppercase tracking-wide mt-2 pt-2 border-t border-black/5">Last visit: Oct 24</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-4 relative overflow-hidden">
                     <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                         <img src={state.ca.avatar} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[#1A1A1A]">Client Advisor</h3>
                        <p className="text-[10px] text-[#1A1A1A]/60 font-serif italic mt-1">{state.ca.name}</p>
                        
                        <div className="mt-2 pt-2 border-t border-black/5 flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
                                <span className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-wide">{statusText}</span>
                            </div>
                            {backupText && <span className="text-[9px] text-[#1A1A1A]/40 italic">{backupText}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Plan Visit */}
            <button onClick={() => navigate('plan-visit')} className="w-full bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform">
                <div className="text-left">
                    <h3 className="text-sm font-bold text-[#1A1A1A]">Plan a store visit</h3>
                    <p className="text-[10px] text-[#1A1A1A]/60 font-serif italic mt-1 max-w-[150px]">Find out how we care for your garments</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#A64B3E] flex items-center justify-center text-white shadow-md">
                     <ArrowRight className="w-4 h-4" />
                </div>
            </button>

            {/* Settings */}
            <div className="pt-4 space-y-4">
                <h2 className="text-2xl font-serif text-[#1A1A1A]">Settings</h2>
                
                <div className="bg-white rounded-2xl shadow-sm divide-y divide-black/5 overflow-hidden">
                    <SettingRow label="Personal preferences" onClick={() => navigate('personal-preferences')} />
                    <SettingRow label="Personal informations" />
                    <SettingRow label="Enable location" type="toggle" />
                    <SettingRow label="Enable push notification" type="toggle" />
                </div>

                 <div className="bg-white rounded-2xl shadow-sm divide-y divide-black/5 overflow-hidden">
                    <SettingRow label="Leave Feedback" />
                    <SettingRow label="Terms & Conditions" />
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-8 space-y-4">
                <p className="text-[10px] text-[#1A1A1A]/40 font-serif text-center max-w-xs mx-auto leading-relaxed">
                    This app does not store any private data.<br/>
                    Read the the <span className="underline">Terms & Conditions.</span>
                </p>
                <button onClick={() => navigate('welcome')} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A64B3E] underline underline-offset-4">
                    Sign Out
                </button>
            </div>
        </div>
    </div>
  )
}
