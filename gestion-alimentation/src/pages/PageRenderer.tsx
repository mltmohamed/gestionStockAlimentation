import type { PageKey } from '../types/navigation'
import CustomersPage from './customers/CustomersPage'
import DashboardPage from './dashboard/DashboardPage'
import ArticlesPage from './inventory/ArticlesPage'
import StockPage from './inventory/StockPage'
import ReportsPage from './reports/ReportsPage'
import NewSalePage from './sales/NewSalePage'
import SalesHistoryPage from './sales/SalesHistoryPage'
import OrdersPage from './settings/OrdersPage'
import PricingPage from './settings/PricingPage'
import SettingsPage from './settings/SettingsPage'
import UsersPage from './settings/UsersPage'

type PageRendererProps = {
  currentPage: PageKey
}

export default function PageRenderer({ currentPage }: PageRendererProps) {
  switch (currentPage) {
    case 'dashboard':
      return <DashboardPage />
    case 'vente':
      return <NewSalePage />
    case 'toutes_ventes':
      return <SalesHistoryPage />
    case 'client':
      return <CustomersPage />
    case 'article':
      return <ArticlesPage />
    case 'stock':
      return <StockPage />
    case 'analyses':
      return <ReportsPage />
    case 'pricing':
      return <PricingPage />
    case 'commandes':
      return <OrdersPage />
    case 'utilisateur':
      return <UsersPage />
    case 'configuration':
      return <SettingsPage />
  }
}
