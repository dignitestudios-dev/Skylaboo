import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import YellowGlow from "@/components/common/YellowGlow";
import StoreProvider from "@/components/providers/StoreProvider";
import CartSlider from "@/components/cart/CartSlider";
import ToastProvider from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Skylaboo",
  description:
    "Explore the second iteration of Women Summer 2025, highlighted by collaborations with PUMA and AKILA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`antialiased flex justify-center overflow-x-hidden`}>
        {/* Redux store provider start */}
        <StoreProvider>
          <ToastProvider />
          <main className="w-full">
            {/* Yellow Glow */}
            <div className="absolute z-10 w-full flex justify-center items-center">
              <div className="min-[1150px]:-mt-[440px] -mt-[200px] w-[70%] min-[1150px]:h-[605px] h-[300px] bg-[var(--color-yellow)]/20 rounded-full blur-3xl" />
            </div>

            {/* Common navigation bar */}
            <Navbar />

            {/* Cart Slider */}
            <CartSlider />

            {/* Pages */}
            {children}

            {/* Common footer */}
            <Footer />
          </main>
        </StoreProvider>
        {/* Redux store provider end */}
      </body>
    </html>
  );
}
