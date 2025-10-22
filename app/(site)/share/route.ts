import { NextRequest, NextResponse } from 'next/server'

const SHARE_ROUTE = '/share'
const REDIRECT_STATUS = 303

function redirectToShare(request: NextRequest, params: URLSearchParams) {
  const targetUrl = new URL(SHARE_ROUTE, request.url)
  targetUrl.search = params.toString()
  return NextResponse.redirect(targetUrl, REDIRECT_STATUS)
}

function redirectWithError(request: NextRequest, message: string) {
  const params = new URLSearchParams({
    status: 'error',
    message: message.slice(0, 200),
  })

  return redirectToShare(request, params)
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.toLowerCase().includes('multipart/form-data')) {
    return redirectWithError(request, 'فرمت ارسال اطلاعات نامعتبر است.')
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch (error) {
    console.error('Unable to parse form data for share request', error)
    return redirectWithError(request, 'دریافت اطلاعات ارسال شده با خطا روبه‌رو شد.')
  }

  const rawTitle = formData.get('title')
  const rawText = formData.get('text')
  const rawUrl = formData.get('url')

  if (rawTitle === null || typeof rawTitle !== 'string') {
    return redirectWithError(request, 'عنوان محتوا الزامی است.')
  }

  if (rawText !== null && typeof rawText !== 'string') {
    return redirectWithError(request, 'مقدار متن ارسالی معتبر نیست.')
  }

  if (rawUrl !== null && typeof rawUrl !== 'string') {
    return redirectWithError(request, 'مقدار لینک ارسالی معتبر نیست.')
  }

  const title = rawTitle.trim()
  const text = typeof rawText === 'string' ? rawText.trim() : ''
  const url = typeof rawUrl === 'string' ? rawUrl.trim() : ''

  if (!title) {
    return redirectWithError(request, 'عنوان محتوا الزامی است.')
  }

  let sanitizedUrl = ''
  if (url) {
    try {
      const parsedUrl = new URL(url)
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return redirectWithError(request, 'لینک وارد شده باید با http یا https آغاز شود.')
      }
      sanitizedUrl = parsedUrl.toString()
    } catch (error) {
      return redirectWithError(request, 'لینک وارد شده معتبر نیست.')
    }
  }

  if (!sanitizedUrl && !text) {
    return redirectWithError(request, 'حداقل یکی از فیلدهای متن یا لینک باید تکمیل شود.')
  }

  const params = new URLSearchParams({
    status: 'success',
    title: title.slice(0, 200),
  })

  if (text) {
    params.set('text', text.slice(0, 5000))
  }

  if (sanitizedUrl) {
    params.set('url', sanitizedUrl)
  }

  return redirectToShare(request, params)
}
