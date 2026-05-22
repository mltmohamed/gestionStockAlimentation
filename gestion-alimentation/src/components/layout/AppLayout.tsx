import type { ReactNode } from 'react'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import type { PageKey } from '../../types/navigation'

type AppLayoutProps = {
  currentPage: PageKey
  pageTitle: string
  isMobileMenuOpen: boolean
  onCloseMobileMenu: () => void
  onOpenMobileMenu: () => void
  onNavigate: (page: PageKey) => void
  children: ReactNode
}

export default function AppLayout({
  currentPage,
  pageTitle,
  isMobileMenuOpen,
  onCloseMobileMenu,
  onOpenMobileMenu,
  onNavigate,
  children,
}: AppLayoutProps) {
  return (
    <>
      <div
        id="sidebar-overlay"
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:hidden ${
          isMobileMenuOpen ? '!block' : ''
        }`}
        aria-hidden="true"
        onClick={onCloseMobileMenu}
      />

      <Sidebar
        currentPage={currentPage}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={onCloseMobileMenu}
        onNavigate={onNavigate}
      />

      <div className="flex flex-col flex-1 md:ml-64 main-content">
        <Topbar
          pageTitle={pageTitle}
          onOpenMobileMenu={onOpenMobileMenu}
          onNavigate={onNavigate}
        />

        <main className="p-4 md:p-6 overflow-auto flex-1">{children}</main>

        <Footer />
      </div>
    </>
  )
}
