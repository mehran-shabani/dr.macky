import { allPosts } from '../.contentlayer/generated/index.mjs'
import { z } from 'zod'

const categories = ['advanced-tech', 'basic-sciences', 'bio-health', 'earth-environment', 'special']

const frontmatterSchema = z.object({
  title: z.string().min(10).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(categories),
  subcategory: z.string(),
  tags: z.array(z.string()).optional(),
  authors: z.array(z.string()).min(1),
  summary: z.string().min(160).max(220),
  cover: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  status: z.enum(['published', 'draft']),
  canonical: z.string().url().optional(),
  readingTime: z.number().positive().optional(),
  source: z.string().optional(),
})

let hasErrors = false

console.log('🔍 Validating frontmatter for', allPosts.length, 'posts...\n')

for (const post of allPosts) {
  try {
    frontmatterSchema.parse({
      title: post.title,
      slug: post.slug,
      category: post.category,
      subcategory: post.subcategory,
      tags: post.tags,
      authors: post.authors,
      summary: post.summary,
      cover: post.cover,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      status: post.status,
      canonical: post.canonical,
      readingTime: post.readingTime,
      source: post.source,
    })
    console.log('✓', post.slug)
  } catch (error) {
    hasErrors = true
    console.error('✗', post.slug)
    console.error(error.errors)
    console.error()
  }
}

if (hasErrors) {
  console.error('\n❌ Frontmatter validation failed')
  process.exit(1)
} else {
  console.log('\n✅ All frontmatter is valid')
}
