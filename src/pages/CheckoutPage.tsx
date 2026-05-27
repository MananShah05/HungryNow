import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, Bank, CheckCircle, ArrowLeft, Lock } from '@phosphor-icons/react';
import { useCartStore } from '../store/cartStore';
import VegDot from '../components/VegDot';

interface FormData {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  pincode: string;
  city: string;
  paymentMethod: 'upi' | 'card' | 'cod';
  upiId: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  pincode?: string;
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

// Particle burst component
function ParticleBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const particles = Array.from({ length: 20 }, (_, i) => ({
    angle: (i / 20) * 360,
    distance: 40 + Math.random() * 60,
    color: ['#FF5722', '#FFA000', '#FFCC02', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 5)],
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.01 }}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

function FormField({
  label, name, type = 'text', value, onChange, error, placeholder, helper,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder?: string; helper?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-zinc-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-zinc-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100'
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {helper && !error && <p className="text-xs text-zinc-400 mt-1">{helper}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, getDeliveryFee, getPlatformFee, getTotal, couponDiscount, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', address: '', landmark: '', pincode: '', city: 'Bangalore',
    paymentMethod: 'upi', upiId: '', cardNumber: '', cardExpiry: '', cardCvv: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [placing, setPlacing] = useState(false);
  const [placingStep, setPlacingStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const update = (key: keyof FormData, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) newErrors.phone = 'Enter a valid 10-digit mobile number';
    if (!form.address.trim()) newErrors.address = 'Delivery address is required';
    if (!form.pincode.match(/^\d{6}$/)) newErrors.pincode = 'Enter a valid 6-digit pincode';
    if (form.paymentMethod === 'upi' && !form.upiId.includes('@')) {
      newErrors.upiId = 'Enter a valid UPI ID (e.g. name@upi)';
    }
    if (form.paymentMethod === 'card') {
      if (form.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Enter a valid 16-digit card number';
      if (!form.cardExpiry.match(/^\d{2}\/\d{2}$/)) newErrors.cardExpiry = 'Enter expiry as MM/YY';
      if (form.cardCvv.length !== 3) newErrors.cardCvv = 'CVV must be 3 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlace = async () => {
    if (!validate()) return;
    setPlacing(true);
    setPlacingStep(0);
    
    // Simulate secure multi-step payment gateway flow
    await new Promise((r) => setTimeout(r, 600));
    setPlacingStep(1);
    await new Promise((r) => setTimeout(r, 600));
    setPlacingStep(2);
    await new Promise((r) => setTimeout(r, 600));
    setPlacingStep(3);
    await new Promise((r) => setTimeout(r, 600));

    setShowParticles(true);
    setPlaced(true);
    setPlacing(false);
    setTimeout(() => setShowParticles(false), 1000);
    clearCart();
    setTimeout(() => navigate('/orders'), 2800);
  };

  if (placed) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-[#FAFAFA]">
        <ParticleBurst active={showParticles} />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-center p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
            className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={52} className="text-green-500" weight="fill" />
          </motion.div>
          <h2 className="font-satoshi font-black text-3xl text-zinc-900 mb-2">Order Placed! 🎉</h2>
          <p className="text-zinc-500 mb-6">Your food is being prepared. Redirecting to tracking...</p>
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#FF5722' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <h2 className="font-satoshi font-bold text-2xl text-zinc-900 mb-2">Your cart is empty</h2>
          <button onClick={() => navigate('/')} className="text-sm font-medium" style={{ color: '#FF5722' }}>
            ← Browse restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="font-satoshi font-black text-3xl text-zinc-900 mb-6 text-center">Checkout</h1>

        {/* Progress Stepper */}
        <div className="max-w-xl mx-auto mb-10 px-4">
          <div className="flex items-center justify-between relative">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-200 rounded-full -z-10" />
            
            {/* Active Progress Line */}
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full -z-10"
              style={{ backgroundColor: '#FF5722' }}
              initial={{ width: '33.3%' }}
              animate={{ 
                width: placing ? '66.6%' : placed ? '100%' : '33.3%' 
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Step 1: Address */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shadow-sm bg-white"
                style={{
                  borderColor: '#FF5722',
                  color: '#FF5722'
                }}
              >
                1
              </div>
              <span className="text-[11px] font-semibold text-zinc-900">Address</span>
            </div>

            {/* Step 2: Payment */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shadow-sm bg-white"
                style={{
                  borderColor: '#FF5722',
                  color: '#FF5722'
                }}
              >
                2
              </div>
              <span className="text-[11px] font-semibold text-zinc-900">Payment</span>
            </div>

            {/* Step 3: Verification */}
            <div className="flex flex-col items-center gap-2">
              <motion.div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shadow-sm bg-white"
                animate={placing ? {
                  scale: [1, 1.08, 1],
                  boxShadow: ['0 0 0 0px rgba(255,87,34,0.2)', '0 0 0 6px rgba(255,87,34,0)', '0 0 0 0px rgba(255,87,34,0)']
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  borderColor: placing || placed ? '#FF5722' : '#E4E4E7',
                  color: placing || placed ? '#FF5722' : '#A1A1AA'
                }}
              >
                3
              </motion.div>
              <span className={`text-[11px] font-semibold ${placing || placed ? 'text-zinc-900' : 'text-zinc-400'}`}>Verify</span>
            </div>

            {/* Step 4: Success */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shadow-sm"
                style={{
                  backgroundColor: placed ? '#4CAF50' : '#FFFFFF',
                  borderColor: placed ? '#4CAF50' : '#E4E4E7',
                  color: placed ? '#FFFFFF' : '#A1A1AA'
                }}
              >
                {placed ? '✓' : '4'}
              </div>
              <span className={`text-[11px] font-semibold ${placed ? 'text-green-600 font-bold' : 'text-zinc-400'}`}>Success</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Address + Payment */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery address */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FFF3EE' }}>
                  <MapPin size={18} style={{ color: '#FF5722' }} />
                </div>
                <h2 className="font-satoshi font-bold text-lg text-zinc-900">Delivery Address</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" name="name" value={form.name} onChange={(v) => update('name', v)}
                  error={errors.name} placeholder="Manan Shah" />
                <FormField label="Mobile Number" name="phone" type="tel" value={form.phone}
                  onChange={(v) => update('phone', v)} error={errors.phone} placeholder="9876543210"
                  helper="We'll send order updates here" />
                <div className="sm:col-span-2">
                  <FormField label="Flat, House no., Building, Street" name="address" value={form.address}
                    onChange={(v) => update('address', v)} error={errors.address}
                    placeholder="e.g. 42A, Coral Residency, MG Road" />
                </div>
                <FormField label="Landmark (Optional)" name="landmark" value={form.landmark}
                  onChange={(v) => update('landmark', v)} placeholder="Near Metro station" />
                <FormField label="Pincode" name="pincode" value={form.pincode}
                  onChange={(v) => update('pincode', v)} error={errors.pincode} placeholder="560001" />
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">City</label>
                  <input
                    value={form.city}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm bg-zinc-50 text-zinc-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FFF3EE' }}>
                  <CreditCard size={18} style={{ color: '#FF5722' }} />
                </div>
                <h2 className="font-satoshi font-bold text-lg text-zinc-900">Payment Method</h2>
              </div>

              {/* Payment tabs */}
              <div className="flex rounded-xl border border-zinc-200 overflow-hidden mb-5">
                {(['upi', 'card', 'cod'] as const).map((method) => {
                  const labels = { upi: '📱 UPI', card: '💳 Card', cod: '💵 Cash on Delivery' };
                  const isActive = form.paymentMethod === method;
                  return (
                    <button
                      key={method}
                      onClick={() => update('paymentMethod', method)}
                      className={`flex-1 py-2.5 text-sm font-medium transition-all duration-150 ${
                        isActive ? 'text-white' : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                      style={isActive ? { backgroundColor: '#FF5722' } : {}}
                    >
                      {labels[method]}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {form.paymentMethod === 'upi' && (
                  <motion.div
                    key="upi"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FormField label="UPI ID" name="upiId" value={form.upiId}
                      onChange={(v) => update('upiId', v)} error={errors.upiId}
                      placeholder="yourname@paytm" helper="Enter your Google Pay, PhonePe, or Paytm UPI ID" />
                  </motion.div>
                )}
                {form.paymentMethod === 'card' && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <FormField label="Card Number" name="cardNumber" value={form.cardNumber}
                      onChange={(v) => update('cardNumber', v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                      error={errors.cardNumber} placeholder="1234 5678 9012 3456" />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="Expiry Date" name="cardExpiry" value={form.cardExpiry}
                        onChange={(v) => {
                          const clean = v.replace(/\D/g, '');
                          update('cardExpiry', clean.length >= 3 ? `${clean.slice(0, 2)}/${clean.slice(2, 4)}` : clean);
                        }}
                        error={errors.cardExpiry} placeholder="MM/YY" />
                      <FormField label="CVV" name="cardCvv" type="password" value={form.cardCvv}
                        onChange={(v) => update('cardCvv', v.replace(/\D/g, '').slice(0, 3))}
                        error={errors.cardCvv} placeholder="···" />
                    </div>
                  </motion.div>
                )}
                {form.paymentMethod === 'cod' && (
                  <motion.div
                    key="cod"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100"
                  >
                    <Bank size={20} className="text-amber-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Pay when your order arrives</p>
                      <p className="text-xs text-amber-600 mt-0.5">Please keep exact change ready for the delivery partner</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-50">
                <h2 className="font-satoshi font-bold text-lg text-zinc-900">Order Summary</h2>
                {items.length > 0 && <p className="text-xs text-zinc-500 mt-0.5">{items[0].restaurantName}</p>}
              </div>

              {/* Items */}
              <div className="px-5 py-3 divide-y divide-zinc-50 max-h-72 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2.5">
                    <VegDot isVeg={item.isVeg} size={7} />
                    <span className="flex-1 text-sm text-zinc-900 truncate">{item.name}</span>
                    <span className="text-xs text-zinc-500">×{item.quantity}</span>
                    <span className="text-sm font-medium text-zinc-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Bill */}
              <div className="px-5 py-3 border-t border-zinc-50 divide-y divide-zinc-50">
                <div className="flex justify-between py-2 text-sm text-zinc-600">
                  <span>Item Total</span>
                  <span>₹{getSubtotal()}</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-zinc-600">
                  <span>Delivery Fee</span>
                  {getDeliveryFee() === 0
                    ? <span className="text-green-600">FREE</span>
                    : <span>₹{getDeliveryFee()}</span>
                  }
                </div>
                <div className="flex justify-between py-2 text-sm text-zinc-600">
                  <span>Platform Fee</span>
                  <span>₹{getPlatformFee()}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between py-2 text-sm text-green-600">
                    <span>Coupon Discount</span>
                    <span>−₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 font-satoshi font-bold text-zinc-900">
                  <span>Total</span>
                  <span>₹{getTotal()}</span>
                </div>
              </div>

              <div className="px-5 pb-5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePlace}
                  disabled={placing}
                  className="w-full py-4 rounded-2xl text-white font-satoshi font-bold text-base transition-all disabled:opacity-70 relative overflow-hidden"
                  style={{ backgroundColor: '#FF5722' }}
                >
                  {placing ? (
                    <div className="flex items-center justify-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Placing Order...
                    </div>
                  ) : (
                    `Place Order · ₹${getTotal()}`
                  )}
                </motion.button>
                <p className="text-xs text-center text-zinc-400 mt-3">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secure Payment Processing Modal */}
      <AnimatePresence>
        {placing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-zinc-100"
            >
              {/* Shield/Lock animation */}
              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                {/* Rotating accent border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-4 border-t-[#FF5722] border-r-transparent border-b-[#FF8A65] border-l-transparent"
                />
                {/* Shield pulse */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center"
                >
                  <Lock size={24} className="text-[#FF5722]" weight="fill" />
                </motion.div>
              </div>

              <h3 className="font-satoshi font-bold text-xl text-zinc-900 mb-2">
                Securing Payment
              </h3>
              
              <div className="h-6 flex items-center justify-center mb-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={placingStep}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium text-zinc-500"
                  >
                    {placingStep === 0 && 'Establishing secure connection...'}
                    {placingStep === 1 && 'Contacting payment gateway...'}
                    {placingStep === 2 && `Authorizing charge of ₹${getTotal().toLocaleString()}...`}
                    {placingStep === 3 && 'Creating your order...'}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-1.5">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: placingStep >= step ? '#FF5722' : '#E4E4E7',
                      scale: placingStep === step ? 1.25 : 1,
                    }}
                  />
                ))}
              </div>

              <p className="text-[10px] text-zinc-400 mt-6 flex items-center justify-center gap-1">
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                256-bit SSL Secure Payment
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
