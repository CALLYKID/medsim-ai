import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://medicsim.vercel.app"),

  title: {
    default: "MedicSim | The Advanced AI OSCE Simulator & Patient Simulation",
    template: "%s | MedicSim",
  },

  description:
    "MedicSim is an interactive AI OSCE simulator designed for medical students to practice history-taking, communication, and clinical reasoning with realistic virtual patients.",

  applicationName: "MedicSim",

  keywords: [
    "AI OSCE simulator", // Added exact broad search phrase at the top
    "OSCE simulator AI",
    "OSCE practice",
    "OSCE simulator",
    "clinical simulation",
    "medical simulation",
    "clinical assessment",
    "patient simulation",
    "AI patient simulation",
    "medical training",
    "OSCE preparation",
  ],

  authors: [{ name: "Leonard Daramola" }],
  creator: "MedicSim",
  publisher: "MedicSim",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://medicsim.vercel.app",
  },

  verification: {
    google: "pbW7l_nCjL1D0HqGCBQx2sQA8LFbFrwpe-PhHa2mnd0",
  },

  openGraph: {
    title: "MedicSim | Next-Gen AI OSCE Simulator",
    description:
      "Practice clinical history-taking and diagnostic reasoning inside an interactive AI OSCE simulator featuring dynamic virtual patients.",
    url: "https://medicsim.vercel.app",
    siteName: "MedicSim",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MedicSim | AI OSCE Simulator & Clinical Simulation",
    description:
      "Interactive AI clinical simulation for medical students to practice OSCE exam scenarios.",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--text)]">
        <ThemeProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}