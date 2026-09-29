"use client";
import { useMemo, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import Icon from "./Icon";

const categories = [{ value: "all", label: "All essentials" }, { value: "men's clothing", label: "Men" }, { value: "women's clothing", label: "Women" }, { value: "jewelery", label: "Jewelry" }, { value: "electronics", label: "Tech & accessories" }];
export default function Collection({ products, unavailable }: { products: Product[]; unavailable: boolean }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const visible = useMemo(() => {
    const result = products.filter(p => (category === "all" || p.category === category) && `${p.title} ${p.category || ""}`.toLowerCase().includes(query.toLowerCase().trim()));
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    return result;
  }, [products, category, query, sort]);
  return <section className="collection section-container" id="collection">
    <div className="collection-heading"><div><p className="eyebrow">GOOD FINDS. EVERY DAY.</p><h2>Meet your new favorites<span>.</span></h2></div><p>Considered essentials.<br />Endless ways to make them yours.</p></div>
    <div className="collection-tools"><div className="category-tabs" aria-label="Product categories">{categories.map(c => <button key={c.value} aria-pressed={category === c.value} className={category === c.value ? "selected" : ""} onClick={() => setCategory(c.value)}>{c.label}</button>)}</div><label className="search-field"><Icon name="search" size={18} /><input type="search" placeholder="Find something good" aria-label="Search products" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
    <div className="results-bar"><span aria-live="polite">{visible.length} {visible.length === 1 ? "essential" : "essentials"}</span><label>Sort by <select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select></label></div>
    {visible.length ? <div className="product-grid">{visible.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="empty-results"><Icon name={unavailable ? "box" : "search"} size={36} /><h3>{unavailable ? "Our collection will be right back." : "No matches. A fresh start?"}</h3><p>{unavailable ? "We couldn’t reach the product catalog. Please try again in a moment." : "Try another search or explore all our essentials."}</p>{unavailable ? <button onClick={() => window.location.reload()} className="button primary">Try again <Icon name="arrow" size={18} /></button> : <button className="button primary" onClick={() => { setQuery(""); setCategory("all"); }}>Clear filters</button>}</div>}
  </section>;
}
