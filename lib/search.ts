import MiniSearch from 'minisearch'

export interface SearchDocument {
  id: string
  title: string
  summary: string
  category: string
  subcategory: string
  tags: string[]
}

export function createSearchIndex(documents: SearchDocument[]) {
  const miniSearch = new MiniSearch({
    fields: ['title', 'summary', 'tags'],
    storeFields: ['title', 'summary', 'category', 'subcategory', 'tags', 'id'],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  })

  miniSearch.addAll(documents)
  return miniSearch
}

export function serializeSearchIndex(miniSearch: MiniSearch) {
  return JSON.stringify(miniSearch)
}

export function deserializeSearchIndex(data: string): MiniSearch {
  return MiniSearch.loadJSON(data, {
    fields: ['title', 'summary', 'tags'],
    storeFields: ['title', 'summary', 'category', 'subcategory', 'tags', 'id'],
  })
}
