import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bebas_Neue, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import "./globals.css";

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const display = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GTA6Base | GTA 6 News, Database & Leaks",
    template: "%s | GTA6Base",
  },
  description:
    "The GTA 6 database and blog — characters, vehicles, locations, news, and leaks in one place.",
  metadataBase: new URL("https://gta6base.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background font-sans text-foreground">
        <Header />
        <main className="flex-1 overflow-x-hidden pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
