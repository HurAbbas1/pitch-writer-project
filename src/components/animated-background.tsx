"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  left: string
  top: string
  duration: number
  delay: number
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 0.8, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles - only rendered after hydration */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
    </div>
  )
}
