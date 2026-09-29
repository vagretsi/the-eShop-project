"use client";
import { useSyncExternalStore } from "react";
import { Product } from "@/types/product";

export interface CartItem extends Product { quantity: number }
interface CartState {
  cart: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  toggleCart: () => void;
}
const listeners = new Set<() => void>();
function update(patch: Partial<CartState>) {
  state = { ...state, ...patch };
  listeners.forEach(listener => listener());
}
let state: CartState = {
  cart: [], isOpen: false,
  addToCart(product) {
    const exists = state.cart.some(item => item.id === product.id);
    update({ cart: exists ? state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...state.cart, { ...product, quantity: 1 }], isOpen: true });
  },
  removeFromCart(id) { update({ cart: state.cart.filter(item => item.id !== id) }); },
  decreaseQuantity(id) { update({ cart: state.cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0) }); },
  toggleCart() { update({ isOpen: !state.isOpen }); },
};
const initialState = state;
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
export function useCart(): CartState;
export function useCart<T>(selector: (state: CartState) => T): T;
export function useCart<T>(selector?: (state: CartState) => T) {
  const snapshot = useSyncExternalStore(subscribe, () => state, () => initialState);
  return selector ? selector(snapshot) : snapshot;
}
