export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
  image: string;
  rating?: number;
  category: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  priceForTwo: number;
  image: string;
  logo: string;
  isVeg?: boolean;
  offers: string[];
  tags: string[];
  address: string;
  isOpen: boolean;
  menu: MenuCategory[];
  heroImage: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    slug: 'biryani-blues',
    name: 'Biryani Blues',
    cuisine: ['Biryani', 'North Indian', 'Mughlai'],
    rating: 4.5,
    reviewCount: 2847,
    deliveryTime: 32,
    deliveryFee: 40,
    minOrder: 150,
    priceForTwo: 450,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=80&q=80',
    heroImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&q=80',
    offers: ['50% off up to ₹100', 'Free delivery above ₹299'],
    tags: ['Trending', 'Top Rated'],
    address: '42 Koramangala 5th Block, Bangalore',
    isOpen: true,
    menu: [
      {
        id: 'c1',
        name: 'Recommended',
        items: [
          {
            id: 'r1-m1',
            name: 'Hyderabadi Chicken Biryani',
            description: 'Slow-cooked basmati rice with succulent chicken pieces, saffron & fried onions',
            price: 249,
            isVeg: false,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80',
            rating: 4.6,
            category: 'c1',
          },
          {
            id: 'r1-m2',
            name: 'Veg Dum Biryani',
            description: 'Fresh garden vegetables slow-cooked with aromatic spices and basmati rice',
            price: 189,
            isVeg: true,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
            rating: 4.3,
            category: 'c1',
          },
        ],
      },
      {
        id: 'c2',
        name: 'Biryani',
        items: [
          {
            id: 'r1-m3',
            name: 'Mutton Biryani',
            description: 'Tender mutton pieces cooked with long-grain basmati rice and whole spices',
            price: 329,
            isVeg: false,
            isSpicy: true,
            image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
            rating: 4.7,
            category: 'c2',
          },
          {
            id: 'r1-m4',
            name: 'Prawn Biryani',
            description: 'Juicy prawns with coastal spices and fragrant basmati rice',
            price: 349,
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80',
            rating: 4.5,
            category: 'c2',
          },
          {
            id: 'r1-m5',
            name: 'Egg Biryani',
            description: 'Farm fresh eggs cooked with aromatic rice and golden onions',
            price: 179,
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&q=80',
            rating: 4.2,
            category: 'c2',
          },
        ],
      },
      {
        id: 'c3',
        name: 'Starters',
        items: [
          {
            id: 'r1-m6',
            name: 'Chicken 65',
            description: 'Crispy fried chicken with curry leaves and green chillies',
            price: 219,
            isVeg: false,
            isBestseller: true,
            isSpicy: true,
            image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&q=80',
            rating: 4.8,
            category: 'c3',
          },
          {
            id: 'r1-m7',
            name: 'Paneer Tikka',
            description: 'Marinated cottage cheese cubes grilled in a tandoor',
            price: 199,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80',
            rating: 4.4,
            category: 'c3',
          },
        ],
      },
      {
        id: 'c4',
        name: 'Breads & Sides',
        items: [
          {
            id: 'r1-m8',
            name: 'Garlic Naan',
            description: 'Soft naan bread topped with butter and garlic',
            price: 49,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80',
            category: 'c4',
          },
          {
            id: 'r1-m9',
            name: 'Raita',
            description: 'Chilled yogurt with cucumber and cumin',
            price: 59,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80',
            category: 'c4',
          },
        ],
      },
    ],
  },
  {
    id: 'r2',
    slug: 'pizza-republic',
    name: 'Pizza Republic',
    cuisine: ['Pizza', 'Italian', 'Pasta'],
    rating: 4.3,
    reviewCount: 1923,
    deliveryTime: 28,
    deliveryFee: 0,
    minOrder: 199,
    priceForTwo: 500,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=80&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80',
    offers: ['Buy 1 Get 1 Free on Large Pizzas', '₹75 off on ₹349'],
    tags: ['New', 'Free Delivery'],
    address: '15 Indiranagar 100ft Road, Bangalore',
    isOpen: true,
    menu: [
      {
        id: 'pc1',
        name: 'Bestsellers',
        items: [
          {
            id: 'r2-m1',
            name: 'Margherita Pizza',
            description: 'Classic tomato base with mozzarella and fresh basil',
            price: 299,
            isVeg: true,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
            rating: 4.5,
            category: 'pc1',
          },
          {
            id: 'r2-m2',
            name: 'BBQ Chicken Pizza',
            description: 'Tangy BBQ sauce, grilled chicken strips, red onions, jalapeños',
            price: 399,
            isVeg: false,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
            rating: 4.6,
            category: 'pc1',
          },
        ],
      },
      {
        id: 'pc2',
        name: 'Veg Pizzas',
        items: [
          {
            id: 'r2-m3',
            name: 'Farm Fresh Veggie',
            description: 'Loaded with bell peppers, mushrooms, olives, and onions',
            price: 349,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&q=80',
            category: 'pc2',
          },
          {
            id: 'r2-m4',
            name: 'Paneer Makhani Pizza',
            description: 'Makhani sauce base with paneer tikka and capsicum',
            price: 379,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
            category: 'pc2',
          },
        ],
      },
      {
        id: 'pc3',
        name: 'Pasta & Sides',
        items: [
          {
            id: 'r2-m5',
            name: 'Penne Arrabbiata',
            description: 'Spicy tomato sauce with penne pasta and fresh herbs',
            price: 229,
            isVeg: true,
            isSpicy: true,
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
            category: 'pc3',
          },
          {
            id: 'r2-m6',
            name: 'Garlic Bread',
            description: 'Crispy garlic bread with herb butter',
            price: 129,
            isVeg: true,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&q=80',
            category: 'pc3',
          },
        ],
      },
    ],
  },
  {
    id: 'r3',
    slug: 'south-spice',
    name: 'South Spice',
    cuisine: ['South Indian', 'Dosa', 'Filter Coffee'],
    rating: 4.7,
    reviewCount: 3241,
    deliveryTime: 22,
    deliveryFee: 0,
    minOrder: 100,
    priceForTwo: 250,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=80&q=80',
    heroImage: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=1200&q=80',
    offers: ['₹40 off on first order'],
    tags: ['Top Rated', 'Trending'],
    address: '7 Jayanagar 4th Block, Bangalore',
    isOpen: true,
    isVeg: true,
    menu: [
      {
        id: 'sc1',
        name: 'Dosas',
        items: [
          {
            id: 'r3-m1',
            name: 'Masala Dosa',
            description: 'Crispy rice crepe filled with spiced potato masala, served with sambar and 3 chutneys',
            price: 89,
            isVeg: true,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80',
            rating: 4.8,
            category: 'sc1',
          },
          {
            id: 'r3-m2',
            name: 'Rava Dosa',
            description: 'Crispy semolina dosa with onions and green chillies',
            price: 99,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80',
            rating: 4.5,
            category: 'sc1',
          },
          {
            id: 'r3-m3',
            name: 'Pesarattu',
            description: 'Green moong dosa with ginger chutney',
            price: 109,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80',
            category: 'sc1',
          },
        ],
      },
      {
        id: 'sc2',
        name: 'Idli & Vada',
        items: [
          {
            id: 'r3-m4',
            name: 'Idli Sambar (3 pcs)',
            description: 'Fluffy steamed rice cakes with tiffin sambar and chutneys',
            price: 69,
            isVeg: true,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1626206101254-1fb7dc60c42e?w=400&q=80',
            rating: 4.7,
            category: 'sc2',
          },
          {
            id: 'r3-m5',
            name: 'Medu Vada (2 pcs)',
            description: 'Crispy lentil fritters served with sambar and coconut chutney',
            price: 69,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1614631446501-abcf76949472?w=400&q=80',
            category: 'sc2',
          },
        ],
      },
      {
        id: 'sc3',
        name: 'Rice & Curries',
        items: [
          {
            id: 'r3-m6',
            name: 'Curd Rice',
            description: 'Tempered curd rice with mustard, curry leaves and pomegranate',
            price: 79,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80',
            category: 'sc3',
          },
          {
            id: 'r3-m7',
            name: 'Bisibelebath',
            description: 'Karnataka special lentil and rice dish with ghee and cashews',
            price: 99,
            isVeg: true,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&q=80',
            category: 'sc3',
          },
        ],
      },
    ],
  },
  {
    id: 'r4',
    slug: 'burger-barn',
    name: 'Burger Barn',
    cuisine: ['Burgers', 'American', 'Shakes'],
    rating: 4.2,
    reviewCount: 1456,
    deliveryTime: 25,
    deliveryFee: 30,
    minOrder: 149,
    priceForTwo: 350,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=80&q=80',
    heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80',
    offers: ['20% off on first order'],
    tags: ['Trending'],
    address: '88 MG Road, Bangalore',
    isOpen: true,
    menu: [
      {
        id: 'bc1',
        name: 'Signature Burgers',
        items: [
          {
            id: 'r4-m1',
            name: 'Classic Smash Burger',
            description: 'Double smashed patty, American cheese, special sauce, pickles, onions',
            price: 229,
            isVeg: false,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
            rating: 4.6,
            category: 'bc1',
          },
          {
            id: 'r4-m2',
            name: 'Crispy Chicken Burger',
            description: 'Buttermilk fried chicken, coleslaw, honey mustard, brioche bun',
            price: 259,
            isVeg: false,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80',
            rating: 4.5,
            category: 'bc1',
          },
          {
            id: 'r4-m3',
            name: 'Aloo Tikki Burger',
            description: 'Spiced potato patty, mint chutney, tomato, onion rings',
            price: 149,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
            category: 'bc1',
          },
        ],
      },
      {
        id: 'bc2',
        name: 'Sides & Shakes',
        items: [
          {
            id: 'r4-m4',
            name: 'Loaded Fries',
            description: 'Crispy fries with cheese sauce, jalapeños, and sour cream',
            price: 179,
            isVeg: true,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
            category: 'bc2',
          },
          {
            id: 'r4-m5',
            name: 'Oreo Milkshake',
            description: 'Thick vanilla shake blended with Oreo cookies, whipped cream',
            price: 199,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',
            category: 'bc2',
          },
        ],
      },
    ],
  },
  {
    id: 'r5',
    slug: 'sushi-zen',
    name: 'Sushi Zen',
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.6,
    reviewCount: 987,
    deliveryTime: 40,
    deliveryFee: 60,
    minOrder: 299,
    priceForTwo: 800,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=80&q=80',
    heroImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=80',
    offers: ['15% off on orders above ₹599'],
    tags: ['Premium', 'New'],
    address: '12 UB City, Bangalore',
    isOpen: true,
    menu: [
      {
        id: 'zc1',
        name: 'Sushi Rolls',
        items: [
          {
            id: 'r5-m1',
            name: 'Dragon Roll',
            description: 'Shrimp tempura, avocado, cucumber, topped with tuna and avocado',
            price: 499,
            isVeg: false,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80',
            rating: 4.8,
            category: 'zc1',
          },
          {
            id: 'r5-m2',
            name: 'Veggie Rainbow Roll',
            description: 'Cucumber, avocado, mango, pickled radish, sesame seeds',
            price: 379,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80',
            category: 'zc1',
          },
        ],
      },
      {
        id: 'zc2',
        name: 'Ramen & Mains',
        items: [
          {
            id: 'r5-m3',
            name: 'Tonkotsu Ramen',
            description: 'Rich pork bone broth, chashu pork, soft boiled egg, nori, menma',
            price: 449,
            isVeg: false,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80',
            category: 'zc2',
          },
          {
            id: 'r5-m4',
            name: 'Miso Ramen (V)',
            description: 'White miso broth with tofu, corn, bamboo shoots and seaweed',
            price: 399,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=400&q=80',
            category: 'zc2',
          },
        ],
      },
    ],
  },
  {
    id: 'r6',
    slug: 'the-cake-shop',
    name: 'The Cake Shop',
    cuisine: ['Desserts', 'Cakes', 'Pastries'],
    rating: 4.4,
    reviewCount: 2103,
    deliveryTime: 35,
    deliveryFee: 0,
    minOrder: 199,
    priceForTwo: 400,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5994?w=80&q=80',
    heroImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80',
    offers: ['Free delivery all day'],
    tags: ['Free Delivery', 'Pure Veg'],
    address: '33 Richmond Road, Bangalore',
    isOpen: true,
    isVeg: true,
    menu: [
      {
        id: 'cc1',
        name: 'Signature Cakes',
        items: [
          {
            id: 'r6-m1',
            name: 'Belgian Chocolate Truffle',
            description: 'Rich dark chocolate ganache layered with moist sponge',
            price: 399,
            isVeg: true,
            isBestseller: true,
            image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5994?w=400&q=80',
            rating: 4.9,
            category: 'cc1',
          },
          {
            id: 'r6-m2',
            name: 'Red Velvet Cake',
            description: 'Velvety red sponge with cream cheese frosting',
            price: 349,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
            category: 'cc1',
          },
        ],
      },
    ],
  },
];

export const categories = [
  { id: 'biryani', name: 'Biryani', emoji: '🍚' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'burger', name: 'Burgers', emoji: '🍔' },
  { id: 'south-indian', name: 'South Indian', emoji: '🥘' },
  { id: 'chinese', name: 'Chinese', emoji: '🥡' },
  { id: 'desserts', name: 'Desserts', emoji: '🍰' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣' },
  { id: 'north-indian', name: 'North Indian', emoji: '🫕' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝' },
  { id: 'sandwiches', name: 'Sandwiches', emoji: '🥪' },
  { id: 'salads', name: 'Salads', emoji: '🥗' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' },
];

export const getRestaurantBySlug = (slug: string): Restaurant | undefined =>
  restaurants.find((r) => r.slug === slug);
