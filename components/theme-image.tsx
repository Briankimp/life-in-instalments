"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ThemeImageProps {
  src: string
  alt: string
  theme: string
  credit?: string
}

export default function ThemeImage({ src, alt, theme, credit }: ThemeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="aspect-square bg-gray-900 rounded-md overflow-hidden relative group">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className={cn("object-cover transition-all duration-500", isLoaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-gold/30 transition-all duration-300"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
        <p className="text-white text-center px-4 font-serif text-xl">{theme}</p>
      </div>
      {credit && <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1">{credit}</div>}
    </div>
  )
}

