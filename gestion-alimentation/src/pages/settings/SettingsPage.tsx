const backupItems = [
  { label: 'Derniere sauvegarde', value: '2026-05-22 10:40' },
  { label: 'Chemin donnees', value: 'Dossier utilisateur Electron' },
  { label: 'Moteur local', value: 'SQLite' },
]

const preferences = [
  { label: 'Alertes stock bas', checked: true },
  { label: 'Impression automatique du recu', checked: false },
  { label: 'Demander confirmation avant suppression', checked: true },
  { label: 'Sauvegarde quotidienne au demarrage', checked: true },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Configuration</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Parametres</h1>
        <p className="mt-1 text-sm text-slate-500">Configurez la boutique, les sauvegardes et les preferences de travail.</p>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Informations boutique</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div><label className="text-sm font-semibold text-slate-700">Nom boutique</label><input defaultValue="Point de vente principal" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></div>
              <div><label className="text-sm font-semibold text-slate-700">Telephone</label><input defaultValue="+223 70 00 00 00" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></div>
              <div><label className="text-sm font-semibold text-slate-700">Devise</label><select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"><option>Franc CFA (F)</option></select></div>
              <div><label className="text-sm font-semibold text-slate-700">Langue</label><select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"><option>Francais</option></select></div>
            </div>
            <button className="mt-5 h-11 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700" type="button">Enregistrer</button>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Preferences</h2>
            <div className="mt-5 space-y-3">
              {preferences.map((preference) => (
                <label key={preference.label} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                  {preference.label}
                  <input type="checkbox" defaultChecked={preference.checked} className="h-4 w-4" />
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Donnees locales</h2>
            <div className="mt-5 space-y-4">
              {backupItems.map((item) => (
                <div key={item.label} className="rounded-lg bg-slate-50 p-3">
                  <div className="text-xs font-semibold uppercase text-slate-400">{item.label}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-800">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-2">
              <button className="h-10 rounded-lg bg-slate-900 px-3 text-sm font-bold text-white hover:bg-slate-800" type="button">Faire une sauvegarde</button>
              <button className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50" type="button">Restaurer</button>
            </div>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-5">
            <h2 className="text-lg font-bold text-red-900">Zone sensible</h2>
            <p className="mt-2 text-sm text-red-700">Les actions ci-dessous peuvent modifier les donnees locales.</p>
            <button className="mt-4 h-10 rounded-lg bg-red-600 px-3 text-sm font-bold text-white hover:bg-red-700" type="button">Reinitialiser les donnees</button>
          </div>
        </aside>
      </section>
    </div>
  )
}
