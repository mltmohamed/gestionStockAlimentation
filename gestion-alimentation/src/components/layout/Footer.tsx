export default function Footer() {
  const year = new Date().getFullYear()
  const lastBackup = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 md:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-semibold text-slate-700">
            Gestion Alimentation
          </span>

          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Donnees locales actives
          </span>

          <span className="inline-flex items-center gap-1.5">
            <i className="fas fa-database text-emerald-600"></i>
            SQLite
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>Version 1.1.0</span>

          <span className="inline-flex items-center gap-1.5">
            <i className="fas fa-shield-halved text-blue-600"></i>
            Sauvegarde: {lastBackup}
          </span>

          <span>
            {year} - Tous droits reserves
          </span>
        </div>
      </div>
    </footer>
  )
}
