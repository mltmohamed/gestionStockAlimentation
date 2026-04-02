import React from 'react'

export default function Topbar(props: {
  pageTitle: string
  onOpenMobileMenu: () => void
}) {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center">
        <button
          id="mobile-menu-button"
          className="md:hidden mr-4 text-xl text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          aria-label="Ouvrir le menu de navigation"
          onClick={props.onOpenMobileMenu}
          type="button"
        >
          <i className="fas fa-bars"></i>
        </button>

        <h1 className="text-xl font-bold text-gray-800 capitalize">
          {props.pageTitle}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <label htmlFor="global-search" className="sr-only">
            Recherche globale
          </label>
          <input
            type="text"
            id="global-search"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-shadow"
            aria-label="Recherche dans l'application"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <i className="fas fa-search" aria-hidden="true"></i>
          </div>
        </div>

        <div
          className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
          aria-label="Menu utilisateur"
        >
          <div
            className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-2"
            aria-hidden="true"
          >
            <i className="fas fa-user"></i>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm text-gray-800">Nouhoum</span>
            <span className="text-xs text-gray-500">Employé</span>
          </div>
          <i
            className="fas fa-chevron-down text-xs ml-1 text-gray-600"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </header>
  )
}
