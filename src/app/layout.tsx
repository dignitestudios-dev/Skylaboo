import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import StoreProvider from "@/components/providers/StoreProvider";
import CartSlider from "@/components/cart/CartSlider";
import ToastProvider from "@/components/providers/ToastProvider";
import { ScrollToTop } from "@/components/global/ScrollToTop";

export const metadata: Metadata = {
  title: "Skylaboo",
  description:
    "Explore the second iteration of Women Summer 2025, highlighted by collaborations with PUMA and AKILA.",
  icons: {
    icon: "/images/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`antialiased flex justify-center overflow-x-hidden`}>
        {/* Prevent by default behavior of not scroll to top on page change */}
        {/* <ScrollToTop /> */}
        {/* Redux store provider start */}
        <StoreProvider>
          <ToastProvider />
          <main className="w-full">
            {/* Yellow Glow */}
            <div className="absolute z-10 w-full flex justify-center items-center">
              <div className="min-[1150px]:-mt-[440px] -mt-[200px] w-[70%] min-[1150px]:h-[605px] h-[300px] bg-[var(--color-yellow)]/20 rounded-full blur-3xl" />
            </div>

            {/* Cart Slider */}
            <CartSlider />

            {/* Pages */}
            {children}
          </main>
        </StoreProvider>
        {/* Redux store provider end */}
      </body>
    </html>
  );
}
