"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface FloatingElementProps {
  children: React.ReactNode
  amplitude?: number
  duration?: number
}

export default function FloatingElement({ children, amplitude = 5, duration = 3 }: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Create floating animation
    gsap.to(elementRef.current, {
      y: amplitude,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      gsap.killTweensOf(elementRef.current)
    }
  }, [amplitude, duration])

  return <div ref={elementRef}>{children}</div>
}

