import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant } from "next/font/google";
import { AuthProvider } from "@/lib/auth/context";
import { AuthModal } from "@/components/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif — carries the brand's editorial "travel journal" voice
// (headlines, wordmark, section titles). Geist Sans stays the UI/body
// workhorse; Geist Mono is reserved for eyebrows and index numerals.
// See globals.css for the --font-display mapping.
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "LORE — Go somewhere worth remembering",
  description:
    "Search, book, and remember your next trip. LORE is a flight booking platform built for discovery and trust.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
