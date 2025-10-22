# معماری وبلاگ علمی

این سند شرح کاملی از معماری، تصمیمات طراحی و جریان داده در پروژه را ارائه می‌دهد.

## نمای کلی معماری

```
┌─────────────────────────────────────────────────────────┐
│                      کاربر (Browser)                    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js 15 App Router (RSC)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Static     │  │     ISR      │  │   Dynamic    │  │
│  │    Pages     │  │   (3600s)    │  │   (Search)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Contentlayer                          │
│         (تبدیل MDX → Type-safe Objects)                │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Content (MDX Files)                    │
│     content/posts/*.mdx + content/authors/*.json        │
└─────────────────────────────────────────────────────────┘
```

## لایه‌های معماری

### 1. لایه نمایش (Presentation Layer)

**مسئولیت**: رابط کاربری و تعامل با کاربر

**فناوری‌ها**:
- React Server Components (RSC)
- Tailwind CSS + RTL
- Shadcn UI Components
- next-themes برای Dark/Light mode

**کامپوننت‌های کلیدی**:
```
components/
├── ui/              # کامپوننت‌های پایه (Button, Card, ...)
├── mdx/             # کامپوننت‌های MDX (Prose, Callout, ...)
├── nav/             # ناوبری (MainNav)
├── post-card.tsx    # کارت نمایش مطلب
└── theme-toggle.tsx # تغییر تم
```

### 2. لایه مسیریابی (Routing Layer)

**مسئولیت**: مدیریت URL‌ها و صفحات

**ساختار**:
```
app/(site)/
├── page.tsx                    # صفحه اصلی
├── posts/[slug]/page.tsx       # صفحه مطلب (SSG + ISR)
├── categories/[cat]/page.tsx   # لیست دسته (SSG + ISR)
├── subcategories/[sub]/...     # لیست زیربخش
├── tags/[tag]/page.tsx         # لیست برچسب
├── authors/[handle]/...        # صفحه نویسنده
├── search/page.tsx             # جست‌وجو (CSR)
├── rss/route.ts                # RSS Feed
├── feed.json/route.ts          # JSON Feed
└── sitemap.xml/route.ts        # Sitemap
```

**استراتژی رندر**:
- **SSG (Static Site Generation)**: همه صفحات در build time
- **ISR (Incremental Static Regeneration)**: revalidate هر 3600 ثانیه
- **CSR (Client-Side Rendering)**: صفحه جست‌وجو

### 3. لایه داده (Data Layer)

**مسئولیت**: مدیریت و کوئری محتوا

**Contentlayer**:
```typescript
// تبدیل خودکار MDX به Objects
Post {
  title: string
  slug: string
  category: Category
  subcategory: string
  body: { code: string }
  ...
}
```

**توابع کوئری** (`lib/contentlayer.ts`):
```typescript
getPublishedPosts()           // همه پست‌های منتشر شده
getPostBySlug(slug)           // یک پست خاص
getPostsByCategory(cat)       // پست‌های یک دسته
getPostsBySubcategory(sub)    // پست‌های یک زیربخش
getPostsByTag(tag)            // پست‌های یک برچسب
getRelatedPosts(post)         // پست‌های مرتبط
```

### 4. لایه محتوا (Content Layer)

**مسئولیت**: ذخیره و سازماندهی محتوا

**ساختار**:
```
content/
├── posts/
│   └── YYYY/MM/
│       ├── post-1.mdx
│       └── post-2.mdx
└── authors/
    ├── author-1.json
    └── author-2.json
```

**Frontmatter Schema** (با Zod):
```typescript
{
  title: string (10-200 chars)
  slug: string (url-safe)
  category: enum[5]
  subcategory: string
  tags?: string[]
  authors: string[]
  summary: string (160-220 chars)
  publishedAt: date
  status: 'published' | 'draft'
  ...
}
```

## جریان داده (Data Flow)

### 1. Build Time

```
MDX Files → Contentlayer → Type-safe Objects → SSG Pages
                ↓
         Search Index (MiniSearch JSON)
```

### 2. Runtime - لیست صفحات

```
Request → Next.js → lib/contentlayer → allPosts
                         ↓
                    Filter & Sort
                         ↓
                   PostCard Components
                         ↓
                    HTML Response
```

### 3. Runtime - صفحه مطلب

```
Request /posts/[slug] → getPostBySlug(slug)
                              ↓
                         Post Object
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
              MDX to HTML        Related Posts
                    ↓                   ↓
                  Prose              PostCards
                    └─────────┬─────────┘
                              ↓
                        HTML Response
```

### 4. جست‌وجو

```
User Input → Client → Fetch /search-index.json (once)
                              ↓
                       MiniSearch.search(query)
                              ↓
                      Ranked Results
                              ↓
                        UI Update
```

## Taxonomy System

دسته‌بندی سلسله‌مراتبی:

```
Category (5 عدد)
    ├── Subcategory (25+ عدد)
    │       └── Post (N عدد)
    └── Tags (آزاد)
```

