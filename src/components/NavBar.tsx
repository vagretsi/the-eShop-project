"use client";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { cart, toggleCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Υπολογίζουμε το σύνολο των τεμαχίων (π.χ. 2 t-shirts + 1 hat = 3 items)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b p-4 dark:bg-black/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-black dark:text-white">
        <span className="font-black text-2xl tracking-tighter italic">THE 1% STORE</span>
        <button 
          onClick={toggleCart}
          className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold active:scale-95 transition-all dark:bg-white dark:text-black shadow-lg"
        >
          CART ({mounted ? totalItems : 0})
        </button>
      </div>
    </nav>
  );
}