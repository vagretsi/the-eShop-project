import type { Metadata } from "next";
import CartSidebar from "@/components/CartSidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Ultimate Store — Everyday, elevated",
  description: "Explore clothing, jewelry, and tech essentials. Good finds for the way you dress, work, and live.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><CartSidebar />{children}</body></html>;
}
