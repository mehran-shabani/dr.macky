export const categories = {
  'advanced-tech': {
    title: 'فناوری‌های پیشرفته و علوم کامپیوتر',
    slug: 'advanced-tech',
    description: 'هوش مصنوعی، رباتیک، محاسبات کوانتومی و فناوری‌های نوظهور',
  },
  'basic-sciences': {
    title: 'علوم پایه و جهان هستی',
    slug: 'basic-sciences',
    description: 'فیزیک، ریاضیات، نجوم و علوم فضایی',
  },
  'bio-health': {
    title: 'علوم زیستی و سلامت',
    slug: 'bio-health',
    description: 'پزشکی، ژنتیک، بیوتکنولوژی و علوم اعصاب',
  },
  'earth-environment': {
    title: 'زمین و محیط زیست',
    slug: 'earth-environment',
    description: 'تغییرات اقلیمی، اکولوژی، زمین‌شناسی و اقیانوس‌شناسی',
  },
  'special': {
    title: 'بخش‌های جانبی و محتوای ویژه',
    slug: 'special',
    description: 'تاریخ علم، فلسفه علم، مصاحبه‌ها و پادکست‌ها',
  },
} as const

export const subcategories = {
  // فناوری‌های پیشرفته
  'ai-ml': { title: 'هوش مصنوعی و یادگیری ماشین', category: 'advanced-tech' },
  'robotics': { title: 'رباتیک و مکاترونیک', category: 'advanced-tech' },
  'quantum': { title: 'محاسبات کوانتومی', category: 'advanced-tech' },
  'biotech-eng': { title: 'مهندسی زیستی', category: 'advanced-tech' },
  'nanotech': { title: 'نانوتکنولوژی', category: 'advanced-tech' },
  'vr-ar': { title: 'واقعیت مجازی و افزوده', category: 'advanced-tech' },
  
  // علوم پایه
  'astrophysics': { title: 'اخترفیزیک و کیهان‌شناسی', category: 'basic-sciences' },
  'particle-physics': { title: 'فیزیک ذرات', category: 'basic-sciences' },
  'theoretical-physics': { title: 'فیزیک نظری', category: 'basic-sciences' },
  'mathematics': { title: 'ریاضیات کاربردی', category: 'basic-sciences' },
  'space-missions': { title: 'ماموریت‌های فضایی', category: 'basic-sciences' },
  'exoplanets': { title: 'سیارات فراخورشیدی', category: 'basic-sciences' },
  
  // علوم زیستی و سلامت
  'genetics': { title: 'ژنتیک و ژنومیک', category: 'bio-health' },
  'neuroscience': { title: 'علوم اعصاب و مغز', category: 'bio-health' },
  'medicine': { title: 'پزشکی و درمان', category: 'bio-health' },
  'microbiology': { title: 'میکروبیولوژی و ویروس‌شناسی', category: 'bio-health' },
  'aging': { title: 'پیری و طول عمر', category: 'bio-health' },
  'nutrition': { title: 'تغذیه و سلامت عمومی', category: 'bio-health' },
  
  // زمین و محیط زیست
  'climate': { title: 'تغییرات اقلیمی', category: 'earth-environment' },
  'ecology': { title: 'اکولوژی و حفاظت', category: 'earth-environment' },
  'oceanography': { title: 'اقیانوس‌شناسی', category: 'earth-environment' },
  'geology': { title: 'زمین‌شناسی', category: 'earth-environment' },
  'renewable-energy': { title: 'انرژی‌های تجدیدپذیر', category: 'earth-environment' },
  
  // ویژه
  'history-science': { title: 'تاریخ علم', category: 'special' },
  'philosophy-science': { title: 'فلسفه علم', category: 'special' },
  'interviews': { title: 'مصاحبه‌ها', category: 'special' },
  'podcasts': { title: 'پادکست‌ها', category: 'special' },
  'reviews': { title: 'نقد و بررسی', category: 'special' },
} as const

export type Category = keyof typeof categories
export type Subcategory = keyof typeof subcategories

export function getCategoryInfo(slug: string) {
  return categories[slug as Category]
}

export function getSubcategoryInfo(slug: string) {
  return subcategories[slug as Subcategory]
}

export function getSubcategoriesByCategory(categorySlug: string) {
  return Object.entries(subcategories)
    .filter(([_, sub]) => sub.category === categorySlug)
    .map(([slug, info]) => ({ slug, ...info }))
}
