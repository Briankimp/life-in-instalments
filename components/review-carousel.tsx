"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  name: string
  text: string
  rating: number
  location: string
  date?: string
}

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement[]>([])

  // Load reviews from localStorage if available
  useEffect(() => {
    const storedReviews = localStorage.getItem("bookReviews")
    if (storedReviews) {
      try {
        const parsedReviews = JSON.parse(storedReviews)
        setReviews(parsedReviews)
        // Reset reviewsRef array to match the new reviews length
        reviewsRef.current = reviewsRef.current.slice(0, parsedReviews.length)
      } catch (error) {
        console.error("Error parsing reviews:", error)
      }
    }
  }, [])

  const nextReview = () => {
    if (reviews.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    if (reviews.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    if (!carouselRef.current || reviews.length === 0) return

    const ctx = gsap.context(() => {
      // Animate out all reviews
      gsap.to(reviewsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
      })

      // Animate in current review
      if (reviewsRef.current[currentIndex]) {
        gsap.to(reviewsRef.current[currentIndex], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3,
        })
      }
    }, carouselRef)

    return () => ctx.revert()
  }, [currentIndex, reviews.length])

  // Auto-advance carousel
  useEffect(() => {
    if (reviews.length <= 1) return // Don't auto-advance if there's only one review

    const interval = setInterval(() => {
      nextReview()
    }, 8000)

    return () => clearInterval(interval)
  }, [reviews.length])

  if (reviews.length === 0) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-gray-400">No reviews available</p>
      </div>
    )
  }

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

