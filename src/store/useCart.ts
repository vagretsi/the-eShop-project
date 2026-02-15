import { create } from 'zustand';
import { Product } from '@/types/product';

// Επεκτείνουμε το Product interface για να περιλαμβάνει ποσότητα
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  toggleCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  cart: [],
  isOpen: false,
  
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Αν υπάρχει ήδη, αυξάνουμε το quantity
      return {
        cart: state.cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        isOpen: true
      };
    }
    // Αν είναι νέο, το προσθέτουμε με quantity 1
    return { cart: [...state.cart, { ...product, quantity: 1 }], isOpen: true };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  decreaseQuantity: (id) => set((state) => {
    const item = state.cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
      return {
        cart: state.cart.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
      };
    }
    // Αν είναι 1, το αφαιρούμε τελείως
    return { cart: state.cart.filter(i => i.id !== id) };
  }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));