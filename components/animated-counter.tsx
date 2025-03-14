"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  title: string
}

export default function AnimatedCounter({ end, duration = 2, prefix = "", suffix = "", title }: AnimatedCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!counterRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: counterRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(
            {},
            {
              duration: duration,
              onUpdate: () => {
                const progress = gsap.getProperty({}, "progress") as number
                setCount(Math.round(progress * end))
              },
            },
          )
        },
        once: true,
      })
    })

    return () => ctx.revert()
  }, [end, duration])

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl md:text-5xl font-serif text-gold mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-lg text-gray-300">{title}</div>
    </div>
  )
}

