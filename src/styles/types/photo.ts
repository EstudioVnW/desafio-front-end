export interface Photo {
  id: string
  alt_description: string | null
  urls: {
    full: string
    regular: string
    small: string
  }
  user: {
    name: string
    portfolio_url: string | null
  }
}
