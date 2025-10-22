"use client"

import Link from 'next/link'

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-6xl">📡</div>
        <h1 className="text-3xl font-bold">بدون اتصال به اینترنت</h1>
        <p className="text-muted-foreground">
          به نظر می‌رسد اتصال اینترنت شما قطع شده است. لطفاً اتصال خود را بررسی کنید.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            تلاش مجدد
          </button>
          <Link
            href="/"
            className="rounded-lg border border-input bg-background px-6 py-3 transition-colors hover:bg-accent"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  )
}
