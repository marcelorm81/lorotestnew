
import { State } from './types';

export const LORO_PRODUCTS = [
  { id: 'lp1', name: 'Sesia Bag Pink', category: 'Accessories', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP6890/73B345F2-C2BC-477F-ACD0-5122A95624BA/FAP6890_T1N4_SMALL.jpg?sw=300&sh=400' },
  { id: 'lp2', name: 'Spagna Leather Tote', category: 'Accessories', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP1571/BF10B1C3-208B-4717-818E-C31E9469D728/FAP1571_F6V8_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp3', name: 'Roadster Suede Jacket', category: 'Outerwear', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP4505/28ADDF46-B0FA-480E-8B6F-78A7EFF38245/FAP4505_R190_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp4', name: 'Grande Unita Cashmere Scarf', category: 'Accessories', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP5278/FA5C1BAD-C61F-4D7A-A20D-F28E1A841D48/FAP5278_F6XA_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp5', name: 'André Silk Shirt', category: 'Shirts', image: 'https://media.loropiana.com/HYBRIS/FAO/FAO8041/6EAEEA9E-3E4D-4029-858D-E40840D27097/FAO8041_F7A7_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp6', name: 'Mathias Linen Trousers', category: 'Trousers', image: 'https://media.loropiana.com/HYBRIS/FAO/FAO0185/7DDD8651-D5E2-421F-A596-BCB88FDE53A7/FAO0185_B4AU_MEDIUM.jpg?sw=300&sh=400' },
  { id: 'lp7', name: 'Extra Pocket L12 Clutch', category: 'Accessories', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP9039/098E9740-FD33-4174-B185-E7C2ABCF2632/FAP9039_T1RS_SMALL.jpg?sw=300&sh=400' },
  { id: 'lp8', name: 'Pacific Woven Belt', category: 'Accessories', image: 'https://media.loropiana.com/HYBRIS/FAP/FAP4739/3A5725DC-C9D8-4CE7-9A11-F5D99B593B32/FAP4739_R0E2_SMALL.jpg?sw=300&sh=400' },
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
  },
  ca: {
    name: "Sofia Giordano",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    status: 'Online',
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
        LORO_PRODUCTS[0],
        LORO_PRODUCTS[2],
        LORO_PRODUCTS[4],
        LORO_PRODUCTS[9]
      ],
    },
    {
      id: 'w2',
      name: 'Tokyo Apartment',
      type: 'Primary',
      coverImage: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/Wardrobe_everyday.png',
      items: [
        LORO_PRODUCTS[8],
        LORO_PRODUCTS[3],
        LORO_PRODUCTS[12],
        LORO_PRODUCTS[6]
      ],
    },
    {
      id: 'w3',
      name: 'Sailing Retreat',
      type: 'Travel',
      coverImage: 'https://raw.githubusercontent.com/marcelorm81/LP_assets/01e89b9bcbf16e10ac5d32eca7e9fb6487796d7e/Wardrobe_chic.png',
      items: [
        LORO_PRODUCTS[1],
        LORO_PRODUCTS[5],
        LORO_PRODUCTS[11],
        LORO_PRODUCTS[7]
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
