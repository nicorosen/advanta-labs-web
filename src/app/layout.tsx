import type { Metadata } from "next";
import { Figtree, Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-fragment-mono",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Advanta Labs - AI Enabler for Corporations",
  description:
    "Advanta Labs brings intelligent automation to modern businesses. AI strategy, workflow automation, and custom AI solutions.",
  openGraph: {
    title: "Advanta Labs - AI Enabler for Corporations",
    description:
      "Advanta Labs brings intelligent automation to modern businesses. AI strategy, workflow automation, and custom AI solutions.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${inter.variable} ${fragmentMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
