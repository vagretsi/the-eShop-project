"use client";
import { useCart } from "@/store/useCart";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Icon from "./Icon";

export default function CartSidebar() {
  const { cart, isOpen, toggleCart, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      const previousFocus = document.activeElement as HTMLElement | null;
      dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { dialog.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
    }
  }, [isOpen]);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <dialog className="cart-dialog" ref={dialogRef} aria-labelledby="cart-title" onCancel={e => { e.preventDefault(); toggleCart(); }} onClick={e => { if (e.target === e.currentTarget) toggleCart(); }}>
    <div className="cart-panel">
      <div className="cart-header"><div><p className="eyebrow">YOUR EVERYDAY FINDS</p><h2 id="cart-title">Shopping bag <span>({count})</span></h2></div><button className="icon-button" onClick={toggleCart} aria-label="Close shopping bag" autoFocus><Icon name="close" /></button></div>
      <div className="cart-items">
        {cart.length === 0 ? <div className="empty-cart"><span className="empty-bag"><Icon name="bag" size={38} /></span><h3>Good things belong here.</h3><p>Your bag is waiting for a new favorite.</p><button className="button primary" onClick={toggleCart}>Keep exploring <Icon name="arrow" size={18} /></button></div> : cart.map(item => <div className="cart-item" key={item.id}><Image unoptimized width={76} height={95} src={item.image} alt={item.title} /><div className="cart-item-info"><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><strong>${item.price.toFixed(2)}</strong><div className="quantity"><button onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease quantity of ${item.title}`}><Icon name="minus" size={14} /></button><span aria-live="polite">{item.quantity}</span><button onClick={() => addToCart(item)} aria-label={`Increase quantity of ${item.title}`}><Icon name="plus" size={14} /></button></div></div><button className="remove-item" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title}`}><Icon name="close" size={16} /></button></div>)}
      </div>
      {cart.length > 0 && <div className="cart-summary"><div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><p>This is a demo store. Checkout is not available yet.</p><button className="button primary" onClick={toggleCart}>Continue shopping <Icon name="arrow" size={18} /></button></div>}
    </div>
  </dialog>;
}
