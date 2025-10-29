"use client"

import { useState } from "react"
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")

  const applyFormatting = (format: string) => {
    const textarea = document.getElementById("rich-text-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "ul":
        formattedText = selectedText
          .split("\n")
          .map((line) => (line ? `- ${line}` : ""))
          .join("\n")
        break
      case "ol":
        formattedText = selectedText
          .split("\n")
          .map((line, i) => (line ? `${i + 1}. ${line}` : ""))
          .join("\n")
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        break
      case "image":
        formattedText = `![${selectedText || "Descriere imagine"}](url)`
        break
      case "align-left":
        formattedText = `<div style="text-align: left">${selectedText}</div>`
        break
      case "align-center":
        formattedText = `<div style="text-align: center">${selectedText}</div>`
        break
      case "align-right":
        formattedText = `<div style="text-align: right">${selectedText}</div>`
        break
      default:
        formattedText = selectedText
    }

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)
    onChange(newValue)

    // Repoziționează cursorul după textul formatat
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  // Funcție simplă pentru a converti markdown în HTML pentru previzualizare
  const markdownToHtml = (markdown: string) => {
    const html = markdown
      // Înlocuiește bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Înlocuiește italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Înlocuiește liste neordonate
      .replace(/^- (.*?)$/gm, "<li>$1</li>")
      .replace(/(<li>.*?<\/li>)+/g, "<ul>$&</ul>")
      // Înlocuiește liste ordonate
      .replace(/^\d+\. (.*?)$/gm, "<li>$1</li>")
      .replace(/(<li>.*?<\/li>)+/g, "<ol>$&</ol>")
      // Înlocuiește link-uri
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2">$1</a>')
      // Înlocuiește imagini
      .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" style="max-width: 100%;">')
      // Înlocuiește paragrafe
      .replace(/^(?!<[uo]l>|<li>|<\/[uo]l>|<\/li>)(.*?)$/gm, "<p>$1</p>")
      // Elimină paragrafele goale
      .replace(/<p><\/p>/g, "")

    return html
  }

  return (
    <div className={cn("rounded-md border", className)}>
      <div className="flex flex-wrap gap-1 border-b bg-muted/50 p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("bold")}
          title="Bold"
          className="h-8 w-8 p-0"
          type="button"
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("italic")}
          title="Italic"
          className="h-8 w-8 p-0"
          type="button"
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <div className="mx-1 h-8 w-px bg-muted-foreground/20" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("ul")}
          title="Listă neordonată"
          className="h-8 w-8 p-0"
          type="button"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Listă neordonată</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("ol")}
          title="Listă ordonată"
          className="h-8 w-8 p-0"
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Listă ordonată</span>
        </Button>
        <div className="mx-1 h-8 w-px bg-muted-foreground/20" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("align-left")}
          title="Aliniere stânga"
          className="h-8 w-8 p-0"
          type="button"
        >
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Aliniere stânga</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("align-center")}
          title="Aliniere centru"
          className="h-8 w-8 p-0"
          type="button"
        >
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Aliniere centru</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("align-right")}
          title="Aliniere dreapta"
          className="h-8 w-8 p-0"
          type="button"
        >
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Aliniere dreapta</span>
        </Button>
        <div className="mx-1 h-8 w-px bg-muted-foreground/20" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("link")}
          title="Adaugă link"
          className="h-8 w-8 p-0"
          type="button"
        >
          <Link className="h-4 w-4" />
          <span className="sr-only">Adaugă link</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting("image")}
          title="Adaugă imagine"
          className="h-8 w-8 p-0"
          type="button"
        >
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">Adaugă imagine</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")} className="w-full">
        <div className="flex items-center justify-between px-4 py-2">
          <TabsList>
            <TabsTrigger value="edit">Editare</TabsTrigger>
            <TabsTrigger value="preview">Previzualizare</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="edit" className="p-0">
          <textarea
            id="rich-text-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[200px] w-full resize-y rounded-b-md border-0 p-4 focus:outline-none"
            placeholder="Introduceți conținutul aici..."
          />
        </TabsContent>
        <TabsContent value="preview" className="border-t p-4">
          <div className="prose min-h-[200px] max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
