import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, X, Clock, Funnel } from '@phosphor-icons/react';
import { useDebounce } from 'use-debounce';
import { restaurants } from '../data/restaurants';
import { Restaurant } from '../data/restaurants';
import RatingBadge from '../components/RatingBadge';
import { SkeletonCard } from '../components/SkeletonCard';

const FILTERS = {
  cuisine: ['Biryani', 'Pizza', 'Burgers', 'South Indian', 'Chinese', 'Desserts', 'Sushi', 'North Indian'],
  rating: ['4.5+', '4.0+', '3.5+'],
  deliveryTime: ['Under 20 min', 'Under 30 min', 'Under 45 min'],
  price: ['Under ₹200', 'Under ₹400', 'Under ₹600'],
};

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="50" fill="#FFF3EE" />
        <circle cx="50" cy="50" r="20" stroke="#FF5722" strokeWidth="3" fill="none" opacity="0.5" />
        <line x1="65" y1="65" x2="85" y2="85" stroke="#FF5722" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <path d="M44 50h12M50 44v12" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </svg>
      <div className="text-center">
        <h3 className="font-satoshi font-bold text-xl text-zinc-900">No results for "{query}"</h3>
        <p className="text-zinc-500 text-sm mt-2 max-w-xs">
          Try searching for something else or browse by category
        </p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 200);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Restaurant[]>(restaurants);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  const filterRestaurants = useCallback((q: string, filters: Record<string, string>) => {
    setLoading(true);
    setTimeout(() => {
      let filtered = [...restaurants];

      // Text search
      if (q.trim()) {
        const lower = q.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.name.toLowerCase().includes(lower) ||
            r.cuisine.some((c) => c.toLowerCase().includes(lower)) ||
            r.menu.some((cat) =>
              cat.items.some((item) => item.name.toLowerCase().includes(lower))
            )
        );
      }

      // Rating filter
      if (filters.rating) {
        const minRating = parseFloat(filters.rating.replace('+', ''));
        filtered = filtered.filter((r) => r.rating >= minRating);
      }

      // Delivery time filter
      if (filters.deliveryTime) {
        const maxTime = parseInt(filters.deliveryTime.replace('Under ', '').replace(' min', ''));
        filtered = filtered.filter((r) => r.deliveryTime <= maxTime);
      }

      // Cuisine filter
      if (filters.cuisine) {
        filtered = filtered.filter((r) =>
          r.cuisine.some((c) => c.toLowerCase() === filters.cuisine.toLowerCase())
        );
      }

      setResults(filtered);
      setLoading(false);
    }, 150);
  }, []);

  useEffect(() => {
    const cuisine = searchParams.get('cuisine');
    if (cuisine) {
      setActiveFilters({ cuisine });
    }
  }, []);

  useEffect(() => {
    filterRestaurants(debouncedQuery, activeFilters);
  }, [debouncedQuery, activeFilters, filterRestaurants]);

  const toggleFilter = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      if (next[key] === value) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search restaurants, cuisines, dishes..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-zinc-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 outline-none text-sm shadow-sm transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl border font-medium text-sm transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'border-orange-300 text-white'
                : 'border-zinc-200 text-zinc-700 bg-white'
            }`}
            style={showFilters || activeFilterCount > 0 ? { backgroundColor: '#FF5722', borderColor: '#FF5722' } : {}}
          >
            <Funnel size={16} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        {/* Filter chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm space-y-4">
                {Object.entries(FILTERS).map(([key, options]) => (
                  <div key={key}>
                    <h4 className="font-satoshi font-semibold text-xs text-zinc-500 uppercase tracking-wide mb-2">
                      {key === 'deliveryTime' ? 'Delivery Time' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {options.map((opt) => {
                        const isActive = activeFilters[key] === opt;
                        return (
                          <motion.button
                            key={opt}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleFilter(key, opt)}
                            className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
                            style={
                              isActive
                                ? { backgroundColor: '#FF5722', borderColor: '#FF5722', color: 'white' }
                                : { borderColor: '#e4e4e7', color: '#3f3f46', backgroundColor: 'white' }
                            }
                          >
                            {opt}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => setActiveFilters({})}
                    className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        {!showFilters && activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(activeFilters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: '#FF5722' }}
              >
                {value}
                <button onClick={() => toggleFilter(key, value)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results */}
        <div>
          {!loading && (
            <p className="text-zinc-500 text-sm mb-4">
              {results.length} restaurant{results.length !== 1 ? 's' : ''} found
              {debouncedQuery ? ` for "${debouncedQuery}"` : ''}
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : results.length === 0 ? (
            <EmptyState query={debouncedQuery || 'your search'} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, ease: 'easeOut' }}
                >
                  <Link
                    to={`/restaurant/${r.slug}`}
                    className="block bg-white rounded-[1.25rem] overflow-hidden shadow-card hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-shadow group"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {r.offers.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                          <p className="text-white text-xs font-semibold">{r.offers[0]}</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-satoshi font-bold text-zinc-900">{r.name}</h3>
                        <RatingBadge rating={r.rating} />
                      </div>
                      <p className="text-zinc-500 text-sm mb-2 truncate">{r.cuisine.join(', ')}</p>
                      <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{r.deliveryTime} min</span>
                        </div>
                        <span>·</span>
                        <span>₹{r.priceForTwo} for two</span>
                        {r.deliveryFee === 0 && (
                          <>
                            <span>·</span>
                            <span className="text-green-600 font-medium">Free delivery</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
