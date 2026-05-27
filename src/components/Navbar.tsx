import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  MagnifyingGlass,
  ShoppingCart,
  CaretDown,
  X,
  ShoppingBag,
} from '@phosphor-icons/react';
import { useCartStore } from '../store/cartStore';

const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];

export default function Navbar() {
  const [city, setCity] = useState('Bangalore');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  const [countDir, setCountDir] = useState(1);
  const { getTotalItems, openCart } = useCartStore();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setCountDir(totalItems > prevCount ? 1 : -1);
    setPrevCount(totalItems);
  }, [totalItems]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)]'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FF5722' }}>
              <span className="text-white font-bold text-sm font-satoshi">H</span>
            </div>
            <span className="font-satoshi font-bold text-zinc-900 text-lg hidden sm:block">
              Hungry<span style={{ color: '#FF5722' }}>Now</span>
            </span>
          </Link>

          {/* Location */}
          <button
            onClick={() => setShowCityPicker(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-zinc-50 transition-colors group"
          >
            <MapPin weight="fill" size={16} style={{ color: '#FF5722' }} />
            <div className="text-left">
              <div className="flex items-center gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={city}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="font-satoshi font-semibold text-zinc-900 text-sm"
                  >
                    {city}
                  </motion.span>
                </AnimatePresence>
                <CaretDown size={12} className="text-zinc-400 group-hover:text-zinc-600 transition-colors" />
              </div>
              <span className="text-xs text-zinc-400 leading-none hidden sm:block">Delivering to</span>
            </div>
          </button>

          {/* Search bar */}
          <button
            onClick={() => navigate('/search')}
            className="flex-1 max-w-md flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200/60 hover:border-zinc-300 transition-colors text-left group"
          >
            <MagnifyingGlass size={16} className="text-zinc-400" />
            <span className="text-zinc-400 text-sm flex-1">Search for restaurants or dishes...</span>
          </button>

          {/* Navigation Items (Orders, Cart, Profile) */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
            {/* Orders link */}
            <Link
              to="/orders"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-50 transition-all hover:scale-[1.03] active:scale-[0.97] text-zinc-700 text-sm font-medium group"
            >
              <ShoppingBag size={22} className="text-zinc-700 group-hover:text-[#FF5722] transition-colors" />
              <span className="hidden sm:block">Orders</span>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-50 transition-all hover:scale-[1.03] active:scale-[0.97] group"
            >
              <ShoppingCart size={22} className="text-zinc-700 group-hover:text-[#FF5722] transition-colors" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.div
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold overflow-hidden"
                    style={{ backgroundColor: '#FF5722' }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={totalItems}
                        initial={{ y: countDir * 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: countDir * -10, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {totalItems}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="text-sm font-medium text-zinc-700 hidden sm:block">Cart</span>
            </button>

            {/* Profile link */}
            <Link
              to="/profile"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-50 transition-all hover:scale-[1.03] active:scale-[0.97] group"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white transition-transform group-hover:ring-2 group-hover:ring-[#FF5722]/30" style={{ background: 'linear-gradient(135deg, #FF5722, #FF8A65)' }}>
                M
              </div>
              <span className="text-sm font-medium text-zinc-700 hidden sm:block">Profile</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* City Picker Modal */}
      <AnimatePresence>
        {showCityPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setShowCityPicker(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-20 left-4 sm:left-24 z-50 bg-white rounded-2xl shadow-xl p-4 w-64"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-satoshi font-semibold text-zinc-900">Choose City</h3>
                <button onClick={() => setShowCityPicker(false)} className="text-zinc-400 hover:text-zinc-600">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-1">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCity(c); setShowCityPicker(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                      c === city
                        ? 'font-semibold text-white'
                        : 'text-zinc-700 hover:bg-zinc-50'
                    }`}
                    style={c === city ? { backgroundColor: '#FF5722' } : {}}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
