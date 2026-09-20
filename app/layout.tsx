import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
    default: "MedicSim | Clinical OSCE Assessment & Patient Simulation",
    template: "%s | MedicSim",
  },

  description:
    "MedicSim is an AI-powered clinical simulation platform for OSCE practice, clinical assessments, and realistic patient simulation.",

  keywords: [
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
    title: "MedicSim | Clinical OSCE Assessment & Patient Simulation",
    description:
      "AI-powered clinical simulation for OSCE practice, clinical assessments, and realistic patient simulation.",
    url: "https://medicsim.vercel.app",
    siteName: "MedicSim",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MedicSim | Clinical OSCE Assessment & Patient Simulation",
    description:
      "AI-powered clinical simulation for OSCE practice, clinical assessments, and realistic patient simulation.",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicon.ico", sizes: "180x180", type: "image/x-icon" },
    ],
    shortcut: ["/favicon.ico"],
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
      <body className="min-h-full flex flex-col bg-[#070a12] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}