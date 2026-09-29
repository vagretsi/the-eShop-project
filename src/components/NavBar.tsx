"use client";
import { useCart } from "@/store/useCart";
import Link from "next/link";
import Icon from "./Icon";

export default function NavBar() {
  const { cart, toggleCart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  return <>
    <div className="announcement">A little less ordinary. A little more you. <span>Discover your next everyday favorite <span aria-hidden="true">↗</span></span></div>
    <header className="site-header">
      <nav className="nav-inner" aria-label="Main navigation">
        <Link href="/" className="wordmark" aria-label="The Ultimate Store home">the ultimate<span>store<span className="brand-dot">.</span></span></Link>
        <div className="nav-links"><a className="active" href="#collection">Shop all</a><a href="#edit">The everyday edit</a><a href="#about">Our approach</a></div>
        <button className="cart-toggle" onClick={toggleCart} aria-label={`Open shopping bag, ${totalItems} items`}><Icon name="bag" /><span>Bag</span><span className="cart-count">{totalItems}</span></button>
      </nav>
    </header>
  </>;
}
