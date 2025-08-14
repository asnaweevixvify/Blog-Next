"use client"

import { Geist, Geist_Mono,Kanit } from "next/font/google";
import "./globals.css";
import Nav from "./nav/page";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '600'],  
  variable: '--font-kanit', 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${kanit.className}`}>
        <SessionProvider>
          <Nav/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
