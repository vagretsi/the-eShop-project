import Navbar from "@/components/NavBar";
import CartSidebar from "@/components/CartSidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartSidebar /> {/* Πάντα διαθέσιμο */}
        {children}
      </body>
    </html>
  );
}