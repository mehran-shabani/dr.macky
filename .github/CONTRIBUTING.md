# راهنمای مشارکت در پروژه

از علاقه شما به مشارکت در این پروژه سپاسگزاریم! 🎉

## 📋 فهرست

- [Code of Conduct](#code-of-conduct)
- [شروع کار](#شروع-کار)
- [فرآیند توسعه](#فرآیند-توسعه)
- [استایل‌گاید](#استایل‌گاید)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [گزارش باگ](#گزارش-باگ)
- [پیشنهاد ویژگی](#پیشنهاد-ویژگی)

## 🤝 Code of Conduct

با مشارکت در این پروژه، انتظار می‌رود:

- ✅ احترام به دیگران
- ✅ پذیرش نقد سازنده
- ✅ تمرکز روی بهترین نتیجه برای جامعه
- ✅ همدلی با سایر مشارکت‌کنندگان

## 🚀 شروع کار

### پیش‌نیازها

```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.0.0
```

### نصب

```bash
# Fork کردن repository
# Clone کردن fork خود
git clone https://github.com/YOUR_USERNAME/repo-name.git
cd repo-name

# نصب dependencies
npm install

# اجرای development server
npm run dev
```

## 💻 فرآیند توسعه

### 1. ایجاد Branch

```bash
# آپدیت کردن main
git checkout main
git pull origin main

# ایجاد feature branch
git checkout -b feat/feature-name

# یا fix branch
git checkout -b fix/bug-name
```

### نام‌گذاری Branch:

- `feat/feature-name` - ویژگی جدید
- `fix/bug-name` - رفع باگ
- `docs/update-name` - مستندات
- `refactor/component-name` - بازسازی
- `test/test-name` - تست
- `perf/optimization-name` - بهبود عملکرد

### 2. توسعه

```bash
# کد بنویسید
# تست کنید
npm run test

# بررسی lint
npm run lint

# بررسی type
npm run type-check

# Build تست
npm run build
```

### 3. Commit

```bash
# Conventional commits
git commit -m "feat(component): add new feature"
```

### 4. Push و PR

```bash
# Push به fork
git push origin feat/feature-name

# ایجاد Pull Request در GitHub
```

## 📝 استایل‌گاید

### TypeScript

```typescript
// ✅ خوب
interface UserProps {
  name: string
  age: number
  isActive?: boolean
}

function User({ name, age, isActive = false }: UserProps) {
  return <div>{name}</div>
}

// ❌ بد
function user(props: any) {
  return <div>{props.name}</div>
}
```

### React Components

```typescript
// ✅ خوب - Functional component
export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  )
}

// ❌ بد - Class component
export class Button extends React.Component {
  render() {
    return <button>{this.props.children}</button>
  }
}
```

### CSS/Tailwind

```tsx
// ✅ خوب
<div className="flex items-center gap-4 rounded-lg bg-primary p-4">
  {children}
</div>

// ❌ بد
<div className="flex items-center bg-primary p-4 gap-4 rounded-lg">
  {children}
</div>
```

### File Structure

```
components/
  ├── ui/              # UI primitives
  ├── mobile/          # Mobile-specific
  ├── nav/             # Navigation
  └── ComponentName/   # Complex components
      ├── index.tsx
      ├── ComponentName.test.tsx
      └── ComponentName.module.css
```

## 💬 Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: ویژگی جدید
- `fix`: رفع باگ
- `docs`: مستندات
- `style`: فرمت، نقطه‌گذاری
- `refactor`: بازسازی کد
- `perf`: بهبود عملکرد
- `test`: اضافه کردن تست
- `chore`: کارهای نگهداری

### مثال‌ها

```bash
# Feature
git commit -m "feat(search): add fuzzy search

Implemented fuzzy search using minisearch library.
Improves search accuracy by 40%.

Closes #123"

# Fix
git commit -m "fix(mobile): resolve touch issues

Fixed touch gestures on iOS Safari.

Fixes #456"

# Breaking change
git commit -m "feat!: redesign API

BREAKING CHANGE: API endpoints restructured.
See MIGRATION.md for details."
```

## 🔄 Pull Requests

### قبل از ایجاد PR

- [ ] تمام تست‌ها pass می‌شوند
- [ ] Lint errors وجود ندارد
- [ ] Type checking موفق است
- [ ] Build بدون خطا
- [ ] Documentation آپدیت شده
- [ ] Self-review انجام شده

### PR Template

PR شما باید شامل:

1. **توضیحات واضح** از تغییرات
2. **لینک به issue** مرتبط
3. **Screenshots** (برای UI changes)
4. **تست‌ها** برای کد جدید
5. **چک‌لیست کامل**

### Review Process

1. تیم review می‌کند (1-3 روز)
2. اگر تغییری لازم باشد، درخواست می‌شود
3. بعد از approval، merge می‌شود
4. Branch حذف می‌شود

## 🐛 گزارش باگ

### قبل از گزارش

1. **جستجو کنید** - شاید قبلاً گزارش شده
2. **آخرین نسخه** را امتحان کنید
3. **بررسی کنید** که واقعاً یک باگ است

### اطلاعات مورد نیاز

- توضیحات واضح
- مراحل بازتولید
- رفتار مورد انتظار vs فعلی
- Screenshots/Videos
- محیط (OS, Browser, Version)
- Console errors

### از Issue Template استفاده کنید

Issues > New Issue > Bug Report

## ✨ پیشنهاد ویژگی

### قبل از پیشنهاد

1. **جستجو کنید** - شاید قبلاً پیشنهاد شده
2. **بحث کنید** - در Discussions مطرح کنید
3. **Plan کنید** - فکر کنید به implementation

### اطلاعات مورد نیاز

- مشکلی که حل می‌کند
- راه‌حل پیشنهادی
- جایگزین‌ها
- مثال‌ها از سایر پروژه‌ها
- Mockups/Designs (اختیاری)

### از Template استفاده کنید

Issues > New Issue > Feature Request

## 🧪 Testing

### Unit Tests

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### E2E Tests

```typescript
// search.spec.ts
import { test, expect } from '@playwright/test'

test('search functionality', async ({ page }) => {
  await page.goto('/')
  await page.click('text=جستجو')
  await page.fill('input[type="search"]', 'کوانتوم')
  await expect(page.locator('.search-results')).toBeVisible()
})
```

## 📚 مستندات

### کد

```typescript
/**
 * محاسبه فاصله Levenshtein بین دو رشته
 * 
 * @param str1 - رشته اول
 * @param str2 - رشته دوم
 * @returns فاصله Levenshtein
 * 
 * @example
 * ```ts
 * levenshtein('kitten', 'sitting') // 3
 * ```
 */
function levenshtein(str1: string, str2: string): number {
  // implementation
}
```

### Markdown

- README.md - معرفی پروژه
- CONTRIBUTING.md - این فایل
- DEPLOYMENT.md - راهنمای استقرار
- API.md - مستندات API

## 🎨 Design System

### Colors

```typescript
// از Tailwind color palette استفاده کنید
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">
<div className="text-muted-foreground">
```

### Typography

```typescript
// Headings
<h1 className="text-3xl font-bold">
<h2 className="text-2xl font-semibold">

// Body
<p className="text-base">
<p className="text-sm text-muted-foreground">
```

### Spacing

```typescript
// از gap به جای margin استفاده کنید
<div className="flex gap-4">    // ✅
<div className="flex">          // ❌
  <div className="mr-4">
```

## 🔍 Review Checklist

### Code Quality

- [ ] DRY (Don't Repeat Yourself)
- [ ] SOLID principles
- [ ] Clean code
- [ ] Proper naming
- [ ] Comments where needed
- [ ] No console.logs

### Performance

- [ ] Lazy loading
- [ ] Image optimization
- [ ] Code splitting
- [ ] Memoization where needed
- [ ] No unnecessary re-renders

### Accessibility

- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader tested
- [ ] Color contrast

### Mobile

- [ ] Responsive design
- [ ] Touch targets >= 44px
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] PWA features work

### Security

- [ ] Input validation
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Secure dependencies
- [ ] No sensitive data exposed

## 🏆 Recognition

مشارکت‌کنندگان در فایل CONTRIBUTORS.md لیست می‌شوند.

همچنین:
- ⭐ GitHub stars
- 📣 شناسایی در release notes
- 🎁 Swag برای مشارکت‌های بزرگ

## 💡 نکات

### Debug

```bash
# روشن کردن debug mode
DEBUG=* npm run dev

# بررسی bundle size
npm run build
npm run analyze
```

### Performance

```bash
# Lighthouse
npm run lighthouse

# Bundle analyzer
npm run analyze
```

## 📞 ارتباط

- 💬 GitHub Discussions
- 📧 Email: dev@example.com
- 🐦 Twitter: @project
- 💼 LinkedIn: /company/project

## ❓ سوالات متداول

**Q: چقدر طول می‌کشد تا PR من review شود؟**  
A: معمولاً 1-3 روز کاری.

**Q: آیا می‌توانم روی چند issue همزمان کار کنم؟**  
A: بهتر است یک issue در یک زمان.

**Q: آیا برای مشارکت نیاز به دانش خاصی دارم؟**  
A: TypeScript, React, Next.js توصیه می‌شود.

**Q: چگونه می‌توانم یک issue برای خودم assign کنم؟**  
A: در issue کامنت بگذارید که می‌خواهید روی آن کار کنید.

---

🙏 از مشارکت شما متشکریم!
