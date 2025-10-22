import { getPublishedPosts } from '@/lib/contentlayer'
import { categories, subcategories } from '@/lib/taxonomy'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET() {
  const posts = getPublishedPosts()

  const postUrls = posts.map(
    (post) => `
  <url>
    <loc>${siteUrl}/posts/${post.slug}</loc>
    <lastmod>${post.updatedAt || post.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )

  const categoryUrls = Object.keys(categories).map(
    (category) => `
  <url>
    <loc>${siteUrl}/categories/${category}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
  )

  const subcategoryUrls = Object.keys(subcategories).map(
    (subcategory) => `
  <url>
    <loc>${siteUrl}/subcategories/${subcategory}</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>`
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/search</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  ${postUrls.join('')}
  ${categoryUrls.join('')}
  ${subcategoryUrls.join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}
