import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  const lastUpdate = new Date().toLocaleDateString('fr-FR')

  return (
    <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <span className="font-semibold text-gray-800">GESTION ALIMENTATION</span>
          <span className="mx-1">•</span>
          <span>Application de gestion de stock et de ventes</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <span>
            <i className="fas fa-copyright mr-1"></i> {year} - Tous droits réservés
          </span>
          <span>•</span>
          <span>Version 1.1.0</span>
          <span>•</span>
          <span>
            <i className="fas fa-sync-alt mr-1"></i> Dernière mise à jour: {lastUpdate}
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <i className="fas fa-shield-alt mr-1"></i>
        Application sécurisée - Données protégées avec SQLite
      </div>
    </footer>
  )
}
