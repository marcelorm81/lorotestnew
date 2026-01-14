
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Plus, Search, Heart, Clock, ArrowRight, Zap, Briefcase, MapPin, Bell, UserPlus, QrCode, CheckCircle2, ChevronRight, ChevronLeft, MoreHorizontal, X, MessageSquare, Edit2, ShieldCheck, Sparkles, Scan, Layout, Check, Calendar, Hammer, Wrench, Scissors, History, Eye, Smartphone, ShoppingBag, Palette, Ruler } from 'lucide-react';
import { Header } from './components';
import { State, ScreenType, Wardrobe, WardrobeItem } from './types';
import { LORO_PRODUCTS } from './data';
import { gsap } from 'gsap';
import { StackedCards } from './screens_home';

const LORO_SYMBOL_PNG = "https://raw.githubusercontent.com/marcelorm81/LP_assets/0816650e9d350c07f88b303736084bef893d52bd/LPsymbol.png";

// Helper component for Preference Rows
const PreferenceRow = ({ label, value, border = true }: { label: string, value: string, border?: boolean }) => (
  <div className={`flex items-center justify-between p-5 cursor-pointer active:bg-[#F4F0EA] transition-colors ${border ? 'border-b border-[#1A1A1A]/5' : ''}`}>
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

export const EventsScreen: React.FC<{ state: State; navigate: any }> = ({ state, navigate }) => {
    // Identify the main upcoming event (Giraglia) for the Hero section
    const mainEvent = state.events.find(e => e.id === 'giraglia-2025') || state.events[0];
    const otherEvents = state.events.filter(e => e.id !== mainEvent.id);

    return (
        <div className="bg-[#1A1A1A] min-h-screen pb-28 text-white font-sans animate-luxury-fade relative">
            {/* Custom Header: Left Aligned, Absolute Overlay */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 pt-safe pointer-events-none">
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase font-sans text-white drop-shadow-md">Events</div>
            </div>
            
            <div className="pb-8 space-y-8">
                {/* Hero Video Card - Full Bleed Top (no rounded top corners, top-0) */}
                <div onClick={() => navigate('event-detail', { selectedEventId: mainEvent.id })} className="w-full aspect-[4/5] relative overflow-hidden shadow-2xl cursor-pointer group">
                     <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000">
                        <source src="https://raw.githubusercontent.com/marcelorm81/LP_assets/535683b2683745d86037c79c476ef55db071f4eb/loronew.mp4" type="video/mp4" />
                     </video>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-90" />
                     
                     <div className="absolute top-24 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-[8px] uppercase tracking-widest font-bold text-white">Next Destination</span>
                     </div>

                     <div className="absolute bottom-0 left-0 right-0 p-8">
                         <h2 className="text-4xl font-serif italic font-light leading-none mb-3">{mainEvent.title}</h2>
                         <p className="text-xs font-sans text-white/80 leading-relaxed mb-8 max-w-[80%]">{mainEvent.description.substring(0, 60)}...</p>
                         
                         <div className="flex items-center justify-between border-t border-white/20 pt-5">
                             <div>
                                 <div className="text-[8px] uppercase tracking-widest opacity-60 mb-1">When</div>
                                 <div className="text-sm font-medium">{mainEvent.date}</div>
                             </div>
                             <div className="h-9 px-8 bg-[#B08D57] text-[#1A1A1A] rounded-full flex items-center justify-center text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                 {mainEvent.status === 'confirmed' ? 'Access' : 'RSVP'}
                             </div>
                         </div>
                     </div>
                </div>

                {/* Past Events List - With Padding */}
                <div className="space-y-4 px-6">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Past Events</h3>
                    </div>
                    <div className="space-y-3">
                        {otherEvents.map(event => (
                            <div key={event.id} onClick={() => navigate('event-detail', { selectedEventId: event.id })} className="flex gap-4 bg-[#252525] p-2 rounded-xl border border-white/5 cursor-pointer active:scale-[0.98] transition-transform">
                                <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 relative">
                                    <img src={event.image} className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div className="flex flex-col justify-center py-1 pr-2">
                                    <div className="text-[8px] text-[#B08D57] uppercase tracking-widest mb-1">{event.date}</div>
                                    <h4 className="text-lg font-serif italic mb-2 leading-tight text-white/90">{event.title}</h4>
                                    <div className="flex items-center gap-1 text-[8px] text-white/40 uppercase tracking-wider">
                                        <span>View Gallery</span> <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EventDetailScreen: React.FC<{ state: State; goBack: any; toggleChat: any }> = ({ state, goBack, toggleChat }) => {
    const event = state.events.find(e => e.id === state.selectedEventId);
    if (!event) return null;

    const PAST_EVENT_IMAGES = [
      "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/even1.avif",
      "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event2.avif",
      "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event3.avif",
      "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event4.avif",
      "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event5.avif",
      "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event6.avif",
      "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event7.avif",
      "https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/event8.avif"
    ];

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
                 
                 {/* Past Event Gallery Section */}
                 {event.type === 'past' && (
                    <div className="space-y-6 pt-6 border-t border-white/10">
                       <div className="p-6 bg-[#252525] border border-white/5 rounded-xl space-y-4 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10">
                                <MessageSquare className="w-12 h-12 text-white" />
                           </div>
                           
                           <div className="flex items-center gap-3 mb-2">
                               <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                   <img src={state.ca.avatar} className="w-full h-full object-cover" />
                               </div>
                               <div>
                                   <div className="text-[10px] font-bold text-[#B08D57] uppercase tracking-widest">Sofia Giordano</div>
                                   <div className="text-[8px] text-white/40 uppercase tracking-wider">Client Advisor</div>
                               </div>
                           </div>

                           <p className="text-sm font-serif italic text-white/90 leading-relaxed">
                               "Dear {state.user.name.split(' ')[0]}, it was a true pleasure to see you. The atmosphere was simply magical, especially as the sun set over the lake. I have curated a selection of the finest moments from the evening for you to enjoy."
                           </p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-3">
                           {PAST_EVENT_IMAGES.map((img, i) => (
                               <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden bg-white/5 relative group">
                                   <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                               </div>
                           ))}
                       </div>
                    </div>
                 )}

                 {event.type === 'upcoming' && (
                    <div className="pt-6">
                        <button onClick={toggleChat} className="w-full bg-white text-black py-4 rounded-full text-xs font-bold tracking-widest uppercase">Concierge Request</button>
                    </div>
                 )}
            </div>
        </div>
    );
};

export const PlanVisitScreen: React.FC<{ goBack: any; navigate: any }> = ({ goBack, navigate }) => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    
    // Mock dates
    const dates = [
        { d: '26', w: 'Mon' }, { d: '27', w: 'Tue' }, { d: '28', w: 'Wed' }, 
        { d: '29', w: 'Thu' }, { d: '30', w: 'Fri' }, { d: '01', w: 'Sat' }
    ];
    
    // Mock times
    const times = ['10:00', '11:30', '14:00', '15:30', '17:00'];

    if (submitted) {
        return (
            <div className="bg-[#F4F0EA] min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-6 animate-luxury-fade">
                <div className="w-20 h-20 bg-[#A64B3E] rounded-full flex items-center justify-center text-white shadow-xl mb-4">
                    <Check className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-serif text-[#1A1A1A]">Request Sent</h2>
                    <p className="text-sm font-sans text-[#1A1A1A]/60 leading-relaxed max-w-[250px] mx-auto">
                        Sofia will confirm your appointment shortly. You will receive a notification.
                    </p>
                </div>
                <button 
                    onClick={goBack}
                    className="mt-8 px-10 py-4 bg-white border border-[#1A1A1A]/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-sm active:scale-[0.98] transition-all text-[#1A1A1A]"
                >
                    Return
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans animate-luxury-fade">
            <Header title="Plan a Visit" showBack onBack={goBack} showProfile={false} />
            
            <div className="flex-1 p-6 space-y-8 overflow-y-auto">
                <div className="space-y-4">
                    <h2 className="text-2xl font-serif text-[#1A1A1A]">Select a Date</h2>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {dates.map((date, i) => (
                            <button 
                                key={i} 
                                onClick={() => setSelectedDate(i)}
                                className={`min-w-[64px] h-[80px] rounded-xl flex flex-col items-center justify-center border transition-all ${selectedDate === i ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-transparent shadow-sm'}`}
                            >
                                <span className="text-xs font-serif italic opacity-80">{date.w}</span>
                                <span className="text-xl font-bold font-sans">{date.d}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-serif text-[#1A1A1A]">Select Time</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {times.map((time, i) => (
                             <button 
                                key={i} 
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-lg text-sm font-sans font-medium border transition-all ${selectedTime === time ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-transparent shadow-sm'}`}
                             >
                                 {time}
                             </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-serif text-[#1A1A1A]">Reason for visit</h2>
                    <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                         <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F9F8F6]">
                             <div className="w-4 h-4 rounded-full border border-[#1A1A1A] flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-[#1A1A1A]" /></div>
                             <span className="text-sm text-[#1A1A1A]">Styling Appointment</span>
                         </div>
                         <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9F8F6] transition-colors cursor-pointer opacity-60">
                             <div className="w-4 h-4 rounded-full border border-[#1A1A1A] flex items-center justify-center"></div>
                             <span className="text-sm text-[#1A1A1A]">MTO Consultation</span>
                         </div>
                         <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9F8F6] transition-colors cursor-pointer opacity-60">
                             <div className="w-4 h-4 rounded-full border border-[#1A1A1A] flex items-center justify-center"></div>
                             <span className="text-sm text-[#1A1A1A]">Collection Pick-up</span>
                         </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-[#F4F0EA] border-t border-black/5">
                <button 
                    disabled={selectedDate === null || selectedTime === null}
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
       {/* Header */}
       <div className="flex items-center justify-between px-6 py-4 pt-safe relative z-10">
          <button onClick={() => navigate('account')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform">
             <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" strokeWidth={1.5} />
          </button>
          <div className="text-lg font-bold text-[#1A1A1A] font-sans">Personal preferences</div>
          <div className="w-10" />
       </div>

       <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
          {/* Size Section */}
          <div className="space-y-3">
             <h3 className="text-sm font-bold text-[#1A1A1A] ml-1">Size</h3>
             <div className="bg-[#F9F8F6] rounded-xl overflow-hidden">
                {/* My Measurements */}
                <div onClick={() => navigate('my-size')} className="flex items-center justify-between p-5 border-b border-[#1A1A1A]/5 cursor-pointer active:bg-[#E8E2D9] transition-colors">
                   <span className="text-sm text-[#1A1A1A]">My Measurements</span>
                   <ChevronRight className="w-4 h-4 text-[#A64B3E]" />
                </div>
                {/* My Size */}
                <div onClick={() => navigate('my-size')} className="flex items-center justify-between p-5 cursor-pointer active:bg-[#E8E2D9] transition-colors">
                   <span className="text-sm text-[#1A1A1A]">My size</span>
                   <ChevronRight className="w-4 h-4 text-[#A64B3E]" />
                </div>
             </div>
          </div>

          {/* Preferences Section */}
          <div className="space-y-3">
             <h3 className="text-sm font-bold text-[#1A1A1A] ml-1">Preferences</h3>
             <div className="bg-[#F9F8F6] rounded-xl overflow-hidden">
                <PreferenceRow label="Color preference" value="Blue, Red, Grey" />
                <PreferenceRow label="Destination" value="Regular holiday destination" />
                <PreferenceRow label="Food & Beverage" value="Coffee & tea, soft bevarages..." />
                <PreferenceRow label="My hobbies & interest" value="Cars, Fitness, Travels..." border={false} />
             </div>
          </div>
       </div>

       {/* Footer */}
       <div className="p-6 pb-10 space-y-6 bg-[#F4F0EA]">
          <p className="text-[10px] text-[#1A1A1A]/50 text-center leading-relaxed font-serif">
             This app does not store any private data.<br/>
             Read the the <span className="underline cursor-pointer">Terms & Conditions.</span>
          </p>
          <button onClick={() => navigate('account')} className="w-full py-4 bg-[#A64B3E] text-white rounded-full text-sm font-sans font-medium shadow-lg active:scale-[0.98] transition-transform">
             Save
          </button>
       </div>
    </div>
  );
};

export const MySizeScreen: React.FC<{ goBack: any }> = ({ goBack }) => {
  return (
    <div className="bg-[#F4F0EA] min-h-screen flex flex-col font-sans animate-luxury-fade">
      {/* Explicitly navigate to 'personal-preferences' on back to maintain flow hierarchy */}
      <Header title="My Sizes" showBack onBack={() => goBack()} showProfile={false} />
      <div className="p-6 space-y-4">
         <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
             <div className="grid grid-cols-2 gap-4 border-b border-black/5 pb-4">
                 <div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Jacket</div><div className="text-xl font-serif">IT 50</div></div>
                 <div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Trousers</div><div className="text-xl font-serif">IT 48</div></div>
             </div>
             <div className="grid grid-cols-2 gap-4 border-b border-black/5 pb-4">
                 <div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Shoes</div><div className="text-xl font-serif">EU 43</div></div>
                 <div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Shirt</div><div className="text-xl font-serif">40</div></div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Hat</div><div className="text-xl font-serif">M</div></div>
                 <div><div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">Gloves</div><div className="text-xl font-serif">9</div></div>
             </div>
         </div>
         <p className="text-[10px] text-center text-[#1A1A1A]/50">Based on your last scan on Oct 24, 2024</p>
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
