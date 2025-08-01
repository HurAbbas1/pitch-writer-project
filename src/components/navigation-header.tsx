"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sparkles,
  Menu,
  X,
  User
} from "lucide-react"

export function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "Create Pitch" },
    { href: "/examples", label: "Examples" },
    { href: "/pricing", label: "Pricing" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:drop-shadow-lg transition-all">
              Pitch Writer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-muted-foreground hover:text-foreground transition-colors font-medium group"
              >
                <span className="group-hover:underline group-hover:underline-offset-4 group-hover:decoration-primary transition-all">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              size="sm"
              onClick={() => router.push("/chat")}
              className="bg-gradient-to-r from-pink-500 to-purple-700 text-white font-semibold shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <User className="w-4 h-4 mr-2 text-white" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4">
              <ThemeToggle />
              <Button
                size="sm"
                onClick={() => {
                  setIsMenuOpen(false)
                  router.push("/chat")
                }}
                className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-700 text-white font-semibold shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <User className="w-4 h-4 mr-2 text-white" />
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}
