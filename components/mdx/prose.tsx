import { cn } from '@/lib/utils'

interface ProseProps {
  children: React.ReactNode
  className?: string
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        // Headings
        'prose-headings:font-bold prose-headings:tracking-tight',
        'prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4',
        'prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4',
        'prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3',
        // Links
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        // Code
        'prose-code:rounded-md prose-code:border prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5',
        'prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:rounded-lg prose-pre:border prose-pre:bg-muted',
        // Lists
        'prose-li:my-1',
        // Images
        'prose-img:rounded-lg prose-img:border',
        // Blockquotes
        'prose-blockquote:border-r-4 prose-blockquote:border-l-0 prose-blockquote:pr-4 prose-blockquote:pl-0',
        'prose-blockquote:not-italic prose-blockquote:font-normal',
        className
      )}
    >
      {children}
    </div>
  )
}
