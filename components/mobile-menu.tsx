"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

interface MobileMenuProps {
  activeSection: string
  scrollToSection: (id: string) => void
}

export default function MobileMenu({ activeSection, scrollToSection }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)

    // Animate menu opening/closing
    if (!isOpen) {
      document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
      gsap.fromTo(
        ".mobile-menu-content",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      )
    } else {
      document.body.style.overflow = "" // Re-enable scrolling
    }
  }

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setIsOpen(false)
    document.body.style.overflow = "" // Re-enable scrolling
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="sm" className="text-gold" onClick={toggleMenu}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="mobile-menu-content flex flex-col items-center gap-8 p-8">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "author", label: "Author" },
              { id: "purchase", label: "Purchase" },
              { id: "reviews", label: "Reviews" },
              { id: "blog", label: "Blog" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`text-2xl font-serif hover:text-gold transition-colors ${
                  activeSection === item.id ? "text-gold" : "text-white"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.id)
                }}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="mt-4 border-gold text-gold hover:bg-gold hover:text-black rounded-none"
              onClick={() => handleNavClick("contact")}
            >
              Subscribe
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

