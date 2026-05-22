import { navigationSections } from '../../config/navigation'
import type { PageKey } from '../../types/navigation'

export default function Sidebar(props: {
  currentPage: PageKey
  isMobileOpen: boolean
  onCloseMobile: () => void
  onNavigate: (page: PageKey) => void
}) {
  return (
    <aside
      id="sidebar"
      className={`sidebar fixed z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out w-72 md:w-64 bg-slate-950 text-slate-100 flex flex-col h-full shadow-2xl border-r border-slate-800 ${
        props.isMobileOpen ? 'active translate-x-0' : ''
      }`}
    >
      <div className="px-4 py-5 border-b border-slate-800">
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-950/40"
            aria-hidden="true"
          >
            <i className="fas fa-store text-lg"></i>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-bold leading-tight tracking-wide">
              GESTION
              <span className="block text-slate-300">ALIMENTATION</span>
            </h1>
            <div className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-md bg-slate-900 px-2 py-1 text-xs text-slate-300 ring-1 ring-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span className="truncate">Point de vente principal</span>
            </div>
          </div>

          <button
            id="close-sidebar-mobile"
            className="md:hidden text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
            aria-label="Fermer le menu"
            onClick={props.onCloseMobile}
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4">
        <div className="space-y-5">
          {navigationSections.map((section) => (
            <section key={section.title}>
              <h2 className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {section.title}
              </h2>

              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = props.currentPage === item.page
                  const classes = isActive
                    ? 'bg-slate-800 text-white ring-1 ring-slate-700 before:bg-blue-500'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white before:bg-transparent'

                  return (
                    <li key={item.page}>
                      <button
                        className={`relative before:absolute before:left-0 before:top-2 before:h-6 before:w-1 before:rounded-r-full flex items-center w-full gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-200 ${classes}`}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => props.onNavigate(item.page)}
                        type="button"
                      >
                        <span className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-sm flex-shrink-0">
                          <i className={`fas ${item.icon}`}></i>
                        </span>

                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {item.label}
                        </span>

                        {item.badge ? (
                          <span
                            className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold leading-4 ${item.badge.className}`}
                          >
                            {item.badge.value}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-800 bg-slate-950 p-3">
        <div className="rounded-lg bg-slate-900 p-3 ring-1 ring-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              NO
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white">
                Nouhoum
              </div>
              <div className="truncate text-xs text-slate-400">Employé</div>
            </div>
          </div>

          <button
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-red-950 hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="button"
          >
            <i className="fas fa-right-from-bracket text-xs"></i>
            <span>Déconnexion</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-slate-500">
          <span>Version 1.1.0</span>
          <span className="inline-flex items-center gap-1">
            <i className="fas fa-database"></i>
            SQLite
          </span>
        </div>
      </div>
    </aside>
  )
}
