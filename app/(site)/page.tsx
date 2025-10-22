import { getPublishedPosts } from '@/lib/contentlayer'
import { PostCard } from '@/components/post-card'
import { MainNav } from '@/components/nav/main-nav'

export const revalidate = 3600 // ISR: revalidate every hour

export default function HomePage() {
  const posts = getPublishedPosts()

  return (
    <div className="min-h-screen">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">وبلاگ علمی</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            آخرین یافته‌های علمی در حوزه فناوری، علوم پایه، زیست‌شناسی و محیط‌زیست
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">هنوز مطلبی منتشر نشده است.</p>
          </div>
        )}
      </main>
    </div>
  )
}
