import { Link, useLocation } from 'react-router-dom';
import { House, MagnifyingGlass, ShoppingBag, User } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: House },
  { path: '/search', label: 'Search', icon: MagnifyingGlass },
  { path: '/orders', label: 'Orders', icon: ShoppingBag },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-100 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors relative"
            >
              <div className="relative">
                <Icon
                  size={22}
                  weight={isActive ? 'fill' : 'regular'}
                  style={{ color: isActive ? '#FF5722' : '#71717a' }}
                />
              </div>
              <span
                className="text-xs font-medium"
                style={{ color: isActive ? '#FF5722' : '#71717a' }}
              >
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: '#FF5722' }}
                />
              )}
            </Link>
          );
        })}
        {/* Cart quick button for mobile */}
        <button
          onClick={openCart}
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl relative"
        >
          <div className="relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 10a4 4 0 01-8 0" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                style={{ backgroundColor: '#FF5722' }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-zinc-500">Cart</span>
        </button>
      </div>
    </nav>
  );
}
