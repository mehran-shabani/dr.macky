import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsBySubcategory } from '@/lib/contentlayer'
import { getSubcategoryInfo, subcategories } from '@/lib/taxonomy'
import { PostCard } from '@/components/post-card'
import { MainNav } from '@/components/nav/main-nav'

export const revalidate = 3600

interface SubcategoryPageProps {
  params: {
    subcategory: string
  }
}

export async function generateStaticParams() {
  return Object.keys(subcategories).map((subcategory) => ({
    subcategory,
  }))
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const subcategoryInfo = getSubcategoryInfo(params.subcategory)
  if (!subcategoryInfo) return {}

  return {
    title: subcategoryInfo.title,
  }
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const subcategoryInfo = getSubcategoryInfo(params.subcategory)
  if (!subcategoryInfo) {
    notFound()
  }

  const posts = getPostsBySubcategory(params.subcategory)

  return (
    <div className="min-h-screen">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{subcategoryInfo.title}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">مطلبی در این زیربخش منتشر نشده است.</p>
          </div>
        )}
      </main>
    </div>
  )
}
