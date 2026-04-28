import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beyond Belief BPO — Deriving Futures",
  description:
    "Beyond Belief BPO transcends expectations and redefines industry standards with unwavering commitment to excellence, innovation, and client satisfaction. Officially registered in the USA as BB Medical Supplies LLC.",
  keywords: [
    "BPO",
    "Business Process Outsourcing",
    "Customer Service",
    "Chat Support",
    "Medical Supplies",
    "Karachi",
    "Pakistan",
    "USA",
  ],
  openGraph: {
    title: "Beyond Belief BPO — Deriving Futures",
    description:
      "We transcend expectations and redefine industry standards. BPO services + BB Medical Supplies LLC, USA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable}`}>
      <body className="grain min-h-screen">{children}</body>
    </html>
  );
}
