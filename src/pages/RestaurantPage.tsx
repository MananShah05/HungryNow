import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Star, Motorcycle, Plus, Minus } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { getRestaurantBySlug, MenuItem } from '../data/restaurants';
import { useCartStore } from '../store/cartStore';
import VegDot from '../components/VegDot';
import RatingBadge from '../components/RatingBadge';
import { SkeletonMenuItem } from '../components/SkeletonCard';

function AddButton({ item, restaurantId, restaurantName }: {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.id === item.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId,
      restaurantName,
      isVeg: item.isVeg,
      image: item.image,
    });
  };

  if (qty === 0) {
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleAdd}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 text-sm font-bold transition-colors"
        style={{ borderColor: '#FF5722', color: '#FF5722' }}
      >
        <Plus size={14} />
        ADD
      </motion.button>
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-xl overflow-hidden border-2" style={{ borderColor: '#FF5722' }}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={(e) => { e.preventDefault(); updateQuantity(item.id, qty - 1); }}
        className="w-8 h-8 flex items-center justify-center font-bold"
        style={{ color: '#FF5722' }}
      >
        <Minus size={14} />
      </motion.button>
      <div className="w-6 text-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={qty}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="block text-sm font-bold"
            style={{ color: '#FF5722' }}
          >
            {qty}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={(e) => { e.preventDefault(); addItem({
          id: item.id, name: item.name, price: item.price,
          restaurantId, restaurantName, isVeg: item.isVeg, image: item.image,
        }); }}
        className="w-8 h-8 flex items-center justify-center font-bold"
        style={{ color: '#FF5722' }}
      >
        <Plus size={14} />
      </motion.button>
    </div>
  );
}

function MenuItemCard({ item, restaurantId, restaurantName }: {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-zinc-100 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <VegDot isVeg={item.isVeg} />
          {item.isBestseller && (
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <Star size={10} weight="fill" />
              Bestseller
            </span>
          )}
          {item.isSpicy && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
              🌶 Spicy
            </span>
          )}
        </div>
        <h4 className="font-satoshi font-semibold text-zinc-900 text-base mb-1">{item.name}</h4>
        <p className="text-zinc-900 font-medium text-sm mb-1">₹{item.price}</p>
        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>
        {item.rating && (
          <div className="flex items-center gap-1 mt-2">
            <Star size={12} className="text-green-600" weight="fill" />
            <span className="text-xs text-zinc-500 font-medium">{item.rating} rating</span>
          </div>
        )}
      </div>
      <div className="flex-shrink-0 relative">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-28 h-24 object-cover rounded-xl"
            loading="lazy"
          />
        )}
        <div className="mt-2 flex justify-center">
          <AddButton item={item} restaurantId={restaurantId} restaurantName={restaurantName} />
        </div>
      </div>
    </div>
  );
}

