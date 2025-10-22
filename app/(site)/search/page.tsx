'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { MainNav } from '@/components/nav/main-nav'
import { deserializeSearchIndex } from '@/lib/search'
import type { SearchDocument } from '@/lib/search'
import { getSubcategoryInfo } from '@/lib/taxonomy'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [indexLoaded, setIndexLoaded] = useState(false)
  const [searchIndex, setSearchIndex] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchSearchIndex = useCallback(async () => {
    setError(null)
    setIndexLoaded(false)
    setSearchIndex(null)

    try {
      const res = await fetch('/search-index.json')
      if (!res.ok) {
        setError('بارگذاری ایندکس جست‌وجو با مشکل مواجه شد. لطفاً دوباره تلاش کنید.')
        setIndexLoaded(true)
        setLoading(false)
        setResults([])
        return
      }

      const data = await res.text()
      const index = deserializeSearchIndex(data)
      setSearchIndex(index)
      setIndexLoaded(true)
    } catch (err) {
      console.error('Failed to load search index:', err)
      setError('بارگذاری ایندکس جست‌وجو با مشکل مواجه شد. لطفاً دوباره تلاش کنید.')
      setIndexLoaded(true)
      setLoading(false)
      setResults([])
    }
  }, [])

  useEffect(() => {
    // Load search index on mount
    fetchSearchIndex()
  }, [fetchSearchIndex])

  useEffect(() => {
    if (!indexLoaded || !searchIndex || query.length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const searchResults = searchIndex.search(query, { limit: 20 })
      setResults(searchResults)
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [query, indexLoaded, searchIndex])

  return (
    <div className="min-h-screen">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">جست‌وجو</h1>
          <input
            type="search"
            placeholder="جست‌وجوی مطالب..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-2xl rounded-lg border bg-background px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </div>

        {!indexLoaded && !error && (
          <div className="text-center text-muted-foreground">در حال بارگذاری ایندکس جست‌وجو...</div>
        )}

        {loading && <div className="text-center text-muted-foreground">در حال جست‌وجو...</div>}

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center">
            <p className="text-destructive">{error}</p>
            <button
              type="button"
              onClick={fetchSearchIndex}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              تلاش مجدد
            </button>
          </div>
        )}

        {query.length > 0 && query.length < 2 && (
          <div className="text-center text-muted-foreground">
            لطفاً حداقل ۲ کاراکتر وارد کنید
          </div>
        )}

        {indexLoaded && !error && query.length >= 2 && !loading && results.length === 0 && (
          <div className="text-center text-muted-foreground">نتیجه‌ای یافت نشد</div>
        )}

        {results.length > 0 && !error && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {results.length} نتیجه یافت شد
            </p>
            {results.map((result: any) => {
              const subcategoryInfo = getSubcategoryInfo(result.subcategory)
              return (
                <Link
                  key={result.id}
                  href={`/posts/${result.id}`}
                  className="block rounded-lg border p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="mb-2 text-xs text-primary">{subcategoryInfo?.title}</div>
                  <h3 className="mb-2 text-xl font-bold">{result.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{result.summary}</p>
                  {result.tags && result.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
