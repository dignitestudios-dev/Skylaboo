import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import YellowGlow from "@/components/common/YellowGlow";

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
    <html lang="en">
      <body className={`antialiased flex justify-center overflow-x-hidden`}>
        <main className="w-full">
          {/* Yellow Glow */}
          <div className="relative -top-[500px] left-[20%] blur-2xl">
            <YellowGlow />
          </div>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
