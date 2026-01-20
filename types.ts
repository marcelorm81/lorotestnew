
export type ScreenType = 'welcome' | 'login' | 'home' | 'wardrobe' | 'wardrobe-detail' | 'create-wardrobe' | 'wardrobe-listing' | 'events' | 'event-detail' | 'product-detail' | 'drops' | 'account' | 'mto' | 'store-key' | 'ca-detail' | 'family-sizes' | 'exclusive-access' | 'add-item-selection' | 'add-item-method' | 'scan-item' | 'personal-preferences' | 'my-size' | 'plan-visit';

export type EventStatus = 'none' | 'confirmed' | 'declined';
export type MTOStatus = 'confirmed' | 'creation' | 'finishing' | 'quality' | 'ready' | 'delivered';

export interface WardrobeItem {
  id: string;
  name: string;
  image: string;
  category: string;
  note?: string;
  isSuggestion?: boolean;
}

export interface Wardrobe {
  id: string;
  name: string;
  type: string;
  coverImage: string;
  items: WardrobeItem[];
}

export interface State {
  user: {
    name: string;
    location: string;
    size: string;
    measurements: string;
    avatar: string;
  };
  ca: {
    name: string;
    avatar: string;
    status: 'Online' | 'Busy' | 'Away';
    backAt?: string;
  };
  events: Array<{
    id: string;
    title: string;
    date: string;
    image: string;
    status: EventStatus;
    type: 'upcoming' | 'past';
    description: string;
    privileges: string[];
  }>;
  wardrobes: Wardrobe[];
  mto: {
    name: string;
    date: string;
    status: MTOStatus;
    timeline: Array<{ stage: string; date: string; note?: string }>;
  };
  drops: Array<{
    id: string;
    name: string;
    image: string;
    countdown: string;
    requested: boolean;
    available: boolean;
  }>;
  family: Array<{
    name: string;
    role: string;
    size: string;
  }>;
  chatOpen: boolean;
  activeScreen: ScreenType;
  prevScreen: ScreenType | null;
  selectedWardrobeId: string | null;
  selectedEventId: string | null;
  selectedProductId: string | null;
}
