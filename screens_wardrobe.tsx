
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Plus, Search, ChevronRight, X, MessageSquare, Scan, Layout, Check, ArrowRight, ChevronLeft, MoreHorizontal, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import { Header } from './components';
import { State, Wardrobe } from './types';
import { LORO_PRODUCTS } from './data';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

// --- 3D Deck Component ---

const WardrobeDeck: React.FC<{ 
    wardrobes: Wardrobe[]; 
    activeIndex: number; 
    onChange: (index: number) => void;
    navigate: any;
}> = ({ wardrobes, activeIndex, onChange, navigate }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const dragProxy = useRef<HTMLDivElement>(null);
    const draggableRef = useRef<Draggable[] | null>(null);
    
    useEffect(() => {
        if (!containerRef.current || !dragProxy.current) return;

        const spacing = 230; 
        const maxIndex = wardrobes.length - 1;

        // Visual update function shared between Drag and Tween
        const updateCards = () => {
            const x = gsap.getProperty(dragProxy.current, "x") as number;
            const rawProgress = -x / spacing;
            
            cardsRef.current.forEach((el, i) => {
                if (!el) return;

                // Calculate relative position (0 = center/active, 1 = right, -1 = left)
                const relProgress = i - rawProgress;
                const absProgress = Math.abs(relProgress);
                
                // 3D Transforms
                const scale = gsap.utils.interpolate(1, 0.8, Math.min(absProgress, 1));
                const opacity = gsap.utils.interpolate(1, 0.6, Math.min(absProgress * 0.8, 1));
                const zIndex = 100 - Math.round(absProgress * 10);
                
                let xPos = relProgress * spacing; 
                const rotateY = -relProgress * 25; 
                const zPos = -absProgress * 150;

                gsap.set(el, {
                    x: xPos,
                    z: zPos,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformOrigin: "center center",
                    // Increase visibility range to prevent flicker during fast scrolling
                    display: Math.abs(relProgress) > 3 ? 'none' : 'block'
                });
            });
        };

        // Initialize position
        gsap.set(dragProxy.current, { x: -activeIndex * spacing });
        updateCards();

        const tracker = Draggable.create(dragProxy.current, {
            type: "x",
            trigger: containerRef.current, // Allows dragging from anywhere in the container
            inertia: true,
            edgeResistance: 0.65,
            dragClickables: true,
            bounds: { minX: -maxIndex * spacing, maxX: 0 },
            zIndexBoost: false,
            allowContextMenu: true, // Improved desktop compatibility
            
            // Snap to grid (works with inertia)
            snap: {
                x: (val) => Math.round(val / spacing) * spacing
            },
            
            onDrag: updateCards,
            onThrowUpdate: updateCards,
            
            // Update state when the momentum settles
            onThrowComplete: function() {
                 const x = gsap.getProperty(dragProxy.current, "x") as number;
                 const finalIndex = Math.abs(Math.round(x / spacing));
                 onChange(finalIndex);
            },

            // Fallback for when InertiaPlugin is not active or drag is slow
            onDragEnd: function() {
                // @ts-ignore
                if (!this.isThrowing) {
                     const x = this.x;
                     const finalIndex = Math.abs(Math.round(x / spacing));
                     gsap.to(this.target, {
                         x: -finalIndex * spacing,
                         duration: 0.3,
                         ease: "power2.out",
                         onUpdate: updateCards,
                         onComplete: () => onChange(finalIndex)
                     });
                }
            }
        });
        
        draggableRef.current = tracker;

        return () => {
            tracker[0].kill();
        };
    }, [wardrobes]); // Re-init only if wardrobes list changes

    // Handle external updates to activeIndex (e.g., initial load or reset)
    useEffect(() => {
        if (!draggableRef.current || !dragProxy.current) return;
        const spacing = 230;
        const currentX = gsap.getProperty(dragProxy.current, "x") as number;
        const targetX = -activeIndex * spacing;
        
        // Animate to new position if not currently being dragged
        if (Math.abs(currentX - targetX) > 1 && !draggableRef.current[0].isDragging) {
            gsap.to(dragProxy.current, {
                x: targetX,
                duration: 0.5,
                ease: "power2.out",
                onUpdate: () => {
                     // Inline update logic to avoid stale closures
                     const x = gsap.getProperty(dragProxy.current, "x") as number;
                     const rawProgress = -x / spacing;
                     cardsRef.current.forEach((el, i) => {
                        if (!el) return;
                        const relProgress = i - rawProgress;
                        const absProgress = Math.abs(relProgress);
                        const scale = gsap.utils.interpolate(1, 0.8, Math.min(absProgress, 1));
                        const opacity = gsap.utils.interpolate(1, 0.6, Math.min(absProgress * 0.8, 1));
                        const zIndex = 100 - Math.round(absProgress * 10);
                        let xPos = relProgress * spacing; 
                        const rotateY = -relProgress * 25; 
                        const zPos = -absProgress * 150;
                        gsap.set(el, { x: xPos, z: zPos, rotateY: rotateY, scale: scale, opacity: opacity, zIndex: zIndex, display: Math.abs(relProgress) > 3 ? 'none' : 'block' });
                     });
                }
            });
        }
    }, [activeIndex]);

    return (
        <div className="relative w-full h-[320px] flex items-center justify-center overflow-visible touch-action-pan-y group">
            {/* Invisible Proxy for Drag Logic */}
            <div ref={dragProxy} className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none" />

            <div 
                ref={containerRef} 
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing perspective-container touch-action-pan-y"
                style={{ touchAction: 'pan-y' }}
            >
                {wardrobes.map((w, i) => (
                    <div 
                        key={w.id}
                        ref={el => { cardsRef.current[i] = el; }}
                        className="absolute w-[220px] h-[300px] rounded-[24px] overflow-hidden shadow-2xl bg-[#1A1A1A] will-change-transform border border-white/10"
                        onClick={() => {
                            if (i === activeIndex) navigate('wardrobe-detail', { selectedWardrobeId: w.id });
                            else onChange(i);
                        }}
                    >
                        {/* Cover Image */}
                        <img src={w.coverImage} className="w-full h-full object-cover opacity-100 transition-transform duration-700 hover:scale-105 pointer-events-none" />
                        
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Card Content */}
                        <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start pointer-events-none">
                             <div className="space-y-0.5">
                                 {/* Title Split Logic */}
                                 {w.name.includes(' ') ? (
                                    <>
                                        <h3 className="text-xl font-bold font-sans text-white leading-none drop-shadow-md">{w.name.split(' ')[0]}</h3>
                                        <h3 className="text-xl font-serif italic text-white/90 leading-none">{w.name.split(' ').slice(1).join(' ')}</h3>
                                    </>
                                 ) : (
                                    <h3 className="text-xl font-serif italic text-white/90 leading-none">{w.name}</h3>
                                 )}
                             </div>
                             <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <span className="text-[9px] text-white font-bold">{w.items.length}</span>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`.perspective-container { perspective: 800px; transform-style: preserve-3d; } .touch-action-pan-y { touch-action: pan-y !important; }`}</style>
        </div>
    );
};


export const WardrobeScreen: React.FC<{ state: State; navigate: (s: any, p?: any) => void }> = ({ state, navigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWardrobe = state.wardrobes[activeIndex] || state.wardrobes[0];
  
  // Get items for preview, pad with placeholders if needed
  const previewItems = activeWardrobe.items.slice(0, 3);
  const placeholderCount = Math.max(0, 3 - previewItems.length);

  return (
    <div className="animate-luxury-fade bg-[#151515] min-h-screen flex flex-col font-sans">
      
      {/* Top Section: Dark */}
      <div className="bg-[#151515] pb-10 relative z-10 overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[400px] bg-gradient-to-b from-[#B08D57]/10 to-transparent pointer-events-none opacity-50" />

          {/* Header - Made Transparent to blend with hero */}
          <div className="flex items-center justify-between px-6 py-5 pt-safe sticky top-0 z-40">
             <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-90 font-sans text-white">Your Wardrobe</div>
             <div className="flex gap-3">
                 <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white active:bg-white/20 transition-colors">
                     <Search className="w-4 h-4 opacity-70" strokeWidth={1.5} />
                 </button>
                 <button onClick={() => navigate('create-wardrobe')} className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#151515] active:scale-95 transition-transform shadow-lg hover:bg-gray-200">
                     <Plus className="w-5 h-5" strokeWidth={1.5} />
                 </button>
             </div>
          </div>

          <div className="mt-4 relative">
             <WardrobeDeck 
                wardrobes={state.wardrobes} 
                activeIndex={activeIndex} 
                onChange={setActiveIndex} 
                navigate={navigate}
             />
             
             {/* See All Button - Kept at bottom-12 for better placement */}
             <button 
                onClick={() => navigate('wardrobe-listing')} 
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 hover:bg-black/60 transition-colors"
             >
                See All <ChevronRight className="w-3 h-3" />
             </button>
          </div>
          
          {/* Thumbnails Row - Aligned to match the width of the active card (220px) */}
          <div className="w-full flex justify-center -mt-6 px-4 relative z-20">
              <div className="w-[220px] grid grid-cols-3 gap-2">
                  {previewItems.map((item, i) => (
                      <div 
                        key={item.id} 
                        onClick={() => navigate('product-detail', { selectedProductId: item.id })}
                        className="aspect-[4/5] bg-[#F4F0EA] rounded-lg overflow-hidden shadow-lg animate-luxury-fade group border border-white/10 cursor-pointer relative flex items-center justify-center active:scale-95 transition-transform"
                      >
                          {/* Normal image rendering as requested, keeping breath space */}
                          <img src={item.image} className="w-[85%] h-[85%] object-contain" />
                      </div>
                  ))}
                  {Array.from({ length: placeholderCount }).map((_, i) => (
                      <div key={`ph-${i}`} className="aspect-[4/5] bg-[#252525]/50 rounded-lg border border-white/5" />
                  ))}
              </div>
          </div>
      </div>

      {/* Bottom Section: Light Sheet */}
      <div className="flex-1 bg-[#F4F0EA] rounded-t-[32px] p-6 relative z-20 -mt-6 shadow-[0_-10px_60px_rgba(0,0,0,0.5)] pb-32">
          <div className="w-12 h-1 bg-[#1A1A1A]/10 rounded-full mx-auto mb-8" />
          
          <div className="space-y-4">
              {/* Service Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between group cursor-pointer active:scale-[0.99] transition-transform border border-[#1A1A1A]/5 hover:shadow-md">
                 <div className="flex-1 pr-4">
                     <h3 className="text-sm font-bold text-[#1A1A1A] font-sans mb-1">Wardrobe Service</h3>
                     <p className="text-[11px] font-serif text-[#1A1A1A]/60 leading-tight">Find out how we care for your garments</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-[#A64B3E] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                     <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                 </div>
              </div>

              {/* MTO Status Card */}
               <div className="bg-[#EFEBE4] p-6 rounded-2xl shadow-sm relative overflow-hidden group cursor-pointer active:scale-[0.99] transition-transform border border-[#1A1A1A]/5 hover:shadow-md" onClick={() => navigate('mto')}>
                   <div className="absolute right-[-20px] top-[-20px] w-32 h-32 opacity-10 rounded-full bg-[#A64B3E] blur-2xl" />
                   <div className="flex flex-col items-center mb-4">
                       <img src="https://raw.githubusercontent.com/marcelorm81/LP_assets/ab1bc08d9d5af798814ab6f1bd91f7f1c432a15c/MTO.png" className="w-32 opacity-80 mix-blend-multiply" />
                   </div>
                   <div className="text-[9px] text-[#A64B3E] font-bold uppercase tracking-widest mb-1 text-center">Made to Order</div>
                   <div className="flex items-end justify-between mt-2">
                       <h3 className="text-sm font-bold text-[#1A1A1A] max-w-[200px] leading-tight">Your Cash Denim jacket is almost ready</h3>
                       <div className="w-8 h-8 rounded-full border border-[#A64B3E]/30 flex items-center justify-center text-[#A64B3E]">
                           <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                       </div>
                   </div>
               </div>

               {/* Missing Item Section */}
               <div className="bg-white rounded-2xl p-8 text-center space-y-6 shadow-sm border border-dashed border-[#1A1A1A]/10 mt-6">
                    <div className="space-y-1">
                        <h3 className="text-xl font-serif text-[#1A1A1A]">Missing an item</h3>
                        <h3 className="text-xl font-serif italic text-[#1A1A1A] text-opacity-70">in your wardrobe?</h3>
                    </div>
                    <div className="h-4 border-l border-dashed border-[#1A1A1A]/20 mx-auto w-px" />
                    <button onClick={() => navigate('add-item-method')} className="px-8 py-3 bg-[#9D5E52] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-transform hover:bg-[#8C4D42]">
                        Notify us
                    </button>
               </div>
          </div>
      </div>
    </div>
  );
};

export const WardrobeListingScreen: React.FC<{ state: State; navigate: any; goBack: any }> = ({ state, navigate, goBack }) => {
  return (
    <div className="bg-[#151515] min-h-screen flex flex-col font-sans animate-luxury-fade">
       {/* Header matching WardrobeScreen style but with Back button */}
       <div className="flex items-center justify-between px-6 py-5 pt-safe sticky top-0 z-40 bg-[#151515]/90 backdrop-blur-xl border-b border-white/5">
             <div className="flex items-center gap-4">
                <button onClick={goBack} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/5 active:bg-white/20 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-90 text-white">All Wardrobes</div>
             </div>
             <div className="flex gap-3">
                 <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white active:bg-white/20 transition-colors">
                     <Search className="w-4 h-4 opacity-70" strokeWidth={1.5} />
                 </button>
                 <button onClick={() => navigate('create-wardrobe')} className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#151515] active:scale-95 transition-transform shadow-lg hover:bg-gray-200">
                     <Plus className="w-5 h-5" strokeWidth={1.5} />
                 </button>
             </div>
       </div>

       <div className="p-4 grid grid-cols-2 gap-4 pb-32 overflow-y-auto">
          {state.wardrobes.map(w => (
             <div key={w.id} onClick={() => navigate('wardrobe-detail', { selectedWardrobeId: w.id })} className="group cursor-pointer active:scale-95 transition-transform">
                <div className="aspect-[3/4] rounded-xl overflow-hidden relative mb-3 border border-white/10">
                   <img src={w.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                   <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-[9px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md px-2 py-1 rounded-full w-max border border-white/10">{w.items.length} Items</div>
                   </div>
                </div>
                <h3 className="text-white text-sm font-sans font-bold leading-tight mb-0.5">{w.name}</h3>
                <p className="text-white/50 text-[10px] uppercase tracking-wider">{w.type}</p>
             </div>
          ))}
          
          {/* Add New Button Card */}
          <div onClick={() => navigate('create-wardrobe')} className="aspect-[3/4] rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 text-white/40 active:bg-white/5 transition-colors cursor-pointer hover:text-white/60 hover:border-white/40">
              <Plus className="w-8 h-8 opacity-50" strokeWidth={1} />
              <span className="text-[9px] font-bold uppercase tracking-widest text-center px-4">Create New Wardrobe</span>
          </div>
       </div>
    </div>
  )
}

// ... Rest of the file (WardrobeItemCard, WardrobeDetailScreen, etc.) remains unchanged ...

const WardrobeItemCard = ({ item, index, wardrobeName, onPress }: any) => {
    const size = "M"; 
    const color = ["Navy Blue", "Landscape Green", "Oatmeal", "Vicuña"][index % 4];
    const date = "Jan 12, 2024";
    const status = index < 2 ? "alteration in progress" : null;

    // Featured Card (Index 0) - Edge to Edge Image
    if (index === 0) {
        return (
            <div onClick={onPress} className="bg-white rounded-[20px] shadow-sm overflow-hidden cursor-pointer active:scale-[0.99] transition-transform duration-500">
                {/* Edge to Edge Image with #F4F0EA bg */}
                <div className="w-full aspect-[4/5] bg-[#F4F0EA] relative flex items-center justify-center">
                    <img src={item.image} className="w-[85%] h-[85%] object-contain" />
                </div>
                
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold font-sans text-[#1A1A1A]">{item.name}</h3>
                        <button className="text-[#1A1A1A]/30 p-1"><MoreHorizontal className="w-5 h-5" /></button>
                    </div>
                    <p className="text-xs font-serif italic text-[#1A1A1A]/50 mb-6">In {wardrobeName}</p>
                    
                    <div className="grid grid-cols-2 gap-y-2 gap-x-8 mb-4">
                        <div className="flex justify-between border-b border-[#1A1A1A]/5 py-1.5">
                            <span className="text-xs font-sans text-[#1A1A1A]">Size</span>
                            <span className="text-xs font-serif italic text-[#9D5E52]">{size}</span>
                        </div>
                         <div className="flex justify-between border-b border-[#1A1A1A]/5 py-1.5">
                            <span className="text-xs font-sans text-[#1A1A1A]">Color</span>
                            <span className="text-xs font-serif italic text-[#9D5E52] text-right truncate ml-2">{color}</span>
                        </div>
                    </div>
                    
                     {status && (
                        <div className="mt-4">
                            <span className="inline-block px-4 py-2 bg-[#9D5E52] text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                                {status}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // Horizontal List Card - Edge to Edge Image on Left
    return (
        <div onClick={onPress} className="bg-white rounded-[20px] shadow-sm flex overflow-hidden cursor-pointer active:scale-[0.99] transition-transform min-h-[140px]">
             <div className="w-[35%] bg-[#F4F0EA] relative flex items-center justify-center">
                 <img src={item.image} className="w-[90%] h-[90%] object-contain" />
             </div>
             
             <div className="flex-1 p-4 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-bold font-sans text-[#1A1A1A] leading-tight pr-2">{item.name}</h3>
                        <button className="text-[#1A1A1A]/30"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                  <p className="text-[10px] font-serif italic text-[#1A1A1A]/50 mb-3">In {wardrobeName}</p>
                  
                  <div className="space-y-1">
                       <div className="flex justify-between items-end text-[10px]">
                            <span className="font-sans text-[#1A1A1A]/70">Size</span>
                            <span className="font-serif italic text-[#9D5E52]">{size}</span>
                       </div>
                       <div className="flex justify-between items-end text-[10px]">
                            <span className="font-sans text-[#1A1A1A]/70">Color</span>
                            <span className="font-serif italic text-[#9D5E52]">{color}</span>
                       </div>
                  </div>
                  
                  {status && (
                      <div className="mt-3">
                        <span className="inline-block px-2 py-1 bg-[#9D5E52] text-white text-[7px] font-bold uppercase tracking-wider rounded-full">
                            {status}
                        </span>
                      </div>
                  )}
             </div>
        </div>
    )
}

export const WardrobeDetailScreen: React.FC<{ state: State; navigate: any; goBack: any; toggleChat: any }> = ({ state, navigate, goBack, toggleChat }) => {
  const wardrobe = state.wardrobes.find(w => w.id === state.selectedWardrobeId) || state.wardrobes[0];
  
  return (
    <div className="bg-[#F4F0EA] min-h-screen relative flex flex-col animate-luxury-fade">
      {/* Hero Background */}
      <div className="relative h-[40vh] w-full shrink-0 overflow-hidden">
        <img src={wardrobe.coverImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-safe flex justify-between items-start z-20">
             <button onClick={goBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A1A1A] shadow-lg active:scale-90 transition-transform">
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
             </button>
             <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg active:scale-90 transition-transform">
                <MoreHorizontal className="w-5 h-5" strokeWidth={1.5} />
             </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-10 left-0 right-0 z-20 text-center px-8">
             <div className="text-sm font-serif italic text-white/90 mb-2 font-light">{wardrobe.items.length} items</div>
             <h1 className="text-[32px] leading-[1.1] text-white drop-shadow-md">
                <span className="font-sans font-bold">{wardrobe.name.split(' ')[0] || 'Casual'} </span>
                <span className="font-serif italic font-light">{wardrobe.name.split(' ').slice(1).join(' ') || 'Wardrobe'}</span>
             </h1>
        </div>
      </div>

      {/* Content List - No overlapping, Clean Layout */}
      <div className="flex-1 bg-[#F4F0EA] relative z-10 px-4 pb-32 pt-6 space-y-6">
        {wardrobe.items.map((item, idx) => (
            <WardrobeItemCard 
                key={item.id} 
                item={item} 
                index={idx} 
                wardrobeName={wardrobe.name}
                onPress={() => navigate('product-detail', { selectedProductId: item.id })} 
            />
        ))}

        {/* Missing Item Footer */}
        <div className="py-8 flex flex-col items-center justify-center space-y-6 text-center">
             <div className="h-px bg-[#1A1A1A]/10 w-20" />
             <div>
                <h3 className="text-xl font-serif text-[#1A1A1A]">Missing an item?</h3>
                <button onClick={() => navigate('add-item-method')} className="mt-4 px-8 py-3 bg-[#9D5E52] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-transform hover:bg-[#8C4D42]">
                    Add Manually
                </button>
             </div>
        </div>
      </div>
      
      {/* FAB */}
      <button onClick={() => navigate('add-item-method')} className="fixed bottom-8 right-6 w-14 h-14 bg-[#9D5E52] rounded-full flex items-center justify-center text-white shadow-2xl z-50 active:scale-90 transition-transform hover:bg-[#8C4D42] mobile-stage-fixed-fab">
          <Plus className="w-6 h-6" strokeWidth={1.5} />
      </button>
      <style>{`.mobile-stage-fixed-fab { position: fixed; bottom: 32px; right: calc(50% - (var(--stage-width) / 2) + 24px); } @media (max-width: 768px) { .mobile-stage-fixed-fab { right: 24px; } }`}</style>
    </div>
  );
};

export const AddItemMethodScreen: React.FC<{ goBack: any; navigate: any; toggleChat: any }> = ({ goBack, navigate, toggleChat }) => {
  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col animate-luxury-fade relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 pt-safe relative z-20">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A1A1A] shadow-sm border border-[#1A1A1A]/5 active:scale-95 transition-transform">
           <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <span className="text-sm font-bold font-sans tracking-wide text-[#1A1A1A]">Add an item</span>
        <button onClick={goBack} className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-transform">
           <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-8 pb-36 overflow-y-auto">
         {/* Hero Image */}
         <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-8 shadow-sm relative mt-4">
             <img 
               src="https://raw.githubusercontent.com/marcelorm81/LP_assets/db617b6aa5443dee814ffaf3d8eb70f73512684d/qrcode.jpg" 
               className="w-full h-full object-cover" 
             />
         </div>

         {/* Typography */}
         <div className="text-center space-y-3 mb-12 max-w-[280px]">
            <h2 className="text-2xl font-serif text-[#1A1A1A] leading-tight">
               Scan the QR Code to instantly <span className="italic">register your garment</span>
            </h2>
            <div className="h-4 border-l border-dashed border-[#1A1A1A]/30 mx-auto w-px mt-4" />
         </div>

         {/* Actions */}
         <div className="w-full space-y-4 mt-auto">
             <button 
                onClick={() => navigate('scan-item')}
                className="w-full py-4 bg-[#9D5E52] text-white rounded-full text-xs font-bold uppercase tracking-[0.15em] shadow-lg active:scale-[0.98] transition-all hover:bg-[#8C4D42]"
             >
                Scan QR Code
             </button>
             
             <button 
                onClick={() => navigate('add-item-selection')}
                className="w-full py-4 bg-transparent border border-[#9D5E52] text-[#9D5E52] rounded-full text-xs font-bold uppercase tracking-[0.15em] active:scale-[0.98] transition-all hover:bg-[#9D5E52]/5"
             >
                Manually Enter Details
             </button>

             <div className="pt-6 text-center">
                 <button 
                    onClick={toggleChat}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9D5E52] underline underline-offset-4 decoration-[#9D5E52]/30"
                 >
                    Request Assistance
                 </button>
             </div>
         </div>
      </div>
    </div>
  );
};

export const ScanItemScreen: React.FC<{ goBack: any; onAdd: (item: any) => void }> = ({ goBack, onAdd }) => {
  const [scanning, setScanning] = useState(true);
  const [foundProduct, setFoundProduct] = useState<any>(null);
  useEffect(() => {
    const timer = setTimeout(() => { setScanning(false); setFoundProduct(LORO_PRODUCTS[0]); }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col mobile-stage-fixed">
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1596431760081-38f2138a9962?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover blur-sm opacity-50" /></div>
        <div className="relative w-64 h-64 border-2 border-white/20 rounded-3xl">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#B08D57] -mt-1 -ml-1 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#B08D57] -mt-1 -mr-1 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#B08D57] -mb-1 -ml-1 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#B08D57] -mb-1 -mr-1 rounded-br-xl" />
          {scanning && <div className="absolute inset-0 bg-[#B08D57]/20 animate-pulse overflow-hidden rounded-3xl"><div className="absolute top-0 left-0 right-0 h-0.5 bg-[#B08D57] shadow-[0_0_15px_#B08D57] animate-[scan_2s_infinite]" /></div>}
        </div>
        <button onClick={goBack} className="absolute top-12 left-8 p-4 bg-white/10 backdrop-blur-md rounded-full text-white active:scale-90 transition-all"><X className="w-6 h-6" strokeWidth={1} /></button>
        {scanning && <div className="absolute bottom-24 text-white text-center space-y-2 animate-pulse"><div className="text-[10px] font-bold uppercase tracking-[0.5em] font-sans">Digital Lens</div><div className="text-lg font-light tracking-tighter font-sans">Identifying Garment...</div></div>}
      </div>
      <style>{`@keyframes scan { 0% { transform: translateY(0); } 50% { transform: translateY(256px); } 100% { transform: translateY(0); } }`}</style>
      {foundProduct && !scanning && (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-10 rounded-t-[40px] animate-luxury-fade shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
           <div className="flex gap-6 mb-10"><img src={foundProduct.image} className="w-24 h-32 rounded-xl object-cover shadow-xl border border-black/5" /><div className="flex-1 flex flex-col justify-center"><div className="text-[9px] font-bold text-[#B08D57] uppercase tracking-[0.4em] mb-1 font-sans">Identified Piece</div><h3 className="text-xl font-light tracking-tighter mb-1 leading-tight font-serif italic">{foundProduct.name}</h3><p className="text-[10px] opacity-40 uppercase tracking-[0.1em] font-sans">{foundProduct.category}</p></div></div>
           <div className="grid grid-cols-2 gap-4"><button onClick={() => setFoundProduct(null)} className="py-5 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 font-sans">Cancel</button><button onClick={() => onAdd(foundProduct)} className="py-5 bg-[#1A1A1A] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl flex items-center justify-center gap-2 font-sans"><Check className="w-4 h-4" strokeWidth={1.5} /> Add to Wardrobe</button></div>
        </div>
      )}
    </div>
  );
};

export const CreateWardrobeScreen: React.FC<{ goBack: any; onSave: any; navigate: any }> = ({ goBack, onSave, navigate }) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [showTip, setShowTip] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing Stylist...');
  const [loadingStep, setLoadingStep] = useState(0);

  const handleCurate = () => {
     if (!name || !description) return;
     setIsGenerating(true);
     
     // Simulation of AI process
     const steps = [
        { t: 'Analyzing stylistic preferences...', delay: 800 },
        { t: `Contextualizing for ${location || 'destination'} climate...`, delay: 2000 },
        { t: 'Curating Loro Piana pieces...', delay: 3500 },
        { t: 'Finalizing collection...', delay: 4500 }
     ];

     steps.forEach((step, i) => {
         setTimeout(() => {
             setLoadingText(step.t);
             setLoadingStep(i + 1);
         }, step.delay);
     });

     setTimeout(() => {
         // Create random wardrobe based on input simulation
         const shuffled = [...LORO_PRODUCTS].sort(() => 0.5 - Math.random());
         const selected = shuffled.slice(0, 5);
         const newWardrobe: Wardrobe = {
             id: Math.random().toString(36).substr(2, 9),
             name: name,
             type: location || 'Curated',
             coverImage: selected[0].image,
             items: selected
         };
         onSave(newWardrobe);
         navigate('wardrobe-detail', { selectedWardrobeId: newWardrobe.id });
     }, 5500);
  };

  if (isGenerating) {
      return (
          <div className="h-full bg-[#1A1A1A] flex flex-col items-center justify-center relative animate-luxury-fade z-50 fixed inset-0">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 pointer-events-none" />
               
               <div className="relative z-10 flex flex-col items-center space-y-8 p-10 text-center">
                   <div className="relative w-20 h-20 flex items-center justify-center">
                       <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-20" />
                       <div className="absolute inset-2 border border-white/20 rounded-full animate-pulse opacity-40" />
                       <Sparkles className="w-8 h-8 text-[#B08D57] animate-pulse" strokeWidth={1} />
                   </div>
                   
                   <div className="space-y-3">
                       <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#B08D57] font-sans">Loro Piana AI</div>
                       <h2 className="text-xl font-serif italic text-white font-light min-h-[30px] transition-all duration-500">{loadingText}</h2>
                   </div>

                   <div className="flex gap-2 mt-4">
                       {[1, 2, 3, 4].map((s) => (
                           <div key={s} className={`h-1 w-8 rounded-full transition-colors duration-500 ${loadingStep >= s ? 'bg-white' : 'bg-white/10'}`} />
                       ))}
                   </div>
               </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-[#F4F0EA] flex flex-col animate-luxury-fade font-sans relative">
      {/* Custom Header for normal letter spacing */}
      <div className="flex items-center justify-between px-6 py-5 sticky top-0 bg-[#F4F0EA]/90 backdrop-blur-md z-40 border-b border-black/5 pt-safe">
        <div className="w-10"></div>
        <div className="text-lg font-sans font-bold text-[#1A1A1A]">Create Wardrobe</div>
        <div className="w-10 flex justify-end">
             <button onClick={goBack} className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white active:scale-90 transition-transform shadow-md">
                <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 pb-48 space-y-10">
        
        {/* Description */}
        <div className="space-y-3">
            <label className="text-sm font-bold text-[#B08D57] font-sans">What is this wardrobe about?</label>
            <div className="relative">
                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="A relaxed summer wardrobe for evenings in Capri, dinners by the sea, light layers, effortless elegance." 
                    className="w-full bg-white p-6 rounded-2xl text-lg font-serif text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 border border-black/5 shadow-sm focus:outline-none focus:border-[#B08D57]/30 min-h-[160px] resize-none leading-relaxed" 
                />
            </div>
        </div>

        {/* Name */}
        <div className="space-y-3">
            <label className="text-sm font-bold text-[#B08D57] font-sans">Name</label>
            <input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Capri Summer Evenings" 
                className="w-full bg-white p-6 rounded-2xl text-lg font-serif text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 border border-black/5 shadow-sm focus:outline-none focus:border-[#B08D57]/30" 
            />
        </div>

        {/* Location */}
        <div className="space-y-3">
            <label className="text-sm font-bold text-[#B08D57] font-sans">Location (optional)</label>
            <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A1A1A]/40 group-focus-within:text-[#B08D57] transition-colors" strokeWidth={1.5} />
                <input 
                    value={location} 
                    onChange={e => {
                        setLocation(e.target.value);
                        if (e.target.value.toLowerCase().includes('tok') && !e.target.value.toLowerCase().includes('tokyo, japan')) {
                            setShowTip(true);
                        } else {
                            setShowTip(false);
                        }
                    }} 
                    placeholder="Search location..." 
                    className="w-full bg-white py-6 pl-14 pr-6 rounded-2xl text-lg font-serif text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 border border-black/5 shadow-sm focus:outline-none focus:border-[#B08D57]/30" 
                />
                {showTip && (
                    <div onClick={() => { setLocation('Tokyo, Japan'); setShowTip(false); }} className="absolute z-50 top-full mt-2 left-0 bg-white p-3 rounded-xl shadow-xl border border-black/5 flex items-center gap-3 cursor-pointer animate-luxury-fade">
                        <div className="w-8 h-8 bg-[#F4F0EA] rounded-full flex items-center justify-center"><MapPin className="w-4 h-4 text-[#B08D57]" /></div>
                        <div><div className="text-sm font-bold text-[#1A1A1A]">Tokyo, Japan</div><div className="text-[10px] text-[#1A1A1A]/50">Popular Destination</div></div>
                    </div>
                )}
            </div>
        </div>

        {/* Button in flow */}
        <div className="pt-8">
             <button 
                onClick={handleCurate} 
                disabled={!name || !description}
                className="w-full py-5 bg-[#1A1A1A] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-black font-sans"
             >
                <Sparkles className="w-4 h-4" /> Create Wardrobe
             </button>
        </div>

      </div>
    </div>
  );
};

export const AddItemSelectionScreen: React.FC<{ state: State; goBack: any; onAdd: (item: any) => void }> = ({ state, goBack, onAdd }) => {
  const [search, setSearch] = useState('');
  const filtered = LORO_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="h-full bg-[#F4F0EA] flex flex-col animate-luxury-fade">
      <Header title="Archives catalog" showBack onBack={goBack} />
      <div className="p-8 space-y-8 flex-1">
        <div className="relative"><Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" strokeWidth={1.5} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Loro Piana Archive..." className="w-full bg-white/80 backdrop-blur-md py-5 pl-14 pr-8 rounded-2xl text-sm font-light border border-black/5 shadow-sm focus:outline-none font-sans" /></div>
        <div className="grid grid-cols-2 gap-6">{filtered.map(product => (<div key={product.id} className="space-y-3 group" onClick={() => onAdd(product)}><div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-sm border border-black/5"><img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute top-3 right-3 p-1.5 bg-[#1A1A1A] text-white rounded-full shadow-lg active:scale-90 transition-transform"><Plus className="w-3.5 h-3.5" strokeWidth={1.5} /></div></div><div className="px-1"><div className="text-[7px] text-[#B08D57] font-bold uppercase tracking-[0.2em] mb-1 font-sans">{product.category}</div><div className="text-[11px] font-light tracking-tight font-sans">{product.name}</div></div></div>))}</div>
      </div>
    </div>
  );
};
