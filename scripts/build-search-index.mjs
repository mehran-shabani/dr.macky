import { writeFileSync } from 'fs'
import { allPosts } from '../.contentlayer/generated/index.mjs'
import MiniSearch from 'minisearch'

const posts = allPosts
  .filter((post) => post.status === 'published')
  .map((post) => ({
    id: post.slug,
    title: post.title,
    summary: post.summary,
    category: post.category,
    subcategory: post.subcategory,
    tags: post.tags || [],
  }))

const miniSearch = new MiniSearch({
  fields: ['title', 'summary', 'tags'],
  storeFields: ['title', 'summary', 'category', 'subcategory', 'tags', 'id'],
  searchOptions: {
    boost: { title: 2 },
    fuzzy: 0.2,
    prefix: true,
  },
})

miniSearch.addAll(posts)

writeFileSync('public/search-index.json', JSON.stringify(miniSearch))
console.log(`✓ Search index built with ${posts.length} posts`)
