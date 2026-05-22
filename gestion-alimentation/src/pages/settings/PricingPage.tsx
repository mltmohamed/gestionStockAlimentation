const planFeatures = ['Ventes illimitees', 'Stock local SQLite', 'Rapports essentiels', 'Sauvegarde manuelle', 'Multi-utilisateurs']

const invoices = [
  { id: 'FAC-001', date: '2026-05-01', amount: '15 000 F', status: 'Payee' },
  { id: 'FAC-002', date: '2026-04-01', amount: '15 000 F', status: 'Payee' },
  { id: 'FAC-003', date: '2026-03-01', amount: '15 000 F', status: 'Payee' },
]

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Licence</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Abonnement</h1>
        <p className="mt-1 text-sm text-slate-500">Suivez votre formule, les options actives et l historique de paiement.</p>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-blue-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">Plan actif</span>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">Boutique Pro</h2>
              <p className="mt-2 text-sm text-slate-500">Formule adaptee aux points de vente alimentaires.</p>
            </div>
            <div className="rounded-lg bg-slate-950 p-4 text-white">
              <div className="text-2xl font-bold">15 000 F</div>
              <div className="text-sm text-slate-400">par mois</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {planFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm font-medium text-slate-700">
                <i className="fas fa-check text-emerald-600"></i>
                {feature}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700" type="button">Renouveler</button>
            <button className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50" type="button">Changer de plan</button>
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Etat licence</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Statut</span><span className="font-bold text-emerald-700">Active</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Expiration</span><span className="font-semibold text-slate-800">2026-06-22</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Utilisateurs</span><span className="font-semibold text-slate-800">3 / 5</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Base locale</span><span className="font-semibold text-slate-800">SQLite</span></div>
          </div>
        </aside>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">Historique des factures</h2>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50"><tr><th>Facture</th><th>Date</th><th>Montant</th><th>Statut</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}><td className="font-semibold text-slate-800">{invoice.id}</td><td>{invoice.date}</td><td className="font-bold text-slate-900">{invoice.amount}</td><td><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">{invoice.status}</span></td><td><div className="flex justify-end"><button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" type="button"><i className="fas fa-download text-xs"></i></button></div></td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
