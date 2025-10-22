import Link from 'next/link'
import { categories } from '@/lib/taxonomy'
import { ThemeToggle } from '@/components/theme-toggle'

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="ml-6 flex items-center gap-2">
          <span className="text-xl font-bold">وبلاگ علمی</span>
        </Link>

        <nav className="mr-auto flex gap-6">
          {Object.entries(categories).map(([slug, info]) => (
            <Link
              key={slug}
              href={`/categories/${slug}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {info.title}
            </Link>
          ))}
        </nav>

        <div className="ml-6 flex items-center gap-4">
          <Link
            href="/search"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            جست‌وجو
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
