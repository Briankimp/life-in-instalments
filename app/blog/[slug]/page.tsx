import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react"

// Update the blogPosts array to match the one in blog/page.tsx
const blogPosts = [
  {
    id: "1",
    slug: "the-journey-begins",
    title: "The Journey Begins: Innocence Lost",
    content:
      "Every story has a beginning, and mine starts with the innocence of childhood. \n\nMy brother James and I were inseparable growing up. We spent our summers by the creek, catching tadpoles and building makeshift dams. Those golden afternoons seemed endless, our laughter echoing through the trees as we explored our small corner of the world together. \n\nI often find myself returning to these memories, trying to pinpoint the exact moment when things began to change. Was there a sign I missed? A conversation I should have had? \n\nIn 'Life in Instalments,' I explore how quickly innocence can be lost and how the foundations of our childhood shape the adults we become. The journey from those carefree days to the harsh realities that followed wasn't a straight line but a winding path with moments of both darkness and unexpected light.",
    excerpt: "Reflections on childhood innocence and the foundations that shape our lives.",
    date: "2025-04-15T12:00:00.000Z",
    imageUrl: "/images/innocence.jpg",
    author: "Danielle Sartorelli",
    category: "Memoir Reflections",
  },
  {
    id: "2",
    slug: "facing-consequences",
    title: "Facing Consequences: When Addiction Takes Hold",
    content:
      "The hardest chapter to write in 'Life in Instalments' was undoubtedly the one detailing the consequences of addiction—not just for the addict, but for everyone in their orbit. \n\nWhen addiction takes hold, it creates ripples that extend far beyond the individual. For every person struggling with substance abuse, there are parents, siblings, friends, and partners who bear witness to their decline. We sit in courtrooms, answer middle-of-the-night phone calls, and search for answers in the spaces between what is said and what remains unspoken. \n\nIn my brother's case, his addiction to drugs led to a series of increasingly serious legal troubles. I can still remember sitting in the back of the courtroom, watching his shoulders slump as the sentence was read. In that moment, we were both children again—scared, confused, and desperately wishing for a way back to simpler times. \n\nThis chapter explores the guilt that family members often carry, the 'what-ifs' that keep us awake at night, and the difficult realization that sometimes love isn't enough to save someone from themselves.",
    excerpt: "Exploring the far-reaching impact of addiction on families and the weight of unspoken guilt.",
    date: "2025-03-28T12:00:00.000Z",
    imageUrl: "/images/consequences.jpg",
    author: "Danielle Sartorelli",
    category: "Family & Addiction",
  },
  {
    id: "3",
    slug: "finding-hope",
    title: "Finding Hope in Darkness",
    content:
      "Hope is a complicated emotion when you love someone battling addiction. It's both essential and dangerous—a lifeline that can keep you going through the darkest times, but also a force that can blind you to difficult truths. \n\nIn writing 'Life in Instalments,' I wanted to explore this complex relationship with hope. How do we maintain it without letting it become denial? How do we protect ourselves while still believing in the possibility of change? \n\nFor years, I lived in a cycle of hope and disappointment with my brother. Each period of sobriety brought renewed optimism, only to be followed by the crushing weight of another relapse. I learned that hope isn't always about expecting a specific outcome; sometimes, it's about finding meaning in the journey itself. \n\nThis chapter discusses how I found hope in unexpected places—in support groups with others who understood, in small moments of connection during prison visits, and eventually, in accepting that my brother's path was his own to walk. \n\nHope doesn't always look like a happy ending. Sometimes it looks like the courage to keep moving forward, even when the path ahead is unclear.",
    excerpt: "Navigating the delicate balance between hope and reality when loving someone with addiction.",
    date: "2025-02-10T12:00:00.000Z",
    imageUrl: "/images/hope.jpg",
    author: "Danielle Sartorelli",
    category: "Healing & Growth",
  },
  {
    id: "4",
    slug: "path-to-redemption",
    title: "The Path to Redemption",
    content:
      "Redemption isn't a single moment but a journey—one that requires both letting go and holding on. \n\nIn the final chapters of 'Life in Instalments,' I explore what redemption means in the context of addiction and family trauma. It's rarely the neat, cinematic transformation we see in films. Instead, it's messy, non-linear, and deeply personal. \n\nFor my brother, redemption began with small steps: showing up consistently, making amends where possible, and learning to forgive himself. For me, it meant acknowledging my own role in our family dynamics and finding ways to support without enabling. \n\nOne of the most profound lessons I've learned is that redemption doesn't erase the past—it builds something new alongside it. The pain and mistakes remain part of our story, but they no longer define what's possible for the future. \n\nThis chapter discusses how we rebuilt our relationship, not by pretending the difficult years never happened, but by creating new memories and connections strong enough to stand alongside the old ones. \n\nThe rope that once felt like it was pulling us under became the lifeline that connected us through recovery and healing.",
    excerpt: "Exploring the complex, non-linear journey of redemption and rebuilding relationships after addiction.",
    date: "2025-01-05T12:00:00.000Z",
    imageUrl: "/images/redemption.jpg",
    author: "Danielle Sartorelli",
    category: "Recovery & Relationships",
  },
]

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found | Life in Instalments",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Life in Instalments`,
    description: post.excerpt,
  }
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Find previous and next posts for navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === params.slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/blog" className="inline-flex items-center text-gold hover:text-gold/80 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
        </Link>

        <article>
          <div className="relative h-[300px] md:h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gold/70" />
                {new Date(post.date).toLocaleDateString("en-AU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gold/70" />
                {post.author}
              </div>

              <div className="bg-gold/20 text-gold px-2 py-1 rounded text-xs">{post.category}</div>
            </div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="flex items-center text-gold hover:text-gold/80 group">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                <div>
                  <div className="text-sm text-gray-400">Previous Post</div>
                  <div>{prevPost.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="flex items-center text-gold hover:text-gold/80 group sm:text-right"
              >
                <div>
                  <div className="text-sm text-gray-400">Next Post</div>
                  <div>{nextPost.title}</div>
                </div>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

