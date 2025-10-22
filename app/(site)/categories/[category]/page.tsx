import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory } from '@/lib/contentlayer'
import { getCategoryInfo, getSubcategoriesByCategory, categories } from '@/lib/taxonomy'
import { PostCard } from '@/components/post-card'
import { MainNav } from '@/components/nav/main-nav'
import Link from 'next/link'

export const revalidate = 3600

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryInfo = getCategoryInfo(category)
  if (!categoryInfo) return {}

  return {
    title: categoryInfo.title,
    description: categoryInfo.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryInfo = getCategoryInfo(category)
  if (!categoryInfo) {
    notFound()
  }

  const posts = getPostsByCategory(category)
  const subcategories = getSubcategoriesByCategory(category)

  return (
    <div className="min-h-screen">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{categoryInfo.title}</h1>
          <p className="text-muted-foreground">{categoryInfo.description}</p>
        </div>

        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">زیربخش‌ها</h2>
            <div className="flex flex-wrap gap-3">
              {subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/subcategories/${sub.slug}`}
                  className="rounded-lg border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  {sub.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">مطلبی در این دسته منتشر نشده است.</p>
          </div>
        )}
      </main>
    </div>
  )
}
