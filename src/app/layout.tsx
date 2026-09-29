import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { EVENT_CONFIG } from "@/lib/config";
import AppShell from "@/components/AppShell";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'] 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'] 
});

const dmMono = DM_Mono({ 
  subsets: ["latin"], 
  variable: '--font-mono',
  weight: ['400', '500'] 
});

export const metadata: Metadata = {
  title: EVENT_CONFIG.seo.title,
  description: EVENT_CONFIG.seo.description,
  keywords: EVENT_CONFIG.seo.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} font-sans min-h-screen flex flex-col bg-[#0F0A1A] text-[#FFF8F0]`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
