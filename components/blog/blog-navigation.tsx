import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogNavigationProps {
  prevPost?: {
    id: string
    title: string
  } | null
  nextPost?: {
    id: string
    title: string
  } | null
}

export default function BlogNavigation({ prevPost, nextPost }: BlogNavigationProps) {
  return (
    <div className="max-w-3xl mx-auto border-t border-gray-800 mt-12 pt-8">
      <div className="flex justify-between items-center">
        {prevPost ? (
          <Link href={`/blog/${prevPost.id}`} className="group flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <div>
              <div className="text-sm text-gray-400">Previous Post</div>
              <div className="text-gold group-hover:underline">{prevPost.title}</div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {nextPost ? (
          <Link href={`/blog/${nextPost.id}`} className="group flex items-center text-right">
            <div>
              <div className="text-sm text-gray-400">Next Post</div>
              <div className="text-gold group-hover:underline">{nextPost.title}</div>
            </div>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Posts
          </Link>
        </Button>
      </div>
    </div>
  )
}

