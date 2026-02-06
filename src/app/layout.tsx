import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clinton & Co Advisors | Justice & Recovery from Offshore Casino Abuse",
  description: "Specialist legal support for UK victims of offshore casino abuse. We help self-excluded players reclaim funds from Curaçao-licensed operators.",
  keywords: ["casino refund", "curacao casino", "gamstop bypass", "offshore gambling support", "clinton and co"],
};

import FloatingCTA from "@/components/FloatingCTA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-accent/20 selection:text-primary`}
      >
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
