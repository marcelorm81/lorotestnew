
import { State } from './types';

export const LORO_PRODUCTS = [
  // Winter Wardrobe Items (New Images)
  { id: 'lp1', name: 'Cashmere High Neck', category: 'Knitwear', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/ea4f9b2cf53770c9aed50b9db962a88c1d08e575/product_loro_1.jpg' },
  { id: 'lp2', name: 'Vicuña Overcoat', category: 'Outerwear', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/ea4f9b2cf53770c9aed50b9db962a88c1d08e575/product_loro_2.jpg' },
  { id: 'lp3', name: 'Storm System® Jacket', category: 'Outerwear', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/ea4f9b2cf53770c9aed50b9db962a88c1d08e575/product_loro_3.jpg' },
  { id: 'lp4', name: 'Winter Trousers', category: 'Trousers', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/ea4f9b2cf53770c9aed50b9db962a88c1d08e575/product_loro_4.jpg' },
  
  // Tokyo Wardrobe Items (New Images)
  { id: 'lp5', name: 'André Silk Shirt', category: 'Shirts', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/ea4f9b2cf53770c9aed50b9db962a88c1d08e575/product_loro_5.jpg' },
  { id: 'lp6', name: 'Linen Blazer', category: 'Jackets', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/ea4f9b2cf53770c9aed50b9db962a88c1d08e575/product_loro_6.jpg' },
  { id: 'lp7', name: 'Pleated Skirt', category: 'Trousers', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/ea4f9b2cf53770c9aed50b9db962a88c1d08e575/product_loro_7.jpg' },
  { id: 'lp8', name: 'Summer Knit', category: 'Knitwear', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/ea4f9b2cf53770c9aed50b9db962a88c1d08e575/product_loro_8.jpg' },

  // Remaining Accessories & Other Items
  { id: 'lp9', name: 'Martingala Cashmere Coat', category: 'Outerwear', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP2569/4A58C083-0035-48A2-B354-80297E7372C1/FAP2569_T1N8_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp10', name: 'Summer Charms Walk Loafers', category: 'Shoes', image: 'https://media.loropiana.com/HYBRIS/FAO/FAO9704/461F3132-DCCD-4F23-A484-A48B2019B911/FAO9704_20GI_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp11', name: 'Sesia Pouch', category: 'Accessories', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP0271/97F78F41-3F80-467E-B357-8076C0C585E7/FAP0271_T1N4_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp12', name: '360 Flexy Walk Sneaker', category: 'Shoes', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP5226/A1BE2AEE-A86A-491F-B23D-9905E73D83DE/FAP5226_20DS_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp13', name: 'Girocollo Cashmere Sweater', category: 'Knitwear', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP4708/CF0BD6B6-9735-445A-B6B1-76BC0E97F257/FAP4708_B577_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp14', name: 'Bespoke Vicuña Scarf', category: 'Accessories', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800' }
];

export const INITIAL_STATE: State = {
  user: {
    name: "Andrea Sparks",
    location: "Tokyo",
    size: "IT 50",
    measurements: "Chest 102cm, Waist 88cm, Sleeve 65cm",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    homeStore: { id: 's1', name: 'Ginza Tower', location: 'Tokyo', manager: 'Kenji Sato', image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/b0f3d1a55dd1259a27955c7c020478361f332bdf/ginzatokio.jpg', isHome: true },
    visitedStores: [
        { id: 's2', name: 'Montenapoleone', location: 'Milan', manager: 'Francesca Rossi', image: 'https://images.unsplash.com/photo-1551524164-687a55ea112c?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  ca: {
    name: "Sofia Giordano",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    status: 'On Leave',
    replacementName: "Marco Rossi",
    replacementAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  events: [
    {
      id: 'giraglia-2025',
      title: 'Giraglia 2025',
      date: '09-19 JUNE',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200',
      status: 'none',
      type: 'upcoming',
      description: 'Set foot aboard My Song, at the next Loro Piana Giraglia. During three days, witness the Grand Finale of an unforgettable sea journey.',
      privileges: [
        'VIP Access to the Loro Piana Giraglia.',
        'Front-row seating for optimal viewing of the race.',
        'Exclusive meet and greet with professional sailors.',
        'Private Transfers to and from the event.',
        'Access to exclusive after-event parties.'
      ],
    },
    {
      id: 'lake-como-2024',
      title: 'Lake Como Concours',
      date: '12-14 MAY',
      image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/add0a5841d1b594837aa998c9992e9ec863eb8df/lakecomo.jpg',
      status: 'confirmed',
      type: 'past',
      description: 'A celebration of elegance and automotive heritage on the shores of Lake Como.',
      privileges: [],
    },
    {
      id: 'aspen-winter-2024',
      title: 'Aspen Winter Lounge',
      date: '15-20 JAN',
      image: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/582084ffd3e71fcf69dc689d60061f9e587543df/aspennew.jpg',
      status: 'confirmed',
      type: 'past',
      description: 'An exclusive winter retreat in the heart of the Rockies.',
      privileges: [],
    },
  ],
  wardrobes: [
    {
      id: 'w1',
      name: 'Winter Vacation',
      type: 'Seasonal',
      coverImage: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/Wardrobe_winter.png',
      items: [
        LORO_PRODUCTS[0], // product_loro_1
        LORO_PRODUCTS[1], // product_loro_2
        LORO_PRODUCTS[2], // product_loro_3
        LORO_PRODUCTS[3]  // product_loro_4
      ],
    },
    {
      id: 'w2',
      name: 'Tokyo Apartment',
      type: 'Primary',
      coverImage: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/Wardrobe_everyday.png',
      items: [
        LORO_PRODUCTS[4], // product_loro_5
        LORO_PRODUCTS[5], // product_loro_6
        LORO_PRODUCTS[6], // product_loro_7
        LORO_PRODUCTS[7]  // product_loro_8
      ],
    },
    {
      id: 'w3',
      name: 'Sailing Retreat',
      type: 'Travel',
      coverImage: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/Wardrobe_chic.png',
      items: [
        LORO_PRODUCTS[9],
        LORO_PRODUCTS[10],
        LORO_PRODUCTS[11],
        LORO_PRODUCTS[13]
      ]
    }
  ],
  mto: {
    name: 'Bespoke Traveller Jacket',
    date: 'August 15, 2024',
    status: 'creation',
    timeline: [
      { stage: 'Order confirmed', date: 'Aug 15' },
      { stage: 'In creation', date: 'Aug 22', note: 'Signature hardware embedding in progress.' },
      { stage: 'Finishing', date: 'Sep 05' },
    ],
  },
  drops: [],
  family: [],
  chatOpen: false,
  activeScreen: 'welcome',
  prevScreen: null,
  selectedWardrobeId: null,
  selectedEventId: null,
  selectedProductId: null,
};
