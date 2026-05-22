import type { PageKey } from '../../types/navigation'

export default function Topbar(props: {
  pageTitle: string
  onOpenMobileMenu: () => void
  onNavigate: (page: PageKey) => void
}) {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:px-6">
      <div className="flex items-center gap-4">
        <button
          id="mobile-menu-button"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Ouvrir le menu de navigation"
          onClick={props.onOpenMobileMenu}
          type="button"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-bold text-slate-900 md:text-xl">
              {props.pageTitle}
            </h1>
            <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 lg:inline-flex">
              Ouvert
            </span>
          </div>
          <p className="hidden text-sm capitalize text-slate-500 sm:block">
            {currentDate} - Point de vente principal
          </p>
        </div>

        <div className="hidden min-w-[260px] max-w-md flex-1 lg:block">
          <label htmlFor="global-search" className="sr-only">
            Recherche globale
          </label>
          <div className="relative">
            <i
              className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
              aria-hidden="true"
            ></i>
            <input
              type="text"
              id="global-search"
              placeholder="Rechercher vente, client, article..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              aria-label="Recherche dans l'application"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="hidden h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:inline-flex"
            onClick={() => props.onNavigate('vente')}
            type="button"
          >
            <i className="fas fa-plus text-xs"></i>
            <span>Nouvelle vente</span>
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Voir les alertes"
            type="button"
          >
            <span className="relative">
              <i className="fas fa-bell"></i>
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white"></span>
            </span>
          </button>

          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 xl:flex">
            <i className="fas fa-database text-emerald-600"></i>
            <span>Local SQLite</span>
          </div>

          <button
            className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Menu utilisateur"
            type="button"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">
              NO
            </span>
            <span className="hidden text-left md:block">
              <span className="block text-sm font-semibold leading-4 text-slate-800">
                Nouhoum
              </span>
              <span className="block text-xs text-slate-500">Employe</span>
            </span>
            <i
              className="fas fa-chevron-down hidden text-xs text-slate-400 md:block"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </header>
  )
}
