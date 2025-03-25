import { formatDate } from "@/lib/utils"

interface BlogContentProps {
  post: {
    title: string
    content: string
    date: string
    author?: string
  }
}

export default function BlogContent({ post }: BlogContentProps) {
  // Format the blog content with paragraphs
  const formattedContent = post.content.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-6 text-lg leading-relaxed">
      {paragraph}
    </p>
  ))

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-serif mb-4">{post.title}</h1>
        <div className="flex items-center text-gold mb-8">
          <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
          {post.author && <span className="text-gray-400 ml-2"> · By {post.author}</span>}
        </div>
      </div>

      <div className="prose prose-invert prose-gold max-w-none">{formattedContent}</div>
    </div>
  )
}

