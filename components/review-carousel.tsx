"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// Static reviews data
const STATIC_REVIEWS = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    text: '"Life in Instalments touched me deeply. Sartorelli\'s raw honesty and beautiful prose create a narrative that is both heartbreaking and ultimately uplifting. A must-read for anyone on their own journey of healing."',
    location: "New York Times",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Michael Chen",
    rating: 5,
    text: "\"Few memoirs have the power to transform the reader as they follow the author's transformation. This book does exactly that. I couldn't put it down and found myself reflecting on my own life with new perspective.\"",
    location: "Literary Review",
    date: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    rating: 5,
    text: '"Danielle Sartorelli writes with such clarity and emotion that you feel as though you\'re walking alongside her through every triumph and setback. A powerful testament to the resilience of the human spirit."',
    location: "Book Club Pick",
    date: new Date().toISOString(),
  },
]

export default function ReviewCarousel() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const reviews = STATIC_REVIEWS

  const goToNextReview = () => {
    if (isAnimating || reviews.length <= 1) return
    setDirection("next")
    setIsAnimating(true)
    setCurrentReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToPrevReview = () => {
    if (isAnimating || reviews.length <= 1) return
    setDirection("prev")
    setIsAnimating(true)
    setCurrentReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-rotate reviews
  useEffect(() => {
    if (reviews.length <= 1) return

    const interval = setInterval(() => {
      goToNextReview()
    }, 8000)

    return () => clearInterval(interval)
  }, [reviews.length, currentReviewIndex, isAnimating])

  if (reviews.length === 0) {
    return <div className="text-center py-12 text-gray-400">No reviews available at this time.</div>
  }

  const currentReview = reviews[currentReviewIndex]

  return (
    <div className="relative">
      <div className="overflow-hidden py-8">
        <div
          className={`transform transition-all duration-500 ease-in-out ${
            isAnimating
              ? direction === "next"
                ? "-translate-x-[100px] opacity-0"
                : "translate-x-[100px] opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < currentReview.rating ? "text-gold fill-gold" : "text-gray-500"}`}
                />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-serif italic mb-6">{currentReview.text}</blockquote>
            <div className="text-gold font-serif text-lg">{currentReview.name}</div>
            {currentReview.location && <div className="text-gray-400">{currentReview.location}</div>}
          </div>
        </div>
      </div>

      {reviews.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-700 text-gray-300 hover:border-gold hover:text-gold"
            onClick={goToPrevReview}
            disabled={isAnimating}
          >
            <span className="sr-only">Previous review</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <div className="flex gap-1 items-center">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentReviewIndex ? "bg-gold w-4" : "bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => {
                  if (isAnimating) return
                  setDirection(index > currentReviewIndex ? "next" : "prev")
                  setIsAnimating(true)
                  setCurrentReviewIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-700 text-gray-300 hover:border-gold hover:text-gold"
            onClick={goToNextReview}
            disabled={isAnimating}
          >
            <span className="sr-only">Next review</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  )
}

