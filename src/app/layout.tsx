import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Work365 | İşlerin İş Kısmını Daha İyi Yapın",
  description: "Kurucular için hepsi bir arada finansal platform. ABD'de şirketinizi kurun, muhasebenizi ve vergilerinizi yönetin.",
  icons: {
    icon: "/logo-sekil.svg",
    shortcut: "/logo-sekil.svg",
    apple: "/logo-sekil.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased bg-Work365-bg text-Work365-text`}>
        {children}
      </body>
    </html>
  );
}
