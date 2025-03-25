"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedDivider from "@/components/animated-divider"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  imageUrl?: string
}

export default function BlogListPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load blog posts from localStorage
    const storedBlogPosts = localStorage.getItem("bookBlogPosts")
    if (storedBlogPosts) {
      try {
        const posts = JSON.parse(storedBlogPosts) as BlogPost[]
        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setBlogPosts(posts)
      } catch (error) {
        console.error("Error parsing blog posts:", error)
      }
    }

    setIsLoading(false)
  }, [])

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

        <div className="max-w-4xl mx-auto mt-12">
          {blogPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>No blog posts found</p>
            </div>
          ) : (
            <div className="space-y-12">
              {blogPosts.map((post) => (
                <article key={post.id} className="grid md:grid-cols-3 gap-6 border-b border-gray-800 pb-12">
                  {post.imageUrl && (
                    <div className="relative h-[200px] w-full rounded-md overflow-hidden">
                      <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      {post.imageUrl.includes("unsplash.com") && (
                        <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1">
                          Photo from Unsplash
                        </div>
                      )}
                    </div>
                  )}

                  <div className={post.imageUrl ? "md:col-span-2" : "md:col-span-3"}>
                    <p className="text-gold text-sm mb-2">
                      {new Date(post.date).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="text-2xl font-serif mb-3">{post.title}</h2>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.id}`} className="text-gold hover:underline inline-flex items-center">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-black"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

