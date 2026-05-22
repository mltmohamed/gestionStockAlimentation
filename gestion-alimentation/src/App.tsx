import './App.css'
import React from 'react'
import AppLayout from './components/layout/AppLayout'
import { pageTitles } from './config/navigation'
import PageRenderer from './pages/PageRenderer'
import type { PageKey } from './types/navigation'

function App() {
  const [currentPage, setCurrentPage] = React.useState<PageKey>('dashboard')
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false)

  const closeMobileMenu = () => {
    setMobileOpen(false)
    document.body.style.overflow = 'auto'
  }

  const openMobileMenu = () => {
    setMobileOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const navigateToPage = (page: PageKey) => {
    setCurrentPage(page)
    closeMobileMenu()
  }

  return (
    <AppLayout
      currentPage={currentPage}
      pageTitle={pageTitles[currentPage]}
      isMobileMenuOpen={mobileOpen}
      onCloseMobileMenu={closeMobileMenu}
      onOpenMobileMenu={openMobileMenu}
      onNavigate={navigateToPage}
    >
      <PageRenderer currentPage={currentPage} />
    </AppLayout>
  )
}

export default App
