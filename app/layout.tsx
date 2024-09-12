import type { Metadata } from "next";
import "./globals.css";
import {Lato} from "next/font/google"
import Navbar from "@/components/Navbar";

const lato = Lato({subsets: ["latin"], weight: ["100", "300", "400", "700", "900"]});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased bg-[#F3F3F5]`}
      >
        <Navbar />
        <div className="px-3 md:px-6 max-w-[1400px] mx-auto">{children}</div>
        
      </body>
    </html>
  );
}
