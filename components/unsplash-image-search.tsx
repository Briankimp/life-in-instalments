"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UnsplashImage {
  id: string
  urls: {
    regular: string
    small: string
  }
  alt_description: string
  user: {
    name: string
  }
}

interface UnsplashImageSearchProps {
  onSelectImage: (imageUrl: string) => void
}

export default function UnsplashImageSearch({ onSelectImage }: UnsplashImageSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [images, setImages] = useState<UnsplashImage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Simulated Unsplash images for demonstration
  const simulatedImages: UnsplashImage[] = [
    {
      id: "1",
      urls: {
        regular: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400",
      },
      alt_description: "Open book with pages",
      user: { name: "Susan Yin" },
    },
    {
      id: "2",
      urls: {
        regular: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400",
      },
      alt_description: "Woman writing in journal",
      user: { name: "Thought Catalog" },
    },
    {
      id: "3",
      urls: {
        regular: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400",
      },
      alt_description: "Stack of books with reading glasses",
      user: { name: "Kimberly Farmer" },
    },
    {
      id: "4",
      urls: {
        regular: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400",
      },
      alt_description: "Person writing in notebook",
      user: { name: "Thought Catalog" },
    },
    {
      id: "5",
      urls: {
        regular: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=400",
      },
      alt_description: "Typewriter with paper",
      user: { name: "Florian Klauer" },
    },
    {
      id: "6",
      urls: {
        regular: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=400",
      },
      alt_description: "Open book with coffee",
      user: { name: "Sincerely Media" },
    },
  ]

  // More categories of images
  const bookTourImages: UnsplashImage[] = [
    {
      id: "7",
      urls: {
        regular: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400",
      },
      alt_description: "People at book signing event",
      user: { name: "Edwin Andrade" },
    },
    {
      id: "8",
      urls: {
        regular: "https://images.unsplash.com/photo-1560523159-4a9692d222f8?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1560523159-4a9692d222f8?q=80&w=400",
      },
      alt_description: "Microphone on stage",
      user: { name: "Kane Reinholdtsen" },
    },
  ]

  const authorImages: UnsplashImage[] = [
    {
      id: "9",
      urls: {
        regular: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400",
      },
      alt_description: "Woman writing at desk",
      user: { name: "Thought Catalog" },
    },
    {
      id: "10",
      urls: {
        regular: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000",
        small: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=400",
      },
      alt_description: "Woman with laptop",
      user: { name: "Tim Gouw" },
    },
  ]

  const searchImages = () => {
    setLoading(true)
    setError("")

    // Simulate API call with timeout
    setTimeout(() => {
      try {
        let results: UnsplashImage[] = []
        const query = searchQuery.toLowerCase()

        if (query.includes("book") || query.includes("read")) {
          results = [...simulatedImages]
        } else if (query.includes("tour") || query.includes("event") || query.includes("signing")) {
          results = [...bookTourImages]
        } else if (query.includes("author") || query.includes("writer")) {
          results = [...authorImages]
        } else if (query === "") {
          // Show popular images for empty search
          results = [...simulatedImages.slice(0, 3), ...bookTourImages.slice(0, 1), ...authorImages.slice(0, 2)]
        } else {
          // For any other search, show a mix
          results = [simulatedImages[0], bookTourImages[0], authorImages[0], simulatedImages[2]]
        }

        setImages(results)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch images. Please try again.")
        setLoading(false)
      }
    }, 800) // Simulate network delay
  }

  // Initial popular images on mount
  useEffect(() => {
    searchImages()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchImages()
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for images (e.g., books, writing, author)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 border-gray-700 focus:border-gold"
        />
        <Button type="submit" className="bg-gold hover:bg-gold/80 text-black">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-video bg-gray-800 rounded-md overflow-hidden cursor-pointer group"
            onClick={() => onSelectImage(image.urls.regular)}
          >
            <Image
              src={image.urls.small || "/placeholder.svg"}
              alt={image.alt_description || "Unsplash image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="outline" size="sm" className="bg-black/50 border-gold/50 text-white">
                  Select
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-[10px] text-gray-300">
              Photo by {image.user.name} on Unsplash
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-8 text-gray-400">No images found. Try a different search term.</div>
      )}

      <p className="text-xs text-gray-500 mt-2">
        Images from Unsplash. Please respect the photographers' copyright and attribution requirements.
      </p>
    </div>
  )
}

