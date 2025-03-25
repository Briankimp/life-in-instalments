"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PurchaseLink {
  id: string
  title: string
  description: string
  url: string
  logoUrl?: string
}

export default function PurchaseLinksDisplay() {
  const [links, setLinks] = useState<PurchaseLink[]>([])

  // Load purchase links from localStorage
  useEffect(() => {
    const storedLinks = localStorage.getItem("bookPurchaseLinks")
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks))
    } else {
      // Default links if none exist
      const defaultLinks = [
        {
          id: "1",
          title: "Amazon",
          description: "Available in hardcover, paperback, and Kindle editions",
          url: "https://amazon.com",
          logoUrl: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "2",
          title: "Barnes & Noble",
          description: "Available in hardcover, paperback, and Nook editions",
          url: "https://barnesandnoble.com",
          logoUrl: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "3",
          title: "Indie Bookstores",
          description: "Support your local bookstore and get a signed copy",
          url: "https://indiebound.org",
          logoUrl: "/placeholder.svg?height=80&width=80",
        },
      ]
      setLinks(defaultLinks)
    }
  }, [])

  if (links.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No purchase links available at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {links.map((link) => (
        <div
          key={link.id}
          className="purchase-card bg-gray-900 p-8 rounded-md flex flex-col items-center text-center hover:bg-gray-800 transition-colors group"
        >
          <Image
            src={link.logoUrl || "/placeholder.svg?height=80&width=80"}
            alt={link.title}
            width={80}
            height={80}
            className="mb-4"
          />
          <h3 className="text-xl font-serif mb-2">{link.title}</h3>
          <p className="text-gray-400 mb-4">{link.description}</p>
          <Button
            className="bg-gold hover:bg-gold/80 text-black rounded-none w-full group-hover:scale-110 transition-transform"
            onClick={() => window.open(link.url, "_blank")}
          >
            Buy Now
          </Button>
        </div>
      ))}
    </div>
  )
}

