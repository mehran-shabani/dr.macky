import type { Metadata } from 'next'
import type { Post } from 'contentlayer/generated'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function buildArticleMeta(post: Post): Metadata {
  const ogImage = post.cover 
    ? `${siteUrl}${post.cover}` 
    : `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`

  return {
    title: post.title,
    description: post.summary,
    authors: post.authors.map((handle) => ({ name: handle })),
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      url: `${siteUrl}/posts/${post.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
    alternates: {
      canonical: post.canonical || `${siteUrl}/posts/${post.slug}`,
    },
  }
}

export function generateArticleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    image: post.cover ? `${siteUrl}${post.cover}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.authors.map((handle) => ({
      '@type': 'Person',
      name: handle,
    })),
    publisher: {
      '@type': 'Organization',
      name: 'وبلاگ علمی',
      url: siteUrl,
    },
  }
}
