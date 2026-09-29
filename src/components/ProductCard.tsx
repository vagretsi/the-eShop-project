"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/store/useCart";
import Image from "next/image";
import Icon from "./Icon";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const addToCart = useCart((state) => state.addToCart);
  const [failed, setFailed] = useState(false);
  return <article className="product-card">
    <div className="product-image">
      {index < 2 && <span className="product-badge">{index === 0 ? "The everyday pick" : "Worth a closer look"}</span>}
      {failed ? <div className="image-placeholder"><Icon name="bag" size={48} /><span>Image unavailable</span></div> : <Image unoptimized width={300} height={300} src={product.image} alt={product.title} loading="lazy" onError={() => setFailed(true)} />}
      <button className="quick-add" aria-label={`Add ${product.title} to bag`} onClick={() => addToCart(product)}><Icon name="plus" /></button>
    </div>
    <div className="product-meta"><span>{product.category || "Everyday essentials"}</span>{product.rating && <span className="rating"><span aria-hidden="true">★</span> {product.rating.rate.toFixed(1)}</span>}</div>
    <h3 title={product.title}>{product.title}</h3>
    <div className="product-bottom"><span>${product.price.toFixed(2)}</span><button onClick={() => addToCart(product)}>Add to bag <Icon name="arrow" size={15} /></button></div>
  </article>;
}