export default function RestaurantPage() {
  const { slug } = useParams<{ slug: string }>();
  const restaurant = getRestaurantBySlug(slug ?? '');
  const [loading, setLoading] = useState(true);
  const [stickyNav, setStickyNav] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const { getTotalItems, getTotal, openCart } = useCartStore();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      if (restaurant?.menu[0]) setActiveCategory(restaurant.menu[0].id);
    }, 600);
    return () => clearTimeout(t);
  }, [restaurant]);

  useEffect(() => {
    const onScroll = () => {
      setStickyNav(window.scrollY > 80);

      // Update active category based on scroll
      if (!restaurant) return;
      for (const cat of [...restaurant.menu].reverse()) {
        const el = sectionRefs.current[cat.id];
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveCategory(cat.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [restaurant]);

  const scrollToCategory = (catId: string) => {
    const el = sectionRefs.current[catId];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveCategory(catId);
  };

  const totalItems = getTotalItems();
  const total = getTotal();

  if (!restaurant) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-satoshi font-bold text-2xl text-zinc-900 mb-2">Restaurant not found</h2>
          <Link to="/" className="text-sm font-medium" style={{ color: '#FF5722' }}>← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      {/* Hero */}
      <div ref={heroRef} className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={restaurant.heroImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-1.5 text-white/80 text-sm mb-4 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 className="font-satoshi font-black text-3xl sm:text-4xl text-white mb-2">{restaurant.name}</h1>
            <p className="text-white/80 text-sm">{restaurant.cuisine.join(' · ')}</p>
          </div>
        </div>
      </div>

      {/* Sticky nav that appears on scroll */}
      <AnimatePresence>
        {stickyNav && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-30 bg-white border-b border-zinc-100 shadow-sm"
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                {restaurant.menu.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${
                      activeCategory === cat.id
                        ? 'border-orange-500 text-zinc-900'
                        : 'border-transparent text-zinc-500 hover:text-zinc-900'
                    }`}
                    style={activeCategory === cat.id ? { borderColor: '#FF5722', color: '#FF5722' } : {}}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Info strip */}
        <div className="bg-white rounded-2xl shadow-card my-6 p-5">
          <div className="flex flex-wrap gap-6 items-center">
            <RatingBadge rating={restaurant.rating} reviewCount={restaurant.reviewCount} size="md" />
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Clock size={16} style={{ color: '#FF5722' }} />
              <span>{restaurant.deliveryTime} mins</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Motorcycle size={16} style={{ color: '#FF5722' }} />
              <span>{restaurant.deliveryFee === 0 ? 'Free delivery' : `₹${restaurant.deliveryFee} delivery`}</span>
            </div>
            <div className="text-sm text-zinc-600">₹{restaurant.priceForTwo} for two</div>
            {restaurant.isVeg && (
              <span className="px-3 py-1 rounded-full text-xs font-bold text-green-700 bg-green-50">
                🌿 Pure Veg
              </span>
            )}
          </div>
          {restaurant.offers.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-100">
              {restaurant.offers.map((offer) => (
                <span
                  key={offer}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl"
                  style={{ backgroundColor: '#FFF3EE', color: '#FF5722' }}
                >
                  🏷️ {offer}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Layout: sidebar + menu */}
        <div className="flex gap-6 pb-24">
          {/* Category Sidebar — sticky on lg */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-36 bg-white rounded-2xl shadow-card p-3 space-y-1">
              <h3 className="font-satoshi font-semibold text-xs text-zinc-400 uppercase tracking-wide px-2 mb-3">Menu</h3>
              {restaurant.menu.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'text-white font-semibold'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                  style={activeCategory === cat.id ? { backgroundColor: '#FF5722' } : {}}
                >
                  <span>{cat.name}</span>
                  <span className={`ml-2 text-xs ${activeCategory === cat.id ? 'text-white/70' : 'text-zinc-400'}`}>
                    {cat.items.length}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Menu items */}
          <div className="flex-1 min-w-0 space-y-4">
            {restaurant.menu.map((cat) => (
              <div
                key={cat.id}
                ref={(el) => { sectionRefs.current[cat.id] = el; }}
                className="bg-white rounded-2xl shadow-card overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-zinc-50">
                  <h3 className="font-satoshi font-bold text-lg text-zinc-900">
                    {cat.name}
                    <span className="ml-2 text-sm font-normal text-zinc-400">({cat.items.length})</span>
                  </h3>
                </div>
                <div className="px-5">
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => <SkeletonMenuItem key={i} />)
                    : cat.items.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          restaurantId={restaurant.id}
                          restaurantName={restaurant.name}
                        />
                      ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating cart bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-0 right-0 z-40 px-4 sm:px-6 max-w-lg mx-auto"
          >
            <button
              onClick={openCart}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-white shadow-[0_8px_32px_-4px_rgba(255,87,34,0.4)] transition-transform active:scale-[0.98]"
              style={{ backgroundColor: '#FF5722' }}
            >
              <span className="bg-white/20 rounded-lg px-2 py-1 text-sm font-bold">
                {totalItems} item{totalItems > 1 ? 's' : ''}
              </span>
              <span className="font-satoshi font-bold">View Cart</span>
              <span className="font-satoshi font-bold">₹{total}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
