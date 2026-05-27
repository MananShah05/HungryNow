import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, MagnifyingGlass, Lightning, Clock, Star } from '@phosphor-icons/react';
import { restaurants, categories } from '../data/restaurants';
import { SkeletonCard } from '../components/SkeletonCard';
import RatingBadge from '../components/RatingBadge';

// Category SVG Icons
function CategoryIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    Biryani: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <ellipse cx="20" cy="28" rx="14" ry="6" fill="#FF5722" opacity="0.2" />
        <path d="M8 24c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 24h16" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 12V8M16 13l-2-3M24 13l2-3" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    Pizza: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 8L6 32h28L20 8z" fill="#FF5722" opacity="0.15" stroke="#FF5722" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="2" fill="#FF5722" />
        <circle cx="15" cy="25" r="1.5" fill="#FF5722" opacity="0.6" />
        <circle cx="25" cy="23" r="1.5" fill="#FF5722" opacity="0.6" />
      </svg>
    ),
    Burgers: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="8" y="10" width="24" height="6" rx="3" fill="#FF5722" opacity="0.3" />
        <rect x="10" y="18" width="20" height="4" rx="1" fill="#FF5722" opacity="0.6" />
        <rect x="10" y="24" width="20" height="4" rx="1" fill="#FF5722" opacity="0.4" />
        <rect x="8" y="28" width="24" height="4" rx="2" fill="#FF5722" opacity="0.2" />
      </svg>
    ),
    'South Indian': (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <ellipse cx="20" cy="22" rx="12" ry="4" fill="#FF5722" opacity="0.15" />
        <path d="M10 22c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#FF5722" strokeWidth="1.5" />
        <path d="M20 12V8" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="22" r="3" fill="#FF5722" opacity="0.5" />
      </svg>
    ),
    Chinese: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M12 28s2-8 8-8 8 8 8 8" stroke="#FF5722" strokeWidth="2" fill="#FF5722" opacity="0.1" />
        <path d="M18 20c0-4 4-10 4-10" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 20c0-4-4-10-4-10" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="28" x2="30" y2="28" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    Desserts: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M12 24c0-4.418 3.582-8 8-8s8 3.582 8 8v2H12v-2z" fill="#FF5722" opacity="0.2" />
        <rect x="12" y="26" width="16" height="4" rx="1" fill="#FF5722" opacity="0.4" />
        <path d="M20 10v6M17 12l3-2 3 2" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Sushi: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <ellipse cx="20" cy="22" rx="8" ry="6" fill="#FF5722" opacity="0.2" stroke="#FF5722" strokeWidth="1.5" />
        <ellipse cx="20" cy="20" rx="5" ry="4" fill="#FF5722" opacity="0.4" />
        <ellipse cx="20" cy="19" rx="2" ry="1.5" fill="#FF5722" />
        <path d="M28 20c2 0 4-1 4-4" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    'North Indian': (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M10 28h20v2H10z" fill="#FF5722" opacity="0.3" />
        <path d="M14 28c-2-6 0-14 6-14s8 8 6 14" fill="#FF5722" opacity="0.15" />
        <path d="M20 14c0-3 2-5 2-5s-4 0-4 5" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };
  return icons[name] || (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <circle cx="20" cy="20" r="12" fill="#FF5722" opacity="0.2" />
      <circle cx="20" cy="20" r="6" fill="#FF5722" opacity="0.4" />
    </svg>
  );
}

