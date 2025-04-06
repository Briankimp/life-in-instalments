import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | Life in Instalments",
  description: "Read the latest articles and updates from Danielle Sartorelli",
}

// Update the blogPosts array with new content and images
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

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center">
          <span className="text-gold">Blog</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group hover:border-gold/50 transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-black text-xs font-medium px-2 py-1 rounded">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-2">
                  {new Date(post.date).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-xl font-serif mb-3 group-hover:text-gold transition-colors">{post.title}</h2>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

