export type PageKey =
  | 'dashboard'
  | 'vente'
  | 'toutes_ventes'
  | 'client'
  | 'article'
  | 'stock'
  | 'analyses'
  | 'pricing'
  | 'commandes'
  | 'utilisateur'
  | 'configuration'

export type NavigationBadge = {
  value: string
  className: string
}

export type NavigationItem = {
  page: PageKey
  label: string
  icon: string
  badge?: NavigationBadge
}

export type NavigationSection = {
  title: string
  items: NavigationItem[]
}
