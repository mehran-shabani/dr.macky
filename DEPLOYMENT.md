# راهنمای استقرار و CI/CD

این پروژه با سیستم‌های کامل CI/CD، Auto-Release و PWA پیکربندی شده است.

## 📋 فهرست مطالب

- [پیش‌نیازها](#پیش‌نیازها)
- [GitHub Actions](#github-actions)
- [Auto Release & Tagging](#auto-release--tagging)
- [استقرار خودکار](#استقرار-خودکار)
- [PWA و Mobile](#pwa-و-mobile)
- [تنظیمات محیط](#تنظیمات-محیط)

## 🔧 پیش‌نیازها

### متغیرهای محیطی

در GitHub repository خود، متغیرهای زیر را در Settings > Secrets تنظیم کنید:

```bash
GITHUB_TOKEN          # خودکار توسط GitHub تنظیم می‌شود
NEXT_PUBLIC_SITE_URL  # آدرس کامل سایت شما
```

### برای استقرار روی Vercel (اختیاری):

```bash
VERCEL_TOKEN          # توکن Vercel
ORG_ID               # شناسه سازمان Vercel
PROJECT_ID           # شناسه پروژه Vercel
```

## 🚀 GitHub Actions

### 1. CI Workflow (`.github/workflows/ci.yml`)

این workflow به صورت خودکار برای هر push و pull request اجرا می‌شود:

**مراحل:**
- ✅ Linting (ESLint)
- ✅ Type checking (TypeScript)
- ✅ Prettier formatting check
- ✅ Content validation
- ✅ Build testing
- ✅ Unit tests
- ✅ E2E tests

**راه‌اندازی:**
```bash
# نصب dependencies
npm install

# اجرای تست‌ها به صورت محلی
npm run lint
npm run type-check
npm run test
npm run test:e2e
```

### 2. Release Workflow (`.github/workflows/release.yml`)

Release خودکار با Semantic Versioning:

**ویژگی‌ها:**
- 🏷️ تگ‌گذاری خودکار بر اساس commit messages
- 📝 تولید CHANGELOG.md
- 🚀 Release notes خودکار
- 📦 آپلود artifacts

**فرمت Commit Messages:**

```bash
# Minor release (1.x.0)
feat: add new search feature
feat(ui): improve mobile navigation

# Patch release (1.0.x)
fix: resolve mobile scrolling issue
perf: optimize image loading

# Major release (x.0.0)
breaking: change API structure

# بدون release
docs: update README
chore: update dependencies
style: fix formatting
```

### 3. Auto Tag Workflow (`.github/workflows/auto-tag.yml`)

تگ‌گذاری خودکار برای هر push به main:

**نام‌گذاری تگ‌ها:**
- `v1.0.0` - Major release
- `v1.1.0` - Minor release
- `v1.0.1` - Patch release

## 📦 Auto Release & Tagging

### Semantic Release

پروژه از `semantic-release` استفاده می‌کند:

**پیکربندی (`.releaserc.json`):**

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

### نحوه کار:

1. **توسعه**: روی branch `develop` کار کنید
2. **Commit**: از conventional commits استفاده کنید
3. **Merge**: به `main` merge کنید
4. **Auto Release**: workflow به صورت خودکار:
   - نسخه را محاسبه می‌کند
   - CHANGELOG تولید می‌کند
   - تگ ایجاد می‌کند
   - Release منتشر می‌کند
   - به production deploy می‌کند

### مثال‌های Commit:

```bash
# ویژگی جدید
git commit -m "feat: add dark mode toggle"

# رفع باگ
git commit -m "fix: resolve mobile menu overflow"

# بهبود عملکرد
git commit -m "perf: optimize image lazy loading"

# تغییر شکننده
git commit -m "feat!: redesign homepage layout

BREAKING CHANGE: The homepage layout has been completely redesigned"
```

## 🌐 استقرار خودکار

### Vercel (پیشنهادی)

1. **اتصال Repository:**
   ```bash
   # نصب Vercel CLI
   npm i -g vercel
   
   # لینک کردن پروژه
   vercel link
   ```

2. **تنظیم Secrets:**
   در GitHub Settings > Secrets:
   ```
   VERCEL_TOKEN=your_token
   ORG_ID=your_org_id
   PROJECT_ID=your_project_id
   ```

3. **فعال‌سازی Auto Deploy:**
   
   فایل `.github/workflows/release.yml` را uncomment کنید:
   ```yaml
   - name: Deploy to Vercel
     uses: amondnet/vercel-action@v25
     with:
       vercel-token: ${{ secrets.VERCEL_TOKEN }}
       vercel-org-id: ${{ secrets.ORG_ID }}
       vercel-project-id: ${{ secrets.PROJECT_ID }}
       vercel-args: '--prod'
   ```

### سایر پلتفرم‌ها

#### Netlify:
```yaml
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v2.0
  with:
    publish-dir: '.next'
    production-deploy: true
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

#### AWS Amplify:
```yaml
- name: Deploy to AWS Amplify
  uses: aws-actions/configure-aws-credentials@v2
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
```

## 📱 PWA و Mobile

### تنظیمات PWA

پروژه به صورت کامل به عنوان Progressive Web App پیکربندی شده است:

**ویژگی‌ها:**
- ✅ Offline support با Service Worker
- ✅ App manifest برای نصب
- ✅ Touch gestures و haptic feedback
- ✅ Pull-to-refresh
- ✅ Bottom navigation برای موبایل
- ✅ Safe area insets برای iPhone X+
- ✅ Share API
- ✅ Push notifications (آماده)

### Service Worker

Service worker در `/public/sw.js` قرار دارد:

**استراتژی‌های Cache:**
- Navigation: Network first, cache fallback
- Static assets: Cache first
- API calls: Network only

### تست PWA

1. **محلی:**
   ```bash
   npm run build
   npm start
   # باز کنید: http://localhost:3000
   ```

2. **Chrome DevTools:**
   - Application > Service Workers
   - Application > Manifest
   - Lighthouse > Progressive Web App

3. **موبایل:**
   - از ngrok برای HTTPS استفاده کنید:
     ```bash
     npx ngrok http 3000
     ```

### بهینه‌سازی‌های موبایل

**CSS:**
- Touch-optimized tap targets (44px minimum)
- Safe area insets برای notched devices
- Smooth scrolling
- Optimized font sizes

**JavaScript:**
- Haptic feedback
- Touch gestures
- Pull-to-refresh
- Network-aware loading

**Performance:**
- Image optimization (WebP, AVIF)
- Lazy loading
- Code splitting
- Service worker caching

## 🔐 تنظیمات امنیتی

### Environment Variables

**Development (`.env.local`):**
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production:**
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics (optional)
```

### CORS و Headers

در `next.config.mjs`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

## 📊 مانیتورینگ

### Build Status Badge

در README.md اضافه کنید:

```markdown
![CI](https://github.com/username/repo/workflows/CI/badge.svg)
![Release](https://github.com/username/repo/workflows/Release/badge.svg)
```

### Lighthouse CI

برای مانیتور کردن performance:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://yourdomain.com
            https://yourdomain.com/posts
          uploadArtifacts: true
```

## 🐛 عیب‌یابی

### Build fails در CI

```bash
# بررسی محلی
npm run build

# پاک کردن cache
rm -rf .next
npm run build
```

### Service Worker issues

```bash
# پاک کردن cache browser
# Chrome DevTools > Application > Clear storage

# آپدیت service worker
# تغییر CACHE_NAME در sw.js
```

### Release نمی‌شود

```bash
# بررسی commit messages
git log --oneline

# اضافه کردن semantic-release dependencies
npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/git
```

## 📚 منابع بیشتر

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 🆘 پشتیبانی

برای کمک و سوالات:
- 📝 [Issues](https://github.com/username/repo/issues)
- 💬 [Discussions](https://github.com/username/repo/discussions)
- 📧 Email: support@example.com

---

✨ ساخته شده با Next.js و ❤️
