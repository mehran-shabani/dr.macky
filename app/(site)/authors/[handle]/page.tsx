import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByAuthor, getAuthorByHandle } from '@/lib/contentlayer'
import { allAuthors } from 'contentlayer/generated'
import { PostCard } from '@/components/post-card'
import { MainNav } from '@/components/nav/main-nav'

export const revalidate = 3600

interface AuthorPageProps {
  params: Promise<{
    handle: string
  }>
}

export async function generateStaticParams() {
  return allAuthors.map((author) => ({
    handle: author.handle,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { handle } = await params
  const author = getAuthorByHandle(handle)
  if (!author) return {}

  return {
    title: author.name,
    description: author.bio,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { handle } = await params
  const author = getAuthorByHandle(handle)
  if (!author) {
    notFound()
  }

  const posts = getPostsByAuthor(handle)

  return (
    <div className="min-h-screen">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{author.name}</h1>
          <p className="text-muted-foreground">{author.bio}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">این نویسنده هنوز مطلبی منتشر نکرده است.</p>
          </div>
        )}
      </main>
    </div>
  )
}
