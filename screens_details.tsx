
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Plus, Search, Heart, Clock, ArrowRight, Zap, Briefcase, MapPin, Bell, UserPlus, QrCode, CheckCircle2, ChevronRight, ChevronLeft, MoreHorizontal, X, MessageSquare, Edit2, ShieldCheck, Sparkles, Scan, Layout, Check, Calendar, Hammer, Wrench, Scissors, History, Eye, Smartphone, ShoppingBag, Palette, Ruler, PenTool } from 'lucide-react';
import { Header } from './components';
import { State, ScreenType, Wardrobe, WardrobeItem } from './types';
import { LORO_PRODUCTS, INITIAL_STATE } from './data';
import { gsap } from 'gsap';
import { StackedCards } from './screens_home';

const LORO_SYMBOL_PNG = "https://raw.githubusercontent.com/marcelorm81/LP_assets/0816650e9d350c07f88b303736084bef893d52bd/LPsymbol.png";

// Helper component for Preference Rows
const PreferenceRow = ({ label, value, border = true, onClick }: { label: string, value: string, border?: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className={`flex items-center justify-between p-5 cursor-pointer active:bg-[#F4F0EA] transition-colors ${border ? 'border-b border-[#1A1A1A]/5' : ''}`}>
     <span className="text-sm text-[#1A1A1A] font-sans">{label}</span>
     <div className="flex items-center gap-3">
        <span className="text-xs font-serif text-[#A64B3E]">{value}</span>
        <ChevronRight className="w-4 h-4 text-[#A64B3E]" strokeWidth={1.5} />
     </div>
  </div>
);

export const ProductDetailScreen: React.FC<{ state: State; goBack: any; toggleChat: any }> = ({ state, goBack, toggleChat }) => {
  const product = LORO_PRODUCTS.find(p => p.id === state.selectedProductId) || LORO_PRODUCTS[0];
  return (
    <div className="min-h-screen bg-[#F4F0EA] flex flex-col animate-luxury-fade relative">
      {/* Image Section: #F4F0EA Background, Edge-to-Edge */}
      <div className="h-[60vh] w-full bg-[#F4F0EA] relative flex items-center justify-center">
         {/* Added mix-blend-multiply to blend white image bg with container */}
         <img src={product.image} className="w-[85%] h-[85%] object-contain" />
         
         {/* Nav Buttons */}
         <div className="absolute top-0 left-0 right-0 p-6 pt-safe flex justify-between items-start">
           <button onClick={goBack} className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#1A1A1A] active:scale-90 transition-transform">
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
           </button>
           <button className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#1A1A1A] active:scale-90 transition-transform">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
           </button>
         </div>
      </div>

      {/* Details Section - Flat, no overlap */}
      <div className="flex-1 bg-[#F4F0EA] p-8 flex flex-col space-y-8 pb-32">
         <div className="space-y-6">
            <div>
                <div className="text-[10px] font-bold text-[#B08D57] uppercase tracking-[0.4em] mb-2 font-sans">{product.category}</div>
                <h2 className="text-3xl font-serif italic font-light text-[#1A1A1A]">{product.name}</h2>
            </div>
            
            <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed font-sans">
                Expertly crafted from the finest raw materials, this piece exemplifies Loro Piana's commitment to uncompromising quality and timeless elegance.
            </p>

            <div className="pt-6 border-t border-[#1A1A1A]/5 space-y-4">
                 <div className="flex justify-between items-center group cursor-pointer">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-sans text-[#1A1A1A]">Care Instructions</span>
                     <Plus className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="flex justify-between items-center group cursor-pointer">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-sans text-[#1A1A1A]">Origin & Traceability</span>
                     <Plus className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                 </div>
            </div>
         </div>

         <div className="mt-auto pt-4">
            <button onClick={toggleChat} className="w-full py-5 bg-[#1A1A1A] text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 font-sans hover:bg-black">
                <MessageSquare className="w-4 h-4" strokeWidth={1.5} /> 
                Consult Advisor
            </button>
         </div>
      </div>
    </div>
  );
};

// --- New MTO Landing Page ---
export const MTOScreen: React.FC<{ state: State; goBack: () => void; navigate: any; toggleChat: any }> = ({ state, goBack, navigate, toggleChat }) => {
    return (
        <div className="animate-luxury-fade bg-[#F4F0EA] min-h-screen flex flex-col pb-28 relative overflow-x-hidden">
            {/* Header: Absolute, Transparent, Overlay */}
            <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-safe py-6 flex justify-between items-center pointer-events-none">
                <div />
                <div className="text-[13px] font-bold tracking-normal uppercase opacity-80 font-sans text-white drop-shadow-md">Personalization</div>
                <button onClick={goBack} className="w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform pointer-events-auto border border-white/10"><X className="w-4 h-4" /></button>
            </div>

            {/* Hero Section - Full Bleed */}
            <div className="relative h-[80vh] w-full">
                <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/f055abedde0b673bf1958ef79d8bdf6054d01611/craftmanship3.jpg" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 text-white">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="text-[11px] font-sans font-medium tracking-wide uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Exclusive Service</span>
                    </div>
                    
                    <div className="mb-2">
                        <h1 className="text-3xl font-serif italic font-light leading-tight">My Loro Piana</h1>
                        <h1 className="text-3xl font-sans font-bold leading-tight">Bespoke Offer</h1>
                    </div>
                    <p className="text-[10px] font-sans text-white/80 leading-relaxed uppercase tracking-wide mt-4">The pinnacle of sartorial excellence</p>
                </div>
            </div>

            {/* Actions Menu */}
            <div className="px-6 space-y-4 flex-1 pt-8 bg-[#F4F0EA] relative z-10 -mt-4 rounded-t-3xl">
                {/* Action 1: Configure */}
                <button onClick={() => {/* Placeholder for 3D Config */}} className="w-full bg-[#A64B3E] text-white p-6 rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <PenTool className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-sans font-bold">Configure My Garment</div>
                            <div className="text-[9px] uppercase tracking-widest opacity-80 font-sans mt-1">Start a new creation</div>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </button>

                {/* Action 2: Active Status */}
                <button onClick={() => navigate('mto-detail')} className="w-full bg-white text-[#1A1A1A] p-6 rounded-2xl shadow-sm border border-[#1A1A1A]/5 active:scale-[0.98] transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F4F0EA] flex items-center justify-center">
                            <Scissors className="w-5 h-5 text-[#1A1A1A]" strokeWidth={1.5} />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-sans font-bold">My Creations Order Status</div>
                            <div className="text-[9px] uppercase tracking-widest text-[#B08D57] font-sans mt-1 font-bold">1 Active Order</div>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#1A1A1A]/30 group-hover:text-[#1A1A1A] transition-colors" />
                </button>

                {/* Action 3: History */}
                <button onClick={() => navigate('order-history')} className="w-full bg-white text-[#1A1A1A] p-6 rounded-2xl shadow-sm border border-[#1A1A1A]/5 active:scale-[0.98] transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F4F0EA] flex items-center justify-center">
                            <History className="w-5 h-5 text-[#1A1A1A]" strokeWidth={1.5} />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-sans font-bold">See all the orders</div>
                            <div className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 font-sans mt-1">Archive</div>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#1A1A1A]/30 group-hover:text-[#1A1A1A] transition-colors" />
                </button>

                 <div className="p-6 text-center">
                     <button onClick={toggleChat} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A64B3E] underline underline-offset-4 decoration-[#A64B3E]/30">
                        Contact Specialist
                     </button>
                </div>
            </div>
        </div>
    );
};

export const MTODetailScreen: React.FC<{ state: State; goBack: () => void; navigate: any; toggleChat: any }> = ({ state, goBack, navigate, toggleChat }) => {
  const mtoDetails = { title: "Traveller Jacket", purchaseDate: "Purchased 23 June 2022", heroImage: "https://raw.githubusercontent.com/marcelorm81/LP_assets/ab1bc08d9d5af798814ab6f1bd91f7f1c432a15c/MTO.png", stepImage: "https://raw.githubusercontent.com/marcelorm81/LP_assets/71ff099ed2c4ce74c83c5dd5ee00f7842813ee0f/jacket2.jpg", updatesText: `Dear ${state.user.name.split(' ')[0]},\nWe are currently assembling your Traveller Jacket.\nTrack the progress of your garment right here`, specs: ["Fabric selection: Linen & Cotton Blend.", "Colour: Icy Stone (W1BU)."] };
  return (
    <div className="animate-luxury-fade bg-[#F4F0EA] min-h-full flex flex-col pb-10">
      {/* Centered Header matching DropsScreen style */}
      <div className="sticky top-0 left-0 right-0 z-50 px-6 pt-safe py-6 flex justify-center items-center bg-[#F4F0EA]/90 backdrop-blur-md">
        <div className="text-[13px] font-bold tracking-normal uppercase opacity-80 font-sans text-[#1A1A1A]">Order Tracking</div>
        <div className="absolute right-6">
            <button onClick={goBack} className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"><X className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="w-full flex justify-center -mt-4 mb-6 relative z-0"><img src={mtoDetails.heroImage} className="w-[85%] max-w-md object-contain mix-blend-multiply" alt="Jacket Sketch" /></div>
      <div className="px-6 relative z-10 space-y-8">
         <div className="space-y-1"><h1 className="text-3xl font-serif font-medium text-[#1A1A1A]">{mtoDetails.title}</h1><p className="text-sm font-serif text-[#1A1A1A]/60">{mtoDetails.purchaseDate}</p></div>
         <button onClick={toggleChat} className="w-full py-4 bg-[#A64B3E] text-white rounded-full text-[13px] font-sans font-medium shadow-lg active:scale-[0.98] transition-transform">Contact client advisor</button>
         <div className="space-y-3 pt-4"><h3 className="text-[11px] font-bold uppercase tracking-wider text-[#A64B3E] font-sans">Latest updates</h3><p className="text-[15px] font-serif leading-relaxed text-[#1A1A1A]/80 whitespace-pre-line">{mtoDetails.updatesText}</p></div>
         <div className="relative border-l border-[#A64B3E]/30 ml-3.5 pl-8 space-y-10 py-2">
            <div className="relative"><div className="absolute -left-[39px] top-0 w-6 h-6 bg-[#A64B3E] rounded-full flex items-center justify-center text-white shadow-sm ring-4 ring-[#F4F0EA]"><Check className="w-3.5 h-3.5" strokeWidth={3} /></div><div><div className="text-[14px] font-bold font-sans text-[#1A1A1A]">Order confirmed</div><div className="text-[11px] font-serif text-[#1A1A1A]/50 mt-0.5">09.11.2024</div></div></div>
            <div className="relative"><div className="absolute -left-[39px] top-0 bottom-0 w-6 flex flex-col items-center justify-center"></div><div className="bg-[#EFEBE4] p-6 rounded-xl shadow-sm border border-[#A64B3E]/10 flex flex-col gap-4 relative"><div className="w-full aspect-[4/3] mix-blend-multiply flex items-center justify-center"><img src={mtoDetails.stepImage} className="w-full h-full object-contain mix-blend-multiply" /></div><div><div className="text-[10px] font-bold uppercase tracking-wider text-[#A64B3E] mb-1 font-sans">Made to Order</div><div className="text-lg font-bold font-sans leading-tight pr-10">Your Cash Denim jacket is almost ready</div></div><button className="absolute bottom-6 right-6 w-10 h-10 bg-[#A64B3E] rounded-full flex items-center justify-center text-white shadow-md active:scale-90 transition-transform"><ArrowRight className="w-5 h-5" /></button></div></div>
            <div className="relative"><div className="absolute -left-[39px] top-0 w-6 h-6 bg-[#A64B3E] rounded-full flex items-center justify-center text-white shadow-sm ring-4 ring-[#F4F0EA]"><Check className="w-3.5 h-3.5" strokeWidth={3} /></div><div><div className="text-[14px] font-bold font-sans text-[#1A1A1A]">Ready to be delivered</div><div className="text-[11px] font-serif text-[#1A1A1A]/50 mt-0.5">10.11.2024</div></div></div>
            <div className="relative"><div className="absolute -left-[39px] top-0 w-6 h-6 bg-transparent border-2 border-[#A64B3E]/20 rounded-full ring-4 ring-[#F4F0EA]"></div><div><div className="text-[14px] font-medium font-sans text-[#1A1A1A]/60">Delivered to store</div></div></div>
         </div>
         <div className="h-px bg-[#1A1A1A]/10 w-full" />
         <div className="space-y-4"><h3 className="text-[11px] font-bold uppercase tracking-wider text-[#A64B3E] font-sans">Order details</h3><div className="space-y-1"><p className="text-[14px] font-serif text-[#1A1A1A]/60">Your bespoke specifications</p>{mtoDetails.specs.map((spec, i) => (<p key={i} className="text-[14px] font-serif text-[#1A1A1A] leading-relaxed">{spec}</p>))}</div></div>
         <div className="h-px bg-[#1A1A1A]/10 w-full" />
         <div className="space-y-1 pb-4"><h3 className="text-[14px] font-serif text-[#1A1A1A]/60">Invoice</h3><button className="text-[14px] font-serif text-[#A64B3E] underline underline-offset-4">Download my invoice</button></div>
         <button onClick={toggleChat} className="w-full py-4 bg-[#A64B3E] text-white rounded-full text-[13px] font-sans font-medium shadow-lg active:scale-[0.98] transition-transform">Contact client advisor</button>
      </div>
    </div>
  );
};

export const EventsScreen: React.FC<{ state: State; navigate: any; goBack: any }> = ({ state, navigate, goBack }) => {
    // Identify the main upcoming event (Giraglia) for the Hero section
    const mainEvent = state.events.find(e => e.id === 'giraglia-2025') || state.events[0];
    const otherEvents = state.events.filter(e => e.id !== mainEvent.id);

    const experiences = [
        { id: 'exp1', title: 'Bitter, Sweet', location: 'at Bob Milano', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/a21949bbadb39167a0912d47975f1ff65239fbc9/ticket.jpg' },
        { id: 'exp2', title: 'Aperitivo', location: 'at Villa d\'Este', image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=800' },
        { id: 'exp3', title: 'Private View', location: 'Galleria Borghese', image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=800' },
        { id: 'exp4', title: 'Jazz Night', location: 'Blue Note Milano', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800' }
    ];

    return (
        <div className="bg-[#F4F0EA] min-h-screen pb-28 text-[#1A1A1A] font-sans animate-luxury-fade overflow-x-hidden relative">
            
            {/* Header: Absolute, Transparent, No Blur, Overlay on Video */}
            <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-safe py-6 flex justify-center items-center pointer-events-none">
                <div className="text-[13px] font-bold tracking-normal uppercase opacity-80 font-sans text-white drop-shadow-md">Your events</div>
            </div>

            {/* Hero Video Section - Full Screen Impact */}
            <div 
                onClick={() => navigate('event-detail', { selectedEventId: mainEvent.id })}
                className="relative h-[80vh] w-full cursor-pointer group"
            >
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="https://raw.githubusercontent.com/marcelorm81/LP_assets/535683b2683745d86037c79c476ef55db071f4eb/loronew.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                
                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 text-white">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="text-[11px] font-sans font-medium tracking-wide uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">09-19 June</span>
                        <span className="text-[11px] font-sans font-medium tracking-wide opacity-80">5 places left</span>
                    </div>
                    
                    {/* Title with requested specific line breaks */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-sans font-bold leading-tight">Set Foot</h1>
                        <h1 className="text-3xl font-sans font-bold leading-tight">aboard My Song,</h1>
                        <h2 className="text-3xl font-serif italic font-light leading-tight">at Loro Piana</h2>
                        <h2 className="text-3xl font-serif italic font-light leading-tight">Giraglia</h2>
                    </div>
                    
                    <div className="mt-8">
                         <button className="w-full py-5 bg-[#F4F0EA] text-[#1A1A1A] uppercase tracking-[0.2em] text-[10px] font-bold rounded-full active:scale-[0.98] transition-all hover:bg-white shadow-xl flex items-center justify-center">
                            {mainEvent.status === 'confirmed' ? 'Access Event' : 'RSVP'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Past Events Section */}
            <div className="px-6 pb-8 space-y-8 bg-[#F4F0EA] text-[#1A1A1A]">
                <div className="space-y-2 pt-8 border-t border-[#1A1A1A]/10">
                    <h2 className="text-2xl font-serif text-[#1A1A1A]">Past Events</h2>
                    <p className="text-sm font-sans text-[#1A1A1A]/60 max-w-[250px] leading-relaxed">
                        Relive the Loro Piana moments you've attended.
                    </p>
                </div>

                <div className="space-y-4">
                    {otherEvents.map(evt => (
                        <div key={evt.id} className="bg-white p-0 rounded-2xl overflow-hidden shadow-sm flex h-[140px] border border-[#1A1A1A]/5 group cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate('event-detail', { selectedEventId: evt.id }); }}>
                            <div className="flex-1 p-6 flex flex-col justify-center space-y-2 relative">
                                <div className="text-[9px] text-[#A64B3E] font-bold uppercase tracking-widest">{evt.date}</div>
                                <h3 className="text-lg font-serif italic text-[#1A1A1A] leading-tight max-w-[120px]">{evt.title}</h3>
                                <div className="flex items-center gap-1 text-[8px] text-[#1A1A1A]/40 uppercase tracking-wider group-hover:text-[#A64B3E] transition-colors">
                                    <span>View Gallery</span> <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                            <div className="w-[40%] h-full relative">
                                <img src={evt.image} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Exclusive Access Section (Added) */}
            <section className="bg-[#F4F0EA] py-14 px-0 relative overflow-hidden animate-on-scroll">
                <div className="relative z-10 px-8 mb-6 text-center space-y-1">
                    <h2 className="text-2xl font-serif font-light text-[#1A1A1A]">Exclusive Access</h2>
                    <p className="text-[9px] font-sans opacity-70 text-[#1A1A1A] max-w-xs mx-auto leading-relaxed">Curated experiences for our most valued clients</p>
                </div>
                <div className="relative z-10 w-full flex justify-center pb-4"><StackedCards items={experiences} /></div>
                <div className="text-center pb-2 relative z-10"><button className="text-[8px] uppercase tracking-[0.2em] border-b border-[#1A1A1A]/30 pb-0.5 font-sans text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors">See All Access</button></div>
            </section>
        </div>
    );
};

// --- Store Access Card Component ---

const StoreAccessCard: React.FC = () => {
    const [flipped, setFlipped] = useState(false);
    const [color, setColor] = useState<'burgundy' | 'cream' | 'black' | 'purple'>('burgundy');

    const cardRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const foilRef = useRef<HTMLDivElement>(null);
    const qrFoilRef = useRef<HTMLDivElement>(null);

    const colors = {
        burgundy: { bg: 'bg-[#9D5248]', text: 'text-[#C5A572]' }, // Gold text
        cream: { bg: 'bg-[#F0EBE0]', text: 'text-[#1A1A1A]' }, // Dark text for contrast
        black: { bg: 'bg-[#151515]', text: 'text-[#C5A572]' },
        purple: { bg: 'bg-[#3E2738]', text: 'text-[#C5A572]' }
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Handle touch or mouse
        const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const w = rect.width;
        const h = rect.height;
        const cx = w / 2;
        const cy = h / 2;

        // Rotation (Tilt)
        const rotateX = ((y - cy) / cy) * -15; 
        const rotateY = ((x - cx) / cx) * 15;

        // Sheen Movement (Opposite to mouse)
        const shineX = ((x - cx) / cx) * -100;
        const shineY = ((y - cy) / cy) * -100;

        // Foil Gradient Movement (Parallax)
        const foilX = ((x - cx) / cx) * 40;
        const foilY = ((y - cy) / cy) * 40;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: flipped ? 180 + rotateY : rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1200,
            transformStyle: "preserve-3d"
        });

        if (shineRef.current) {
             gsap.to(shineRef.current, {
                x: shineX,
                y: shineY,
                opacity: 0.6,
                duration: 0.3
            });
        }

        if (foilRef.current) gsap.to(foilRef.current, { x: foilX, y: foilY, duration: 0.5 });
        if (qrFoilRef.current) gsap.to(qrFoilRef.current, { x: foilX, y: foilY, duration: 0.5 });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: flipped ? 180 : 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)'
        });
        if (shineRef.current) gsap.to(shineRef.current, { opacity: 0 });
    };

    useEffect(() => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                rotateY: flipped ? 180 : 0,
                duration: 0.8,
                ease: "back.out(1.2)"
            });
        }
    }, [flipped]);

    return (
        <div className="flex flex-col items-center gap-8 animate-luxury-fade">
            {/* 3D Container - Scaled Down by 40% */}
            <div 
                className="w-[180px] h-[270px] cursor-pointer perspective-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseLeave}
                onClick={() => setFlipped(!flipped)}
                style={{ perspective: '1200px' }}
            >
                {/* The Card */}
                <div 
                    ref={cardRef} 
                    className={`w-full h-full relative transition-all will-change-transform rounded-2xl shadow-2xl ${colors[color].bg}`}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* --- FRONT FACE --- */}
                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-between py-6 px-4 overflow-hidden rounded-2xl" style={{ backfaceVisibility: 'hidden' }}>
                        
                        {/* Materials: Texture + Dashed Stitching */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
                        <div className="absolute inset-2 border border-dashed border-white/20 rounded-xl pointer-events-none" />

                        {/* Sheen Layer */}
                        <div ref={shineRef} className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 pointer-events-none mix-blend-soft-light" />

                        {/* Content */}
                        <div className="text-center space-y-1 relative z-10">
                            <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-white opacity-90">Andrea Sparks</div>
                            <div className="text-[8px] font-serif italic text-white opacity-70">N° 02</div>
                        </div>

                        {/* Metallic Foil Logo */}
                        <div className="relative w-24 h-24">
                             <div className="w-full h-full relative" style={{ 
                                 maskImage: `url(${LORO_SYMBOL_PNG})`, 
                                 WebkitMaskImage: `url(${LORO_SYMBOL_PNG})`,
                                 maskSize: 'contain',
                                 WebkitMaskSize: 'contain',
                                 maskRepeat: 'no-repeat',
                                 WebkitMaskRepeat: 'no-repeat',
                                 maskPosition: 'center',
                                 WebkitMaskPosition: 'center'
                             }}>
                                 {/* The moving gold gradient */}
                                 <div ref={foilRef} className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-[#C5A572] via-[#FBF5E9] to-[#8C7043]" />
                             </div>
                        </div>

                        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center relative z-10 ${colors[color].text}`}>
                            <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    {/* --- BACK FACE --- */}
                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-4 rounded-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                         {/* Materials */}
                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
                         <div className="absolute inset-3 border border-dashed border-white/20 rounded-xl pointer-events-none" />

                         {/* Metallic Foil QR Code */}
                         <div className="relative w-28 h-28 mb-4 bg-white p-3 rounded-lg shadow-inner">
                            {/* We use a real QR SVG but styled as foil */}
                            <QrCode className="w-full h-full text-[#1A1A1A]" strokeWidth={1} />
                         </div>

                         <div className={`text-[8px] font-bold uppercase tracking-[0.2em] ${colors[color].text} opacity-60`}>Scan at entrance</div>
                    </div>
                </div>
            </div>

            {/* Customization Menu */}
            <div className="flex gap-4 p-4 bg-[#1A1A1A]/80 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
                 <button onClick={(e) => { e.stopPropagation(); setColor('burgundy'); }} className={`w-6 h-6 rounded-full bg-[#9D5248] border-2 ${color === 'burgundy' ? 'border-white scale-110' : 'border-transparent opacity-50'} transition-all`} />
                 <button onClick={(e) => { e.stopPropagation(); setColor('cream'); }} className={`w-6 h-6 rounded-full bg-[#F0EBE0] border-2 ${color === 'cream' ? 'border-white scale-110' : 'border-transparent opacity-50'} transition-all`} />
                 <button onClick={(e) => { e.stopPropagation(); setColor('black'); }} className={`w-6 h-6 rounded-full bg-[#151515] border-2 ${color === 'black' ? 'border-white scale-110' : 'border-transparent opacity-50'} transition-all`} />
                 <button onClick={(e) => { e.stopPropagation(); setColor('purple'); }} className={`w-6 h-6 rounded-full bg-[#3E2738] border-2 ${color === 'purple' ? 'border-white scale-110' : 'border-transparent opacity-50'} transition-all`} />
            </div>
        </div>
    );
};

export const StoreKeyScreen: React.FC<{ goBack: any }> = ({ goBack }) => {
    return (
        <div className="bg-[#000000] min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
             {/* Background Ambience */}
             <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-black opacity-80" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B08D57] opacity-10 blur-[120px] rounded-full pointer-events-none" />

             <button onClick={goBack} className="absolute top-6 right-6 p-2 text-white/50 z-50 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
             
             <div className="relative z-10 w-full max-w-md flex flex-col items-center">
                 <div className="mb-10 text-center space-y-2">
                     <h2 className="text-sm font-sans font-normal text-white">Access Key</h2>
                     <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans">Tap card to flip</p>
                 </div>
                 
                 <StoreAccessCard />
             </div>
        </div>
    );
};

export const EventDetailScreen: React.FC<{ state: State; goBack: any; toggleChat: any; navigate: any }> = ({ state, goBack, toggleChat, navigate }) => {
    const event = state.events.find(e => e.id === state.selectedEventId) || state.events[0];

    return (
        <div className="bg-[#1A1A1A] min-h-screen pb-28 text-white animate-luxury-fade">
             <div className="relative h-[50vh] w-full">
                <img src={event?.image} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#1A1A1A]" />
                <button onClick={goBack} className="absolute top-6 left-6 p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10"><ChevronLeft className="w-6 h-6 text-white" strokeWidth={1} /></button>
            </div>
            <div className="px-6 relative -mt-20 space-y-8">
                 <div className="space-y-2">
                     <span className="px-3 py-1 bg-[#B08D57] text-black text-[9px] font-bold uppercase tracking-widest rounded-sm">{event?.date}</span>
                     <h1 className="text-3xl font-serif italic">{event?.title}</h1>
                 </div>
                 
                 <p className="text-sm font-light leading-relaxed text-white/80 font-serif">{event?.description}</p>
                 
                 {event?.privileges && event.privileges.length > 0 && (
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

export const PersonalPreferencesScreen: React.FC<{ state: State; goBack: any; navigate: any }> = ({ state, goBack, navigate }) => {
    return (
        <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans animate-luxury-fade">
            <Header title="Preferences" showBack onBack={goBack} />
            <div className="p-6 space-y-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#1A1A1A] font-sans">Measurements</h3>
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <PreferenceRow label="My Sizes" value="IT 50" onClick={() => navigate('my-size')} />
                        <PreferenceRow label="Tailoring Notes" value="2 Active" border={false} />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#1A1A1A] font-sans">Style Profile</h3>
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <PreferenceRow label="Color Palette" value="Earthy Tones" />
                        <PreferenceRow label="Fabric Preferences" value="Vicuña, Cashmere" />
                        <PreferenceRow label="Fit Preference" value="Regular" border={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MySizeScreen: React.FC<{ goBack: any }> = ({ goBack }) => {
    const sizes = [
        { category: "Outerwear", size: "IT 50" },
        { category: "Knitwear", size: "IT 50" },
        { category: "Shirts", size: "39" },
        { category: "Trousers", size: "IT 48" },
        { category: "Shoes", size: "42.5" }
    ];

    return (
        <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans animate-luxury-fade">
            <Header title="My Sizes" showBack onBack={goBack} />
            <div className="p-6 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1A1A1A]/5 flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#F4F0EA] rounded-full flex items-center justify-center">
                        <Ruler className="w-6 h-6 text-[#A64B3E]" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-lg font-serif italic text-[#1A1A1A]">Digital Measurement</h3>
                        <p className="text-[10px] text-[#1A1A1A]/60 font-sans mt-1">Last updated: Oct 12, 2024</p>
                    </div>
                    <button className="ml-auto px-4 py-2 border border-[#1A1A1A]/10 rounded-full text-[10px] uppercase font-bold tracking-wider">Update</button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {sizes.map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-5 ${i !== sizes.length - 1 ? 'border-b border-[#1A1A1A]/5' : ''}`}>
                            <span className="text-sm text-[#1A1A1A] font-sans">{item.category}</span>
                            <span className="text-sm font-serif italic text-[#1A1A1A]">{item.size}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const PlanVisitScreen: React.FC<{ goBack: any; navigate: any }> = ({ goBack, navigate }) => {
    const store = INITIAL_STATE.user.homeStore; // Use home store data
    
    return (
        <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans animate-luxury-fade pb-10">
            <div className="relative h-[45vh] w-full">
                <img src={store.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <button onClick={goBack} className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"><ChevronLeft className="w-5 h-5" strokeWidth={1.5} /></button>
            </div>
            
            <div className="flex-1 bg-[#F4F0EA] -mt-10 rounded-t-[32px] relative z-10 px-6 pt-8 space-y-8">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B08D57]">Home Store</span>
                            <h1 className="text-3xl font-serif italic text-[#1A1A1A] mt-1">{store.name}</h1>
                        </div>
                        <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-lg">
                            <MapPin className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                    </div>
                    <p className="text-sm text-[#1A1A1A]/60 font-serif mt-2">{store.location}</p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Services</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {['Private Suite', 'Tailoring', 'Alterations', 'Valet Parking'].map((s) => (
                            <div key={s} className="bg-white p-4 rounded-xl shadow-sm text-center text-xs font-serif italic text-[#1A1A1A]">{s}</div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                     <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Opening Hours</h3>
                     <div className="bg-white p-6 rounded-2xl shadow-sm space-y-2">
                        <div className="flex justify-between text-xs text-[#1A1A1A]"><span>Mon - Fri</span><span>10:00 - 20:00</span></div>
                        <div className="flex justify-between text-xs text-[#1A1A1A]"><span>Sat</span><span>10:00 - 20:00</span></div>
                        <div className="flex justify-between text-xs text-[#1A1A1A]/50"><span>Sun</span><span>11:00 - 18:00</span></div>
                     </div>
                </div>

                <button className="w-full py-5 bg-[#A64B3E] text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl active:scale-[0.98] transition-all">
                    Book Appointment
                </button>
            </div>
        </div>
    );
};
