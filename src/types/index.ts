export interface Service {
  id: number
  icon: string
  title: string
  description: string
}

export interface Product {
  id: number
  title: string
  category: string
  image: string
  description: string
}

export interface Stat {
  value: string
  label: string
}
