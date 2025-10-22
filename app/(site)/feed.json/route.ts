import { getPublishedPosts } from '@/lib/contentlayer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET() {
  const posts = getPublishedPosts()

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'وبلاگ علمی',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: 'آخرین یافته‌های علمی در حوزه فناوری، علوم پایه، زیست‌شناسی و محیط‌زیست',
    language: 'fa',
    items: posts.map((post) => ({
      id: `${siteUrl}/posts/${post.slug}`,
      url: `${siteUrl}/posts/${post.slug}`,
      title: post.title,
      content_text: post.summary,
      summary: post.summary,
      date_published: post.publishedAt,
      date_modified: post.updatedAt || post.publishedAt,
      authors: post.authors.map((handle) => ({ name: handle })),
      tags: post.tags || [],
      image: post.cover ? `${siteUrl}${post.cover}` : undefined,
    })),
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}
