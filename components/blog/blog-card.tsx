import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface BlogCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    content: string
    date: string
    author?: string
    imageUrl?: string
    category?: string
  }
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group overflow-hidden ${
        featured
          ? "grid md:grid-cols-2 gap-8 border-b border-gray-800 pb-12"
          : "border border-gray-800 hover:border-gold/50 transition-colors transform hover:scale-105 transition-transform rounded-md overflow-hidden h-full flex flex-col"
      }`}
    >
      {post.imageUrl && (
        <div className={`relative ${featured ? "h-[300px]" : "h-[200px]"} w-full overflow-hidden`}>
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {post.imageUrl.includes("unsplash.com") && (
            <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1">
              Photo from Unsplash
            </div>
          )}
          {post.category && (
            <div className="absolute top-4 left-4 bg-gold/90 text-black text-xs px-3 py-1 font-medium rounded-full">
              {post.category}
            </div>
          )}
        </div>
      )}

      <div className={`${featured ? "" : "p-6"} flex flex-col ${featured ? "" : "flex-grow"}`}>
        <p className="text-gold text-sm mb-2">
          {formatDate(new Date(post.date))}
          {post.author && <span className="text-gray-400"> · By {post.author}</span>}
        </p>
        <h2 className={`${featured ? "text-3xl" : "text-xl"} font-serif mb-3 group-hover:text-gold transition-colors`}>
          {post.title}
        </h2>
        <p className="text-gray-300 mb-4 flex-grow">{post.excerpt}</p>
        <Link href={`/blog/${post.id}`} className="text-gold hover:underline inline-flex items-center mt-auto">
          Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

