import type { Metadata } from "next";
import "./globals.css";
import SiteDock from "@/components/ui/SiteDock";
import SiteFooter from "@/components/ui/SiteFooter";
import CookieConsent from "@/components/ui/CookieConsent";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <SiteFooter />
        <SiteDock />
        <CookieConsent />
      </body>
    </html>
  );
}
