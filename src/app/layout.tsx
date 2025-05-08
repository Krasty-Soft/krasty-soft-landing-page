import type { Metadata } from "next";
import { ttRuns } from '@/lib/fonts'
import "./globals.css";
import { Footer, Header } from "@/components";

export const metadata: Metadata = {
  title: "Krasty Soft",
  description: "Software company you can trust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased xs:text-sm md:text-lg ${ttRuns.variable}`}
      >
        <Header />
        <main className="flex-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
