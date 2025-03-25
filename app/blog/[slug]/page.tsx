"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AnimatedDivider from "@/components/animated-divider"
import BlogContent from "@/components/blog/blog-content"
import BlogNavigation from "@/components/blog/blog-navigation"
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [prevPost, setPrevPost] = useState<{ id: string; title: string } | null>(null)
  const [nextPost, setNextPost] = useState<{ id: string; title: string } | null>(null)
  const [recentPosts, setRecentPosts] = useState<{ id: string; title: string; date: string }[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Load blog posts from localStorage
    const storedBlogPosts = localStorage.getItem("bookBlogPosts")
    if (storedBlogPosts) {
      try {
        const posts = JSON.parse(storedBlogPosts) as BlogPost[]
        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        // Find current post
        const currentPostIndex = posts.findIndex((p) => p.id === params.slug)

        if (currentPostIndex !== -1) {
          setBlogPost(posts[currentPostIndex])

          // Set previous and next posts
          if (currentPostIndex > 0) {
            setNextPost({
              id: posts[currentPostIndex - 1].id,
              title: posts[currentPostIndex - 1].title,
            })
          }

          if (currentPostIndex < posts.length - 1) {
            setPrevPost({
              id: posts[currentPostIndex + 1].id,
              title: posts[currentPostIndex + 1].title,
            })
          }

          // Set recent posts (excluding current)
          setRecentPosts(
            posts
              .filter((p) => p.id !== params.slug)
              .slice(0, 5)
              .map((p) => ({ id: p.id, title: p.title, date: p.date })),
          )

          // Extract unique categories
          const allCategories = posts.map((post) => post.category).filter((category): category is string => !!category)
          setCategories([...new Set(allCategories)])
        } else {
          // Post not found, redirect to blog list
          router.push("/blog")
        }
      } catch (error) {
        console.error("Error parsing blog posts:", error)
        router.push("/blog")
      }
    } else {
      // No posts found, redirect to blog list
      router.push("/blog")
    }

    setIsLoading(false)
  }, [params.slug, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gold">Loading...</p>
      </div>
    )
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gold">Blog post not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        <Link href="/blog" className="text-gold hover:text-gold/80 flex items-center gap-2 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <article>
              {blogPost.category && (
                <div className="mb-4">
                  <Link
                    href={`/blog?category=${encodeURIComponent(blogPost.category)}`}
                    className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm hover:bg-gold/30 transition-colors"
                  >
                    {blogPost.category}
                  </Link>
                </div>
              )}

              {blogPost.imageUrl && (
                <div className="my-8 relative h-[300px] md:h-[400px] w-full">
                  <Image
                    src={blogPost.imageUrl || "/placeholder.svg"}
                    alt={blogPost.title}
                    fill
                    className="object-cover rounded-md"
                  />
                  {blogPost.imageUrl.includes("unsplash.com") && (
                    <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded-tl-md">
                      Photo from Unsplash
                    </div>
                  )}
                </div>
              )}

              <AnimatedDivider />

              <BlogContent post={blogPost} />

              <BlogNavigation prevPost={prevPost} nextPost={nextPost} />
            </article>
          </div>

          <div className="md:col-span-1">
            <BlogSidebar recentPosts={recentPosts} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}

