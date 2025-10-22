import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { getPostBySlug, getRelatedPosts } from '@/lib/contentlayer'
import { buildArticleMeta, generateArticleJsonLd } from '@/lib/seo'
import { MainNav } from '@/components/nav/main-nav'
import { Prose } from '@/components/mdx/prose'
import { Mdx } from '@/components/mdx/mdx-components'
import { PostCard } from '@/components/post-card'
import { formatDate, readingTimeText } from '@/lib/utils'
import { getSubcategoryInfo, getCategoryInfo } from '@/lib/taxonomy'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export const revalidate = 3600

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allPosts
    .filter((post) => post.status === 'published')
    .map((post) => ({
      slug: post.slug,
    }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return buildArticleMeta(post)
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)
  const subcategoryInfo = getSubcategoryInfo(post.subcategory)
  const categoryInfo = getCategoryInfo(post.category)
  const jsonLd = generateArticleJsonLd(post)

  return (
    <div className="min-h-screen">
      <MainNav />
      
      <article className="container mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            خانه
          </Link>
          <span>/</span>
          <Link href={`/categories/${post.category}`} className="hover:text-foreground">
            {categoryInfo?.title}
          </Link>
          <span>/</span>
          <Link href={`/subcategories/${post.subcategory}`} className="hover:text-foreground">
            {subcategoryInfo?.title}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-primary">{subcategoryInfo?.title}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{readingTimeText(post.readingTime)}</span>
              </>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight">{post.title}</h1>
          
          <p className="text-lg text-muted-foreground">{post.summary}</p>

          {post.authors && post.authors.length > 0 && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">نویسنده:</span>
              {post.authors.map((author, index) => (
                <span key={author}>
                  <Link
                    href={`/authors/${author}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {author}
                  </Link>
                  {index < post.authors.length - 1 && <span className="mr-1">,</span>}
                </span>
              ))}
            </div>
          )}

          {post.source && (
            <div className="mt-2 text-sm text-muted-foreground">
              منبع: {post.source}
            </div>
          )}
        </header>

        <Separator className="mb-8" />

        {/* Content */}
        <Prose>
          <Mdx code={post.body.code} />
        </Prose>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12">
            <Separator className="mb-6" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">مطالب مرتبط</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>
    </div>
  )
}
