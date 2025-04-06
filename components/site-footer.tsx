import type React from "react"

interface FooterLink {
  label: string
  href: string
}

interface SiteFooterProps {
  companyName: string
  year: number
  footerLinks: FooterLink[]
  contactEmail: string
}

const SiteFooter: React.FC<SiteFooterProps> = ({ companyName, year, footerLinks, contactEmail }) => {
  // Filter out any links with "events" in the label or href
  const filteredFooterLinks = footerLinks.filter(
    (link) => !(link.label.toLowerCase().includes("events") || link.href.toLowerCase().includes("events")),
  )

  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          &copy; {year} {companyName}. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-4 mt-2">
          {filteredFooterLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="text-gray-500 hover:text-gray-700">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-gray-600 mt-2">
          Contact us:{" "}
          <a href={`mailto:${contactEmail}`} className="text-blue-500 hover:text-blue-700">
            {contactEmail}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter

