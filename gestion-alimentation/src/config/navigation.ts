import type { NavigationSection, PageKey } from '../types/navigation'

export const pageTitles: Record<PageKey, string> = {
  dashboard: 'Tableau de bord',
  vente: 'Nouvelle Vente',
  toutes_ventes: 'Toutes les Ventes',
  client: 'Gestion des Clients',
  article: 'Gestion des Articles',
  stock: 'Gestion de Stock',
  analyses: 'Analyses et Statistiques',
  pricing: 'Abonnement',
  commandes: 'Gestion des Commandes',
  utilisateur: 'Gestion des Utilisateurs',
  configuration: 'Paramètres et Configuration',
}

export const navigationSections: NavigationSection[] = [
  {
    title: 'Principal',
    items: [{ page: 'dashboard', label: 'Tableau de bord', icon: 'fa-house' }],
  },
  {
    title: 'Ventes',
    items: [
      { page: 'vente', label: 'Nouvelle vente', icon: 'fa-cash-register' },
      {
        page: 'toutes_ventes',
        label: 'Historique ventes',
        icon: 'fa-clock-rotate-left',
      },
      { page: 'commandes', label: 'Commandes', icon: 'fa-cart-shopping' },
    ],
  },
  {
    title: 'Gestion',
    items: [
      { page: 'article', label: 'Articles', icon: 'fa-boxes-stacked' },
      {
        page: 'stock',
        label: 'Stock',
        icon: 'fa-warehouse',
        badge: { value: '0', className: 'bg-orange-500 text-white' },
      },
      { page: 'client', label: 'Clients', icon: 'fa-users' },
    ],
  },
  {
    title: 'Pilotage',
    items: [
      {
        page: 'analyses',
        label: 'Analyses',
        icon: 'fa-chart-simple',
        badge: { value: 'NEW', className: 'bg-emerald-500 text-white' },
      },
    ],
  },
  {
    title: 'Administration',
    items: [
      { page: 'utilisateur', label: 'Utilisateurs', icon: 'fa-user-shield' },
      { page: 'pricing', label: 'Abonnement', icon: 'fa-credit-card' },
      { page: 'configuration', label: 'Paramètres', icon: 'fa-gear' },
    ],
  },
]
