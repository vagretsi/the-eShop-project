"use client";
import { useCart } from "@/store/useCart";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
  const { cart, isOpen, toggleCart, removeFromCart, addToCart, decreaseQuantity } = useCart();
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-white p-8 shadow-2xl dark:bg-zinc-950 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic">YOUR CART</h2>
              <button onClick={toggleCart} className="text-xs font-bold font-mono">CLOSE</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <p className="text-zinc-400 italic">Empty cart...</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-zinc-100 pb-6 dark:border-zinc-800">
                    <img src={item.image} className="h-20 w-20 object-contain rounded-lg bg-white p-2" alt={item.title} />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold line-clamp-1">{item.title}</h4>
                      <p className="font-black mt-1">${item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors self-start">
                       🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-6 border-t dark:border-zinc-800">
              <div className="flex justify-between items-end mb-6">
                <span className="text-zinc-500 text-sm font-bold tracking-widest">SUBTOTAL</span>
                <span className="text-3xl font-black">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-5 rounded-2xl font-black hover:opacity-90 transition-all dark:bg-white dark:text-black">
                CHECKOUT
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}