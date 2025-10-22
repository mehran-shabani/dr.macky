import { allPosts, allAuthors } from 'contentlayer/generated'
import type { Post, Author } from 'contentlayer/generated'

export function getPublishedPosts(): Post[] {
  return allPosts
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug && post.status === 'published')
}

export function getPostsByCategory(category: string): Post[] {
  return getPublishedPosts().filter((post) => post.category === category)
}

export function getPostsBySubcategory(subcategory: string): Post[] {
  return getPublishedPosts().filter((post) => post.subcategory === subcategory)
}

export function getPostsByTag(tag: string): Post[] {
  return getPublishedPosts().filter((post) => post.tags?.includes(tag))
}

export function getPostsByAuthor(authorHandle: string): Post[] {
  return getPublishedPosts().filter((post) => post.authors?.includes(authorHandle))
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  getPublishedPosts().forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getAuthorByHandle(handle: string): Author | undefined {
  return allAuthors.find((author) => author.handle === handle)
}

export function getRelatedPosts(post: Post, limit: number = 3): Post[] {
  const allPublished = getPublishedPosts().filter((p) => p.slug !== post.slug)
  
  // Score posts by relevance
  const scored = allPublished.map((p) => {
    let score = 0
    
    // Same subcategory gets highest weight
    if (p.subcategory === post.subcategory) score += 10
    
    // Same category
    if (p.category === post.category) score += 5
    
    // Shared tags
    const sharedTags = p.tags?.filter((tag) => post.tags?.includes(tag)) || []
    score += sharedTags.length * 3
    
    return { post: p, score }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}
