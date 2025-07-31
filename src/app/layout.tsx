import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/components/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pitch Writer - AI-Powered Pitch Generation",
  description: "Create compelling pitches with AI assistance. Interactive questionnaire, real-time generation, and professional output.",
  keywords: "pitch writer, AI, startup pitch, business pitch, pitch deck, AI writing",
  authors: [{ name: "Pitch Writer Team" }],
  openGraph: {
    title: "Pitch Writer - AI-Powered Pitch Generation",
    description: "Create compelling pitches with AI assistance",
    type: "website",
    url: "https://pitch-writer.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pitch Writer - AI-Powered Pitch Generation",
    description: "Create compelling pitches with AI assistance",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}