**مثال**:
```
advanced-tech (Category)
    ├── ai-ml (Subcategory)
    │     ├── Post: "انقلاب LLM"
    │     │   Tags: ["LLM", "هوش مصنوعی"]
    │     └── Post: "یادگیری تقویتی"
    └── robotics (Subcategory)
          └── Post: "رباات انسان‌نما"
```

**قوانین**:
- هر پست دقیقاً **یک** دسته اصلی
- هر پست دقیقاً **یک** زیربخش
- تگ‌ها اختیاری و آزاد

## SEO Strategy

### On-Page SEO

```typescript
// metadata در هر صفحه
export const metadata: Metadata = {
  title: "...",
  description: "...",
  openGraph: { ... },
  twitter: { ... },
  alternates: {
    canonical: "...",
  }
}
```

### Structured Data

```html
<!-- JSON-LD در صفحه مطلب -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "...",
  "author": [...]
}
</script>
```

### Feeds & Sitemaps

```
/rss          → RSS 2.0 Feed
/feed.json    → JSON Feed 1.1
/sitemap.xml  → XML Sitemap
/robots.txt   → Robots directives
```

## Performance Optimizations

### 1. Static Generation

- همه صفحات در build time ساخته می‌شوند
- HTML ایستا → سرعت بالا + هزینه پایین

### 2. ISR (Incremental Static Regeneration)

```typescript
export const revalidate = 3600 // هر ساعت
```

- صفحات قدیمی به‌روز می‌شوند
- بدون نیاز به rebuild کامل

### 3. Font Optimization

```typescript
// فونت محلی با next/font
const iranSansX = localFont({
  src: [...],
  display: 'swap',
})
```

### 4. Image Optimization

```tsx
<Image
  src="..."
  alt="..."
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 5. Code Splitting

- خودکار توسط Next.js
- هر route bundle جداگانه
- Dynamic imports برای کامپوننت‌های سنگین

## Security

### Content Security

- Contentlayer escape می‌کند HTML خطرناک
- MDX components محدود به whitelist

### Environment Variables

```env
# Public (در client)
NEXT_PUBLIC_SITE_URL=...

# Private (فقط server)
PREVIEW_TOKEN=...
```

### Headers

```typescript
// next.config.mjs
headers: [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      ...
    ]
  }
]
```

## Testing Strategy

### 1. Type Safety

```bash
npm run type-check  # TypeScript
```

### 2. Linting

```bash
npm run lint        # ESLint
npm run format      # Prettier
```

### 3. Content Validation

```bash
npm run validate    # Frontmatter schema
```

### 4. Build Test

```bash
npm run build       # تست build موفق
```

## Deployment

### Build Process

```bash
1. npm run build:search     # ساخت ایندکس جست‌وجو
2. contentlayer build       # پردازش MDX
3. next build               # ساخت Next.js
```

### Environment Setup

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Recommended Platforms

1. **Vercel** (بهترین)
   - ادغام کامل با Next.js
   - ISR خودکار
   - Edge Network

2. **Netlify**
   - ISR با On-Demand Builders
   - Forms و Functions

3. **Self-hosted**
   - Docker
   - Node.js Server
   - Reverse Proxy (nginx/caddy)

## Scalability Considerations

### محتوا

- **فعلی**: تا 1000 پست
- **آینده**: 
  - Database (PostgreSQL + Drizzle)
  - CMS (Sanity/Contentful)

### جست‌وجو

- **فعلی**: MiniSearch client-side
- **آینده**:
  - Algolia / Meilisearch
  - Elasticsearch

### تصاویر

- **فعلی**: /public + next/image
- **آینده**:
  - CDN (Cloudinary/ImageKit)
  - Optimized delivery

## Monitoring & Analytics

### Analytics (Privacy-friendly)

```typescript
// Plausible
<script defer data-domain="yourdomain.com" 
  src="https://plausible.io/js/script.js"></script>

// یا Umami
<script async defer
  data-website-id="..."
  src="https://analytics.umami.is/script.js"></script>
```

### Performance Monitoring

- Next.js Analytics (Vercel)
- Web Vitals
- Error Tracking (Sentry)

## Future Enhancements

### Phase 2
- [ ] Newsletter subscription
- [ ] Comments (giscus/utterances)
- [ ] Reading progress indicator
- [ ] Table of Contents (auto-generated)
- [ ] Series/Collections

### Phase 3
- [ ] Multi-language (i18n)
- [ ] Podcast integration
- [ ] Video embeds
- [ ] Interactive diagrams
- [ ] LaTeX equations

### Phase 4
- [ ] API endpoints
- [ ] Member-only content
- [ ] Advanced search filters
- [ ] Bookmarks/Reading list
- [ ] Author profiles with social

---

این معماری برای **مقیاس‌پذیری**، **عملکرد** و **تجربه توسعه‌دهنده** بهینه شده است.
