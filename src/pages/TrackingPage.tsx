import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Package, Storefront, Motorcycle, Phone, ChatCircle } from '@phosphor-icons/react';

const STATUS_STEPS = [
  { label: 'Order Placed', sublabel: 'We received your order', icon: CheckCircle },
  { label: 'Accepted', sublabel: 'Restaurant confirmed', icon: Storefront },
  { label: 'Preparing', sublabel: 'Chef is cooking', icon: Package },
  { label: 'Picked Up', sublabel: 'On the way to you', icon: Motorcycle },
  { label: 'Delivered', sublabel: 'Enjoy your meal!', icon: CheckCircle },
];

export default function TrackingPage() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(2);
  const [eta, setEta] = useState(18);
  const [pulse, setPulse] = useState(false);

  // Simulate status progression
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((s) => {
        if (s < 4) {
          setPulse(true);
          setTimeout(() => setPulse(false), 1000);
          return s + 1;
        }
        clearInterval(stepTimer);
        return s;
      });
    }, 8000);
    return () => clearInterval(stepTimer);
  }, []);

  // ETA countdown
  useEffect(() => {
    const etaTimer = setInterval(() => {
      setEta((e) => Math.max(0, e - 1));
    }, 60000);
    return () => clearInterval(etaTimer);
  }, []);

  // Poll every 15s (simulated)
  useEffect(() => {
    const poll = setInterval(() => {
      // In production, fetch order status from API
    }, 15000);
    return () => clearInterval(poll);
  }, [id]);

  const progressPct = (currentStep / (STATUS_STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/orders"
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Back to Orders
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-satoshi font-black text-2xl text-zinc-900">Live Tracking</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Order #{id}</p>
          </div>
          <AnimatePresence>
            {pulse && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: '#FF5722' }}
              >
                ✓ Status updated!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ETA Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-card p-6 mb-5"
          animate={{ borderColor: currentStep === 4 ? '#22c55e' : '#FF5722' }}
          style={{ border: '2px solid #FF5722' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Estimated delivery</p>
              {currentStep < 4 ? (
                <div className="flex items-baseline gap-2">
                  <span className="font-satoshi font-black text-4xl" style={{ color: '#FF5722' }}>{eta}</span>
                  <span className="text-zinc-500 font-medium">minutes away</span>
                </div>
              ) : (
                <span className="font-satoshi font-bold text-2xl text-green-600">Delivered! 🎉</span>
              )}
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#FFF3EE' }}>
              {currentStep === 4 ? (
                <CheckCircle size={36} weight="fill" className="text-green-500" />
              ) : (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Motorcycle size={36} style={{ color: '#FF5722' }} />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Status Stepper */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-5">
          <h2 className="font-satoshi font-bold text-base text-zinc-900 mb-6">Order Status</h2>

          {/* Progress bar */}
          <div className="relative h-1.5 bg-zinc-100 rounded-full mb-8">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ backgroundColor: '#FF5722' }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {STATUS_STEPS.map((step, i) => {
              const Icon = step.icon;
              const isDone = i <= currentStep;
              const isActive = i === currentStep;

              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: isDone ? 1 : 0.4 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    animate={{ scale: isActive ? [1, 1.15, 1] : 1 }}
                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                      isDone ? 'text-white' : 'bg-zinc-50 text-zinc-300 border-zinc-200'
                    }`}
                    style={isDone ? { backgroundColor: '#FF5722', borderColor: '#FF5722' } : {}}
                  >
                    <Icon size={18} weight={isDone ? 'fill' : 'regular'} />
                  </motion.div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${isDone ? 'text-zinc-900' : 'text-zinc-400'}`}>
                      {step.label}
                    </p>
                    <p className={`text-xs ${isDone ? 'text-zinc-500' : 'text-zinc-300'}`}>
                      {step.sublabel}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#FF5722' }}
                    />
                  )}
                  {isDone && i < currentStep && (
                    <CheckCircle size={18} className="text-green-500" weight="fill" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-5">
          <div className="relative h-56 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
            {/* Fake map grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 220">
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 22} x2="400" y2={i * 22} stroke="#888" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="220" stroke="#888" strokeWidth="0.5" />
              ))}
              <path d="M80 160 Q150 80 200 110 Q250 140 320 60" stroke="#FF5722" strokeWidth="2.5" fill="none" strokeDasharray="6,3" />
              <circle cx="80" cy="160" r="6" fill="#FF5722" opacity="0.6" />
              <circle cx="320" cy="60" r="8" fill="#FF5722" />
            </svg>
            {/* Rider indicator */}
            <motion.div
              animate={{ x: [0, 20, 40, 60, 80], y: [0, -15, -25, -30, -45] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="relative z-10"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Motorcycle size={22} style={{ color: '#FF5722' }} />
              </div>
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -inset-2 rounded-full border-2"
                style={{ borderColor: '#FF5722' }}
              />
            </motion.div>
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 shadow">
              📍 Biryani Blues → Your Location
            </div>
          </div>
        </div>

        {/* Delivery partner */}
        <div className="bg-white rounded-2xl shadow-card p-5 mb-5">
          <h3 className="font-satoshi font-semibold text-sm text-zinc-500 mb-3 uppercase tracking-wide">Delivery Partner</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center font-satoshi font-bold text-xl" style={{ color: '#FF5722' }}>
                R
              </div>
              <div>
                <p className="font-satoshi font-semibold text-zinc-900">Rajesh Kumar</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xs">★★★★★</span>
                  <span className="text-xs text-zinc-400">4.9 · 2,341 deliveries</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="tel:+919876543210"
                className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
              >
                <Phone size={18} className="text-green-600" />
              </a>
              <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#FFF3EE' }}>
                <ChatCircle size={18} style={{ color: '#FF5722' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h3 className="font-satoshi font-semibold text-base text-zinc-900 mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm text-zinc-600 mb-4">
            <div className="flex justify-between">
              <span>Hyderabadi Chicken Biryani × 2</span>
              <span>₹498</span>
            </div>
            <div className="flex justify-between">
              <span>Garlic Naan × 2</span>
              <span>₹98</span>
            </div>
          </div>
          <div className="border-t border-zinc-100 pt-3 flex justify-between font-satoshi font-bold text-zinc-900">
            <span>Total Paid</span>
            <span>₹636</span>
          </div>
        </div>
      </div>
    </div>
  );
}
