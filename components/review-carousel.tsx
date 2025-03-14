"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: '"Life in Instalments touched me deeply. Sartorelli\'s raw honesty and beautiful prose create a narrative that is both heartbreaking and ultimately uplifting. A must-read for anyone on their own journey of healing."',
    location: "New York Times",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    text: "\"Few memoirs have the power to transform the reader as they follow the author's transformation. This book does exactly that. I couldn't put it down and found myself reflecting on my own life with new perspective.\"",
    location: "Literary Review",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    text: '"Danielle Sartorelli writes with such clarity and emotion that you feel as though you\'re walking alongside her through every triumph and setback. A powerful testament to the resilience of the human spirit."',
    location: "Book Club Pick",
  },
  {
    id: 4,
    name: "James Wilson",
    rating: 5,
    text: '"Breathtaking in its honesty and captivating in its storytelling. Life in Instalments reminds us that our darkest moments can lead to our greatest growth. I\'ve already recommended it to everyone I know."',
    location: "Goodreads Review",
  },
]

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement[]>([])

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    if (!carouselRef.current) return

    const ctx = gsap.context(() => {
      // Animate out current review
      gsap.to(reviewsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.1,
      })

      // Animate in new review
      gsap.to(reviewsRef.current[currentIndex], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.3,
      })
    }, carouselRef)

    return () => ctx.revert()
  }, [currentIndex])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={carouselRef} className="relative">
      <div className="min-h-[300px] flex items-center justify-center">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            ref={(el) => {
              if (el) reviewsRef.current[index] = el
            }}
            className={`absolute w-full max-w-2xl mx-auto p-8 bg-black/50 rounded-lg border border-gold/20 text-center ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex justify-center mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-gold fill-gold" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl italic mb-6">{review.text}</blockquote>
            <div>
              <p className="font-serif text-lg">{review.name}</p>
              <p className="text-gold text-sm">{review.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gold/50 text-gold hover:bg-gold hover:text-black"
          onClick={prevReview}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-gold" : "bg-gray-600 hover:bg-gray-400"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gold/50 text-gold hover:bg-gold hover:text-black"
          onClick={nextReview}
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

