import type React from "react"
import Link from "next/link"

const SiteHeader: React.FC = () => {
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Get a Copy", href: "/get-a-copy" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Awesome Site</h1>
          <nav>
            <ul className="flex space-x-4">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 hover:text-gray-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader

