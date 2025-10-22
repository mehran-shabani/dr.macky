# وبلاگ علمی - Scientific Blog

یک وبلاگ علمی مدرن ساخته شده با Next.js 15، MDX، و Contentlayer

## ✨ ویژگی‌ها

- ⚡️ **Next.js 15** با App Router و React Server Components
- 📝 **MDX** برای نوشتن محتوای غنی با کامپوننت‌های React
- 🎨 **Tailwind CSS** با پشتیبانی کامل RTL برای فارسی
- 🔍 **جست‌وجوی آفلاین** با MiniSearch
- 📊 **SEO قوی** با Open Graph، JSON-LD و Sitemap خودکار
- 🌙 **حالت تاریک/روشن** با next-themes
- 🎯 **تایپ‌سیف** با TypeScript و Contentlayer
- 📱 **طراحی ریسپانسیو** و دسترسی‌پذیر
- 🚀 **ISR** برای عملکرد بهینه
- 📡 **RSS و JSON Feed** برای اشتراک‌گذاری

## 🏗️ ساختار پروژه

```
.
├── app/                      # Next.js App Router
│   ├── (site)/              # گروه مسیرها
│   │   ├── page.tsx         # صفحه اصلی
│   │   ├── posts/           # صفحات مطالب
│   │   ├── categories/      # صفحات دسته‌بندی
│   │   ├── subcategories/   # صفحات زیربخش
│   │   ├── tags/            # صفحات برچسب
│   │   ├── authors/         # صفحات نویسنده
│   │   └── search/          # جست‌وجو
│   ├── layout.tsx           # Layout اصلی
│   └── globals.css          # استایل‌های سراسری
├── components/              # کامپوننت‌های React
│   ├── ui/                  # کامپوننت‌های پایه UI
│   ├── mdx/                 # کامپوننت‌های MDX
│   └── nav/                 # ناوبری
├── content/                 # محتوای MDX
│   ├── posts/              # مطالب وبلاگ
│   └── authors/            # اطلاعات نویسندگان
├── lib/                     # توابع کمکی
│   ├── contentlayer.ts     # کوئری محتوا
│   ├── taxonomy.ts         # دسته‌بندی‌ها
│   ├── search.ts           # جست‌وجو
│   └── seo.ts              # SEO
├── public/                  # فایل‌های استاتیک
├── scripts/                 # اسکریپت‌های کمکی
└── contentlayer.config.ts  # پیکربندی Contentlayer
```

## 📋 دسته‌بندی‌ها

### 1️⃣ فناوری‌های پیشرفته و علوم کامپیوتر
- هوش مصنوعی و یادگیری ماشین
- رباتیک و مکاترونیک
- محاسبات کوانتومی
- مهندسی زیستی
- نانوتکنولوژی
- واقعیت مجازی و افزوده

### 2️⃣ علوم پایه و جهان هستی
- اخترفیزیک و کیهان‌شناسی
- فیزیک ذرات
- فیزیک نظری
- ریاضیات کاربردی
- ماموریت‌های فضایی
- سیارات فراخورشیدی

### 3️⃣ علوم زیستی و سلامت
- ژنتیک و ژنومیک
- علوم اعصاب و مغز
- پزشکی و درمان
- میکروبیولوژی
- پیری و طول عمر
- تغذیه و سلامت عمومی

### 4️⃣ زمین و محیط زیست
- تغییرات اقلیمی
- اکولوژی و حفاظت
- اقیانوس‌شناسی
- زمین‌شناسی
- انرژی‌های تجدیدپذیر

### 5️⃣ بخش‌های جانبی و محتوای ویژه
- تاریخ علم
- فلسفه علم
- مصاحبه‌ها
- پادکست‌ها
- نقد و بررسی

## 🚀 شروع سریع

### پیش‌نیازها

- Node.js 18 یا بالاتر
- npm یا yarn یا pnpm

### نصب

```bash
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev

# ساخت برای تولید
npm run build

# اجرای سرور تولید
npm start
```

پروژه روی `http://localhost:3000` اجرا می‌شود.

## ✍️ افزودن محتوا

### ساخت مطلب جدید

1. فایل MDX جدید در `content/posts/YYYY/MM/` ایجاد کنید
2. Frontmatter را اضافه کنید:

```mdx
---
title: "عنوان مطلب"
slug: "url-slug"
category: "advanced-tech"
subcategory: "ai-ml"
tags: ["تگ1", "تگ2"]
authors: ["mehran"]
summary: "خلاصه بین 160-220 کاراکتر"
publishedAt: "2025-10-22"
status: "published"
readingTime: 5
---

محتوای مطلب...
```

### افزودن نویسنده

فایل JSON در `content/authors/` ایجاد کنید:

```json
{
  "handle": "username",
  "name": "نام کامل",
  "bio": "بیوگرافی کوتاه",
  "avatar": "/images/authors/username.jpg"
}
```

## 🎨 سفارشی‌سازی

### تم‌ها

رنگ‌ها در `app/globals.css` قابل تغییر هستند:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  /* ... */
}
```

### فونت‌ها

فایل‌های فونت IRANSansX را در `public/fonts/` قرار دهید:
- `IRANSansX-Regular.woff2`
- `IRANSansX-Medium.woff2`
- `IRANSansX-Bold.woff2`

## 🔧 اسکریپت‌های npm

```bash
npm run dev            # سرور توسعه
npm run build          # ساخت پروژه
npm run start          # سرور تولید
npm run lint           # بررسی ESLint
npm run format         # فرمت کد با Prettier
npm run type-check     # بررسی تایپ TypeScript
npm run validate       # اعتبارسنجی frontmatter
```

## 📝 کامپوننت‌های MDX

### Callout

```mdx
<Callout type="info">
محتوای اطلاعاتی
</Callout>

<!-- انواع: info, warning, success, error -->
```

### تصاویر

```mdx
<Image
  src="/images/example.jpg"
  alt="توضیحات"
  width={800}
  height={600}
/>
```

## 🌐 دپلوی

### Vercel (توصیه شده)

```bash
# نصب Vercel CLI
npm i -g vercel

# دپلوی
vercel
```

### متغیرهای محیطی

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🔍 SEO

پروژه شامل:
- ✅ متاتگ‌های Open Graph
- ✅ Twitter Cards
- ✅ JSON-LD برای مقالات
- ✅ Sitemap خودکار
- ✅ RSS Feed
- ✅ JSON Feed
- ✅ Robots.txt

## 📊 آنالیتیکس (اختیاری)

برای فعال‌سازی آنالیتیکس، متغیرهای محیطی را اضافه کنید:

```env
# Plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# یا Umami
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-id
NEXT_PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js
```

## 🧪 تست

```bash
npm test           # اجرای تست‌ها
npm run test:e2e   # تست‌های End-to-End
```

## 🤝 مشارکت

1. فورک کنید
2. برنچ جدید ایجاد کنید (`git checkout -b feature/amazing`)
3. تغییرات را کامیت کنید (`git commit -m 'Add amazing feature'`)
4. پوش کنید (`git push origin feature/amazing`)
5. Pull Request ایجاد کنید

## 📄 مجوز

MIT License - برای جزئیات بیشتر فایل LICENSE را ببینید.

## 🙏 قدردانی

- [Next.js](https://nextjs.org/)
- [Contentlayer](https://contentlayer.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [MiniSearch](https://lucaong.github.io/minisearch/)

## 📮 تماس

برای سؤالات و پیشنهادات، لطفاً Issue ایجاد کنید.

---

ساخته شده با ❤️ برای جامعه علمی فارسی‌زبان
