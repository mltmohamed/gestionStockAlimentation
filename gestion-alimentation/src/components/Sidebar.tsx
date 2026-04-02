import React from 'react'

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

const menuItems: Array<{
  page: PageKey
  label: string
  icon: string
  badge?: { value: string; className: string }
}> = [
  { page: 'dashboard', label: 'Tableau de bord', icon: 'fa-home' },
  { page: 'vente', label: 'Nouvelle Vente', icon: 'fa-cash-register' },
  { page: 'toutes_ventes', label: 'Historique Ventes', icon: 'fa-history' },
  { page: 'client', label: 'Clients', icon: 'fa-users' },
  { page: 'article', label: 'Articles', icon: 'fa-boxes' },
  { page: 'stock', label: 'Stock', icon: 'fa-warehouse' },
  {
    page: 'analyses',
    label: 'Analyses',
    icon: 'fa-chart-bar',
    badge: { value: 'NEW', className: 'bg-green-500' },
  },
  { page: 'pricing', label: 'Abonnement', icon: 'fa-dollar-sign' },
  { page: 'commandes', label: 'Commandes', icon: 'fa-shopping-cart' },
  { page: 'utilisateur', label: 'Utilisateurs', icon: 'fa-user-shield' },
  { page: 'configuration', label: 'Paramètres', icon: 'fa-cog' },
]

export default function Sidebar(props: {
  currentPage: PageKey
  isMobileOpen: boolean
  onCloseMobile: () => void
  onNavigate: (page: PageKey) => void
}) {
  return (
    <aside
      id="sidebar"
      className={`sidebar fixed z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-blue-900 text-white flex flex-col h-full shadow-xl ${
        props.isMobileOpen ? 'active translate-x-0' : ''
      }`}
    >
      <div className="p-4 border-b border-blue-800 flex items-center">
        <div className="text-2xl mr-2" aria-hidden="true">
          🏪
        </div>
        <h1 className="text-lg font-bold whitespace-nowrap shrink min-w-0">
          GESTION ALIMENTATION
        </h1>
        <button
          id="close-sidebar-mobile"
          className="md:hidden ml-auto text-xl hover:text-blue-200 focus:outline-none"
          aria-label="Fermer le menu"
          onClick={props.onCloseMobile}
          type="button"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1 py-2">
          {menuItems.map((item) => {
            const isActive = props.currentPage === item.page
            const classes = isActive
              ? 'bg-blue-700 text-white'
              : 'hover:bg-blue-800 text-gray-200'

            return (
              <li key={item.page}>
                <button
                  className={`flex items-center w-full p-2.5 rounded-lg transition-colors duration-200 ${classes}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => props.onNavigate(item.page)}
                  type="button"
                >
                  <i
                    className={`fas ${item.icon} text-xl mr-3 flex-shrink-0`}
                  ></i>
                  <span className="whitespace-nowrap font-medium">
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span
                      className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${item.badge.className}`}
                    >
                      {item.badge.value}
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-800 bg-blue-950">
        <div className="flex items-center mb-3 pb-3 border-b border-blue-800">
          <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <i className="fas fa-user"></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-white truncate">Nouhoum</div>
            <div className="text-xs text-blue-200 truncate">Employé</div>
          </div>
        </div>

        <button
          className="flex items-center w-full p-2.5 hover:bg-blue-800 rounded-lg text-left text-gray-200 transition-colors duration-200 group"
          onClick={() => {
            // placeholder
          }}
          type="button"
        >
          <i className="fas fa-sign-out-alt text-xl mr-3 group-hover:text-red-300 transition-colors"></i>
          <span className="font-medium">Déconnexion</span>
        </button>

        <div className="mt-4 pt-3 border-t border-blue-800 text-center">
          <div className="text-xs text-blue-300">
            <div>Version 1.1.0</div>
            <div className="mt-1 flex items-center justify-center">
              <i className="fas fa-database mr-1 text-blue-400"></i>
              <span>SQLite</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
