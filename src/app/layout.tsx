import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/ui/SiteHeader";
import SiteFooter from "@/components/ui/SiteFooter";
import CookieConsent from "@/components/ui/CookieConsent";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import SplashCursor from "@/components/react-bits/SplashCursor";

export const metadata: Metadata = {
  title: "Bubhauz - Safe, Premium Baby Essentials",
  description: "Designed with love, engineered for safety.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col">
        <SmoothScrolling>
          <SiteHeader />
          <div className="fixed inset-0 z-50 pointer-events-none">
            <SplashCursor />
          </div>
          {children}
          <SiteFooter />
          <CookieConsent />
        </SmoothScrolling>
      </body>
    </html>
  );
}
