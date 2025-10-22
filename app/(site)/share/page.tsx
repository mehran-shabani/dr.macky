import Link from 'next/link'
import type { Metadata } from 'next'

import { MainNav } from '@/components/nav/main-nav'

export const metadata: Metadata = {
  title: 'اشتراک‌گذاری محتوا',
  description: 'نتیجه ارسال محتوای اشتراک‌گذاری شده توسط کاربر',
}

type SharePageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

function isString(value: string | string[] | undefined): value is string {
  return typeof value === 'string'
}

export default function SharePage({ searchParams }: SharePageProps) {
  const status = isString(searchParams.status) ? searchParams.status : undefined
  const title = isString(searchParams.title) ? searchParams.title : undefined
  const text = isString(searchParams.text) ? searchParams.text : undefined
  const url = isString(searchParams.url) ? searchParams.url : undefined
  const errorMessage = isString(searchParams.message) ? searchParams.message : undefined

  let heading = 'اشتراک‌گذاری'
  let description = 'از این صفحه برای مشاهده نتیجه ارسال محتوا استفاده کنید.'
  let showContent = false
  let isError = false

  if (status === 'success') {
    heading = 'محتوا با موفقیت ارسال شد'
    description = 'از اینکه محتوای خود را با ما به اشتراک گذاشتید سپاسگزاریم.'
    showContent = true
  } else if (status === 'error') {
    heading = 'بروز خطا در اشتراک‌گذاری'
    description = errorMessage || 'در پردازش درخواست مشکلی پیش آمد. لطفاً دوباره تلاش کنید.'
    isError = true
  }

  return (
    <div className="min-h-screen">
      <MainNav />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 shadow-sm">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className={`mt-3 text-muted-foreground ${isError ? 'text-destructive' : ''}`}>{description}</p>

          {showContent && (
            <div className="mt-8 space-y-6">
              {title && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground">عنوان</h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{title}</p>
                </div>
              )}

              {text && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground">متن ارسالی</h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{text}</p>
                </div>
              )}

              {url && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground">لینک محتوا</h2>
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                  >
                    مشاهده محتوا
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
