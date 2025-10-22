import type { Metadata } from 'next'
import { getPostsByTag, getAllTags } from '@/lib/contentlayer'
import { PostCard } from '@/components/post-card'
import { MainNav } from '@/components/nav/main-nav'

export const revalidate = 3600

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  return {
    title: `برچسب: ${decodeURIComponent(tag)}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag)
  const posts = getPostsByTag(tag)

  return (
    <div className="min-h-screen">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">برچسب: {tag}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">مطلبی با این برچسب پیدا نشد.</p>
          </div>
        )}
      </main>
    </div>
  )
}
