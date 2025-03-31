"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Instagram,
  Youtube,
  Facebook,
  Lock,
  Loader2,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ParticleBackground from "@/components/particle-background";
import BookCover from "@/components/book-cover";
import ReviewCarousel from "@/components/review-carousel";
import FloatingElement from "@/components/floating-element";
import AnimatedDivider from "@/components/animated-divider";
import ThemeImage from "@/components/theme-image";
import EventsBoard from "@/components/events-board";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const purchaseRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [blogPosts, setBlogPosts] = useState<
    {
      id: string;
      title: string;
      content: string;
      excerpt: string;
      date: string;
      imageUrl?: string;
    }[]
  >([]);
  const [purchaseLinks, setPurchaseLinks] = useState([
    {
      id: "1",
      name: "Amazon",
      description: "Available in hardcover, paperback, and Kindle editions",
      imageUrl: "/placeholder.svg?height=80&width=80",
      link: "#",
    },
    {
      id: "2",
      name: "Barnes & Noble",
      description: "Available in hardcover, paperback, and Nook editions",
      imageUrl: "/placeholder.svg?height=80&width=80",
      link: "#",
    },
    {
      id: "3",
      name: "Indie Bookstores",
      description: "Support your local bookstore and get a signed copy",
      imageUrl: "/placeholder.svg?height=80&width=80",
      link: "#",
    },
  ]);
  const [events, setEvents] = useState<
    {
      id: string;
      title: string;
      date: string;
      location: string;
      description: string;
    }[]
  >([]);

  // Theme images data with Unsplash images
  const [themeImages, setThemeImages] = useState([
    {
      src: "/Consequences.jpg",
      alt: "Consequences theme image - silhouette of person on mountain",
      theme: "Consequences",
      credit: "Unsplash",
    },
    {
      src: "/Redemption.jpg",
      alt: "Redemption theme image - tree growing through rock",
      theme: "Redemption",
      credit: "Unsplash",
    },
    {
      src: "/Hope.jpg",
      alt: "Hope theme image - butterfly",
      theme: "Hope",
      credit: "Unsplash",
    },
    {
      src: "/innocence.jpg",
      alt: "Innocence theme image - light through window",
      theme: "Innocence",
      credit: "Unsplash",
    },
  ]);

  // Add this useEffect to load blog posts, purchase links, and events
  useEffect(() => {
    // Load blog posts from localStorage if available
    const storedBlogPosts = localStorage.getItem("bookBlogPosts");
    if (storedBlogPosts) {
      setBlogPosts(JSON.parse(storedBlogPosts));
    }

    // Load purchase links from localStorage if available
    const storedPurchaseLinks = localStorage.getItem("bookPurchaseLinks");
    if (storedPurchaseLinks) {
      setPurchaseLinks(JSON.parse(storedPurchaseLinks));
    }


    // const handleContactSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   setIsSubmitting(true);
      
    //   try {
    //     const response = await fetch('/api/contact', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(contactFormData),
    //     });
    
    //     if (response.ok) {
    //       setFormSubmitted(true);
    //       setContactFormData({
    //         firstName: '',
    //         lastName: '',
    //         email: '',
    //         message: '',
    //       });
    //     } else {
    //       throw new Error('Failed to send message');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     alert('Failed to send message. Please try again later.');
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // };
    // Load events from localStorage if available
    const storedEvents = localStorage.getItem("bookEvents");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Initialize with default events if none exist
      const defaultEvents = [
        {
          id: "1",
          title: "Book Launch Event",
          date: "2025-05-15T18:00:00.000Z",
          location: "Sydney Writers' Festival",
          description:
            "Join us for the official launch of 'Life in Instalments' with a reading and Q&A session with the author.",
        },
        {
          id: "2",
          title: "Author Talk",
          date: "2025-06-10T19:00:00.000Z",
          location: "Melbourne City Library",
          description:
            "Danielle discusses the themes of addiction, family relationships, and resilience in her memoir.",
        },
      ];
      setEvents(defaultEvents);
      localStorage.setItem("bookEvents", JSON.stringify(defaultEvents));
    }

    // Load theme images from localStorage if available
    const storedThemeImages = localStorage.getItem("bookThemeImages");
    if (storedThemeImages) {
      setThemeImages(JSON.parse(storedThemeImages));
    }
  }, []);

  // Email validation
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      setEmailValid(null);
      return;
    }
    setEmailValid(validateEmail(value));
  };

  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      if (value === "") {
        setEmailValid(null);
      } else {
        setEmailValid(validateEmail(value));
      }
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: contactFormData.firstName,
          lastName: contactFormData.lastName,
          email: contactFormData.email,
          message: contactFormData.message
        }),
      });
  
      if (response.ok) {
        setFormSubmitted(true);
        setContactFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
  
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setEmailValid(null);
      }, 3000);
    }
  };

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power3.inOut",
      });
    }
  };

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
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-quote", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.1,
        ease: "power3.out",
      });

      gsap.from(".hero-button", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.4,
        ease: "power3.out",
      });

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
      });

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
      });

      gsap.from(".theme-grid", {
        scrollTrigger: {
          trigger: ".theme-grid",
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".about-quote", {
        scrollTrigger: {
          trigger: ".about-quote",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

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
      });

      gsap.from(".author-image", {
        scrollTrigger: {
          trigger: ".author-image",
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power3.out",
      });

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
      });

      gsap.from(".social-links", {
        scrollTrigger: {
          trigger: ".social-links",
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

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
      });

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
      });

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
      });

      // Events section animations
      gsap.from(".events-title", {
        scrollTrigger: {
          trigger: ".events-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: ".events-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

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
      });

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
      });

      gsap.from(".blog-button", {
        scrollTrigger: {
          trigger: ".blog-button",
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

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
      });

      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

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
        });
      });

      // Update active section based on scroll position
      const sections = [
        "hero",
        "about",
        "author",
        "purchase",
        "reviews",
        "events",
        "blog",
        "contact",
      ];

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: `#${section}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(section),
          onEnterBack: () => setActiveSection(section),
        });
      });
    });

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gold/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="#hero"
            className="text-gold font-serif text-xl"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
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
              { id: "events", label: "Events" },
              { id: "blog", label: "Blog" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`hover:text-gold transition-colors ${
                  activeSection === item.id ? "text-gold" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
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
              <span className="text-gold">LIFE</span> in{" "}
              <span className="text-white">Instalments</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl italic text-gray-300">
              a true story
            </p>
            <FloatingElement>
              <p className="hero-quote text-xl md:text-2xl font-light leading-relaxed">
                "We all have chapters that are difficult to face, the question
                is whether we let them define our story."
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
                <span className="italic">Life in Instalments</span> is a raw and
                emotional memoir that chronicles the heartbreaking journey of
                being a sister to a brother lost to addiction and crime,
                revealing how even the most ordinary moments can give way to
                unimaginable chaos.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Through years of struggle, Danielle grapples with the painful
                reality of her brother James's descent into drug addiction,
                criminal activity, and the relentless toll it takes on their
                family. From childhood adventures filled with innocence to the
                crushing weight of legal troubles, her story vividly portrays
                the turbulence and heartbreak that addiction inflicts on
                everyone it touches.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                With unflinching honesty, this memoir explores the complex
                dynamics of family, love, guilt, and the devastating
                consequences of addiction. It is a story of hope, heartbreak,
                and the gut-wrenching reality of trying—and failing—to save
                someone you love from themselves.
              </p>
            </div>
            <div className="theme-grid grid grid-cols-2 gap-4">
              {themeImages.map((image, index) => (
                <ThemeImage
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  theme={image.theme}
                />
              ))}
            </div>
          </div>
          <div className="mt-16 max-w3xl mx-auto">
            <FloatingElement>
              <blockquote className="about-quote text-2xl md:text-3xl font-serif text-center italic text-gold">
                "In the end, we all protect what we truly love, even if that
                means letting it go."
              </blockquote>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section
        id="author"
        ref={authorRef}
        className="py-24 bg-gray-950 relative"
      >
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="author-title text-3xl md:text-5xl font-serif mb-12 text-center">
            About the <span className="text-gold">Author</span>
          </h2>
          <AnimatedDivider />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="author-text order-2 md:order-1 space-y-6">
              <p className="text-lg md:text-xl leading-relaxed">
                Danielle Sartorelli is a writer whose work explores the
                complexities of family relationships, addiction, and the human
                capacity for resilience in the face of overwhelming challenges.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Drawing from her own experiences, Danielle crafts narratives
                that are both deeply personal and universally resonant, inviting
                readers to find reflections of their own journeys within her
                words.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                When not writing, Danielle enjoys connecting with readers who
                have experienced similar family struggles.{" "}
                <span className="text-gold">Life in Instalments</span> is her
                debut memoir.
              </p>
              <div className="social-links flex gap-4 pt-4">
                {/* <Link
                  href="https://instagram.com"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gold text-gold hover:bg-gold hover:text-black transform transition-transform hover:scale-110"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                </Link> */}
                <Link
                  href="https://youtube.com/@accidentalauthor?si=JCkHhugSHi_QPmmm"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gold text-gold hover:bg-gold hover:text-black transform transition-transform hover:scale-110"
                  >
                    <Youtube className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61574600643131"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gold text-gold hover:bg-gold hover:text-black transform transition-transform hover:scale-110"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="author-image order-1 md:order-2 flex justify-center">
              <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-gold transform transition-transform hover:scale-105">
                <Image
                  src="/Author.jpg"
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
      <section
        id="purchase"
        ref={purchaseRef}
        className="py-24 bg-black relative"
      >
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="purchase-title text-3xl md:text-5xl font-serif mb-12 text-center">
            Get Your <span className="text-gold">Copy</span>
          </h2>
          <AnimatedDivider />
          <div className="max-w-3xl mx-auto">
            <div className="purchase-grid grid grid-cols-1 md:grid-cols-3 gap-8">
              {purchaseLinks.map((link) => (
                <div
                  key={link.id}
                  className="purchase-card bg-gray-900 p-8 rounded-md flex flex-col items-center text-center hover:bg-gray-800 transition-colors group"
                >
                  <Image
                    src="/bookcover.jpg"
                    alt={link.name}
                    width={80}
                    height={80}
                    className="mb-4"
                  />
                  <h3 className="text-xl font-serif mb-2">{link.name}</h3>
                  <p className="text-gray-400 mb-4">{link.description}</p>
                  <Button
                    className="bg-gold hover:bg-gold/80 text-black rounded-none w-full group-hover:scale-110 transition-transform"
                    onClick={() => window.open(link.link, "_blank")}
                  >
                    Buy Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials */}
      <section
        id="reviews"
        ref={reviewsRef}
        className="py-24 bg-gray-950 relative"
      >
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

      {/* Events Section */}
      <section id="events" ref={eventsRef} className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4  opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="events-title text-3xl md:text-5xl font-serif mb-12 text-center">
            Coming <span className="text-gold">Events</span>
          </h2>
          <AnimatedDivider />
          <div className="max-w-4xl mx-auto">
            <EventsBoard events={events} />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" ref={blogRef} className="py-24 bg-gray-950 relative">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="blog-title text-3xl md:text-5xl font-serif mb-12 text-center">
            Latest <span className="text-gold">Updates</span>
          </h2>
          <AnimatedDivider />
          <div className="blog-grid grid md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="blog-card bg-black rounded-md border border-gray-800 hover:border-gold/50 transition-colors transform hover:scale-105  overflow-hidden"
              >
                {post.imageUrl && (
                  <div className="relative h-[160px] w-full">
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    {post.imageUrl.includes("unsplash.com") && (
                      <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1">
                        Unsplash
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <p className="text-gold text-sm mb-2">
                    {new Date(post.date).toLocaleDateString("en-AU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="text-xl font-serif mb-3">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-gold hover:underline inline-flex items-center"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button
                variant="outline"
                className="blog-button border-gold text-gold hover:bg-gold hover:text-black rounded-none px-8 transform hover:scale-105 transition-transform"
              >
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-24 bg-black relative"
      >
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5 z-0 parallax-bg"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="contact-title text-3xl md:text-5xl font-serif mb-12 text-center">
            Get in <span className="text-gold">Touch</span>
          </h2>
          <AnimatedDivider />
          <div className="max-w-2xl mx-auto">
            <div className="contact-form space-y-6">
              <p className="text-gray-300 mb-6 text-center">
                Have questions about the book, interested in booking Danielle
                for an event, or just want to share your thoughts? Fill out the
                form and we'll get back to you soon.
              </p>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="First Name"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={handleContactInputChange}
                      className="bg-gray-900 border-gray-700 focus:border-gold rounded-none"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Last Name"
                      name="lastName"
                      value={contactFormData.lastName}
                      onChange={handleContactInputChange}
                      className="bg-gray-900 border-gray-700 focus:border-gold rounded-none"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    className={`bg-gray-900 border-gray-700 focus:border-gold rounded-none ${
                      emailValid === false
                        ? "border-red-500"
                        : emailValid === true
                        ? "border-green-500"
                        : ""
                    }`}
                    required
                  />
                  {emailValid === false && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid email address
                    </p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactInputChange}
                    className="bg-gray-900 border-gray-700 focus:border-gold rounded-none min-h-[150px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gold hover:bg-gold/80 text-black rounded-none w-full transform hover:scale-105 transition-transform"
                  disabled={isSubmitting || formSubmitted}
                  onClick={handleContactSubmit}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : formSubmitted ? (
                    "Message Sent!"
                  ) : (
                    "Send Message"
                  )}
                </Button>
                {formSubmitted && (
                  <div className="text-green-500 text-center animate-fadeIn">
                    Thank you for your message! We'll be in touch soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link
                href="#hero"
                className="text-gold font-serif text-2xl"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("hero");
                }}
              >
                Life in Instalments
              </Link>
              <p className="text-gray-400 mt-2">
                © {new Date().getFullYear()} Danielle Sartorelli. All rights
                reserved.
              </p>
            </div>
            <div className="flex gap-8">
              {[
                { id: "about", label: "About" },
                { id: "author", label: "Author" },
                { id: "purchase", label: "Purchase" },
                { id: "reviews", label: "Reviews" },
                { id: "events", label: "Events" },
                { id: "blog", label: "Blog" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-gray-300 hover:text-gold transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-end gap-4 mt-6 md:mt-0">
              <div className="flex gap-4">
                <Link
                  href="accidentalauthor86@gmail.com"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-700 text-gray-300 hover:border-gold hover:text-gold transform hover:scale-110 transition-transform"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href=" https://youtube.com/@accidentalauthor?si=JCkHhugSHi_QPmmm"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-700 text-gray-300 hover:border-gold hover:text-gold transform hover:scale-110 transition-transform"
                  >
                    <Youtube className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61574600643131
"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-700 text-gray-300 hover:border-gold hover:text-gold transform hover:scale-110 transition-transform"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">
                  Website by{" "}
                  <Link
                    href="https://brianmunene.vercel.app"
                    target="_blank"
                    className="text-gold/70 hover:text-gold transition-colors hover:underline"
                  >
                    Kim
                  </Link>
                </p>
                <Link
                  href="/admin"
                  className="text-gray-500 hover:text-gold transition-colors"
                >
                  <Lock className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
