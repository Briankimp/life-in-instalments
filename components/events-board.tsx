"use client"

import { useState } from "react"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedDivider from "@/components/animated-divider"

interface Event {
  id: string
  title: string
  date: string
  location: string
  description: string
}

interface EventsBoardProps {
  events: Event[]
}

export default function EventsBoard({ events }: EventsBoardProps) {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)

  const toggleEvent = (id: string) => {
    if (expandedEventId === id) {
      setExpandedEventId(null)
    } else {
      setExpandedEventId(id)
    }
  }

  // Format date to Australian format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Format time to Australian format
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-AU", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="space-y-8">
      {events.length === 0 ? (
        <div className="text-center py-12 bg-gray-900/50 rounded-lg border border-gray-800">
          <h3 className="text-xl font-serif text-gold mb-2">No Upcoming Events</h3>
          <p className="text-gray-400">Check back soon for future events and appearances.</p>
        </div>
      ) : (
        <div className="events-grid space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gold/30 transition-all overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                onClick={() => toggleEvent(event.id)}
              >
                <div>
                  <h3 className="text-xl font-serif text-gold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-300 mb-1">
                    <Calendar className="h-4 w-4 mr-2 text-gold/70" />
                    <span>{formatDate(event.date)}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTime(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-gold/70" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-start md:self-center border-gold/50 text-gold hover:bg-gold hover:text-black"
                >
                  {expandedEventId === event.id ? "Show Less" : "Show More"}
                  <ArrowRight
                    className={`ml-2 h-4 w-4 transition-transform ${expandedEventId === event.id ? "rotate-90" : ""}`}
                  />
                </Button>
              </div>
              {expandedEventId === event.id && (
                <div className="px-6 pb-6 pt-0">
                  <AnimatedDivider />
                  <div className="mt-4 text-gray-300">{event.description}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

