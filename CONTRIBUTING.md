# راهنمای مشارکت

از علاقه شما به مشارکت در این پروژه سپاسگزاریم! این سند راهنمای کاملی برای مشارکت در پروژه است.

## گردش کار مشارکت

### 1. فورک و کلون

```bash
# فورک کنید از رابط گیت‌هاب
# سپس کلون کنید
git clone https://github.com/YOUR_USERNAME/scientific-blog.git
cd scientific-blog
```

### 2. نصب وابستگی‌ها

```bash
npm install
```

### 3. ایجاد برنچ

```bash
git checkout -b feature/my-feature
# یا
git checkout -b fix/bug-description
```

### 4. توسعه

```bash
# اجرای سرور توسعه
npm run dev

# مشاهده تغییرات در http://localhost:3000
```

## استانداردهای کد

### TypeScript

- از تایپ‌های صریح استفاده کنید
- از `any` اجتناب کنید
- از Interfaces برای اشیاء استفاده کنید

### React Components

```tsx
// ✅ خوب
interface ButtonProps {
  label: string
  onClick: () => void
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

// ❌ بد
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### استایل‌ها

- از Tailwind CSS استفاده کنید
- از کلاس‌های سفارشی CSS فقط در صورت ضرورت استفاده کنید
- RTL را در نظر بگیرید

```tsx
// ✅ خوب - RTL-aware
<div className="mr-4">  // margin-right در RTL

// ❌ بد - RTL-incompatible  
<div className="ml-4">  // margin-left مشکل‌ساز در RTL
```

## افزودن محتوا

### فرمت Frontmatter

همه فیلدهای اجباری را پر کنید:

```yaml
---
title: "عنوان (10-200 کاراکتر)"
slug: "url-friendly-slug"
category: "یکی از 5 دسته اصلی"
subcategory: "زیربخش مرتبط"
tags: ["تگ1", "تگ2"]
authors: ["handle"]
summary: "160-220 کاراکتر"
publishedAt: "2025-10-22"
status: "published"
---
```

### اعتبارسنجی

قبل از ارسال Pull Request:

```bash
# بررسی ESLint
npm run lint

# بررسی فرمت
npm run format

# بررسی تایپ
npm run type-check

# اعتبارسنجی محتوا
npm run validate

# ساخت پروژه
npm run build
```

## پیام‌های کامیت

از فرمت Conventional Commits استفاده کنید:

```
feat: افزودن ویژگی جست‌وجوی پیشرفته
fix: رفع مشکل نمایش تصاویر در حالت تاریک
docs: به‌روزرسانی راهنمای نصب
style: فرمت کد با Prettier
refactor: بازنویسی کامپوننت PostCard
test: افزودن تست برای taxonomy
chore: به‌روزرسانی وابستگی‌ها
```

## نوع‌های مشارکت

### 🐛 گزارش باگ

- از Issue Template استفاده کنید
- شرح کامل مراحل بازتولید را بدهید
- اسکرین‌شات یا ویدیو اضافه کنید

### ✨ پیشنهاد ویژگی

- توضیح دهید چرا این ویژگی مفید است
- موارد استفاده را شرح دهید
- پیاده‌سازی احتمالی را توضیح دهید

### 📝 بهبود مستندات

- اشتباهات تایپی را اصلاح کنید
- مثال‌ها را بهبود دهید
- بخش‌های گم‌شده را اضافه کنید

### 🎨 بهبود UI/UX

- پیش از پیاده‌سازی، طرح را در Issue به اشتراک بگذارید
- دسترسی‌پذیری را در نظر بگیرید
- RTL را تست کنید

## بررسی Pull Request

### چک‌لیست قبل از ارسال

- [ ] کد بدون خطای lint است
- [ ] تست‌ها پاس می‌شوند
- [ ] Frontmatter معتبر است
- [ ] پروژه با موفقیت build می‌شود
- [ ] تغییرات در حالت تاریک و روشن تست شده‌اند
- [ ] RTL تست شده است
- [ ] مستندات به‌روز شده‌اند

### توضیحات PR

```markdown
## توضیحات
توضیح مختصر تغییرات

## نوع تغییر
- [ ] باگ‌فیکس
- [ ] ویژگی جدید
- [ ] تغییر شکننده (Breaking change)
- [ ] بهبود مستندات

## چگونه تست شد؟
توضیح مراحل تست

## اسکرین‌شات (در صورت نیاز)
```

## محیط توسعه

### پیشنهادات VSCode

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### افزونه‌های توصیه‌شده

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- MDX

## سؤالات؟

اگر سؤالی دارید:

1. [مستندات](README.md) را بررسی کنید
2. [Issues](https://github.com/username/scientific-blog/issues) موجود را جست‌وجو کنید
3. Issue جدید با برچسب `question` ایجاد کنید

## کد رفتار (Code of Conduct)

با مشارکت در این پروژه، شما موافقت می‌کنید که:

- به دیگران احترام بگذارید
- از زبان فحش و توهین اجتناب کنید
- نقدها را سازنده بپذیرید
- روی بهترین راه‌حل تمرکز کنید، نه برد شخصی

---

از مشارکت شما سپاسگزاریم! 🙏
