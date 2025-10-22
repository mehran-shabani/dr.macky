# راهنمای بهینه‌سازی موبایل و PWA

این سند راهنمای کاملی برای ویژگی‌های موبایل و PWA پروژه است.

## 📱 ویژگی‌های موبایل

### 1. Progressive Web App (PWA)

#### نصب اپلیکیشن

کاربران می‌توانند وبلاگ را مانند یک اپلیکیشن native نصب کنند:

**iOS:**
1. Safari را باز کنید
2. دکمه Share را بزنید
3. "Add to Home Screen" را انتخاب کنید

**Android:**
1. Chrome را باز کنید
2. منوی ⋮ را باز کنید
3. "Install app" یا "Add to Home Screen" را انتخاب کنید

**Desktop:**
- آیکون نصب در نوار آدرس ظاهر می‌شود

#### Offline Support

```javascript
// Service Worker Strategy
- Navigation requests: Network first, cache fallback
- Images & Fonts: Cache first
- API calls: Network only

// Cache Management
- Precache: Essential assets
- Runtime cache: User-visited pages
- Automatic cleanup: Old caches removed
```

### 2. Touch Gestures

#### Pull to Refresh

```tsx
import { PullToRefresh } from '@/components/mobile/pull-to-refresh'

<PullToRefresh onRefresh={async () => {
  await fetchNewData()
}}>
  {children}
</PullToRefresh>
```

#### Touch Cards با Haptic Feedback

```tsx
import { TouchCard } from '@/components/mobile/touch-card'

<TouchCard onClick={handleClick} href="/post/1">
  <h2>عنوان مقاله</h2>
  <p>توضیحات...</p>
</TouchCard>
```

#### Swipe Gestures

```css
/* کلاس swipeable برای المان‌های قابل swipe */
.swipeable {
  touch-action: pan-y;
  user-select: none;
}
```

### 3. Bottom Navigation

Navigation موبایل در پایین صفحه:

```tsx
import { BottomNav } from '@/components/mobile/bottom-nav'

// در layout
export default function Layout({ children }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}
```

**آیتم‌های پیش‌فرض:**
- 🏠 خانه
- 🔍 جستجو
- 🔖 نشان‌ها
- 👤 پروفایل

### 4. Share API

اشتراک‌گذاری محتوا با Web Share API:

```tsx
import { MobileShare } from '@/components/mobile/mobile-share'

<MobileShare
  title="عنوان مقاله"
  text="توضیحات"
  url="https://example.com/post/1"
/>
```

**قابلیت‌ها:**
- Share native در iOS و Android
- Fallback به clipboard در Desktop
- Haptic feedback
- Visual feedback (تیک سبز)

### 5. Mobile Utilities

کتابخانه utility functions برای موبایل:

```typescript
import {
  isMobile,
  isIOS,
  isAndroid,
  isStandalone,
  hapticFeedback,
  shareContent,
  getNetworkStatus,
  requestPersistentStorage
} from '@/lib/mobile-utils'

// بررسی نوع دستگاه
if (isMobile()) {
  console.log('موبایل است')
}

// Haptic feedback
hapticFeedback(10) // ارتعاش 10ms
hapticFeedback([50, 100, 50]) // الگوی ارتعاش

// اشتراک‌گذاری
await shareContent({
  title: 'عنوان',
  text: 'متن',
  url: 'https://example.com'
})

// بررسی شبکه
const network = getNetworkStatus()
console.log(network.effectiveType) // 4g, 3g, 2g, slow-2g
console.log(network.saveData) // true/false
```

## 🎨 UI/UX بهینه‌سازی‌ها

### Safe Area Insets

پشتیبانی کامل از iPhone X و دستگاه‌های notched:

```css
/* در globals.css */
@supports (padding: max(0px)) {
  body {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}

/* برای navigation پایین */
.bottom-nav {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

### Touch Targets

تمام المان‌های تاچ حداقل 44×44 پیکسل:

```css
button, a, input, select, textarea {
  min-height: 44px;
  min-width: 44px;
  touch-action: manipulation;
}
```

### Responsive Typography

اندازه فونت‌ها بهینه برای موبایل:

```css
@media (max-width: 640px) {
  html {
    font-size: 14px;
  }
  
  h1 { font-size: 1.75rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
}
```

### Performance Optimizations

#### Image Loading

```css
/* بارگذاری تدریجی تصاویر */
.skeleton {
  background: linear-gradient(90deg, ...);
  animation: skeleton-loading 1.5s infinite;
}
```

#### Reduce Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Network-Aware Loading

```typescript
import { getOptimalImageQuality } from '@/lib/mobile-utils'

const quality = getOptimalImageQuality()
// 'high' | 'medium' | 'low'

// استفاده در Image component
<Image
  src="/image.jpg"
  quality={quality === 'high' ? 100 : quality === 'medium' ? 75 : 50}
/>
```

## 🔔 Push Notifications

Service Worker آماده برای push notifications:

### راه‌اندازی

```javascript
// ثبت push subscription
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready
  
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'YOUR_VAPID_KEY'
  })
  
  // ارسال subscription به سرور
  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
