import { Product } from "@/types/product";
import NavBar from "@/components/NavBar";
import Collection from "@/components/Collection";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";

async function getProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}
export default async function Home() {
  const products = await getProducts();
  return <>
    <NavBar />
    <main>
      <section className="hero section-container" id="edit">
        <div className="hero-copy"><p className="eyebrow"><span className="little-dot" /> THE EVERYDAY EDIT — VOL. 01</p><h1>Everyday things.<br /><span>Extraordinary</span><br />possibilities.</h1><p className="hero-description">For the way you dress, work, and live.<br />Discover good things that fit right into your world.</p><a href="#collection" className="button primary">Explore the collection <Icon name="arrow" /></a><div className="hero-footnote"><span className="mini-mark"><Icon name="spark" size={18} /></span> A fresh perspective on the everyday.</div></div>
        <div className="hero-art"><Image width={1000} height={1050} src="/everyday-edit.svg" alt="An illustrated olive everyday tote, sculptural headphones, and warm terracotta shapes" fetchPriority="high" /><div className="edition-label">THE ART OF<br /><strong>everyday.</strong></div><div className="art-caption"><span>LESS NOISE. MORE YOU.</span><span>01 / 03</span></div><a href="#collection" className="art-link" aria-label="Shop the everyday edit"><Icon name="arrow" size={24} /></a></div>
      </section>
      <div className="principles section-container"><div><Icon name="spark" /><span>A little something for every day</span></div><div><Icon name="bag" /><span>Style, tech & everything between</span></div><div><Icon name="box" /><span>Good finds, all in one place</span></div></div>
      <Collection products={products ?? []} unavailable={products === null} />
      <section className="about-section section-container" id="about"><div className="about-symbol" aria-hidden="true">✳</div><p className="eyebrow">THE ULTIMATE PHILOSOPHY</p><h2>Life’s in the little things.<br />Make them good ones.</h2><p>A wardrobe refresh. A smarter setup. A detail that feels like you.<br />We bring the everyday together, so you can make it your own.</p><a href="#collection">Find your next favorite <Icon name="arrow" size={18} /></a></section>
    </main>
    <footer className="footer section-container"><Link href="/" className="wordmark">the ultimate<span>store<span className="brand-dot">.</span></span></Link><p>Everyday essentials. Your own way.</p><span>© {new Date().getFullYear()} The Ultimate Store</span><a href="#edit">Back to top ↑</a></footer>
  </>;
}
