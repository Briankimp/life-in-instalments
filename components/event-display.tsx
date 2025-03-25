"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"

interface Event {
  id: string
  title: string
  location: string
  description: string
  date: string
}

export default function EventsDisplay() {
  const [events, setEvents] = useState<Event[]>([])

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem("bookEvents")
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents) as Event[]
      // Sort by date (upcoming first)
      parsedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      setEvents(parsedEvents)
    } else {
      // Default events if none exist
      const defaultEvents = [
        {
          id: "1",
          title: "Book Launch",
          location: "Sydney, Australia",
          description: "Official launch of 'Life in Instalments'",
          date: "2025-05-15",
        },
        {
          id: "2",
          title: "Author Q&A Session",
          location: "Online Event",
          description: "Join Danielle for a live discussion about the book",
          date: "2025-06-01",
        },
      ]
      setEvents(defaultEvents)
    }
  }, [])

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No upcoming events at this time. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border-l-4 border-gold p-4 bg-black/50">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold" />
            <p className="text-gold font-serif">{event.title}</p>
          </div>
          <p className="text-gray-300">{event.location}</p>
          <p className="text-gray-400 text-sm mt-1">{event.description}</p>
          <p className="text-gray-300 text-sm mt-2">
            {new Date(event.date).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  )
}

