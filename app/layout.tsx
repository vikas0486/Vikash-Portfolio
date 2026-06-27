import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Vikash Jaiswal — Principal DevOps & Platform Engineering Leader",
  description:
    "16+ years engineering enterprise-scale cloud platforms, Kubernetes infrastructure, and AI agent operating systems across 7 global regions.",
  keywords: [
    "DevOps Engineer",
    "Platform Engineering",
    "AWS Architect",
    "Kubernetes",
    "Terraform",
    "GenAI",
    "AI Systems",
    "SRE",
  ],
  authors: [{ name: "Vikash Jaiswal" }],
  openGraph: {
    title: "Vikash Jaiswal — Principal DevOps & Platform Engineering Leader",
    description:
      "16+ years engineering enterprise-scale cloud platforms, Kubernetes infrastructure, and AI agent operating systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">{children}</body>
    </html>
  );
}
