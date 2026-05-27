import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Package, Storefront, Motorcycle } from '@phosphor-icons/react';
import { useCartStore } from '../store/cartStore';
import { restaurants } from '../data/restaurants';
import { toast } from 'sonner';

const ACTIVE_ORDER = {
  id: 'ORD-2024-7823',
  restaurant: 'Biryani Blues',
  items: ['Hyderabadi Chicken Biryani × 2', 'Garlic Naan × 2'],
  total: 636,
  status: 2, // 0=Placed, 1=Accepted, 2=Preparing, 3=Picked Up, 4=Delivered
  eta: 18,
  placedAt: new Date(Date.now() - 12 * 60 * 1000),
};

const PAST_ORDERS = [
  {
    id: 'ORD-2024-7798',
    restaurant: 'Pizza Republic',
    items: ['BBQ Chicken Pizza × 1', 'Garlic Bread × 1'],
    total: 528,
    date: '2 days ago',
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&q=80',
  },
  {
    id: 'ORD-2024-7712',
    restaurant: 'South Spice',
    items: ['Masala Dosa × 2', 'Filter Coffee × 2'],
    total: 246,
    date: '5 days ago',
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=80&q=80',
  },
  {
    id: 'ORD-2024-7634',
    restaurant: 'Burger Barn',
    items: ['Classic Smash Burger × 1', 'Loaded Fries × 1'],
    total: 408,
    date: '1 week ago',
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&q=80',
  },
];

const STATUS_STEPS = [
  { label: 'Order Placed', icon: CheckCircle },
  { label: 'Accepted', icon: Storefront },
  { label: 'Preparing', icon: Package },
  { label: 'Picked Up', icon: Motorcycle },
  { label: 'Delivered', icon: CheckCircle },
];

function TrackingSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="relative">
      {/* SVG path between steps */}
      <svg className="absolute top-5 left-5 right-5" height="2" style={{ width: 'calc(100% - 40px)' }}>
        <line x1="0" y1="1" x2="100%" y2="1" stroke="#e4e4e7" strokeWidth="2" />
        <motion.line
          x1="0" y1="1" x2="100%" y2="1"
          stroke="#FF5722"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: currentStep / (STATUS_STEPS.length - 1) }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </svg>

      <div className="flex justify-between relative z-10">
        {STATUS_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isDone = i <= currentStep;
          const isActive = i === currentStep;
          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone
                    ? 'border-orange-500 text-white'
                    : 'border-zinc-200 text-zinc-400 bg-white'
                }`}
                style={isDone ? { backgroundColor: '#FF5722', borderColor: '#FF5722' } : {}}
              >
                <Icon size={18} weight={isDone ? 'fill' : 'regular'} />
              </motion.div>
              <span className={`text-xs text-center font-medium ${isDone ? 'text-zinc-900' : 'text-zinc-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [tab, setTab] = useState<'active' | 'past'>('active');
  const { addItem, openCart } = useCartStore();

  const handleReorder = (order: typeof PAST_ORDERS[0]) => {
    // Find restaurant in list of restaurants
    const restaurant = restaurants.find(
      (r) => r.name.toLowerCase() === order.restaurant.toLowerCase()
    );
    if (!restaurant) {
      toast.error('Restaurant not found');
      return;
    }

    let itemsAddedCount = 0;
    order.items.forEach((itemStr) => {
      // Parse item string format: "BBQ Chicken Pizza × 1"
      const match = itemStr.match(/(.+?)\s*×\s*(\d+)/);
      if (!match) return;
      const itemName = match[1].trim();
      const quantity = parseInt(match[2], 10);

      // Find matching item in restaurant's menu
      let menuItem: any = null;
      for (const category of restaurant.menu) {
        const found = category.items.find(
          (item) => item.name.toLowerCase() === itemName.toLowerCase()
        );
        if (found) {
          menuItem = found;
          break;
        }
      }

      if (menuItem) {
        for (let i = 0; i < quantity; i++) {
          addItem({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            isVeg: menuItem.isVeg,
            image: menuItem.image,
          });
        }
        itemsAddedCount++;
      } else {
        // Fallback estimated pricing for items not explicitly listed in static categories
        let fallbackPrice = 100;
        if (itemName.toLowerCase().includes('coffee')) fallbackPrice = 34;
        else if (itemName.toLowerCase().includes('dosa')) fallbackPrice = 89;
        else if (itemName.toLowerCase().includes('pizza')) fallbackPrice = 399;
        else if (itemName.toLowerCase().includes('garlic bread')) fallbackPrice = 129;
        else if (itemName.toLowerCase().includes('fries')) fallbackPrice = 179;
        else if (itemName.toLowerCase().includes('burger')) fallbackPrice = 229;

        for (let i = 0; i < quantity; i++) {
          addItem({
            id: `mock-${itemName.toLowerCase().replace(/\s+/g, '-')}`,
            name: itemName,
            price: fallbackPrice,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            isVeg: true,
            image: order.image,
          });
        }
        itemsAddedCount++;
      }
    });

    if (itemsAddedCount > 0) {
      toast.success(`Added items from ${restaurant.name} to cart!`);
      openCart();
    } else {
      toast.error('Could not add items to cart');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-satoshi font-black text-3xl text-zinc-900 mb-6">My Orders</h1>

        {/* Tabs */}
        <div className="flex rounded-xl border border-zinc-200 overflow-hidden bg-white w-fit mb-8">
          {(['active', 'past'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 text-sm font-semibold transition-all duration-150 ${
                tab === t ? 'text-white' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
              style={tab === t ? { backgroundColor: '#FF5722' } : {}}
            >
              {t === 'active' ? 'Active' : 'Past Orders'}
            </button>
          ))}
        </div>

        {tab === 'active' ? (
          <div className="max-w-2xl space-y-6">
            {/* Active order tracking card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-card overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-zinc-50 flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-medium">{ACTIVE_ORDER.id}</p>
                  <h2 className="font-satoshi font-bold text-xl text-zinc-900">{ACTIVE_ORDER.restaurant}</h2>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#FF5722' }}>
                    <Clock size={14} />
                    <span>{ACTIVE_ORDER.eta} min</span>
                  </div>
                  <p className="text-xs text-zinc-400">Estimated arrival</p>
                </div>
              </div>

              <div className="px-6 py-6">
                <TrackingSteps currentStep={ACTIVE_ORDER.status} />
              </div>

              <div className="px-6 pb-5">
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-orange-900">
                    {['Order placed! 🎉', 'Restaurant accepted your order', 'Chef is preparing your food 👨‍🍳', 'Your delivery partner is on the way 🛵', 'Delivered! Enjoy your meal 😋'][ACTIVE_ORDER.status]}
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    {ACTIVE_ORDER.items.join(', ')}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-5">
                <Link
                  to={`/orders/${ACTIVE_ORDER.id}`}
                  className="block w-full py-3 rounded-xl text-center text-sm font-semibold text-white transition-transform active:scale-[0.97]"
                  style={{ backgroundColor: '#FF5722' }}
                >
                  View Live Tracking
                </Link>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-2xl space-y-4">
            {PAST_ORDERS.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl shadow-card p-5 flex gap-4"
              >
                <img
                  src={order.image}
                  alt={order.restaurant}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-satoshi font-bold text-zinc-900">{order.restaurant}</h3>
                    <span className="text-xs text-zinc-400 flex-shrink-0">{order.date}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">{order.items.join(', ')}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                      <span className="text-xs text-green-600 font-medium">{order.status}</span>
                    </div>
                    <span className="text-sm font-semibold text-zinc-900">₹{order.total}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => handleReorder(order)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                    style={{ color: '#FF5722', backgroundColor: '#FFF3EE' }}
                  >
                    Reorder
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
