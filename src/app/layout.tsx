import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
