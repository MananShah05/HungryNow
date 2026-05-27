import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  isVeg: boolean;
  image?: string;
  customization?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string;
  couponDiscount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getPlatformFee: () => number;
  getTotal: () => number;
}

const VALID_COUPONS: Record<string, number> = {
  'HUNGRY50': 50,
  'FIRST100': 100,
  'SAVE75': 75,
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  couponCode: '',
  couponDiscount: 0,

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      // Clear cart if different restaurant
      if (state.items.length > 0 && state.items[0].restaurantId !== item.restaurantId) {
        return {
          items: [{ ...item, quantity: 1 }],
          couponCode: '',
          couponDiscount: 0,
        };
      }
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  clearCart: () => set({ items: [], couponCode: '', couponDiscount: 0 }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  applyCoupon: (code) => {
    const discount = VALID_COUPONS[code.toUpperCase()];
    if (discount) {
      set({ couponCode: code.toUpperCase(), couponDiscount: discount });
      return true;
    }
    return false;
  },

  removeCoupon: () => set({ couponCode: '', couponDiscount: 0 }),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  getSubtotal: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    return subtotal > 0 ? (subtotal > 299 ? 0 : 40) : 0;
  },

  getPlatformFee: () => (get().items.length > 0 ? 3 : 0),

  getTotal: () => {
    const { getSubtotal, getDeliveryFee, getPlatformFee, couponDiscount } = get();
    return Math.max(0, getSubtotal() + getDeliveryFee() + getPlatformFee() - couponDiscount);
  },
}));
