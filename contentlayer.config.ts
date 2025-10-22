import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    category: { 
      type: 'enum',
      options: ['advanced-tech', 'basic-sciences', 'bio-health', 'earth-environment', 'special'],
      required: true 
    },
    subcategory: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    summary: { type: 'string', required: true },
    cover: { type: 'string' },
    publishedAt: { type: 'date', required: true },
    updatedAt: { type: 'date' },
    status: { 
      type: 'enum',
      options: ['published', 'draft'],
      default: 'published'
    },
    canonical: { type: 'string' },
    readingTime: { type: 'number' },
    source: { type: 'string' },
  },
  computedFields: {
    url: { 
      type: 'string', 
      resolve: (post) => `/posts/${post.slug}` 
    },
    structuredData: {
      type: 'json',
      resolve: (post) => ({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.summary,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: post.authors.map((author: string) => ({
          '@type': 'Person',
          name: author,
        })),
      }),
    },
  },
}))

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: `authors/*.json`,
  contentType: 'data',
  fields: {
    handle: { type: 'string', required: true },
    name: { type: 'string', required: true },
    bio: { type: 'string', required: true },
    avatar: { type: 'string' },
    twitter: { type: 'string' },
    email: { type: 'string' },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Author],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
