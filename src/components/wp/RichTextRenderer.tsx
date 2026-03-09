interface RichTextRendererProps {
  html: string
  className?: string
}

export function RichTextRenderer({ html, className = "" }: RichTextRendererProps) {
  return (
    <div
      className={`prose prose-slate prose-lg max-w-none prose-headings:font-heading prose-a:text-u20-orange prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
