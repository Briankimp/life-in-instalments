"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Instagram, Youtube, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import ParticleBackground from "@/components/particle-background"
import BookCover from "@/components/book-cover"
import ReviewCarousel from "@/components/review-carousel"
import FloatingElement from "@/components/floating-element"
import AnimatedDivider from "@/components/animated-divider"
import ThemeImage from "@/components/theme-image"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const purchaseRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const blogRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("hero")
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Theme images data
  const themeImages = [
    {
      src: "/placeholder.svg?height=400&width=400&text=Courage",
      alt: "Courage theme image",
      theme: "Courage",
    },
    {
      src: "/placeholder.svg?height=400&width=400&text=Resilience",
      alt: "Resilience theme image",
      theme: "Resilience",
    },
    {
      src: "/placeholder.svg?height=400&width=400&text=Transformation",
      alt: "Transformation theme image",
      theme: "Transformation",
    },
    {
      src: "/placeholder.svg?height=400&width=400&text=Truth",
      alt: "Truth theme image",
      theme: "Truth",
    },
  ]

  // Email validation
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setEmailValid(null)
      return
    }
    setEmailValid(validateEmail(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false)
      const form = e.target as HTMLFormElement
      form.reset()
      setEmailValid(null)
    }, 3000)
  }

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power3.inOut",
      })
    }
  }

  useEffect(() => {
    // Initialize animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      })

      gsap.from(".hero-quote", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.1,
        ease: "power3.out",
      })

      gsap.from(".hero-button", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.4,
        ease: "power3.out",
      })

      // About section animations
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".about-text p", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".theme-grid", {
        scrollTrigger: {
          trigger: ".theme-grid",
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".about-quote", {
        scrollTrigger: {
          trigger: ".about-quote",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })

      // Author section animations
      gsap.from(".author-title", {
        scrollTrigger: {
          trigger: ".author-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".author-image", {
        scrollTrigger: {
          trigger: ".author-image",
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".author-text p", {
        scrollTrigger: {
          trigger: ".author-text",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".social-links", {
        scrollTrigger: {
          trigger: ".social-links",
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      })

      // Purchase section animations
      gsap.from(".purchase-title", {
        scrollTrigger: {
          trigger: ".purchase-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".purchase-card", {
        scrollTrigger: {
          trigger: ".purchase-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      })

      // Reviews section animations
      gsap.from(".reviews-title", {
        scrollTrigger: {
          trigger: ".reviews-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })

      // Blog section animations
      gsap.from(".blog-title", {
        scrollTrigger: {
          trigger: ".blog-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".blog-card", {
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".blog-button", {
        scrollTrigger: {
          trigger: ".blog-button",
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      })

      // Contact section animations
      gsap.from(".contact-title", {
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".subscribe-form", {
        scrollTrigger: {
          trigger: ".subscribe-form",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })

      // Parallax effects
      gsap.utils.toArray(".parallax-bg").forEach((bg: any) => {
        gsap.to(bg, {
          scrollTrigger: {
            trigger: bg,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: "20%",
          ease: "none",
        })
      })

      // Update active section based on scroll position
      const sections = ["hero", "about", "author", "purchase", "reviews", "blog", "contact"]

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: `#${section}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(section),
          onEnterBack: () => setActiveSection(section),
        })
      })
    })

    return () => ctx.revert() // Cleanup animations on unmount
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gold/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="#hero"
            className="text-gold font-serif text-xl"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("hero")
            }}
          >
            Life in Instalments
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[
              { id: "about", label: "About" },
              { id: "author", label: "Author" },
              { id: "purchase", label: "Purchase" },
              { id: "reviews", label: "Reviews" },
              { id: "blog", label: "Blog" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`hover:text-gold transition-colors ${activeSection === item.id ? "text-gold" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <Button variant="ghost" size="sm" className="text-gold">
              Menu
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
      >
        <ParticleBackground />
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-10 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-16 z-10">
          <div className="md:w-1/2 flex justify-center">
            <BookCover imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/life%20intsllamnst.jpg-PaWhNjesxiciN2QwwTdsEDblxf701m.jpeg" />
          </div>
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="hero-title text-4xl md:text-6xl font-serif font-bold">
              <span className="text-gold">LIFE</span> in <span className="text-white">Instalments</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl italic text-gray-300">a true story</p>
            <FloatingElement>
              <p className="hero-quote text-xl md:text-2xl font-light leading-relaxed">
                "Sometimes the threads that bind us are the same ones that set us free."
              </p>
            </FloatingElement>
            <div className="pt-4">
              <Button
                className="hero-button bg-gold hover:bg-gold/80 text-black rounded-none px-8 py-6 text-lg transform transition-transform hover:scale-105"
                onClick={() => scrollToSection("purchase")}
              >
                Get the Book <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ArrowRight className="h-8 w-8 text-gold rotate-90" />
        </div>
      </section>

      {/* About the Book */}
      <section id="about" ref={aboutRef} className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="about-title text-3xl md:text-5xl font-serif mb-12 text-center">
            About the <span className="text-gold">Book</span>
          </h2>
          <AnimatedDivider />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="about-text space-y-6">
              <p className="text-lg md:text-xl leading-relaxed">
                <span className="text-gold text-2xl font-serif">"</span>
                <span className="italic">Life in Instalments</span> is a raw, unflinching memoir that chronicles a
                journey through darkness toward light. Danielle Sartorelli weaves a powerful narrative of struggle,
                resilience, and ultimately, transformation.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                This true story explores how we can be bound by invisible threads of fear, trauma, and expectation, yet
                find the courage to unravel them and discover our authentic selves.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Through poetic prose and unflinching honesty, Sartorelli invites readers to witness her path from
                confinement to liberation, offering hope that even our deepest wounds can become sources of strength.
              </p>
            </div>
            <div className="theme-grid grid grid-cols-2 gap-4">
              {themeImages.map((image, index) => (
                <ThemeImage key={index} src={image.src} alt={image.alt} theme={image.theme} />
              ))}
            </div>
          </div>
          <div className="mt-16 max-w-3xl mx-auto">
            <FloatingElement>
              <blockquote className="about-quote text-2xl md:text-3xl font-serif text-center italic text-gold">
                "We are all bound by something. The question is whether we let it define us or refine us."
              </blockquote>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section id="author" ref={authorRef} className="py-24 bg-gray-950 relative">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="author-title text-3xl md:text-5xl font-serif mb-12 text-center">
            About the <span className="text-gold">Author</span>
          </h2>
          <AnimatedDivider />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="author-text order-2 md:order-1 space-y-6">
              <p className="text-lg md:text-xl leading-relaxed">
                Danielle Sartorelli is a writer, speaker, and advocate whose work explores the complexities of human
                resilience and personal transformation.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Drawing from her own experiences, Danielle crafts narratives that are both deeply personal and
                universally resonant, inviting readers to find reflections of their own journeys within her words.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                When not writing, Danielle can be found speaking at events, connecting with readers, and advocating for
                those whose voices often go unheard. <span className="text-gold">Life in Instalments</span> is her debut
                memoir.
              </p>
              <div className="social-links flex gap-4 pt-4">
                <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gold text-gold hover:bg-gold hover:text-black transform transition-transform hover:scale-110"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gold text-gold hover:bg-gold hover:text-black transform transition-transform hover:scale-110"
                  >
                    <Youtube className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gold text-gold hover:bg-gold hover:text-black transform transition-transform hover:scale-110"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="author-image order-1 md:order-2 flex justify-center">
              <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-gold transform transition-transform hover:scale-105">
                <Image
                  src="/placeholder.svg?height=350&width=350"
                  alt="Danielle Sartorelli"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Links */}
      <section id="purchase" ref={purchaseRef} className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="purchase-title text-3xl md:text-5xl font-serif mb-12 text-center">
            Get Your <span className="text-gold">Copy</span>
          </h2>
          <AnimatedDivider />
          <div className="max-w-3xl mx-auto">
            <div className="purchase-grid grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="purchase-card bg-gray-900 p-8 rounded-md flex flex-col items-center text-center hover:bg-gray-800 transition-colors group">
                <Image src="/placeholder.svg?height=80&width=80" alt="Amazon" width={80} height={80} className="mb-4" />
                <h3 className="text-xl font-serif mb-2">Amazon</h3>
                <p className="text-gray-400 mb-4">Available in hardcover, paperback, and Kindle editions</p>
                <Button className="bg-gold hover:bg-gold/80 text-black rounded-none w-full group-hover:scale-110 transition-transform">
                  Buy Now
                </Button>
              </div>
              <div className="purchase-card bg-gray-900 p-8 rounded-md flex flex-col items-center text-center hover:bg-gray-800 transition-colors group">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Barnes & Noble"
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <h3 className="text-xl font-serif mb-2">Barnes & Noble</h3>
                <p className="text-gray-400 mb-4">Available in hardcover, paperback, and Nook editions</p>
                <Button className="bg-gold hover:bg-gold/80 text-black rounded-none w-full group-hover:scale-110 transition-transform">
                  Buy Now
                </Button>
              </div>
              <div className="purchase-card bg-gray-900 p-8 rounded-md flex flex-col items-center text-center hover:bg-gray-800 transition-colors group">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Indie Bookstores"
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <h3 className="text-xl font-serif mb-2">Indie Bookstores</h3>
                <p className="text-gray-400 mb-4">Support your local bookstore and get a signed copy</p>
                <Button className="bg-gold hover:bg-gold/80 text-black rounded-none w-full group-hover:scale-110 transition-transform">
                  Find Stores
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials */}
      <section id="reviews" ref={reviewsRef} className="py-24 bg-gray-950 relative">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="reviews-title text-3xl md:text-5xl font-serif mb-12 text-center">
            Reader <span className="text-gold">Reviews</span>
          </h2>
          <AnimatedDivider />
          <div className="max-w-4xl mx-auto">
            <ReviewCarousel />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" ref={blogRef} className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="blog-title text-3xl md:text-5xl font-serif mb-12 text-center">
            Latest <span className="text-gold">Updates</span>
          </h2>
          <AnimatedDivider />
          <div className="blog-grid grid md:grid-cols-3 gap-8">
            <div className="blog-card bg-black p-6 rounded-md border border-gray-800 hover:border-gold/50 transition-colors transform hover:scale-105 transition-transform">
              <p className="text-gold text-sm mb-2">March 10, 2025</p>
              <h3 className="text-xl font-serif mb-3">Book Tour Announcement</h3>
              <p className="text-gray-300 mb-4">
                Join Danielle as she embarks on a nationwide tour to connect with readers and share her journey.
              </p>
              <Link href="#" className="text-gold hover:underline inline-flex items-center">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="blog-card bg-black p-6 rounded-md border border-gray-800 hover:border-gold/50 transition-colors transform hover:scale-105 transition-transform">
              <p className="text-gold text-sm mb-2">February 25, 2025</p>
              <h3 className="text-xl font-serif mb-3">Behind the Cover Design</h3>
              <p className="text-gray-300 mb-4">
                Discover the symbolism and creative process behind the striking cover of Life in Instalments.
              </p>
              <Link href="#" className="text-gold hover:underline inline-flex items-center">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="blog-card bg-black p-6 rounded-md border border-gray-800 hover:border-gold/50 transition-colors transform hover:scale-105 transition-transform">
              <p className="text-gold text-sm mb-2">January 15, 2025</p>
              <h3 className="text-xl font-serif mb-3">Reader Stories</h3>
              <p className="text-gray-300 mb-4">
                Heartfelt responses from readers who found their own stories reflected in the pages of the book.
              </p>
              <Link href="#" className="text-gold hover:underline inline-flex items-center">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="blog-button border-gold text-gold hover:bg-gold hover:text-black rounded-none px-8 transform hover:scale-105 transition-transform"
            >
              View All Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Subscription */}
      <section id="contact" ref={contactRef} className="py-24 bg-gray-950 relative">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="contact-title text-3xl md:text-5xl font-serif mb-12 text-center">
            Connect & <span className="text-gold">Subscribe</span>
          </h2>
          <AnimatedDivider />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="contact-form space-y-6">
              <h3 className="text-2xl font-serif mb-4">Get in Touch</h3>
              <p className="text-gray-300 mb-6">
                Have questions about the book, interested in booking Danielle for an event, or just want to share your
                thoughts? Fill out the form and we'll get back to you soon just want to share your thoughts? Fill out
                the form and we'll get back to you soon.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="First Name"
                      className="bg-gray-900 border-gray-700 focus:border-gold rounded-none"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Last Name"
                      className="bg-gray-900 border-gray-700 focus:border-gold rounded-none"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className={`bg-gray-900 border-gray-700 focus:border-gold rounded-none ${
                      emailValid === false ? "border-red-500" : emailValid === true ? "border-green-500" : ""
                    }`}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailValid === false && (
                    <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="bg-gray-900 border-gray-700 focus:border-gold rounded-none min-h-[150px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gold hover:bg-gold/80 text-black rounded-none w-full transform hover:scale-105 transition-transform"
                  disabled={formSubmitted}
                >
                  {formSubmitted ? "Message Sent!" : "Send Message"}
                </Button>
                {formSubmitted && (
                  <div className="text-green-500 text-center animate-fadeIn">
                    Thank you for your message! We'll be in touch soon.
                  </div>
                )}
              </form>
            </div>
            <div className="subscribe-form space-y-6">
              <h3 className="text-2xl font-serif mb-4">Join the Community</h3>
              <p className="text-gray-300 mb-6">
                Subscribe to receive exclusive content, early access to new writings, event invitations, and personal
                insights from Danielle.
              </p>
              <div className="bg-gray-900 p-8 rounded-md border border-gray-800 transform hover:scale-105 transition-transform">
                <h4 className="text-xl font-serif mb-4">Newsletter Subscription</h4>
                <p className="text-gray-300 mb-6">
                  Be the first to know about new releases, events, and special offers.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    placeholder="Your Name"
                    className="bg-black border-gray-700 focus:border-gold rounded-none"
                    required
                  />
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className={`bg-black border-gray-700 focus:border-gold rounded-none ${
                        emailValid === false ? "border-red-500" : emailValid === true ? "border-green-500" : ""
                      }`}
                      onChange={handleEmailChange}
                      required
                    />
                    {emailValid === false && (
                      <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="bg-gold hover:bg-gold/80 text-black rounded-none w-full transform hover:scale-105 transition-transform"
                    disabled={formSubmitted}
                  >
                    {formSubmitted ? "Subscribed!" : "Subscribe"}
                  </Button>
                  {formSubmitted && (
                    <div className="text-green-500 text-center animate-fadeIn">
                      Thank you for subscribing! Check your email for confirmation.
                    </div>
                  )}
                </form>
                <p className="text-xs text-gray-400 mt-4">
                  We respect your privacy and will never share your information. You can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link
                href="#hero"
                className="text-gold font-serif text-2xl"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("hero")
                }}
              >
                Life in Instalments
              </Link>
              <p className="text-gray-400 mt-2">
                © {new Date().getFullYear()} Danielle Sartorelli. All rights reserved.
              </p>
            </div>
            <div className="flex gap-8">
              {[
                { id: "about", label: "About" },
                { id: "author", label: "Author" },
                { id: "purchase", label: "Purchase" },
                { id: "reviews", label: "Reviews" },
                { id: "blog", label: "Blog" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-gray-300 hover:text-gold transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-end gap-4 mt-6 md:mt-0">
              <div className="flex gap-4">
                <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-700 text-gray-300 hover:border-gold hover:text-gold transform hover:scale-110 transition-transform"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-700 text-gray-300 hover:border-gold hover:text-gold transform hover:scale-110 transition-transform"
                  >
                    <Youtube className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-700 text-gray-300 hover:border-gold hover:text-gold transform hover:scale-110 transition-transform"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-gray-500">
                Website by{" "}
                <Link
                  href="https://yourdevsite.com"
                  target="_blank"
                  className="text-gold/70 hover:text-gold transition-colors hover:underline"
                >
                  Your Developer Name
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

