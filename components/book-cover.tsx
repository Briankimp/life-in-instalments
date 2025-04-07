"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"

interface BookCoverProps {
  imageUrl: string
}

export default function BookCover({ imageUrl }: BookCoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const bookRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bookRef.current || !pageRef.current) return

    if (isHovered) {
      gsap.to(pageRef.current, {
        rotationY: -30,
        duration: 1,
        ease: "power3.out",
        transformOrigin: "left center",
      })

      gsap.to(bookRef.current, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      })
    } else {
      gsap.to(pageRef.current, {
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
        transformOrigin: "left center",
      })

      gsap.to(bookRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [isHovered])

  return (
    <div
      ref={bookRef}
      className="relative w-[300px] h-[450px] md:w-[350px] md:h-[525px] shadow-2xl perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book cover */}
      <div className="relative w-full h-full rounded-md overflow-hidden">
        <Image
          src="/bookcover.jpg"
          alt="Life in Instalments Book Cover"
          fill
          className="object-cover rounded-md"
          priority
        />
      </div>

      {/* Page flip effect
      <div
        ref={pageRef}
        className="absolute top-0 right-0 w-[50%] h-full bg-white/10 backdrop-blur-sm rounded-r-md"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? "0 0 15px rgba(212, 175, 55, 0.5)" : "none",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5"></div>
      </div> */}

      {/* Gold glow effect on hover */}
      {isHovered && <div className="absolute -inset-2 bg-gold/20 rounded-lg blur-md z-[-1] animate-pulse"></div>}
    </div>
  )
}

