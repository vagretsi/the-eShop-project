"use client"; // Ενεργοποιεί το interactivity
import { Product } from "@/types/product";
import { useCart } from "@/store/useCart";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div className="flex flex-col bg-white border border-zinc-200 rounded-3xl p-5 transition-all hover:shadow-2xl dark:bg-zinc-900 dark:border-zinc-800">
      <div className="relative aspect-square mb-5 bg-white rounded-2xl overflow-hidden p-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full w-full object-contain hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <h3 className="font-bold text-sm line-clamp-1 h-5 text-black dark:text-white">{product.title}</h3>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xl font-black text-black dark:text-white">${product.price}</span>
        <button 
          onClick={() => {
            console.log("Adding to cart:", product.title); // Για να το βλέπεις στο Console
            addToCart(product);
          }}
          className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-black active:scale-90 transition-all dark:bg-white dark:text-black hover:opacity-80"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}