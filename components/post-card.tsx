import Link from 'next/link'
import Image from 'next/image'
import type { Post } from 'contentlayer/generated'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatDate, readingTimeText } from '@/lib/utils'
import { getSubcategoryInfo } from '@/lib/taxonomy'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const subcategoryInfo = getSubcategoryInfo(post.subcategory)

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={post.url}>
        {post.cover && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-primary">{subcategoryInfo?.title}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{readingTimeText(post.readingTime)}</span>
              </>
            )}
          </div>
          <h3 className="text-xl font-bold leading-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
