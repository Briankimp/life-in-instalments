"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click",  (e) => {
        e.preventDefault()

        const targetId = anchor.getAttribute("href")
        if (!targetId) return

        const targetElement = document.querySelector(targetId)
        if (!targetElement) return

        const navHeight = 80 // Approximate height of the fixed navbar
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      })
    })

    // Highlight active section in navigation
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll('nav a[href^="#"]')

    const observerOptions = {
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id")
          navLinks.forEach((link) => {
            link.classList.remove("text-gold")
            if (link.getAttribute("href") === `#${currentId}`) {
              link.classList.add("text-gold")
            }
          })
        }
      })
    }, observerOptions)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", (e) => {})
      })
    }
  }, [])

  return null
}

