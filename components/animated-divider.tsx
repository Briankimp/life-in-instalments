"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function AnimatedDivider() {
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dividerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dividerRef.current,
        {
          width: "0%",
          opacity: 0,
        },
        {
          width: "100px",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex justify-center my-8">
      <div ref={dividerRef} className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
    </div>
  )
}

