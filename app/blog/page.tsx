"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AnimatedDivider from "@/components/animated-divider"
import BlogCard from "@/components/blog/blog-card"
import BlogSidebar from "@/components/blog/blog-sidebar"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  author?: string
  imageUrl?: string
  category?: string
}

export default function BlogListPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const searchParams = useSearchParams()

  const categoryFilter = searchParams?.get("category")
  const searchQuery = searchParams?.get("search")

  useEffect(() => {
    // Load blog posts from localStorage
    const storedBlogPosts = localStorage.getItem("bookBlogPosts")
    if (storedBlogPosts) {
      try {
        const posts = JSON.parse(storedBlogPosts) as BlogPost[]
        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setBlogPosts(posts)

        // Extract unique categories
        const allCategories = posts.map((post) => post.category).filter((category): category is string => !!category)
        setCategories([...new Set(allCategories)])
      } catch (error) {
        console.error("Error parsing blog posts:", error)
      }
    }

    setIsLoading(false)
  }, [])

  // Filter posts based on search params
  useEffect(() => {
    let filtered = [...blogPosts]

    if (categoryFilter) {
      filtered = filtered.filter((post) => post.category === categoryFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          (post.author && post.author.toLowerCase().includes(query)),
      )
    }

    setFilteredPosts(filtered)
  }, [blogPosts, categoryFilter, searchQuery])

  const handleSearch = (query: string) => {
    window.location.href = `/blog?search=${encodeURIComponent(query)}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gold">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        <Link href="/" className="text-gold hover:text-gold/80 flex items-center gap-2 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-5xl font-serif mb-8 text-center">
          The <span className="text-gold">Blog</span>
        </h1>

        <AnimatedDivider />

        {searchQuery && (
          <div className="max-w-4xl mx-auto mt-8 mb-8 p-4 bg-gray-900/50 border border-gray-800 rounded-md">
            <p className="text-center">
              Search results for: <span className="text-gold font-medium">"{searchQuery}"</span>
              {filteredPosts.length === 0 ? (
                <span className="block mt-2 text-gray-400">No posts found</span>
              ) : (
                <span className="block mt-2 text-gray-400">Found {filteredPosts.length} post(s)</span>
              )}
            </p>
          </div>
        )}

        {categoryFilter && (
          <div className="max-w-4xl mx-auto mt-8 mb-8 p-4 bg-gray-900/50 border border-gray-800 rounded-md">
            <p className="text-center">
              Category: <span className="text-gold font-medium">"{categoryFilter}"</span>
              {filteredPosts.length === 0 ? (
                <span className="block mt-2 text-gray-400">No posts found</span>
              ) : (
                <span className="block mt-2 text-gray-400">Found {filteredPosts.length} post(s)</span>
              )}
            </p>
          </div>
        )}

        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {filteredPosts.length === 0 ? (
              <div className="text-center text-gray-400 py-12 bg-gray-900/30 rounded-md border border-gray-800">
                <p>No blog posts found</p>
                {(searchQuery || categoryFilter) && (
                  <Link href="/blog" className="text-gold hover:underline block mt-4">
                    Clear filters and view all posts
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-12">
                {/* Featured post (first post) */}
                <BlogCard post={filteredPosts[0]} featured />

                {/* Rest of the posts in a grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.slice(1).map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <BlogSidebar recentPosts={blogPosts.slice(0, 5)} categories={categories} onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  )
}