```

### ارسال Notification

```javascript
// در service worker (sw.js)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    dir: 'rtl',
    lang: 'fa'
  }
  
  event.waitUntil(
    self.registration.showNotification('وبلاگ علمی', options)
  )
})
```

## 📊 Performance Metrics

### Lighthouse Score

هدف: 90+ در تمام معیارها

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+
- **PWA**: ✅ All checks

### Core Web Vitals

```javascript
// اندازه‌گیری Performance
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

**اهداف:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## 🧪 تست موبایل

### Chrome DevTools

1. باز کردن DevTools (F12)
2. Device toolbar را فعال کنید (Ctrl+Shift+M)
3. دستگاه‌های مختلف را تست کنید

### Remote Debugging

**Android:**
```bash
# فعال کردن USB debugging در دستگاه
# اتصال به کامپیوتر
# Chrome DevTools > More tools > Remote devices
chrome://inspect
```

**iOS:**
```bash
# فعال کردن Web Inspector در Safari
# Settings > Safari > Advanced > Web Inspector
# Safari (Mac) > Develop > [Device Name]
```

### BrowserStack / Sauce Labs

برای تست روی دستگاه‌های واقعی:

```yaml
# .github/workflows/mobile-test.yml
- name: BrowserStack Test
  uses: browserstack/github-actions@master
  with:
    browsers: |
      - iPhone 14 Pro
      - Samsung Galaxy S23
      - iPad Pro
```

## 🎯 بهترین روش‌ها

### 1. Touch-Friendly Design

- ✅ Touch targets حداقل 44×44px
- ✅ فاصله کافی بین المان‌ها
- ✅ Haptic feedback برای اکشن‌ها
- ✅ Visual feedback سریع

### 2. Network Awareness

```typescript
// بارگذاری هوشمند تصاویر
const shouldLoadHighRes = () => {
  const { effectiveType, saveData } = getNetworkStatus()
  return effectiveType === '4g' && !saveData
}
```

### 3. Offline Experience

- ✅ صفحه offline اختصاصی
- ✅ Cache استراتژی مناسب
- ✅ Sync queue برای اکشن‌های آفلاین
- ✅ پیام‌های واضح به کاربر

### 4. Performance

```typescript
// Lazy loading components
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <Skeleton />,
  ssr: false
})

// Image optimization
<Image
  src="/image.jpg"
  alt="تصویر"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### 5. Accessibility

```tsx
// ARIA labels برای screen readers
<button aria-label="اشتراک‌گذاری مقاله">
  <Share2 />
</button>

// Focus management
<input
  type="search"
  autoFocus
  aria-describedby="search-help"
/>
```

## 📱 App-like Features

### Splash Screen

در `manifest.json`:

```json
{
  "background_color": "#ffffff",
  "theme_color": "#667eea",
  "display": "standalone"
}
```

### Status Bar Styling

```html
<!-- iOS -->
<meta name="apple-mobile-web-app-status-bar-style" content="default">

<!-- Android -->
<meta name="theme-color" content="#667eea">
```

### Shortcuts

```json
{
  "shortcuts": [
    {
      "name": "جستجو",
      "url": "/search",
      "icons": [{ "src": "/icons/search.png", "sizes": "96x96" }]
    }
  ]
}
```

## 🔍 SEO موبایل

### Mobile-First Indexing

```html
<!-- Viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Mobile-friendly -->
<meta name="mobile-web-app-capable" content="yes">
```

### Structured Data

```typescript
// در metadata
export const metadata = {
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes'
  }
}
```

## 🐛 رفع مشکلات رایج

### iOS Safari Issues

```css
/* Fix: ارتفاع viewport در iOS */
.full-height {
  height: 100vh;
  height: -webkit-fill-available;
}

/* Fix: جلوگیری از zoom در input focus */
input {
  font-size: 16px; /* حداقل 16px */
}

/* Fix: smooth scrolling */
.scroll-container {
  -webkit-overflow-scrolling: touch;
}
```

### Android Chrome Issues

```css
/* Fix: highlight color */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Fix: pull-to-refresh */
body {
  overscroll-behavior-y: contain;
}
```

## 📚 منابع

- [Web.dev - Mobile Performance](https://web.dev/mobile/)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

✨ بهینه‌سازی شده برای بهترین تجربه موبایل!
