import './App.css'
import React from 'react'
import Sidebar, { type PageKey } from './components/Sidebar'
import Topbar from './components/Topbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = React.useState<PageKey>('dashboard')
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false)

  const pageTitles: Record<PageKey, string> = {
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

  const title = pageTitles[currentPage]

  return (
    <>
      <div
        id="sidebar-overlay"
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden ${
          mobileOpen ? '!block' : ''
        }`}
        aria-hidden="true"
        onClick={() => {
          setMobileOpen(false)
          document.body.style.overflow = 'auto'
        }}
      />

      <Sidebar
        currentPage={currentPage}
        isMobileOpen={mobileOpen}
        onCloseMobile={() => {
          setMobileOpen(false)
          document.body.style.overflow = 'auto'
        }}
        onNavigate={(page) => {
          setCurrentPage(page)
          setMobileOpen(false)
          document.body.style.overflow = 'auto'
        }}
      />

      <div className="flex flex-col flex-1 md:ml-64 main-content">
        <Topbar
          pageTitle={title}
          onOpenMobileMenu={() => {
            setMobileOpen(true)
            document.body.style.overflow = 'hidden'
          }}
        />

        <main className="p-4 md:p-6 overflow-auto flex-1">
          {currentPage === 'dashboard' ? <Dashboard /> : null}
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
