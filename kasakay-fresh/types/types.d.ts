export type Article = {

  id: string
  title: string
  summary: string | null
  author: string | null
  category: string
  imageUrl: string | null
  readTimeMins: number | null
  isFeatured: boolean
  publishedAt: string
  subtitle?: string
  body?:string
  tags?:string[]
} 