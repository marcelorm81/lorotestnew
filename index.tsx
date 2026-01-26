
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { INITIAL_STATE } from './data';
import { State, ScreenType } from './types';
import { TabNavigation, ChatBottomSheet, AdaptiveStage, LoadingScreen } from './components';

// Import screens from their new modular files
import { LoginScreen, HomeScreen, WelcomeScreen, DropsScreen, AccountScreen, CollectionLandingScreen, CapsuleCarouselScreen, CapsuleConfirmScreen } from './screens_home';
import { WardrobeScreen, WardrobeDetailScreen, CreateWardrobeScreen, AddItemSelectionScreen, AddItemMethodScreen, ScanItemScreen, WardrobeListingScreen, OrderHistoryScreen } from './screens_wardrobe';
import { ProductDetailScreen, MTOScreen, MTODetailScreen, StoreKeyScreen, EventDetailScreen, EventsScreen, PersonalPreferencesScreen, MySizeScreen, PlanVisitScreen } from './screens_details';

const App: React.FC = () => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);

  const navigate = (screen: ScreenType, params?: any) => {
    // Scroll to top when navigating, since we are now using window/body scrolling
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setState(prev => ({ 
      ...prev, 
      prevScreen: prev.activeScreen, 
      activeScreen: screen,
      ...params
    }));
  };

  // --- System UI & Theme Color Management ---
  useEffect(() => {
    let themeColor = '#F4F0EA'; // Default Loro Piana Cream for standard pages

    // 1. Pure Black Vibe (Intro, Login, Store Key)
    if (['welcome', 'login', 'store-key'].includes(state.activeScreen)) {
        themeColor = '#000000';
    } 
    // 2. Dark Charcoal Vibe (Home, Events, Shop/Drops, Video Details)
    else if (['home', 'events', 'event-detail', 'drops'].includes(state.activeScreen)) {
        themeColor = '#1A1A1A';
    }
    // 3. Account Vibe (Matches the deep red gradient header)
    else if (state.activeScreen === 'account') {
        themeColor = '#2D0A0A'; 
    }

    // Apply to meta tag for iOS/Safari UI
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'theme-color');
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', themeColor);

    // Apply to body background to prevent white overscroll flashes on dark pages
    document.body.style.backgroundColor = themeColor;

  }, [state.activeScreen]);

  const goBack = () => {
    if (state.prevScreen && state.prevScreen !== state.activeScreen) navigate(state.prevScreen);
    else navigate('home');
  };

  const addWardrobe = (newWardrobe: any) => {
    setState(prev => ({
      ...prev,
      wardrobes: [...prev.wardrobes, newWardrobe]
    }));
  };

  const addItemToWardrobe = (wardrobeId: string, item: any) => {
    setState(prev => ({
      ...prev,
      wardrobes: prev.wardrobes.map(w => 
        w.id === wardrobeId ? { ...w, items: [...w.items, item] } : w
      )
    }));
  };

  useEffect(() => {
    if (screenRef.current && !loading) {
      gsap.fromTo(screenRef.current, 
        { opacity: 0, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [state.activeScreen, loading]);

  const toggleChat = () => setState(s => ({ ...s, chatOpen: !s.chatOpen }));

  return (
    <AdaptiveStage>
      {/* 
        Container for the active screen. 
        Removed 'fixed inset-0 overflow-hidden' to allow "Infinite Canvas" scrolling on desktop.
        The content will flow naturally within the AdaptiveStage canvas.
      */}
      
      <div ref={screenRef} className="min-h-[100dvh] w-full flex flex-col relative">
        {state.activeScreen === 'welcome' && <WelcomeScreen onStart={() => navigate('login')} />}
        {state.activeScreen === 'login' && <LoginScreen onLogin={() => navigate('home')} />}
        {state.activeScreen === 'home' && <HomeScreen state={state} navigate={navigate} toggleChat={toggleChat} />}
        {state.activeScreen === 'wardrobe' && <WardrobeScreen state={state} navigate={navigate} />}
        {state.activeScreen === 'wardrobe-detail' && <WardrobeDetailScreen state={state} navigate={navigate} goBack={goBack} toggleChat={toggleChat} />}
        {state.activeScreen === 'create-wardrobe' && <CreateWardrobeScreen goBack={goBack} onSave={addWardrobe} navigate={navigate} />}
        {state.activeScreen === 'wardrobe-listing' && <WardrobeListingScreen state={state} navigate={navigate} goBack={goBack} />}
        {state.activeScreen === 'add-item-method' && <AddItemMethodScreen goBack={goBack} navigate={navigate} toggleChat={toggleChat} />}
        {state.activeScreen === 'scan-item' && <ScanItemScreen goBack={goBack} onAdd={(item) => {
            if (state.selectedWardrobeId) {
                addItemToWardrobe(state.selectedWardrobeId, item);
                navigate('wardrobe-detail', { selectedWardrobeId: state.selectedWardrobeId });
            }
        }} />}
        {state.activeScreen === 'add-item-selection' && <AddItemSelectionScreen state={state} goBack={goBack} onAdd={(item) => {
            if (state.selectedWardrobeId) {
                addItemToWardrobe(state.selectedWardrobeId, item);
                goBack();
            }
        }} />}
        {state.activeScreen === 'product-detail' && <ProductDetailScreen state={state} goBack={goBack} toggleChat={toggleChat} />}
        {state.activeScreen === 'mto' && <MTOScreen state={state} goBack={goBack} navigate={navigate} toggleChat={toggleChat} />}
        {state.activeScreen === 'mto-detail' && <MTODetailScreen state={state} goBack={goBack} navigate={navigate} toggleChat={toggleChat} />}
        {state.activeScreen === 'store-key' && <StoreKeyScreen goBack={goBack} />}
        {state.activeScreen === 'events' && <EventsScreen state={state} navigate={navigate} goBack={goBack} />}
        {state.activeScreen === 'event-detail' && <EventDetailScreen state={state} goBack={goBack} toggleChat={toggleChat} navigate={navigate} />}
        {state.activeScreen === 'drops' && <DropsScreen state={state} navigate={navigate} />}
        {state.activeScreen === 'collection-landing' && <CollectionLandingScreen navigate={navigate} />}
        {state.activeScreen === 'capsule-carousel' && <CapsuleCarouselScreen navigate={navigate} />}
        {state.activeScreen === 'capsule-confirm' && <CapsuleConfirmScreen state={state} navigate={navigate} />}
        {state.activeScreen === 'account' && <AccountScreen state={state} navigate={navigate} />}
        {state.activeScreen === 'personal-preferences' && <PersonalPreferencesScreen state={state} goBack={goBack} navigate={navigate} />}
        {state.activeScreen === 'my-size' && <MySizeScreen goBack={goBack} />}
        {state.activeScreen === 'plan-visit' && <PlanVisitScreen goBack={goBack} navigate={navigate} />}
        {state.activeScreen === 'order-history' && <OrderHistoryScreen state={state} goBack={goBack} navigate={navigate} />}
        
        {!['welcome', 'login', 'home', 'wardrobe', 'wardrobe-detail', 'create-wardrobe', 'wardrobe-listing', 'add-item-selection', 'product-detail', 'mto', 'mto-detail', 'store-key', 'events', 'event-detail', 'add-item-method', 'scan-item', 'drops', 'account', 'personal-preferences', 'my-size', 'plan-visit', 'order-history', 'collection-landing', 'capsule-carousel', 'capsule-confirm'].includes(state.activeScreen) && (
          <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center space-y-6 animate-luxury-fade">
            <h2 className="text-3xl font-light uppercase tracking-widest">{state.activeScreen.replace('-', ' ')}</h2>
            <p className="opacity-40 italic font-light tracking-wide">This private corridor is being prepared for your arrival.</p>
            <button onClick={goBack} className="py-4 px-10 border border-[#B08D57]/30 text-[#B08D57] font-bold uppercase tracking-[0.4em] text-[10px] rounded-full">Return to Lounge</button>
          </div>
        )}
      </div>

      {state.activeScreen !== 'login' && state.activeScreen !== 'welcome' && state.activeScreen !== 'store-key' && (
        <TabNavigation current={state.activeScreen} onNavigate={navigate} />
      )}

      {state.chatOpen && <ChatBottomSheet onClose={toggleChat} ca={state.ca} />}

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
    </AdaptiveStage>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
