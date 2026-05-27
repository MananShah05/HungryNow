import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Trash, Tag, CheckCircle } from '@phosphor-icons/react';
import { useCartStore } from '../store/cartStore';
import VegDot from './VegDot';

const CART_EASE = [0.32, 0.72, 0, 1] as const;

export default function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDeliveryFee,
    getPlatformFee,
    getTotal,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [couponError, setCouponError] = useState('');

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const platformFee = getPlatformFee();
  const total = getTotal();

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError('Invalid coupon code');
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeCart}
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: CART_EASE }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <div>
                <h2 className="font-satoshi font-bold text-xl text-zinc-900">Your Cart</h2>
                {items.length > 0 && (
                  <p className="text-xs text-zinc-500 mt-0.5">{items[0].restaurantName}</p>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
              >
                <X size={18} className="text-zinc-600" />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-24 h-24 rounded-full bg-zinc-50 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="#FFF3EE" />
                    <path d="M16 20h16l-2.5 10H18.5L16 20z" fill="#FF5722" opacity="0.3" />
                    <path d="M14 18h2l1 4M32 18h2l-1 4" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="20" cy="33" r="1.5" fill="#FF5722" />
                    <circle cx="28" cy="33" r="1.5" fill="#FF5722" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="font-satoshi font-semibold text-zinc-900 text-lg">Cart is empty</h3>
                  <p className="text-zinc-500 text-sm mt-1">Add items from a restaurant to get started</p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-transform active:scale-[0.97]"
                  style={{ backgroundColor: '#FF5722' }}
                >
                  Browse Restaurants
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  {/* Items */}
                  <div className="px-5 py-3 space-y-0 divide-y divide-zinc-50">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 py-3"
                        >
                          <VegDot isVeg={item.isVeg} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 truncate">{item.name}</p>
                            <p className="text-sm text-zinc-500">₹{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-1 border border-zinc-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-sm font-bold transition-colors hover:bg-zinc-50"
                              style={{ color: '#FF5722' }}
                            >
                              −
                            </button>
                            <div className="w-6 text-center overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={item.quantity}
                                  initial={{ y: 8, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -8, opacity: 0 }}
                                  transition={{ duration: 0.12 }}
                                  className="block text-sm font-semibold text-zinc-900"
                                >
                                  {item.quantity}
                                </motion.span>
                              </AnimatePresence>
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-sm font-bold transition-colors hover:bg-zinc-50"
                              style={{ color: '#FF5722' }}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-zinc-300 hover:text-red-400 transition-colors"
                          >
                            <Trash size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Coupon */}
                  <div className="mx-5 my-3 border border-dashed border-zinc-200 rounded-xl overflow-hidden">
                    {couponCode ? (
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={18} className="text-green-500" />
                          <div>
                            <span className="text-sm font-semibold text-zinc-900">{couponCode}</span>
                            <p className="text-xs text-green-600">₹{couponDiscount} discount applied!</p>
                          </div>
                        </div>
                        <button onClick={removeCoupon} className="text-zinc-400 hover:text-zinc-600">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setCouponExpanded(!couponExpanded)}
                          className="w-full flex items-center justify-between px-4 py-3"
                        >
                          <div className="flex items-center gap-2">
                            <Tag size={16} style={{ color: '#FF5722' }} />
                            <span className="text-sm font-medium text-zinc-700">Apply Coupon</span>
                          </div>
                          <motion.span
                            animate={{ rotate: couponExpanded ? 180 : 0 }}
                            className="text-zinc-400 text-xs"
                          >
                            ▼
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {couponExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3 space-y-2">
                                <div className="flex gap-2">
                                  <input
                                    value={couponInput}
                                    onChange={(e) => {
                                      setCouponInput(e.target.value.toUpperCase());
                                      setCouponError('');
                                    }}
                                    placeholder="Enter code (try HUNGRY50)"
                                    className="flex-1 px-3 py-2 text-sm border border-zinc-200 rounded-lg outline-none focus:border-orange-400"
                                  />
                                  <button
                                    onClick={handleApplyCoupon}
                                    className="px-3 py-2 text-sm font-semibold rounded-lg text-white transition-transform active:scale-[0.97]"
                                    style={{ backgroundColor: '#FF5722' }}
                                  >
                                    Apply
                                  </button>
                                </div>
                                {couponError && (
                                  <p className="text-xs text-red-500">{couponError}</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>

                  {/* Bill Breakdown */}
                  <div className="mx-5 my-4">
                    <h3 className="font-satoshi font-semibold text-zinc-900 text-sm mb-2">Bill Details</h3>
                    <div className="divide-y divide-zinc-100">
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-zinc-600">Item Total</span>
                        <span className="text-sm font-medium text-zinc-900">₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-zinc-600">Delivery Fee</span>
                        {deliveryFee === 0 ? (
                          <span className="text-sm font-medium text-green-600">FREE</span>
                        ) : (
                          <span className="text-sm font-medium text-zinc-900">₹{deliveryFee}</span>
                        )}
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-zinc-600">Platform Fee</span>
                        <span className="text-sm font-medium text-zinc-900">₹{platformFee}</span>
                      </div>
                      {couponDiscount > 0 && (
                        <div className="flex justify-between py-2">
                          <span className="text-sm text-green-600">Coupon Discount</span>
                          <span className="text-sm font-medium text-green-600">−₹{couponDiscount}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-3">
                        <span className="font-satoshi font-bold text-zinc-900">To Pay</span>
                        <span className="font-satoshi font-bold text-zinc-900">₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 py-4 border-t border-zinc-100">
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl text-white font-semibold transition-transform active:scale-[0.97]"
                    style={{ backgroundColor: '#FF5722' }}
                  >
                    <span className="text-sm">
                      {items.reduce((s, i) => s + i.quantity, 0)} items
                    </span>
                    <span className="font-satoshi font-bold">Proceed to Checkout →</span>
                    <span className="text-sm">₹{total}</span>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
