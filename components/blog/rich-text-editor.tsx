"use client"

import type React from "react"

import { useState } from "react"
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  minHeight?: string
}

export default function RichTextEditor({ value, onChange, minHeight = "300px" }: RichTextEditorProps) {
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)

  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setSelection({
      start: target.selectionStart,
      end: target.selectionEnd,
    })
  }

  const insertFormat = (format: string) => {
    if (!selection) return

    const before = value.substring(0, selection.start)
    const selected = value.substring(selection.start, selection.end)
    const after = value.substring(selection.end)

    let newText = ""

    switch (format) {
      case "bold":
        newText = `${before}**${selected}**${after}`
        break
      case "italic":
        newText = `${before}*${selected}*${after}`
        break
      case "h1":
        newText = `${before}# ${selected}${after}`
        break
      case "h2":
        newText = `${before}## ${selected}${after}`
        break
      case "h3":
        newText = `${before}### ${selected}${after}`
        break
      case "quote":
        newText = `${before}> ${selected}${after}`
        break
      case "ul":
        newText = `${before}- ${selected}${after}`
        break
      case "ol":
        newText = `${before}1. ${selected}${after}`
        break
      case "paragraph":
        newText = `${before}\n\n${selected}${after}`
        break
      default:
        newText = value
    }

    onChange(newText)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-800 rounded-t-md border border-gray-700">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("bold")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("italic")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("h1")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("h2")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("h3")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("ul")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("ol")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("quote")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertFormat("paragraph")}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          New Paragraph
        </Button>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleTextareaSelect}
        className="bg-gray-800 border-gray-700 focus:border-gold rounded-t-none min-h-[300px]"
        style={{ minHeight }}
      />

      <div className="text-xs text-gray-400">
        <p>Use double line breaks for paragraphs. You can use basic Markdown formatting:</p>
        <ul className="list-disc pl-4 mt-1 space-y-1">
          <li>
            <code>**bold**</code> for <strong>bold</strong>
          </li>
          <li>
            <code>*italic*</code> for <em>italic</em>
          </li>
          <li>
            <code># Heading</code> for headings
          </li>
          <li>
            <code>- item</code> for bullet lists
          </li>
          <li>
            <code>1. item</code> for numbered lists
          </li>
          <li>
            <code>&gt; quote</code> for blockquotes
          </li>
        </ul>
      </div>
    </div>
  )
}

