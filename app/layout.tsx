import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Life in Instalments by Danielle Sartorelli",
  description: "A true story of struggle, resilience, and personal transformation by Danielle Sartorelli.",
  keywords: "Life in Instalments, Danielle Sartorelli, memoir, book, true story, resilience, transformation",
  openGraph: {
    title: "Life in Instalments by Danielle Sartorelli",
    description: "A true story of struggle, resilience, and personal transformation by Danielle Sartorelli.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/life%20intsllamnst.jpg-PaWhNjesxiciN2QwwTdsEDblxf701m.jpeg",
        width: 1200,
        height: 630,
        alt: "Life in Instalments Book Cover",
      },
    ],
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <ScrollToTop />
        </ThemeProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}

import './globals.css'