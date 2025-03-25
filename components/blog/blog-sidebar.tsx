"use client"

import type React from "react"

import Link from "next/link"
import { Search, Tag, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

interface BlogSidebarProps {
  recentPosts: {
    id: string
    title: string
    date: string
  }[]
  categories?: string[]
  onSearch?: (query: string) => void
}

export default function BlogSidebar({ recentPosts, categories = [], onSearch }: BlogSidebarProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get("search") as string
    if (onSearch) onSearch(query)
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-md p-6">
        <h3 className="text-xl font-serif mb-4 flex items-center">
          <Search className="h-4 w-4 mr-2 text-gold" />
          Search
        </h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            name="search"
            placeholder="Search posts..."
            className="bg-gray-800 border-gray-700 focus:border-gold"
          />
          <Button type="submit" className="bg-gold hover:bg-gold/80 text-black">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-md p-6">
        <h3 className="text-xl font-serif mb-4 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gold" />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="group">
              <Link href={`/blog/${post.id}`} className="block">
                <h4 className="text-sm font-medium group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{formatDate(new Date(post.date))}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-md p-6">
          <h3 className="text-xl font-serif mb-4 flex items-center">
            <Tag className="h-4 w-4 mr-2 text-gold" />
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className="bg-gray-800 hover:bg-gold/20 text-gold px-3 py-1 rounded-full text-sm transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

