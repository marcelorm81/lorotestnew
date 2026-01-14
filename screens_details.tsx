
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Plus, Search, Heart, Clock, ArrowRight, Zap, Briefcase, MapPin, Bell, UserPlus, QrCode, CheckCircle2, ChevronRight, ChevronLeft, MoreHorizontal, X, MessageSquare, Edit2, ShieldCheck, Sparkles, Scan, Layout, Check, Calendar, Hammer, Wrench, Scissors, History, Eye, Smartphone, ShoppingBag, Palette, Ruler } from 'lucide-react';
import { Header } from './components';
import { State, ScreenType, Wardrobe, WardrobeItem } from './types';
import { LORO_PRODUCTS } from './data';
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

export const MTOScreen: React.FC<{ state: State; goBack: () => void; navigate: any; toggleChat: any }> = ({ state, goBack, navigate, toggleChat }) => {
  const mtoDetails = { title: "Traveller Jacket", purchaseDate: "Purchased 23 June 2022", heroImage: "https://raw.githubusercontent.com/marcelorm81/LP_assets/ab1bc08d9d5af798814ab6f1bd91f7f1c432a15c/MTO.png", stepImage: "https://raw.githubusercontent.com/marcelorm81/LP_assets/71ff099ed2c4ce74c83c5dd5ee00f7842813ee0f/jacket2.jpg", updatesText: `Dear ${state.user.name.split(' ')[0]},\nWe are currently assembling your Traveller Jacket.\nTrack the progress of your garment right here`, specs: ["Fabric selection: Linen & Cotton Blend.", "Colour: Icy Stone (W1BU)."] };
  return (
    <div className="animate-luxury-fade bg-[#F4F0EA] min-h-full flex flex-col pb-10">
      <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#F4F0EA]/90 backdrop-blur-md z-40 pt-safe">
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80 font-sans text-[#1A1A1A]">Made to Order</div>
        <button onClick={goBack} className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"><X className="w-4 h-4" /></button>
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

    return (
        <div className="bg-[#F4F0EA] min-h-screen pb-28 text-[#1A1A1A] font-sans animate-luxury-fade overflow-x-hidden relative">
            
            {/* Hero Video Section - Full Screen Impact */}
            <div 
                onClick={() => navigate('event-detail', { selectedEventId: mainEvent.id })}
                className="relative h-[90vh] w-full cursor-pointer group"
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
                        <h2 className="text-3xl font-serif italic font-light leading-tight">at the Loro Piana</h2>
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
            <div className="px-6 pb-8 space-y-8 bg-[#F4F0EA]">
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
        </div>
    );
};

const GALLERY_IMAGES = [
  "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/even1.avif",
  "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event2.avif",
  "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event3.avif",
  "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event4.avif",
  "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event5.avif",
  "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event6.avif",
  "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event7.avif",
  "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event8.avif"
];

export const EventDetailScreen: React.FC<{ state: State; goBack: any; toggleChat: any; navigate: any }> = ({ state, goBack, toggleChat, navigate }) => {
    const event = state.events.find(e => e.id === state.selectedEventId);
    const pastEvents = state.events.filter(e => e.type === 'past' && e.id !== state.selectedEventId);
    
    if (!event) return null;

    // Check if it's the Giraglia event to apply specific layout, otherwise generic detail or gallery
    const isGiraglia = event.id === 'giraglia-2025';

    if (!isGiraglia) {
        
        let caMessage = null;
        if (event.id === 'lake-como-2024') {
            caMessage = (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#1A1A1A]/5 flex gap-5 mb-8">
                    <div className="shrink-0">
                        <img src={state.ca.avatar} className="w-12 h-12 rounded-full object-cover border border-[#1A1A1A]/10" />
                    </div>
                    <div className="space-y-2">
                         <p className="text-sm font-serif italic text-[#1A1A1A] leading-relaxed">
                            <span className="font-bold font-sans not-italic text-[10px] uppercase tracking-widest text-[#B08D57] block mb-2">Message from Sofia</span>
                            "Andrea,<br/><br/>
                            A few memories from Lake Como. It was a beautiful moment to share, I hope these images bring you back there. Feel free to download any of them.<br/><br/>
                            Sophia"
                         </p>
                    </div>
                </div>
            );
        } else if (event.id === 'aspen-winter-2024') {
            caMessage = (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#1A1A1A]/5 flex gap-5 mb-8">
                    <div className="shrink-0">
                        <img src={state.ca.avatar} className="w-12 h-12 rounded-full object-cover border border-[#1A1A1A]/10" />
                    </div>
                    <div className="space-y-2">
                         <p className="text-sm font-serif italic text-[#1A1A1A] leading-relaxed">
                             <span className="font-bold font-sans not-italic text-[10px] uppercase tracking-widest text-[#B08D57] block mb-2">Message from Sofia</span>
                            "Andrea,<br/><br/>
                            Some moments from Aspen I wanted to share with you.<br/>
                            A very special atmosphere, I hope you enjoy revisiting it.<br/><br/>
                            Sophia"
                         </p>
                    </div>
                </div>
            );
        }

        // Simple Gallery View for Past Events (like Lake Como, Aspen)
        return (
             <div className="bg-[#F4F0EA] min-h-screen pb-28 text-[#1A1A1A] animate-luxury-fade relative">
                 <div className="h-[50vh] w-full relative">
                     <img src={event.image} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/20" />
                     <button onClick={goBack} className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"><X className="w-5 h-5" /></button>
                 </div>
                 <div className="px-6 py-8 -mt-10 relative bg-[#F4F0EA] rounded-t-[32px] space-y-4">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B08D57]">{event.date}</span>
                     <h1 className="text-3xl font-serif italic">{event.title}</h1>
                     <p className="text-sm font-sans text-[#1A1A1A]/70 leading-relaxed">{event.description}</p>
                     
                     <div className="pt-6">
                        
                        {caMessage}

                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-4">Gallery</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {GALLERY_IMAGES.map((src, i) => (
                                <div key={i} className="aspect-[4/5] rounded-lg overflow-hidden relative group cursor-pointer shadow-sm">
                                    <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                            ))}
                        </div>
                     </div>
                 </div>
             </div>
        )
    }

    return (
        <div className="bg-[#F4F0EA] min-h-screen pb-28 text-[#1A1A1A] font-sans animate-luxury-fade overflow-x-hidden">
            
            {/* Hero Video Section - Full Screen Impact */}
            <div className="relative h-[90vh] w-full">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="https://raw.githubusercontent.com/marcelorm81/LP_assets/535683b2683745d86037c79c476ef55db071f4eb/loronew.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                
                {/* Close Button */}
                <button onClick={goBack} className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform z-50">
                    <X className="w-5 h-5" strokeWidth={1} />
                </button>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 text-white">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="text-[11px] font-sans font-medium tracking-wide uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">09-19 June</span>
                        <span className="text-[11px] font-sans font-medium tracking-wide opacity-80">5 places left</span>
                    </div>
                    
                    {/* Updated Title Typography */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-sans font-bold leading-tight mb-0.5">Set Foot aboard My Song,</h1>
                        <h2 className="text-3xl font-serif italic font-light leading-tight">at the Loro Piana Giraglia</h2>
                    </div>
                    
                    <div className="mt-8">
                        <button className="w-full py-5 bg-[#F4F0EA] text-[#1A1A1A] uppercase tracking-[0.2em] text-[10px] font-bold rounded-full active:scale-[0.98] transition-all hover:bg-white shadow-xl">
                            RSVP
                        </button>
                    </div>
                </div>
            </div>

            {/* Editorial Content */}
            <div className="px-6 py-12 space-y-12 bg-[#F4F0EA]">
                <div className="space-y-4">
                    <h2 className="text-2xl font-sans font-bold leading-tight text-[#1A1A1A]">During three days, witness the Grand Finale of an unforgettable sea journey</h2>
                    <p className="text-sm font-serif text-[#1A1A1A]/70 leading-relaxed">
                        As a valued guest, you'll have exclusive access to the race, the opportunity to explore the enchanting French Riviera, and the chance to celebrate with champions at the concluding ceremony. This unique adventure combines the thrill of competitive sailing with cultural exploration and convivial celebrations.
                    </p>
                </div>

                {/* Agenda / Days Carousel */}
                <div>
                     <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-serif italic text-[#1A1A1A]">The Regatta</h3>
                        <div className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 font-bold">Agenda</div>
                     </div>
                     
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                        {/* Day 1 */}
                        <div className="min-w-[280px] h-[380px] relative rounded-lg overflow-hidden shrink-0 group shadow-lg">
                            <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/582084ffd3e71fcf69dc689d60061f9e587543df/carousel1.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                <div className="text-white text-[10px] font-sans font-bold uppercase tracking-widest">Day 1</div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="text-white text-xl font-serif italic mb-1">The Thrill of the Race</div>
                                <p className="text-white/70 text-[10px] font-sans leading-relaxed">Experience the start of the race from the exclusive Loro Piana boat.</p>
                            </div>
                        </div>

                         {/* Day 2 */}
                        <div className="min-w-[280px] h-[380px] relative rounded-lg overflow-hidden shrink-0 group shadow-lg">
                            <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/582084ffd3e71fcf69dc689d60061f9e587543df/carousel2.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                             <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                 <div className="text-white text-[10px] font-sans font-bold uppercase tracking-widest">Day 2</div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="text-white text-xl font-serif italic mb-1">Cultural Immersion</div>
                                <p className="text-white/70 text-[10px] font-sans leading-relaxed">Private tour of the historic port followed by a sunset gala dinner.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Button */}
                <div className="pt-4 border-t border-[#1A1A1A]/10">
                    <button onClick={toggleChat} className="w-full py-4 bg-[#A64B3E] text-white rounded-full text-sm font-sans font-medium shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Contact Client Advisor
                    </button>
                </div>
            </div>

            {/* Past Events Section */}
            <div className="px-6 pb-8 space-y-8 bg-[#F4F0EA]">
                <div className="space-y-2 pt-8 border-t border-[#1A1A1A]/10">
                    <h2 className="text-2xl font-serif text-[#1A1A1A]">Past Events</h2>
                    <p className="text-sm font-sans text-[#1A1A1A]/60 max-w-[250px] leading-relaxed">
                        Relive the Loro Piana moments you've attended.
                    </p>
                </div>

                <div className="space-y-4">
                    {pastEvents.map(evt => (
                        <div key={evt.id} className="bg-white p-0 rounded-2xl overflow-hidden shadow-sm flex h-[140px] border border-[#1A1A1A]/5 group cursor-pointer" onClick={() => navigate('event-detail', { selectedEventId: evt.id })}>
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

        </div>
    );
};

export const PlanVisitScreen: React.FC<{ goBack: any; navigate: any }> = ({ goBack, navigate }) => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    
    const dates = [{ d: '26', w: 'Mon' }, { d: '27', w: 'Tue' }, { d: '28', w: 'Wed' }, { d: '29', w: 'Thu' }, { d: '30', w: 'Fri' }, { d: '01', w: 'Sat' }];
    const times = ['10:00', '11:30', '14:00', '15:30', '17:00'];
    const reasons = [
        { id: 'styling', label: 'Styling Appointment' },
        { id: 'mto', label: 'MTO Consultation' },
        { id: 'pickup', label: 'Collection Pick-up' }
    ];

    if (submitted) {
        return (
            <div className="bg-[#F4F0EA] min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-6 animate-luxury-fade">
                <div className="w-20 h-20 bg-[#A64B3E] rounded-full flex items-center justify-center text-white shadow-xl mb-4"><Check className="w-10 h-10" /></div>
                <div className="space-y-2"><h2 className="text-3xl font-serif text-[#1A1A1A]">Request Sent</h2><p className="text-sm font-sans text-[#1A1A1A]/60 leading-relaxed max-w-[250px] mx-auto">Sofia will confirm your appointment shortly. You will receive a notification.</p></div>
                <button onClick={goBack} className="mt-8 px-10 py-4 bg-white border border-[#1A1A1A]/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-sm active:scale-[0.98] transition-all text-[#1A1A1A]">Return</button>
            </div>
        );
    }
    return (
        <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans animate-luxury-fade relative">
            <Header title="Plan a Visit" showBack onBack={goBack} showProfile={false} />
            <div className="p-6 space-y-8">
                <div className="space-y-4"><h2 className="text-2xl font-serif text-[#1A1A1A]">Select a Date</h2><div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">{dates.map((date, i) => (<button key={i} onClick={() => setSelectedDate(i)} className={`min-w-[64px] h-[80px] rounded-xl flex flex-col items-center justify-center border transition-all ${selectedDate === i ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-transparent shadow-sm'}`}><span className="text-xs font-serif italic opacity-80">{date.w}</span><span className="text-xl font-bold font-sans">{date.d}</span></button>))}</div></div>
                <div className="space-y-4"><h2 className="text-2xl font-serif text-[#1A1A1A]">Select Time</h2><div className="grid grid-cols-3 gap-3">{times.map((time, i) => (<button key={i} onClick={() => setSelectedTime(time)} className={`py-3 rounded-lg text-sm font-sans font-medium border transition-all ${selectedTime === time ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-transparent shadow-sm'}`}>{time}</button>))}</div></div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-serif text-[#1A1A1A]">Reason for visit</h2>
                    <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                        {reasons.map((r) => (
                             <div 
                                key={r.id}
                                onClick={() => setSelectedReason(r.id)}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${selectedReason === r.id ? 'bg-[#1A1A1A] text-white' : 'bg-[#F9F8F6] text-[#1A1A1A] hover:bg-[#E8E2D9]'}`}
                             >
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedReason === r.id ? 'border-white' : 'border-[#1A1A1A]'}`}>
                                    {selectedReason === r.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                <span className={`text-sm ${selectedReason === r.id ? 'text-white' : 'text-[#1A1A1A]'}`}>{r.label}</span>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-6 bg-[#F4F0EA] border-t border-black/5 pb-32">
                <button 
                    disabled={selectedDate === null || selectedTime === null || selectedReason === null} 
                    onClick={() => setSubmitted(true)} 
                    className="w-full bg-[#A64B3E] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Request Confirmation
                </button>
            </div>
        </div>
    );
};

export const PersonalPreferencesScreen: React.FC<{ state: State; goBack: any; navigate: any }> = ({ state, goBack, navigate }) => {
  return (
    <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans animate-luxury-fade relative">
       <div className="flex items-center justify-between px-6 py-4 pt-safe relative z-10"><button onClick={() => navigate('account')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"><ChevronLeft className="w-5 h-5 text-[#1A1A1A]" strokeWidth={1.5} /></button><div className="text-lg font-bold text-[#1A1A1A] font-sans">Personal preferences</div><div className="w-10" /></div>
       <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
          <div className="space-y-3"><h3 className="text-sm font-bold text-[#1A1A1A] ml-1">Size</h3><div className="bg-[#F9F8F6] rounded-xl overflow-hidden"><div onClick={() => navigate('my-size')} className="flex items-center justify-between p-5 border-b border-[#1A1A1A]/5 cursor-pointer active:bg-[#E8E2D9] transition-colors"><span className="text-sm text-[#1A1A1A]">My Measurements</span><ChevronRight className="w-4 h-4 text-[#A64B3E]" /></div><div onClick={() => navigate('my-size')} className="flex items-center justify-between p-5 cursor-pointer active:bg-[#E8E2D9] transition-colors"><span className="text-sm text-[#1A1A1A]">My size</span><ChevronRight className="w-4 h-4 text-[#A64B3E]" /></div></div></div>
          <div className="space-y-3"><h3 className="text-sm font-bold text-[#1A1A1A] ml-1">Preferences</h3><div className="bg-[#F9F8F6] rounded-xl overflow-hidden"><PreferenceRow label="Color preference" value="Blue, Red, Grey" /><PreferenceRow label="Destination" value="Regular holiday destination" /><PreferenceRow label="Food & Beverage" value="Coffee & tea, soft bevarages..." /><PreferenceRow label="My hobbies & interest" value="Cars, Fitness, Travels..." border={false} /></div></div>
       </div>
       <div className="p-6 pb-32 space-y-6 bg-[#F4F0EA]"><p className="text-[10px] text-[#1A1A1A]/50 text-center leading-relaxed font-serif">This app does not store any private data.<br/>Read the the <span className="underline cursor-pointer">Terms & Conditions.</span></p><button onClick={() => navigate('account')} className="w-full py-4 bg-[#A64B3E] text-white rounded-full text-sm font-sans font-medium shadow-lg active:scale-[0.98] transition-transform">Save</button></div>
    </div>
  );
};

export const MySizeScreen: React.FC<{ goBack: any }> = ({ goBack }) => {
  return (
    <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans animate-luxury-fade pb-32">
      <Header title="My Sizes" showBack onBack={() => goBack()} showProfile={false} />
      <div className="p-6 space-y-4">
         <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
             <div className="grid grid-cols-2 gap-4 border-b border-black/5 pb-4"><div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Jacket</div><div className="text-xl font-serif">IT 50</div></div><div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Trousers</div><div className="text-xl font-serif">IT 48</div></div></div>
             <div className="grid grid-cols-2 gap-4 border-b border-black/5 pb-4"><div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Shoes</div><div className="text-xl font-serif">EU 43</div></div><div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Shirt</div><div className="text-xl font-serif">40</div></div></div>
             <div className="grid grid-cols-2 gap-4"><div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Hat</div><div className="text-xl font-serif">M</div></div><div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Gloves</div><div className="text-xl font-serif">9</div></div></div>
         </div>
         <p className="text-[10px] text-center text-[#1A1A1A]/50">Based on your last scan on Oct 24, 2024</p>
      
         {/* Family Sizes Module */}
         <div className="pt-6 space-y-3">
             <h3 className="text-lg font-serif text-[#1A1A1A]">Family Sizes</h3>
             <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                 <div className="flex items-center justify-between p-5 border-b border-[#1A1A1A]/5 cursor-pointer active:bg-[#F9F8F6] transition-colors">
                     <div>
                        <div className="text-sm font-sans text-[#1A1A1A]">Riccardo</div>
                        <div className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider font-bold mt-0.5">Husband</div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-[#A64B3E]" strokeWidth={1.5} />
                 </div>
                 <div className="flex items-center justify-between p-5 cursor-pointer active:bg-[#F9F8F6] transition-colors">
                     <div>
                        <div className="text-sm font-sans text-[#1A1A1A]">Lucia</div>
                        <div className="text-[10px] text-[#1A1A1A]/60 uppercase tracking-wider font-bold mt-0.5">Daughter</div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-[#A64B3E]" strokeWidth={1.5} />
                 </div>
             </div>
             <button className="w-full py-4 border border-[#1A1A1A]/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] active:scale-[0.98] transition-all bg-white shadow-sm flex items-center justify-center gap-2 hover:bg-[#F9F8F6]">
                <Plus className="w-3 h-3" /> Add Member
             </button>
         </div>
      </div>
    </div>
  );
};

export const StoreKeyScreen: React.FC<{ goBack: any }> = ({ goBack }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const CARD_COLORS = [{ id: 'classic', bg: '#9D5248', accent: '#633832', name: 'Classic' }, { id: 'light', bg: '#EFEAE6', accent: '#9D5248', name: 'Light' }, { id: 'dark', bg: '#000000', accent: '#4A4646', name: 'Dark' }, { id: 'royal', bg: '#2F134D', accent: '#17012D', name: 'Royal' }];
  const [cardStyle, setCardStyle] = useState(CARD_COLORS[0]);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cardRef.current || !cardContainerRef.current) return;
    // @ts-ignore
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (centerY - clientY) / 20;
    const rotateY = (clientX - centerX) / 20;
    gsap.to(cardRef.current, { rotateX: rotateX, rotateY: isFlipped ? 180 - rotateY : rotateY, duration: 0.2, ease: 'power1.out', transformPerspective: 1000 });
    if (shineRef.current && specularRef.current) {
      const relX = (clientX - rect.left) / rect.width;
      const relY = (clientY - rect.top) / rect.height;
      gsap.to(shineRef.current, { x: (relX - 0.5) * 60, y: (relY - 0.5) * 60, opacity: 0.3, duration: 0.4 });
      gsap.to(specularRef.current, { x: (relX - 0.5) * -120, y: (relY - 0.5) * -120, opacity: 0.4, duration: 0.2 });
    }
  };
  const handleMouseLeave = () => { if (!cardRef.current) return; gsap.to(cardRef.current, { rotateX: 0, rotateY: isFlipped ? 180 : 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }); if (shineRef.current) gsap.to(shineRef.current, { opacity: 0, duration: 0.5 }); if (specularRef.current) gsap.to(specularRef.current, { opacity: 0, duration: 0.5 }); };
  useEffect(() => { if (!cardRef.current) return; gsap.to(cardRef.current, { rotateY: isFlipped ? 180 : 0, duration: 0.8, ease: 'back.out(1.2)' }); }, [isFlipped]);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] flex flex-col store-access-bg text-white animate-luxury-fade overflow-hidden z-50 mobile-stage-fixed bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
      <div className="h-14 shrink-0 px-8 pt-safe flex justify-between items-center relative z-20"><div /><div className="text-[8px] font-bold tracking-[0.5em] uppercase opacity-70 font-sans">Access Portal</div><button onClick={() => setIsEditing(!isEditing)} className={`p-2.5 backdrop-blur-md rounded-full active:scale-90 transition-all ${isEditing ? 'bg-white text-black' : 'bg-white/10 text-white'}`}><Edit2 className="w-3.5 h-3.5" strokeWidth={1.5} /></button></div>
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center relative z-10 w-full px-8 py-2">
        <div ref={cardContainerRef} className="relative w-full aspect-[1/1.45] max-h-[55vh] max-w-[340px] cursor-pointer touch-none" style={{ perspective: '1200px' }} onMouseMove={handleMouseMove} onTouchMove={handleMouseMove} onMouseLeave={handleMouseLeave} onTouchEnd={handleMouseLeave} onClick={() => !isEditing && setIsFlipped(!isFlipped)}>
          <div ref={cardRef} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transition: 'none' }}>
            <div className="absolute inset-0 w-full h-full rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col items-center justify-between overflow-hidden transition-colors duration-500" style={{ backgroundColor: cardStyle.bg, backfaceVisibility: 'hidden' }}>
              <div className="absolute inset-0 opacity-[0.6] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')] bg-[length:300px_300px]" /><div className="absolute inset-3 border border-dashed border-white/20 rounded-xl pointer-events-none" /><div ref={shineRef} className="absolute inset-[-50%] pointer-events-none opacity-0 z-20 mix-blend-soft-light" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)', filter: 'blur(20px)' }} /><div ref={specularRef} className="absolute inset-[-50%] pointer-events-none opacity-0 z-20 mix-blend-overlay" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, transparent 40%)' }} />
              <div className="relative z-10 text-center space-y-1 mt-2"><div className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-90 font-sans text-shadow-sm">Andrea Sparks</div><div className="text-[6px] tracking-[0.3em] opacity-50 font-bold uppercase font-sans">Client since 2005</div></div>
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center"><div className="w-28 h-28 opacity-90 relative z-10" style={{ maskImage: `url(${LORO_SYMBOL_PNG})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskImage: `url(${LORO_SYMBOL_PNG})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', backgroundColor: cardStyle.accent }} /></div>
              <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-black/20 backdrop-blur-md rounded-full border border-white/10 shadow-inner"><ShieldCheck className="w-3.5 h-3.5 opacity-60 text-white" strokeWidth={1.5} /></div>
            </div>
            <div className="absolute inset-0 w-full h-full rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: cardStyle.bg, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
               <div className="absolute inset-0 opacity-[0.6] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')] bg-[length:300px_300px]" /><div className="absolute inset-3 border border-dashed border-white/20 rounded-xl pointer-events-none" />
               <div className="w-full aspect-square flex items-center justify-center relative scale-[0.85] p-2"><div className="w-full h-full relative"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 115" className="w-full h-full" fill="none"><path d="M94 115H88V109H94V115ZM115 104H109V109H115V115H98V103H109V98H115V104ZM39 114H1V76H39V114ZM71 44H76V49H81V70H76V82H72V103H83V114H77V109H72V114H66V109H50V103H66V93H60V98H54V92H60V81H54V76H60V71H66V82H71V71H66V65H55V70H49V65H44V59H38V53H33V59H27V53H22V48H49V64H55V43H66V33H71V44ZM6 109H34V81H6V109ZM31 106H9V84H31V106ZM94 104H88V98H94V104ZM50 103H44V97H50V103ZM93 70H98V87H88V93H82V70H87V65H93V70ZM115 92H109V82H104V70H109V65H115V92ZM88 81H92V71H88V81ZM17 71H0V66H6V60H12V55H6V49H12V44H17V71ZM37 71H31V65H37V71ZM61 60H66V48H61V60ZM99 55H93V60H87V54H93V43H99V55ZM115 60H104V49H110V44H115V60ZM51 39H45V33H51V39ZM39 38H1V0H39V38ZM115 38H77V0H115V38ZM6 33H34V5H6V33ZM82 33H110V5H82V33ZM31 30H9V8H31V30ZM107 30H85V8H107V30ZM71 17H66V22H71V28H49V22H44V16H50V22H61V16H66V11H60V5H55V11H49V5H44V0H71V17Z" fill={cardStyle.accent}/></svg></div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="shrink-0 px-8 pb-8 pt-4 w-full relative z-20 flex flex-col items-center gap-6">
        <div className="w-full min-h-[100px] flex items-end justify-center">
            {isEditing ? (<div className="w-full animate-luxury-fade space-y-4"><div className="text-center text-[9px] font-bold uppercase tracking-[0.3em] opacity-50 font-sans">Personalize Card</div><div className="flex justify-center gap-4">{CARD_COLORS.map((c) => (<button key={c.id} onClick={() => setCardStyle(c)} className={`w-10 h-10 rounded-full border-2 transition-all shadow-lg ${cardStyle.id === c.id ? 'border-white scale-110' : 'border-white/20 scale-100 hover:scale-105'}`} style={{ backgroundColor: c.bg }} />))}</div></div>) : (<div className="w-full max-w-[280px] mx-auto flex flex-col items-center space-y-4 animate-luxury-fade"><button className="relative w-full h-10 flex items-center justify-center transition-transform active:scale-95 hover:brightness-110"><img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Add_to_Apple_Wallet_badge.svg" alt="Add to Apple Wallet" className="h-full object-contain" /></button><div className="w-full space-y-2"><button className="w-full py-3.5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-all font-sans hover:bg-white/20">Notify arrival</button></div></div>)}
        </div>
        <button onClick={goBack} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform bg-black/20 backdrop-blur-md"><X className="w-5 h-5" /></button>
      </div>
    </div>
  );
};