function MagneticCategory({ cat, onClick }: { cat: typeof categories[0]; onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const translateX = useTransform(x, [-50, 50], [-6, 6]);
  const translateY = useTransform(y, [-50, 50], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="flex-shrink-0">
      <motion.button
        style={{ translateX, translateY }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white hover:shadow-card transition-all duration-200 w-20 group"
      >
        <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_4px_16px_-4px_rgba(255,87,34,0.15)] flex items-center justify-center group-hover:scale-105 transition-transform">
          <CategoryIcon name={cat.name} />
        </div>
        <span className="text-xs font-medium text-zinc-700 text-center leading-tight">{cat.name}</span>
      </motion.button>
    </div>
  );
}

function SpotlightCard({ restaurant, index }: { restaurant: typeof restaurants[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      className="spotlight-card bg-white rounded-[1.25rem] overflow-hidden shadow-card cursor-pointer group"
    >
      <Link to={`/restaurant/${restaurant.slug}`}>
        <div className="relative overflow-hidden h-44">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Offers badge */}
          {restaurant.offers.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
              <p className="text-white text-xs font-semibold">{restaurant.offers[0]}</p>
            </div>
          )}
          {restaurant.isVeg && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Pure Veg
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-satoshi font-bold text-zinc-900 text-base leading-tight">{restaurant.name}</h3>
            <RatingBadge rating={restaurant.rating} />
          </div>
          <p className="text-zinc-500 text-sm mb-2 truncate">{restaurant.cuisine.join(', ')}</p>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            <span>₹{restaurant.priceForTwo} for two</span>
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            {restaurant.deliveryFee === 0 ? (
              <span className="text-green-600 font-medium">Free delivery</span>
            ) : (
              <span>₹{restaurant.deliveryFee} delivery</span>
            )}
          </div>
          {/* Tags */}
          {restaurant.tags.length > 0 && (
            <div className="flex gap-1.5 mt-2.5">
              {restaurant.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: '#FFF3EE', color: '#FF5722' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

const OFFERS = [
  { text: '50% OFF up to ₹100 on your first order', code: 'FIRST100' },
  { text: 'Free delivery on orders above ₹299', code: 'FREEDEL' },
  { text: '₹75 off on orders above ₹349', code: 'SAVE75' },
  { text: 'Buy 1 Get 1 on select restaurants', code: 'BOGO' },
  { text: 'Extra 20% cashback with HDFC cards', code: 'HDFC20' },
  { text: '30% off at top restaurants · Today only', code: 'TODAY30' },
];

const HERO_SLIDES = [
  {
    headline: 'Craving something\namazing?',
    sub: 'Order from 500+ restaurants in your city',
    cta: 'Explore Now',
    bg: 'from-orange-50 to-amber-50',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80',
  },
  {
    headline: 'Biryani delivered\nin 30 mins',
    sub: 'From the best biryani places near you',
    cta: 'Order Biryani',
    bg: 'from-red-50 to-orange-50',
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=80',
  },
  {
    headline: 'Pizza night?\nWe\'ve got you.',
    sub: 'Freshly made, delivered hot',
    cta: 'Order Pizza',
    bg: 'from-yellow-50 to-orange-50',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&q=80',
  },
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [heroSlide, setHeroSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[heroSlide];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className={`min-h-[100dvh] bg-gradient-to-br ${slide.bg} transition-all duration-700 flex items-center pt-16`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
            {/* Left: Copy */}
            <div>
              <motion.div
                key={heroSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm mb-6">
                  <Lightning size={14} style={{ color: '#FF5722' }} weight="fill" />
                  <span className="text-xs font-semibold text-zinc-700">Delivered in 30 minutes</span>
                </div>
                <h1 className="font-satoshi font-black text-5xl sm:text-6xl xl:text-7xl text-zinc-900 leading-[1.05] mb-4 whitespace-pre-line">
                  {slide.headline}
                </h1>
                <p className="text-zinc-500 text-lg mb-8 max-w-md">
                  {slide.sub}
                </p>
                {/* Search bar */}
                <div className="flex gap-3 max-w-md">
                  <button
                    onClick={() => navigate('/search')}
                    className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)] border border-zinc-100 text-zinc-400 text-sm hover:border-zinc-300 transition-colors"
                  >
                    <MagnifyingGlass size={18} />
                    Search restaurants or dishes...
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/search')}
                    className="px-5 py-3.5 rounded-2xl text-white font-semibold text-sm flex items-center gap-2 transition-colors"
                    style={{ backgroundColor: '#FF5722' }}
                  >
                    {slide.cta}
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
                {/* Slide indicators */}
                <div className="flex gap-2 mt-8">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === heroSlide ? 24 : 8,
                        backgroundColor: i === heroSlide ? '#FF5722' : '#d4d4d8',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Food image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlide}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-orange-100 to-amber-100 opacity-60" />
                  <img
                    src={slide.img}
                    alt="Food"
                    className="relative z-10 w-full h-[520px] object-cover rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(255,87,34,0.2)]"
                  />
                  {/* Floating stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -bottom-6 -left-6 z-20 bg-white rounded-2xl px-4 py-3 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FFF3EE' }}>
                        <Clock size={20} style={{ color: '#FF5722' }} />
                      </div>
                      <div>
                        <p className="font-satoshi font-bold text-zinc-900 text-lg">28 min</p>
                        <p className="text-xs text-zinc-500">Avg delivery time</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -top-6 -right-6 z-20 bg-white rounded-2xl px-4 py-3 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-50">
                        <Star size={20} className="text-green-600" weight="fill" />
                      </div>
                      <div>
                        <p className="font-satoshi font-bold text-zinc-900 text-lg">500+</p>
                        <p className="text-xs text-zinc-500">Restaurants</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Offers Marquee */}
      <div className="bg-white border-y border-zinc-100 py-3 overflow-hidden">
        <div className="marquee-track flex gap-8 w-max">
          {[...OFFERS, ...OFFERS].map((offer, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <Lightning size={14} weight="fill" style={{ color: '#FF5722' }} />
              <span className="text-sm text-zinc-700 font-medium whitespace-nowrap">{offer.text}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF3EE', color: '#FF5722' }}>
                {offer.code}
              </span>
              <span className="text-zinc-200 ml-4">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-satoshi font-bold text-2xl text-zinc-900">What's on your mind?</h2>
          <button className="text-sm font-medium flex items-center gap-1" style={{ color: '#FF5722' }}>
            See all <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
          {categories.map((cat) => (
            <MagneticCategory
              key={cat.id}
              cat={cat}
              onClick={() => navigate(`/search?cuisine=${cat.id}`)}
            />
          ))}
        </div>
      </section>

      {/* "What's on your mind" Feature Grid — 2fr 1fr 1fr on desktop */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <h2 className="font-satoshi font-bold text-2xl text-zinc-900 mb-6">Trending Near You</h2>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: '2fr 1fr 1fr' }}
        >
          {/* Large card */}
          <Link to="/restaurant/biryani-blues" className="relative rounded-3xl overflow-hidden h-52 group col-span-1">
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
              alt="Biryani"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-white text-xs font-semibold px-2 py-1 rounded-full mb-2 block w-fit" style={{ backgroundColor: '#FF5722' }}>Trending 🔥</span>
              <h3 className="font-satoshi font-bold text-white text-xl">Biryani Blues</h3>
              <p className="text-white/80 text-sm">50% off · 32 min</p>
            </div>
          </Link>
          {/* Small card 1 */}
          <Link to="/restaurant/pizza-republic" className="relative rounded-3xl overflow-hidden h-52 group">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80"
              alt="Pizza"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <h3 className="font-satoshi font-bold text-white">Pizza Republic</h3>
              <p className="text-white/80 text-xs">28 min</p>
            </div>
          </Link>
          {/* Small card 2 */}
          <Link to="/restaurant/south-spice" className="relative rounded-3xl overflow-hidden h-52 group">
            <img
              src="https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80"
              alt="South Indian"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <h3 className="font-satoshi font-bold text-white">South Spice</h3>
              <p className="text-white/80 text-xs">22 min</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Restaurant grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-satoshi font-bold text-2xl text-zinc-900">Top restaurants near you</h2>
            <p className="text-zinc-500 text-sm mt-1">Based on your location in Bangalore</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : restaurants.map((r, i) => (
                <SpotlightCard key={r.id} restaurant={r} index={i} />
              ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 mt-16 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FF5722' }}>
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="font-satoshi font-bold text-zinc-900">HungryNow</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                India's fastest food delivery platform. Order from 500+ restaurants.
              </p>
            </div>
            {[
              { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] },
              { title: 'For Restaurants', links: ['Partner with us', 'Apps for restaurants', 'Restaurant blog'] },
              { title: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-satoshi font-semibold text-zinc-900 mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-zinc-500 text-sm hover:text-zinc-900 transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-sm">© 2024 HungryNow. All rights reserved.</p>
            <p className="text-zinc-400 text-sm">Made with ♥ for hungry people</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
