"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, LogOut, Star, Trash2, FileText, ImageIcon, Calendar, MapPin, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import UnsplashImageSearch from "@/components/unsplash-image-search"
import Image from "next/image"
import RichTextEditor from "@/components/blog/rich-text-editor"

interface Review {
  id: string
  name: string
  text: string
  rating: number
  location: string
  date: string
}

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  imageUrl?: string
  author?: string
  category?: string
}

interface PurchaseLink {
  id: string
  name: string
  description: string
  imageUrl: string
  link: string
}

interface Event {
  id: string
  title: string
  date: string
  location: string
  description: string
}

interface ThemeImage {
  src: string
  alt: string
  theme: string
  credit?: string
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [purchaseLinks, setPurchaseLinks] = useState<PurchaseLink[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [themeImages, setThemeImages] = useState<ThemeImage[]>([])
  const [newReview, setNewReview] = useState<Omit<Review, "id" | "date">>({
    name: "",
    text: "",
    rating: 5,
    location: "",
  })
  const [newBlogPost, setNewBlogPost] = useState<Omit<BlogPost, "id" | "date">>({
    title: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    author: "",
    category: "",
  })
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: new Date().toISOString(),
    location: "",
    description: "",
  })
  const [newPurchaseLink, setNewPurchaseLink] = useState<Omit<PurchaseLink, "id">>({
    name: "",
    description: "",
    imageUrl: "/placeholder.svg?height=80&width=80",
    link: "",
  })
  const [editingThemeImage, setEditingThemeImage] = useState<ThemeImage | null>(null)
  const [editingThemeIndex, setEditingThemeIndex] = useState<number | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  // Check if logged in
  useEffect(() => {
    try {
      const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
      if (!isLoggedIn) {
        router.push("/admin")
      } else {
        setIsAuthenticated(true)
        loadData()
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      router.push("/admin")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const loadData = () => {
    try {
      // Load reviews from localStorage
      const storedReviews = localStorage.getItem("bookReviews")
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews))
      } else {
        // Initialize with default reviews if none exist
        const defaultReviews = [
          {
            id: "1",
            name: "Sarah Johnson",
            rating: 5,
            text: '"Life in Instalments touched me deeply. Sartorelli\'s raw honesty and beautiful prose create a narrative that is both heartbreaking and ultimately uplifting. A must-read for anyone on their own journey of healing."',
            location: "New York Times",
            date: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Michael Chen",
            rating: 5,
            text: "\"Few memoirs have the power to transform the reader as they follow the author's transformation. This book does exactly that. I couldn't put it down and found myself reflecting on my own life with new perspective.\"",
            location: "Literary Review",
            date: new Date().toISOString(),
          },
          {
            id: "3",
            name: "Emily Rodriguez",
            rating: 5,
            text: '"Danielle Sartorelli writes with such clarity and emotion that you feel as though you\'re walking alongside her through every triumph and setback. A powerful testament to the resilience of the human spirit."',
            location: "Book Club Pick",
            date: new Date().toISOString(),
          },
        ]
        setReviews(defaultReviews)
        try {
          localStorage.setItem("bookReviews", JSON.stringify(defaultReviews))
        } catch (error) {
          console.error("Error saving reviews to localStorage:", error)
        }
      }

      // Load blog posts from localStorage
      const storedBlogPosts = localStorage.getItem("bookBlogPosts")
      if (storedBlogPosts) {
        setBlogPosts(JSON.parse(storedBlogPosts))
      } else {
        // Initialize with default blog posts if none exist
        const defaultBlogPosts = [
          {
            id: "1",
            title: "Book Tour Announcement",
            content:
              "I'm thrilled to announce that I'll be embarking on a nationwide tour to connect with readers and share the journey behind 'Life in Instalments'. \n\nThe tour will begin in New York City on April 15th and continue through major cities across the country. At each stop, I'll be reading excerpts from the book, answering questions, and signing copies. \n\nThis book has been such a personal journey for me, and I'm looking forward to discussing the themes of resilience, transformation, and healing with readers face-to-face. \n\nCheck the Events page for specific dates and venues. I hope to see many of you there!",
            excerpt: "Join Danielle as she embarks on a nationwide tour to connect with readers and share her journey.",
            date: "2025-03-10T12:00:00.000Z",
            imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000",
            author: "Danielle Sartorelli",
            category: "News",
          },
          {
            id: "2",
            title: "Behind the Cover Design",
            content:
              "The cover of 'Life in Instalments' holds special significance to me, and I wanted to share the story behind its creation. \n\nWorking with the talented designer Maria Rodriguez, we sought to capture the essence of the book's themes: the fragments of life that eventually form a complete picture. \n\nThe golden threads represent the connections that both bind us and ultimately free us when we learn to understand them. The dark background symbolizes the journey through difficult times, while the emerging light illustrates the transformation that comes through self-discovery. \n\nMany readers have asked about the symbolism, and I'm touched by how deeply the visual elements have resonated alongside the written words.",
            excerpt: "Discover the symbolism and creative process behind the striking cover of Life in Instalments.",
            date: "2025-02-25T12:00:00.000Z",
            imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000",
            author: "Danielle Sartorelli",
            category: "Behind the Scenes",
          },
          {
            id: "3",
            title: "Reader Stories",
            content:
              "Since the release of 'Life in Instalments', I've been deeply moved by the personal stories readers have shared with me. \n\nMany have written to tell me how they found their own experiences reflected in the pages, and how the book has helped them process their own journeys of healing and transformation. \n\nOne reader from Seattle wrote: 'Your words gave me permission to acknowledge my own struggles and see them as part of a larger journey toward wholeness.' \n\nAnother from Miami shared: 'I've carried your book with me for weeks, returning to certain passages that feel like they were written directly to me.' \n\nThese connections are why I write, and I'm grateful to everyone who has reached out to share how the book has touched their lives.",
            excerpt: "Heartfelt responses from readers who found their own stories reflected in the pages of the book.",
            date: "2025-01-15T12:00:00.000Z",
            imageUrl: "https://images.unsplash.com/photo-1485217988980-11786ced94c5?q=80&w=1000",
            author: "Danielle Sartorelli",
            category: "Reader Feedback",
          },
        ]
        setBlogPosts(defaultBlogPosts)
        try {
          localStorage.setItem("bookBlogPosts", JSON.stringify(defaultBlogPosts))
        } catch (error) {
          console.error("Error saving blog posts to localStorage:", error)
        }
      }

      // Load purchase links from localStorage
      const storedPurchaseLinks = localStorage.getItem("bookPurchaseLinks")
      if (storedPurchaseLinks) {
        setPurchaseLinks(JSON.parse(storedPurchaseLinks))
      } else {
        // Initialize with default purchase links if none exist
        const defaultPurchaseLinks = [
          {
            id: "1",
            name: "Amazon",
            description: "Available in hardcover, paperback, and Kindle editions",
            imageUrl: "/placeholder.svg?height=80&width=80",
            link: "#",
          },
          {
            id: "2",
            name: "Barnes & Noble",
            description: "Available in hardcover, paperback, and Nook editions",
            imageUrl: "/placeholder.svg?height=80&width=80",
            link: "#",
          },
          {
            id: "3",
            name: "Indie Bookstores",
            description: "Support your local bookstore and get a signed copy",
            imageUrl: "/placeholder.svg?height=80&width=80",
            link: "#",
          },
        ]
        setPurchaseLinks(defaultPurchaseLinks)
        try {
          localStorage.setItem("bookPurchaseLinks", JSON.stringify(defaultPurchaseLinks))
        } catch (error) {
          console.error("Error saving purchase links to localStorage:", error)
        }
      }

      // Load events from localStorage
      const storedEvents = localStorage.getItem("bookEvents")
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents))
      } else {
        // Initialize with default events if none exist
        const defaultEvents = [
          {
            id: "1",
            title: "Book Launch Event",
            date: "2025-05-15T18:00:00.000Z",
            location: "Sydney Writers' Festival",
            description:
              "Join us for the official launch of 'Life in Instalments' with a reading and Q&A session with the author.",
          },
          {
            id: "2",
            title: "Author Talk",
            date: "2025-06-10T19:00:00.000Z",
            location: "Melbourne City Library",
            description:
              "Danielle discusses the themes of addiction, family relationships, and resilience in her memoir.",
          },
        ]
        setEvents(defaultEvents)
        try {
          localStorage.setItem("bookEvents", JSON.stringify(defaultEvents))
        } catch (error) {
          console.error("Error saving events to localStorage:", error)
        }
      }

  
    } catch (error) {
      console.error("Error loading data:", error)
      setSuccessMessage("Error loading data. Some features may not work correctly.")
    }
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem("adminLoggedIn")
      router.push("/admin")
    } catch (error) {
      console.error("Error during logout:", error)
      // Force redirect even if localStorage fails
      router.push("/admin")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewReview((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create new review
      const review: Review = {
        id: Date.now().toString(),
        ...newReview,
        date: new Date().toISOString(),
      }

      // Add to reviews array
      const updatedReviews = [...reviews, review]
      setReviews(updatedReviews)

      // Save to localStorage
      localStorage.setItem("bookReviews", JSON.stringify(updatedReviews))

      // Reset form
      setNewReview({
        name: "",
        text: "",
        rating: 5,
        location: "",
      })

      // Show success message
      setSuccessMessage("Review added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error adding review:", error)
      setSuccessMessage("Error adding review. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleDeleteReview = (id: string) => {
    try {
      const updatedReviews = reviews.filter((review) => review.id !== id)
      setReviews(updatedReviews)
      localStorage.setItem("bookReviews", JSON.stringify(updatedReviews))
    } catch (error) {
      console.error("Error deleting review:", error)
      setSuccessMessage("Error deleting review. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewBlogPost((prev) => ({ ...prev, [name]: value }))

    // Auto-generate excerpt from content if it's empty
    if (name === "content" && !newBlogPost.excerpt) {
      const excerpt = value.substring(0, 150).trim() + (value.length > 150 ? "..." : "")
      setNewBlogPost((prev) => ({ ...prev, excerpt }))
    }
  }

  const handleAddBlogPost = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create new blog post
      const blogPost: BlogPost = {
        id: Date.now().toString(),
        ...newBlogPost,
        date: new Date().toISOString(),
      }

      // Add to blog posts array
      const updatedBlogPosts = [...blogPosts, blogPost]
      setBlogPosts(updatedBlogPosts)

      // Save to localStorage
      localStorage.setItem("bookBlogPosts", JSON.stringify(updatedBlogPosts))

      // Reset form
      setNewBlogPost({
        title: "",
        content: "",
        excerpt: "",
        imageUrl: "",
        author: "",
        category: "",
      })

      // Show success message
      setSuccessMessage("Blog post added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error adding blog post:", error)
      setSuccessMessage("Error adding blog post. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleDeleteBlogPost = (id: string) => {
    try {
      const updatedBlogPosts = blogPosts.filter((post) => post.id !== id)
      setBlogPosts(updatedBlogPosts)
      localStorage.setItem("bookBlogPosts", JSON.stringify(updatedBlogPosts))
    } catch (error) {
      console.error("Error deleting blog post:", error)
      setSuccessMessage("Error deleting blog post. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleEventInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create new event
      const event: Event = {
        id: Date.now().toString(),
        ...newEvent,
      }

      // Add to events array
      const updatedEvents = [...events, event]
      setEvents(updatedEvents)

      // Save to localStorage
      localStorage.setItem("bookEvents", JSON.stringify(updatedEvents))

      // Reset form
      setNewEvent({
        title: "",
        date: new Date().toISOString(),
        location: "",
        description: "",
      })

      // Show success message
      setSuccessMessage("Event added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error adding event:", error)
      setSuccessMessage("Error adding event. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleDeleteEvent = (id: string) => {
    try {
      const updatedEvents = events.filter((event) => event.id !== id)
      setEvents(updatedEvents)
      localStorage.setItem("bookEvents", JSON.stringify(updatedEvents))
    } catch (error) {
      console.error("Error deleting event:", error)
      setSuccessMessage("Error deleting event. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handlePurchaseLinkInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewPurchaseLink((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddPurchaseLink = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Create new purchase link
      const purchaseLink: PurchaseLink = {
        id: Date.now().toString(),
        ...newPurchaseLink,
      }

      // Add to purchase links array
      const updatedPurchaseLinks = [...purchaseLinks, purchaseLink]
      setPurchaseLinks(updatedPurchaseLinks)

      // Save to localStorage
      localStorage.setItem("bookPurchaseLinks", JSON.stringify(updatedPurchaseLinks))

      // Reset form
      setNewPurchaseLink({
        name: "",
        description: "",
        imageUrl: "/placeholder.svg?height=80&width=80",
        link: "",
      })

      // Show success message
      setSuccessMessage("Purchase link added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error adding purchase link:", error)
      setSuccessMessage("Error adding purchase link. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleDeletePurchaseLink = (id: string) => {
    try {
      const updatedPurchaseLinks = purchaseLinks.filter((link) => link.id !== id)
      setPurchaseLinks(updatedPurchaseLinks)
      localStorage.setItem("bookPurchaseLinks", JSON.stringify(updatedPurchaseLinks))
    } catch (error) {
      console.error("Error deleting purchase link:", error)
      setSuccessMessage("Error deleting purchase link. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleEditThemeImage = (index: number) => {
    setEditingThemeImage(themeImages[index])
    setEditingThemeIndex(index)
  }

  const handleThemeImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingThemeImage) {
      setEditingThemeImage((prev) => (prev ? { ...prev, [name]: value } : null))
    }
  }

  const handleSaveThemeImage = () => {
    try {
      if (editingThemeImage && editingThemeIndex !== null) {
        const updatedThemeImages = [...themeImages]
        updatedThemeImages[editingThemeIndex] = editingThemeImage
        setThemeImages(updatedThemeImages)
        localStorage.setItem("bookThemeImages", JSON.stringify(updatedThemeImages))
        setEditingThemeImage(null)
        setEditingThemeIndex(null)
        setSuccessMessage("Theme image updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      }
    } catch (error) {
      console.error("Error saving theme image:", error)
      setSuccessMessage("Error saving theme image. Please try again.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gold">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gold mb-4">You need to log in to access this page</p>
          <Button
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-black"
            onClick={() => router.push("/admin")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-gold hover:text-gold/80 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Link>
          <Button
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-black"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <h1 className="text-3xl font-serif mb-8 text-center">
          Admin <span className="text-gold">Dashboard</span>
        </h1>

        <Tabs defaultValue="manage-blog" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="manage-blog" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Blog Posts ({blogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="manage-events" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Events ({events.length})
            </TabsTrigger>
            <TabsTrigger value="manage-reviews" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Reviews ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="manage-purchase" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Purchase Links
            </TabsTrigger>
        
          </TabsList>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/30 border border-green-800 text-green-300 text-sm rounded-md">
              {successMessage}
            </div>
          )}

          {/* Blog Posts Tab */}
          <TabsContent value="manage-blog">
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Add New Blog Post</CardTitle>
                <CardDescription>Add a new blog post to display on the website</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBlogPost} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Blog Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newBlogPost.title}
                      onChange={handleBlogInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      value={newBlogPost.author || ""}
                      onChange={handleBlogInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      placeholder="Leave blank to use default author"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={newBlogPost.category || ""}
                      onChange={handleBlogInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      placeholder="E.g., News, Events, Writing Tips"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Short Excerpt (displayed on homepage)</Label>
                    <Input
                      id="excerpt"
                      name="excerpt"
                      value={newBlogPost.excerpt}
                      onChange={handleBlogInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Blog Image</Label>
                    <div className="flex gap-2 items-center mb-2">
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={newBlogPost.imageUrl}
                        onChange={handleBlogInputChange}
                        className="bg-gray-800 border-gray-700 focus:border-gold"
                        placeholder="Image URL or search below"
                      />
                      {newBlogPost.imageUrl && (
                        <Button
                          type="button"
                          variant="outline"
                          className="border-red-700 text-red-300 hover:bg-red-900/20"
                          onClick={() => setNewBlogPost((prev) => ({ ...prev, imageUrl: "" }))}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    {newBlogPost.imageUrl ? (
                      <div className="relative h-[200px] w-full rounded-md overflow-hidden mb-4">
                        <Image
                          src={newBlogPost.imageUrl || "/placeholder.svg"}
                          alt="Selected blog image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="border border-gray-700 rounded-md p-4 bg-gray-900/50">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <ImageIcon className="h-4 w-4 mr-2 text-gold" />
                        Search Unsplash for Images
                      </h4>
                      <UnsplashImageSearch
                        onSelectImage={(url) => setNewBlogPost((prev) => ({ ...prev, imageUrl: url }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Blog Content</Label>
                    <RichTextEditor
                      value={newBlogPost.content}
                      onChange={(value) => setNewBlogPost((prev) => ({ ...prev, content: value }))}
                      minHeight="300px"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-black">
                    Add Blog Post
                  </Button>
                </form>
              </CardContent>
            </Card>

            <h3 className="text-xl font-serif mb-4">Existing Blog Posts</h3>
            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-400">No blog posts found</p>
                  </CardContent>
                </Card>
              ) : (
                blogPosts.map((post) => (
                  <Card key={post.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gold" />
                            <h3 className="font-serif text-lg">{post.title}</h3>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">
                            {new Date(post.date).toLocaleDateString("en-AU", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            {post.author && <span> · By {post.author}</span>}
                            {post.category && <span className="ml-2 text-gold">#{post.category}</span>}
                          </p>
                          <p className="text-gray-300 mt-2 italic">{post.excerpt}</p>
                          <div className="mt-3 text-sm text-gray-400">
                            {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                          </div>
                          {post.imageUrl && (
                            <p className="text-xs text-gray-500 mt-2 flex items-center">
                              <ImageIcon className="h-3 w-3 mr-1" /> Image included
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 ml-2"
                          onClick={() => handleDeleteBlogPost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="manage-events">
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Add New Event</CardTitle>
                <CardDescription>Add a new event to display on the website</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newEvent.title}
                      onChange={handleEventInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date & Time</Label>
                    <Input
                      id="date"
                      name="date"
                      type="datetime-local"
                      value={newEvent.date.substring(0, 16)}
                      onChange={handleEventInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Event Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newEvent.location}
                      onChange={handleEventInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Event Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newEvent.description}
                      onChange={handleEventInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold min-h-[100px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-black">
                    Add Event
                  </Button>
                </form>
              </CardContent>
            </Card>

            <h3 className="text-xl font-serif mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {events.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-400">No events found</p>
                  </CardContent>
                </Card>
              ) : (
                events.map((event) => (
                  <Card key={event.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gold" />
                            <h3 className="font-serif text-lg">{event.title}</h3>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">
                            {new Date(event.date).toLocaleDateString("en-AU", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                            at{" "}
                            {new Date(event.date).toLocaleTimeString("en-AU", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                          <p className="text-gray-300 mt-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gold/70" /> {event.location}
                          </p>
                          <div className="mt-3 text-sm text-gray-400">
                            {event.description.length > 100
                              ? `${event.description.substring(0, 100)}...`
                              : event.description}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 ml-2"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="manage-reviews">
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Add New Review</CardTitle>
                <CardDescription>Add a new customer review to display on the website</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Reviewer Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newReview.name}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Source/Location (optional)</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newReview.location}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      placeholder="e.g., Goodreads, Amazon, Book Club"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(rating)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={cn(
                              "h-6 w-6 transition-colors",
                              rating <= newReview.rating ? "text-gold fill-gold" : "text-gray-500",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text">Review Text</Label>
                    <Textarea
                      id="text"
                      name="text"
                      value={newReview.text}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold min-h-[150px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-black">
                    Add Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            <h3 className="text-xl font-serif mb-4">Existing Reviews</h3>
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-400">No reviews found</p>
                  </CardContent>
                </Card>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-lg">{review.name}</h3>
                          {review.location && <p className="text-gold text-sm">{review.location}</p>}
                          <div className="flex mt-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn("h-4 w-4", i < review.rating ? "text-gold fill-gold" : "text-gray-500")}
                              />
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-300 italic">{review.text}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Added: {new Date(review.date).toLocaleDateString("en-AU")}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Purchase Links Tab */}
          <TabsContent value="manage-purchase">
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Add New Purchase Link</CardTitle>
                <CardDescription>Add a new place where readers can buy the book</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddPurchaseLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Store/Platform Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newPurchaseLink.name}
                      onChange={handlePurchaseLinkInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newPurchaseLink.description}
                      onChange={handlePurchaseLinkInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      placeholder="e.g., Available in hardcover, paperback, and Kindle editions"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Logo/Image URL</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={newPurchaseLink.imageUrl}
                      onChange={handlePurchaseLinkInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      placeholder="URL to store logo or image"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link">Purchase Link</Label>
                    <Input
                      id="link"
                      name="link"
                      value={newPurchaseLink.link}
                      onChange={handlePurchaseLinkInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold"
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-black">
                    Add Purchase Link
                  </Button>
                </form>
              </CardContent>
            </Card>

            <h3 className="text-xl font-serif mb-4">Existing Purchase Links</h3>
            <div className="space-y-4">
              {purchaseLinks.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-400">No purchase links found</p>
                  </CardContent>
                </Card>
              ) : (
                purchaseLinks.map((link) => (
                  <Card key={link.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 bg-gray-800 rounded-md overflow-hidden">
                            <Image
                              src={link.imageUrl || "/placeholder.svg?height=80&width=80"}
                              alt={link.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-serif text-lg">{link.name}</h3>
                            <p className="text-gray-300 text-sm">{link.description}</p>
                            <a
                              href={link.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold text-xs hover:underline"
                            >
                              {link.link}
                            </a>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => handleDeletePurchaseLink(link.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

       
        </Tabs>

        <div className="mt-8 p-6 bg-gray-900 border border-gray-800 rounded-md">
          <h3 className="text-xl font-serif mb-4">Website Management Guide</h3>
          <div className="space-y-4 text-gray-300">
            <p>
              This admin dashboard allows you to manage all the content on your website. Here's how to use each section:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-gold">Blog Posts:</strong> Add, edit, or delete blog posts that will appear on
                the website. Each post can include an image, title, excerpt, and content.
              </li>
              <li>
                <strong className="text-gold">Events:</strong> Manage upcoming events, book signings, or appearances.
                These will be displayed in the Events section of the website.
              </li>
              <li>
                <strong className="text-gold">Reviews:</strong> Add or remove reader reviews that will be displayed in
                the rotating carousel on the website.
              </li>
              <li>
                <strong className="text-gold">Purchase Links:</strong> Manage where visitors can buy your book. Add
                links to online retailers or bookstores.
              </li>
              <li>
                <strong className="text-gold">Theme Images:</strong> Edit the theme images that appear in the About
                section of the website.
              </li>
            </ul>
            <p>
              All changes are saved automatically and will be immediately visible on the website. If you need to make
              more extensive changes to the website structure or design, please contact your web developer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

