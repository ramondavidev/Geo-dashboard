import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StyledComponentsRegistry } from "./StyledComponentsRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geo-CRUD | Modern User Management",
  description:
    "A modern geo-location user management system built with Next.js, TypeScript, and Firebase",
  keywords: [
    "geo-location",
    "user management",
    "CRUD",
    "Next.js",
    "Firebase",
    "TypeScript",
  ],
  authors: [{ name: "Geo-CRUD Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
