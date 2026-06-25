export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  images: string[];
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  category: string;
  availability: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  hostName: string;
  hostAvatar: string;
  amenities: string[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  hostName: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  bestTime: string;
  avgTemp: number;
  popularCategory: string;
}

export const mockProperties: Property[] = [
  {
    id: "p1",
    title: "Luxury Glass Beachfront Villa",
    description: "Experience ultimate luxury in this modern glass villa overlooking the turquoise waters. Step directly onto the pristine white sand, enjoy the heated infinity pool, and watch breathtaking sunsets from the private deck.",
    location: "Malibu, California, USA",
    city: "Malibu",
    country: "USA",
    latitude: 34.0259,
    longitude: -118.7798,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.95,
    reviewsCount: 124,
    pricePerNight: 35000,
    category: "Beach",
    availability: "Available this weekend",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3.5,
    hostName: "Sarah Connor",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Pool", "AC", "Hot Tub", "BBQ Grill", "Beach Access"],
    featured: true
  },
  {
    id: "p2",
    title: "Cozy A-Frame Cabin in the Pines",
    description: "Nestled deep in the forest, this beautiful wooden A-frame cabin offers a peaceful retreat. Cozy up by the stone fireplace, soak in the outdoor hot tub under the stars, or explore nearby hiking trails.",
    location: "Aspen, Colorado, USA",
    city: "Aspen",
    country: "USA",
    latitude: 39.1911,
    longitude: -106.8175,
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.88,
    reviewsCount: 98,
    pricePerNight: 12500,
    category: "Cabins",
    availability: "Booked until Monday",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    hostName: "David Miller",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Hot Tub", "Fireplace", "Workspace", "BBQ Grill"],
    featured: true
  },
  {
    id: "p3",
    title: "Panoramic Dome at Altitude",
    description: "High above the clouds, this geodesic dome provides unparalleled panoramic views of the mountain range. Features a transparent roof for stargazing, off-grid eco-amenities, and a high-end wood pellet stove.",
    location: "Swiss Alps, Valais, Switzerland",
    city: "Valais",
    country: "Switzerland",
    latitude: 46.1904,
    longitude: 7.5449,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.92,
    reviewsCount: 56,
    pricePerNight: 28000,
    category: "Amazing Views",
    availability: "Only 2 nights left",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Hans Weber",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Free Parking", "Fireplace", "Stargazing Roof", "Coffee Maker", "Patio"],
    featured: true
  },
  {
    id: "p4",
    title: "Sleek Cliffside Infinity Villa",
    description: "Suspended over the Aegean sea, this architectural masterpiece features crisp white geometry, standard Cycladic elements, and a saltwater infinity pool blending seamlessly into the horizon.",
    location: "Oia, Santorini, Greece",
    city: "Santorini",
    country: "Greece",
    latitude: 36.4618,
    longitude: 25.3753,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.97,
    reviewsCount: 215,
    pricePerNight: 42000,
    category: "Trending",
    availability: "Available next week",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    hostName: "Helena Pappas",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Pool", "AC", "Hot Tub", "Ocean View", "Gym"],
    featured: true
  },
  {
    id: "p5",
    title: "Modern Bamboo Treehouse Nest",
    description: "Immerse yourself in nature in this organic bamboo treehouse. Perched above the jungle floor with an open-air living space, swing, suspended hammock bed, and a private natural plunge pool.",
    location: "Ubud, Bali, Indonesia",
    city: "Bali",
    country: "Indonesia",
    latitude: -8.5069,
    longitude: 115.2625,
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.89,
    reviewsCount: 340,
    pricePerNight: 16000,
    category: "Treehouses",
    availability: "Available this weekend",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Wayan Gede",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Pool", "Daily Breakfast", "Plunge Pool", "Outdoor Shower", "Garden View"]
  },
  {
    id: "p6",
    title: "Glamping Safari Tent on a Creek",
    description: "Get the best of both worlds in this luxury safari tent. Features hardwood floors, a plush king bed, electricity, and a private wooden deck on the edge of a crystal clear flowing creek.",
    location: "Moab, Utah, USA",
    city: "Moab",
    country: "USA",
    latitude: 38.5733,
    longitude: -109.5498,
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.81,
    reviewsCount: 74,
    pricePerNight: 8500,
    category: "Camping",
    availability: "Available tomorrow",
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Tyler Durden",
    hostAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    amenities: ["Free Parking", "BBQ Grill", "Campfire Pit", "Outdoor Seating", "Creek Access"]
  },
  {
    id: "p7",
    title: "Organic Olive Farm Estate",
    description: "Relax at this beautiful converted 18th-century stone house on an active olive farm. Walk the orchards, taste fresh organic oil, and enjoy dining al fresco under grape vines.",
    location: "Tuscany, Siena, Italy",
    city: "Tuscany",
    country: "Italy",
    latitude: 43.3188,
    longitude: 11.3308,
    images: [
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.93,
    reviewsCount: 156,
    pricePerNight: 19500,
    category: "Farms",
    availability: "Available next week",
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    hostName: "Giovanni Rossi",
    hostAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Pool", "Fireplace", "Wine Cellar", "BBQ Grill"]
  },
  {
    id: "p8",
    title: "Private Tropical Island Sanctuary",
    description: "Own an island for a week. This ultra-private getaway is accessible only by boat. Includes helper staff, standard paddleboards, kayaks, and an overwater dining area.",
    location: "El Nido, Palawan, Philippines",
    city: "Palawan",
    country: "Philippines",
    latitude: 11.1784,
    longitude: 119.3892,
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.99,
    reviewsCount: 42,
    pricePerNight: 85000,
    category: "Islands",
    availability: "Contact Host for Dates",
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 6,
    hostName: "Maria Santos",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Private Beach", "Pool", "AC", "Kayaks", "Chef Included", "Hot Tub"],
    featured: true
  },
  {
    id: "p9",
    title: "Minimalist High-Desert Luxury Villa",
    description: "A striking architectural marvel designed to blend with the boulders of Joshua Tree. Featuring concrete design, smart lighting, custom outdoor pool embedded in rock, and stellar sunset views.",
    location: "Joshua Tree, California, USA",
    city: "Joshua Tree",
    country: "USA",
    latitude: 34.1347,
    longitude: -116.3131,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.96,
    reviewsCount: 188,
    pricePerNight: 39000,
    category: "Luxury",
    availability: "Available this weekend",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    hostName: "Nate Hudson",
    hostAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Pool", "AC", "Fire Pit", "Hot Tub", "Tesla Charger"]
  },
  {
    id: "p10",
    title: "Mirror Cabins in Snowy Wilderness",
    description: "Unique high-tech cabins clad in mirrored glass, completely reflecting the surrounding pine forests. Look out at snowfields while remaining perfectly invisible inside.",
    location: "Tromso, Norway",
    city: "Tromso",
    country: "Norway",
    latitude: 69.6492,
    longitude: 18.9553,
    images: [
      "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.94,
    reviewsCount: 61,
    pricePerNight: 29000,
    category: "Cabins",
    availability: "Only 1 night left",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Astrid Lind",
    hostAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Sauna", "Fireplace", "Northern Lights Deck"]
  },
  {
    id: "p11",
    title: "Nordic Glass Igloo Retreat",
    description: "Sleep under the Aurora Borealis in your private glass igloo. This cozy space features a heated floor, luxury bedding, and smart glass panels that defrost instantly.",
    location: "Rovaniemi, Finland",
    city: "Rovaniemi",
    country: "Finland",
    latitude: 66.5039,
    longitude: 25.7294,
    images: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.91,
    reviewsCount: 142,
    pricePerNight: 32000,
    category: "Trending",
    availability: "Booked until next month",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Lars Korvald",
    hostAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Free Parking", "Heated Floor", "Espresso Machine", "Sauna Access"]
  },
  {
    id: "p12",
    title: "Cliffside Glasshouse with Ocean Spray",
    description: "Built onto the jagged rock face of Big Sur, this glass-walled architectural feat sits directly above active crashing waves. Watch seals and migrating whales from the sofa.",
    location: "Big Sur, California, USA",
    city: "Big Sur",
    country: "USA",
    latitude: 36.2704,
    longitude: -121.8081,
    images: [
      "https://images.unsplash.com/photo-1549693578-d683be217e58?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.98,
    reviewsCount: 84,
    pricePerNight: 48000,
    category: "Amazing Views",
    availability: "Available next week",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    hostName: "Diane Lane",
    hostAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Fireplace", "Ocean Deck", "Binoculars", "Hot Tub"]
  },
  {
    id: "p13",
    title: "Charming Lakefront Cabin",
    description: "Classic wood cabin resting on the shore of Lake Placid. Includes a private dock, two wooden canoes, a large fire pit, and a screened-in porch for bug-free evening chats.",
    location: "Lake Placid, New York, USA",
    city: "Lake Placid",
    country: "USA",
    latitude: 44.2795,
    longitude: -73.9799,
    images: [
      "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.87,
    reviewsCount: 119,
    pricePerNight: 14000,
    category: "Cabins",
    availability: "Available this weekend",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    hostName: "Robert Ford",
    hostAvatar: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Canoes", "Dock Access", "BBQ Grill", "Fire Pit"]
  },
  {
    id: "p14",
    title: "Secluded Redwood Treehouse Escape",
    description: "Accessible via a scenic 100-foot suspension bridge, this treehouse is nestled 30 feet high in ancient giant redwoods. Featuring rustic-chic redwood decor and skylights.",
    location: "Santa Cruz, California, USA",
    city: "Santa Cruz",
    country: "USA",
    latitude: 36.9741,
    longitude: -122.0308,
    images: [
      "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.86,
    reviewsCount: 203,
    pricePerNight: 18000,
    category: "Treehouses",
    availability: "Booked this weekend",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Emily Watson",
    hostAvatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Free Parking", "Suspension Bridge", "Espresso Machine", "Jungle Views"]
  },
  {
    id: "p15",
    title: "Sunset Overwater Bungalow",
    description: "Sleep directly over the sea with glass floor panels to watch the marine life below. Dive straight from your private steps into the warm ocean current.",
    location: "Bora Bora, French Polynesia",
    city: "Bora Bora",
    country: "French Polynesia",
    latitude: -16.5004,
    longitude: -151.7415,
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.96,
    reviewsCount: 67,
    pricePerNight: 55000,
    category: "Islands",
    availability: "Only 3 nights left",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Tahia Nui",
    hostAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "AC", "Deck Steps", "Glass Floors", "Paddleboards", "Breakfast Included"]
  },
  {
    id: "p16",
    title: "High Mountain Aerie & Lookout",
    description: "Perched on a peak with 360-degree views of the Rockies. Features a wrap-around skydeck, telescope for astronomy lovers, and high-altitude hiking maps.",
    location: "Banff, Alberta, Canada",
    city: "Banff",
    country: "Canada",
    latitude: 51.1784,
    longitude: -115.5708,
    images: [
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.92,
    reviewsCount: 93,
    pricePerNight: 22000,
    category: "Mountains",
    availability: "Available this weekend",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    hostName: "Robert Mac",
    hostAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Telescope", "Fireplace", "Stargazing Deck"]
  },
  {
    id: "p17",
    title: "Lakeside Luxury Dome Glamping",
    description: "Enjoy nature in comfort. A luxury dome situated on a private lake edge featuring a wood-fired hot tub, comfortable queen bed, and private outdoor kitchen.",
    location: "Queenstown, Otago, New Zealand",
    city: "Queenstown",
    country: "New Zealand",
    latitude: -45.0312,
    longitude: 168.6626,
    images: [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.88,
    reviewsCount: 112,
    pricePerNight: 17500,
    category: "Camping",
    availability: "Available this weekend",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Jack Thompson",
    hostAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Free Parking", "Wood Hot Tub", "Kayak", "Outdoor Kitchen", "Lake Access"]
  },
  {
    id: "p18",
    title: "Charming Lavender Farm Cottage",
    description: "Stay in a cozy white cottage surrounded by fields of blooming lavender. Enjoy fresh local honey, morning goat feeds, and scenic mountain backgrounds.",
    location: "Provence, Avignon, France",
    city: "Provence",
    country: "France",
    latitude: 43.9483,
    longitude: 4.8060,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.90,
    reviewsCount: 138,
    pricePerNight: 13000,
    category: "Farms",
    availability: "Available tomorrow",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    hostName: "Clara Dubois",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Lavender Field Tour", "Fresh Produce"]
  },
  {
    id: "p19",
    title: "Modernist Desert Oasis Villa",
    description: "An architectural marvel located in a secluded desert canyon. Boasting glass facades, custom concrete swimming pool, a fire deck, and high-tech home automation.",
    location: "Palm Springs, California, USA",
    city: "Palm Springs",
    country: "USA",
    latitude: 33.8303,
    longitude: -116.5453,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.94,
    reviewsCount: 77,
    pricePerNight: 41000,
    category: "Luxury",
    availability: "Available this weekend",
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4.5,
    hostName: "Julian Sands",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    amenities: ["Wi-Fi", "Kitchen", "Free Parking", "Pool", "AC", "Smart Home", "Hot Tub", "Fire Deck"]
  },
  {
    id: "p20",
    title: "Cliffside Glass Pod",
    description: "Designed for true adventurers, this steel-and-glass pod is suspended off a cliff face. Not for the faint of heart, it offers breathtaking 360 views and stellar night skies.",
    location: "Sacred Valley, Cusco, Peru",
    city: "Cusco",
    country: "Peru",
    latitude: -13.2584,
    longitude: -72.1184,
    images: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80"
    ],
    rating: 4.97,
    reviewsCount: 52,
    pricePerNight: 33000,
    category: "Amazing Views",
    availability: "Available next week",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    hostName: "Alejandro Vega",
    hostAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    amenities: ["Free Parking", "Telescope", "Safety Gear", "Dinner Included", "Mountain Views"]
  }
];

export const mockExperiences: Experience[] = [
  {
    id: "e1",
    title: "Surfing Lesson with Malibu Pro",
    description: "Learn to catch waves from an experienced Malibu pro surfer. Includes wetsuit, surfboards, and action pictures.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80",
    hostName: "Jake Cutter",
    duration: "3 hours",
    price: 6500,
    rating: 4.92,
    reviewsCount: 312,
    category: "Adventure"
  },
  {
    id: "e2",
    title: "Tuscan Pasta Making Masterclass",
    description: "Step into our family kitchen in Tuscany and learn the secrets of making handmade pasta from scratch, followed by wine tasting.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80",
    hostName: "Nonna Maria",
    duration: "4 hours",
    price: 4800,
    rating: 4.98,
    reviewsCount: 650,
    category: "Food"
  },
  {
    id: "e3",
    title: "Geothermal Springs Hike",
    description: "Guided hike through secret volcanic craters in Iceland ending with a swim in an untouched hot spring.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80",
    hostName: "Birgir Thor",
    duration: "5 hours",
    price: 8900,
    rating: 4.89,
    reviewsCount: 145,
    category: "Nature"
  },
  {
    id: "e4",
    title: "Ancient Kyoto Tea Ceremony",
    description: "Participate in a authentic, traditional Japanese tea ceremony in a historic wooden teahouse hosted by a tea master.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80",
    hostName: "Chiyo Tanaka",
    duration: "2 hours",
    price: 5200,
    rating: 4.96,
    reviewsCount: 220,
    category: "Culture"
  },
  {
    id: "e5",
    title: "Rock Climbing Joshua Tree",
    description: "Experience the thrill of climbing the unique monzogranite cliffs of Joshua tree with certified guides.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&auto=format&fit=crop&q=80",
    hostName: "Caleb Vance",
    duration: "6 hours",
    price: 11000,
    rating: 4.91,
    reviewsCount: 88,
    category: "Adventure"
  },
  {
    id: "e6",
    title: "Northern Lights Photography Safari",
    description: "Chasing and capturing the magical Aurora Borealis. Camera setup assistance, tripod rentals, and hot cocoa included.",
    image: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=600&auto=format&fit=crop&q=80",
    hostName: "Gunnar Olsen",
    duration: "4 hours",
    price: 9500,
    rating: 4.87,
    reviewsCount: 174,
    category: "Nature"
  },
  {
    id: "e7",
    title: "Street Food Crawl in Ubud Markets",
    description: "Eat like a local! Taste standard suckling pig, sweet coconut pancakes, and tropical fruits in hidden alleyways.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    hostName: "Ketut Arta",
    duration: "3 hours",
    price: 2500,
    rating: 4.94,
    reviewsCount: 405,
    category: "Food"
  },
  {
    id: "e8",
    title: "Swiss Alp Paragliding Flight",
    description: "Soar like an eagle with a tandem flight over Interlaken, offering spectacular views of lakes and snowy giants.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format&fit=crop&q=80",
    hostName: "Marc Rieder",
    duration: "2 hours",
    price: 14500,
    rating: 4.97,
    reviewsCount: 198,
    category: "Adventure"
  },
  {
    id: "e9",
    title: "Olive Harvest & Tasting Session",
    description: "Participate in harvesting olives, watch the milling process, and finish with a tasting of new oil and local bread.",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600&auto=format&fit=crop&q=80",
    hostName: "Giovanni Rossi",
    duration: "3 hours",
    price: 3800,
    rating: 4.85,
    reviewsCount: 94,
    category: "Farms"
  },
  {
    id: "e10",
    title: "Scenic Lagoon Sailing Tour",
    description: "Board a traditional Polynesian catamaran to sail the azure waters of Bora Bora. Swim with stingrays and sharks.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&auto=format&fit=crop&q=80",
    hostName: "Manu Teiki",
    duration: "4 hours",
    price: 7500,
    rating: 4.93,
    reviewsCount: 167,
    category: "Nature"
  }
];

export const mockDestinations: Destination[] = [
  {
    id: "d1",
    name: "Malibu",
    country: "USA",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    description: "Famous for its warm sands, celebrity beachfront homes, and legendary surf breaks.",
    bestTime: "June - September",
    avgTemp: 24,
    popularCategory: "Beach"
  },
  {
    id: "d2",
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
    description: "Majestic snowy peaks, high-altitude hiking, and cozy villages nested in valleys.",
    bestTime: "December - April (Ski), July - September (Hike)",
    avgTemp: 12,
    popularCategory: "Amazing Views"
  },
  {
    id: "d3",
    name: "Tuscany",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80",
    description: "Rolling hills, medieval stone castles, cypress avenues, and world-class olive farms.",
    bestTime: "April - June, September - October",
    avgTemp: 20,
    popularCategory: "Farms"
  },
  {
    id: "d4",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80",
    description: "Tropical lush jungles, terraced rice paddies, serene temple shrines, and black sand shores.",
    bestTime: "April - October",
    avgTemp: 28,
    popularCategory: "Treehouses"
  },
  {
    id: "d5",
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80",
    description: "Iconic blue-domed white houses perched on high volcanic cliffs overlooking the blue sea.",
    bestTime: "May - October",
    avgTemp: 25,
    popularCategory: "Trending"
  },
  {
    id: "d6",
    name: "Joshua Tree",
    country: "USA",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80",
    description: "Surreal desert landscapes, twisted Yucca trees, massive rock piles, and stargazing fields.",
    bestTime: "October - April",
    avgTemp: 22,
    popularCategory: "Luxury"
  },
  {
    id: "d7",
    name: "Tromso",
    country: "Norway",
    image: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=600&auto=format&fit=crop&q=80",
    description: "The Arctic capital is the premier spot for seeing the Northern Lights and dog sledding.",
    bestTime: "November - March",
    avgTemp: -2,
    popularCategory: "Cabins"
  },
  {
    id: "d8",
    name: "Bora Bora",
    country: "French Polynesia",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80",
    description: "Sands as soft as silk, overwater luxury villas, and coral gardens full of sea life.",
    bestTime: "May - October",
    avgTemp: 27,
    popularCategory: "Islands"
  },
  {
    id: "d9",
    name: "Aspen",
    country: "USA",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&auto=format&fit=crop&q=80",
    description: "Charming Colorado mountain town famous for winter skiing and golden autumn colors.",
    bestTime: "December - March, September",
    avgTemp: 8,
    popularCategory: "Cabins"
  },
  {
    id: "d10",
    name: "Queenstown",
    country: "New Zealand",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&auto=format&fit=crop&q=80",
    description: "The adventure capital of the world, offering bungee jumps, skiing, and crystal blue lakes.",
    bestTime: "December - February, June - August",
    avgTemp: 15,
    popularCategory: "Camping"
  }
];
