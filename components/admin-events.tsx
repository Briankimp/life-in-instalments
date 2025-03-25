"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Calendar } from "lucide-react"

interface Event {
  id: string
  title: string
  location: string
  description: string
  date: string
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    location: "",
    description: "",
    date: "",
  })
  const [successMessage, setSuccessMessage] = useState("")

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem("bookEvents")
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    } else {
      // Initialize with default events if none exist
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
      localStorage.setItem("bookEvents", JSON.stringify(defaultEvents))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new event
    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
    }

    // Add to events array
    const updatedEvents = [...events, event]
    setEvents(updatedEvents)

    // Save to localStorage
    localStorage.setItem("bookEvents", JSON.stringify(updatedEvents))

    // Reset form
    setNewEvent({
      title: "",
      location: "",
      description: "",
      date: "",
    })

    // Show success message
    setSuccessMessage("Event added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id)
    setEvents(updatedEvents)
    localStorage.setItem("bookEvents", JSON.stringify(updatedEvents))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Add New Event</CardTitle>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/30 border border-green-800 text-green-300 text-sm rounded-md">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 focus:border-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 focus:border-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 focus:border-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 focus:border-gold min-h-[100px]"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-black">
              Add Event
            </Button>
          </form>
        </CardContent>
      </Card>

      <h3 className="text-xl font-serif mt-6 mb-4">Existing Events</h3>
      <div className="space-y-4">
        {events.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <p className="text-center text-gray-400">No events found</p>
            </CardContent>
          </Card>
        ) : (
          events.map((event) => (
            <Card key={event.id} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gold" />
                      <h3 className="font-serif text-lg">{event.title}</h3>
                    </div>
                    <p className="text-gold text-sm mt-1">
                      {new Date(event.date).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gray-300 mt-2">{event.location}</p>
                    <p className="text-gray-400 mt-2 text-sm">{event.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

