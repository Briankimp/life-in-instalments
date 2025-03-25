"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ShoppingCart } from "lucide-react"

interface PurchaseLink {
  id: string
  title: string
  description: string
  url: string
  logoUrl?: string
}

export default function AdminPurchaseLinks() {
  const [links, setLinks] = useState<PurchaseLink[]>([])
  const [newLink, setNewLink] = useState<Omit<PurchaseLink, "id">>({
    title: "",
    description: "",
    url: "",
    logoUrl: "",
  })
  const [successMessage, setSuccessMessage] = useState("")

  // Load purchase links from localStorage
  useEffect(() => {
    const storedLinks = localStorage.getItem("bookPurchaseLinks")
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks))
    } else {
      // Initialize with default links if none exist
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
      localStorage.setItem("bookPurchaseLinks", JSON.stringify(defaultLinks))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewLink((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new purchase link
    const link: PurchaseLink = {
      id: Date.now().toString(),
      ...newLink,
    }

    // Add to links array
    const updatedLinks = [...links, link]
    setLinks(updatedLinks)

    // Save to localStorage
    localStorage.setItem("bookPurchaseLinks", JSON.stringify(updatedLinks))

    // Reset form
    setNewLink({
      title: "",
      description: "",
      url: "",
      logoUrl: "",
    })

    // Show success message
    setSuccessMessage("Purchase link added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleDeleteLink = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id)
    setLinks(updatedLinks)
    localStorage.setItem("bookPurchaseLinks", JSON.stringify(updatedLinks))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Add Purchase Link</CardTitle>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/30 border border-green-800 text-green-300 text-sm rounded-md">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleAddLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Store/Retailer Name</Label>
              <Input
                id="title"
                name="title"
                value={newLink.title}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 focus:border-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={newLink.description}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 focus:border-gold"
                required
                placeholder="e.g., Available in hardcover and paperback"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Purchase URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={newLink.url}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 focus:border-gold"
                required
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL (optional)</Label>
              <Input
                id="logoUrl"
                name="logoUrl"
                value={newLink.logoUrl}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 focus:border-gold"
                placeholder="/placeholder.svg?height=80&width=80"
              />
            </div>

            <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-black">
              Add Purchase Link
            </Button>
          </form>
        </CardContent>
      </Card>

      <h3 className="text-xl font-serif mt-6 mb-4">Existing Purchase Links</h3>
      <div className="space-y-4">
        {links.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <p className="text-center text-gray-400">No purchase links found</p>
            </CardContent>
          </Card>
        ) : (
          links.map((link) => (
            <Card key={link.id} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-gold" />
                      <h3 className="font-serif text-lg">{link.title}</h3>
                    </div>
                    <p className="text-gray-300 mt-2">{link.description}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold text-sm hover:underline mt-1 inline-block"
                    >
                      {link.url}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

