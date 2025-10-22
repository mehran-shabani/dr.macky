# راهنمای راه‌اندازی سریع

این راهنما گام‌به‌گام راه‌اندازی پروژه را توضیح می‌دهد.

## پیش‌نیازها

قبل از شروع، اطمینان حاصل کنید که موارد زیر نصب شده‌اند:

- **Node.js**: نسخه 18 یا بالاتر
- **npm**: نسخه 9 یا بالاتر (یا yarn/pnpm)
- **Git**: برای کنترل نسخه

بررسی نسخه‌ها:
```bash
node --version  # باید >= 18
npm --version   # باید >= 9
```

## مراحل نصب

### ۱. کلون پروژه

```bash
git clone https://github.com/username/scientific-blog.git
cd scientific-blog
```

### ۲. نصب وابستگی‌ها

```bash
npm install
```

این کار ممکن است چند دقیقه طول بکشد. وابستگی‌های اصلی:
- Next.js 15
- React 19
- Contentlayer
- Tailwind CSS
- و دیگر پکیج‌ها...

### ۳. تنظیم فونت‌های فارسی

فونت IRANSansX را دانلود و در `public/fonts/` قرار دهید:

```bash
# ساختار مورد نیاز:
public/fonts/
├── IRANSansX-Regular.woff2
├── IRANSansX-Medium.woff2
└── IRANSansX-Bold.woff2
```

**دانلود فونت**:
- [IRANSansX GitHub](https://github.com/rastikerdar/vazirmatn)
- یا از [Fontiran](https://fontiran.com)

> **نکته**: اگر فونت را ندارید، پروژه با فونت پیش‌فرض سیستم کار می‌کند.

### ۴. ایجاد فایل Environment

```bash
cp .env.example .env.local
```

ویرایش `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### ۵. اجرای سرور توسعه

```bash
npm run dev
```

سرور روی `http://localhost:3000` اجرا می‌شود.

مرورگر خود را باز کنید و به آدرس فوق بروید. 🎉

## بررسی نصب

### ۱. صفحه اصلی

باید ۳ مطلب نمونه را ببینید:
- "انقلاب هوش مصنوعی"
- "انعطاف‌پذیری مغز"
- "نقاط بحرانی اقلیمی"

### ۲. ناوبری

در هدر باید ۵ دسته اصلی را ببینید:
- فناوری‌های پیشرفته
- علوم پایه و جهان
- علوم زیستی و سلامت
- زمین و محیط زیست
- بخش‌های جانبی

### ۳. تغییر تم

دکمه تغییر تم (ماه/خورشید) را کلیک کنید.
باید بین حالت روشن و تاریک جابجا شود.

### ۴. جست‌وجو

به `/search` بروید و چیزی جست‌وجو کنید (مثلاً "مغز").

## مشکلات رایج

### خطا: Cannot find module 'contentlayer/generated'

**علت**: Contentlayer هنوز اجرا نشده

**راه‌حل**:
```bash
npx contentlayer build
npm run dev
```

### خطا: Font files not found

**علت**: فایل‌های فونت وجود ندارند

**راه‌حل**:
1. فونت‌ها را دانلود کنید
2. در `public/fonts/` قرار دهید
3. یا به‌طور موقت، خط مربوط به `localFont` در `app/layout.tsx` را کامنت کنید

### صفحه خالی است

**علت**: محتوا ساخته نشده

**راه‌حل**:
```bash
npm run build:search
npx contentlayer build
```

### خطای TypeScript

**راه‌حل**:
```bash
npm run type-check
```

اگر خطا برطرف نشد، `tsconfig.json` را بررسی کنید.

## مراحل بعدی

### ۱. اضافه کردن محتوا

```bash
# ساخت نویسنده جدید
touch content/authors/yourname.json
```

```json
{
  "handle": "yourname",
  "name": "نام کامل شما",
  "bio": "بیوگرافی کوتاه",
  "avatar": "/images/authors/yourname.jpg"
}
```

```bash
# ساخت مطلب جدید
mkdir -p content/posts/2025/11
touch content/posts/2025/11/my-first-post.mdx
```

نمونه مطلب را از فایل‌های موجود کپی کنید.

### ۲. سفارشی‌سازی تم

رنگ‌ها را در `app/globals.css` تغییر دهید:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* آبی */
  --secondary: 210 40% 96.1%;     /* خاکستری روشن */
  /* ... */
}
```

### ۳. تنظیم SEO

در `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'نام وبلاگ شما',
  description: 'توضیحات وبلاگ',
  // ...
}
```

### ۴. آماده‌سازی برای انتشار

```bash
# بررسی همه‌چیز
npm run lint
npm run type-check
npm run validate
npm run build

# اگر همه موفق بودند:
npm start
```

## دپلوی

### Vercel (توصیه می‌شود)

```bash
# نصب Vercel CLI
npm i -g vercel

# لاگین
vercel login

# دپلوی
vercel
```

یا از رابط وب:
1. به [vercel.com](https://vercel.com) بروید
2. پروژه گیت‌هاب را وصل کنید
3. تنظیمات را تأیید کنید
4. Deploy را کلیک کنید

### Environment Variables در Vercel

در تنظیمات پروژه:
```
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
```

## کامندهای مفید

```bash
# توسعه
npm run dev              # سرور توسعه
npm run build            # ساخت پروژه
npm start                # اجرای build

# کیفیت کد
npm run lint             # ESLint
npm run format           # Prettier
npm run type-check       # TypeScript

# محتوا
npm run validate         # اعتبارسنجی frontmatter
npm run build:search     # ساخت ایندکس جست‌وجو

# تست
npm test                 # Jest (اگر فعال باشد)
npm run test:e2e         # Playwright
```

## ساختار فولدرها

```
scientific-blog/
├── app/                 # Next.js App Router
│   ├── (site)/         # گروه route
│   └── globals.css     # استایل‌های سراسری
├── components/          # کامپوننت‌های React
├── content/            # محتوای MDX
│   ├── posts/         # مطالب
│   └── authors/       # نویسندگان
├── lib/                # توابع کمکی
├── public/             # فایل‌های استاتیک
├── scripts/            # اسکریپت‌های Node
└── *config files       # پیکربندی
```

## منابع یادگیری

- [Next.js Docs](https://nextjs.org/docs)
- [Contentlayer Docs](https://contentlayer.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)

## کمک بیشتر

- **مستندات**: `README.md`, `ARCHITECTURE.md`
- **مشارکت**: `CONTRIBUTING.md`
- **Issues**: [GitHub Issues](https://github.com/username/scientific-blog/issues)

---

موفق باشید! 🚀
