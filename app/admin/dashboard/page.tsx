"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, LogOut, Star, Trash2, FileText, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import UnsplashImageSearch from "@/components/unsplash-image-search"
import Image from "next/image"

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
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
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
  })
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  // Check if logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/admin")
    } else {
      setIsLoading(false)
    }

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
      localStorage.setItem("bookReviews", JSON.stringify(defaultReviews))
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
          imageUrl: "/placeholder.svg?height=400&width=600&text=Book+Tour",
        },
        {
          id: "2",
          title: "Behind the Cover Design",
          content:
            "The cover of 'Life in Instalments' holds special significance to me, and I wanted to share the story behind its creation. \n\nWorking with the talented designer Maria Rodriguez, we sought to capture the essence of the book's themes: the fragments of life that eventually form a complete picture. \n\nThe golden threads represent the connections that both bind us and ultimately free us when we learn to understand them. The dark background symbolizes the journey through difficult times, while the emerging light illustrates the transformation that comes through self-discovery. \n\nMany readers have asked about the symbolism, and I'm touched by how deeply the visual elements have resonated alongside the written words.",
          excerpt: "Discover the symbolism and creative process behind the striking cover of Life in Instalments.",
          date: "2025-02-25T12:00:00.000Z",
          imageUrl: "/placeholder.svg?height=400&width=600&text=Cover+Design",
        },
        {
          id: "3",
          title: "Reader Stories",
          content:
            "Since the release of 'Life in Instalments', I've been deeply moved by the personal stories readers have shared with me. \n\nMany have written to tell me how they found their own experiences reflected in the pages, and how the book has helped them process their own journeys of healing and transformation. \n\nOne reader from Seattle wrote: 'Your words gave me permission to acknowledge my own struggles and see them as part of a larger journey toward wholeness.' \n\nAnother from Miami shared: 'I've carried your book with me for weeks, returning to certain passages that feel like they were written directly to me.' \n\nThese connections are why I write, and I'm grateful to everyone who has reached out to share how the book has touched their lives.",
          excerpt: "Heartfelt responses from readers who found their own stories reflected in the pages of the book.",
          date: "2025-01-15T12:00:00.000Z",
          imageUrl: "/placeholder.svg?height=400&width=600&text=Reader+Stories",
        },
      ]
      setBlogPosts(defaultBlogPosts)
      localStorage.setItem("bookBlogPosts", JSON.stringify(defaultBlogPosts))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/admin")
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
  }

  const handleDeleteReview = (id: string) => {
    const updatedReviews = reviews.filter((review) => review.id !== id)
    setReviews(updatedReviews)
    localStorage.setItem("bookReviews", JSON.stringify(updatedReviews))
  }

  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewBlogPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddBlogPost = (e: React.FormEvent) => {
    e.preventDefault()

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
    })

    // Show success message
    setSuccessMessage("Blog post added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleDeleteBlogPost = (id: string) => {
    const updatedBlogPosts = blogPosts.filter((post) => post.id !== id)
    setBlogPosts(updatedBlogPosts)
    localStorage.setItem("bookBlogPosts", JSON.stringify(updatedBlogPosts))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gold">Loading...</p>
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

        <Tabs defaultValue="add-review" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="add-review" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Add Review
            </TabsTrigger>
            <TabsTrigger value="manage-reviews" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Manage Reviews ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="manage-blog" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Manage Blog ({blogPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add-review">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Add New Review</CardTitle>
                <CardDescription>Add a new customer review to display on the website</CardDescription>
              </CardHeader>
              <CardContent>
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-900/30 border border-green-800 text-green-300 text-sm rounded-md">
                    {successMessage}
                  </div>
                )}
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
          </TabsContent>

          <TabsContent value="manage-reviews">
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
                      <p className="text-xs text-gray-500 mt-2">Added: {new Date(review.date).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="manage-blog">
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Add New Blog Post</CardTitle>
                <CardDescription>Add a new blog post to display on the website</CardDescription>
              </CardHeader>
              <CardContent>
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-900/30 border border-green-800 text-green-300 text-sm rounded-md">
                    {successMessage}
                  </div>
                )}
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
                        onSelectImage={(url: any) => setNewBlogPost((prev) => ({ ...prev, imageUrl: url }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Blog Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={newBlogPost.content}
                      onChange={handleBlogInputChange}
                      className="bg-gray-800 border-gray-700 focus:border-gold min-h-[200px]"
                      required
                    />
                    <p className="text-xs text-gray-400">
                      Use line breaks for paragraphs. Basic formatting will be applied automatically.
                    </p>
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
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
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
        </Tabs>
      </div>
    </div>
  )
}

