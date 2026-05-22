import { useMemo, useState } from 'react'

type SaleStatus = 'Payee' | 'En attente' | 'Annulee'

type Sale = {
  id: string
  date: string
  time: string
  customer: string
  items: number
  total: number
  payment: string
  cashier: string
  status: SaleStatus
}

const sales: Sale[] = [
  {
    id: 'V-1028',
    date: '2026-05-22',
    time: '10:45',
    customer: 'Client comptoir',
    items: 4,
    total: 18500,
    payment: 'Especes',
    cashier: 'Nouhoum',
    status: 'Payee',
  },
  {
    id: 'V-1027',
    date: '2026-05-22',
    time: '10:12',
    customer: 'Aminata Coulibaly',
    items: 7,
    total: 42000,
    payment: 'Mobile money',
    cashier: 'Nouhoum',
    status: 'Payee',
  },
  {
    id: 'V-1026',
    date: '2026-05-21',
    time: '18:20',
    customer: 'Moussa Traore',
    items: 3,
    total: 12750,
    payment: 'Credit client',
    cashier: 'Nouhoum',
    status: 'En attente',
  },
  {
    id: 'V-1025',
    date: '2026-05-21',
    time: '16:08',
    customer: 'Client comptoir',
    items: 2,
    total: 7100,
    payment: 'Carte bancaire',
    cashier: 'Nouhoum',
    status: 'Payee',
  },
  {
    id: 'V-1024',
    date: '2026-05-20',
    time: '11:35',
    customer: 'Fatoumata Diallo',
    items: 5,
    total: 26800,
    payment: 'Especes',
    cashier: 'Nouhoum',
    status: 'Annulee',
  },
  {
    id: 'V-1023',
    date: '2026-05-20',
    time: '09:18',
    customer: 'Client comptoir',
    items: 6,
    total: 33400,
    payment: 'Mobile money',
    cashier: 'Nouhoum',
    status: 'Payee',
  },
]

const formatMoney = (value: number) => `${value.toLocaleString('fr-FR')} F`

const statusClasses: Record<SaleStatus, string> = {
  Payee: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'En attente': 'bg-orange-50 text-orange-700 ring-orange-100',
  Annulee: 'bg-red-50 text-red-700 ring-red-100',
}

export default function SalesHistoryPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Tous')
  const [payment, setPayment] = useState('Tous')
  const [period, setPeriod] = useState('7 jours')

  const filteredSales = useMemo(() => {
    const query = search.trim().toLowerCase()

    return sales.filter((sale) => {
      const matchesSearch = query
        ? [sale.id, sale.customer, sale.cashier, sale.payment]
            .join(' ')
            .toLowerCase()
            .includes(query)
        : true

      const matchesStatus = status === 'Tous' || sale.status === status
      const matchesPayment = payment === 'Tous' || sale.payment === payment

      return matchesSearch && matchesStatus && matchesPayment
    })
  }, [payment, search, status])

  const paidSales = filteredSales.filter((sale) => sale.status === 'Payee')
  const pendingSales = filteredSales.filter(
    (sale) => sale.status === 'En attente',
  )
  const totalRevenue = paidSales.reduce((sum, sale) => sum + sale.total, 0)
  const pendingAmount = pendingSales.reduce((sum, sale) => sum + sale.total, 0)
  const averageBasket = paidSales.length
    ? Math.round(totalRevenue / paidSales.length)
    : 0

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Suivi des operations
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Historique des ventes
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Consultez, filtrez et controlez les ventes enregistrees.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              type="button"
            >
              <i className="fas fa-file-export text-xs"></i>
              Exporter
            </button>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              type="button"
            >
              <i className="fas fa-print text-xs"></i>
              Rapport
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Ventes filtrees</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {filteredSales.length}
          </div>
          <p className="mt-3 text-sm font-medium text-blue-700">
            Periode: {period}
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Chiffre d affaires
          </p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatMoney(totalRevenue)}
          </div>
          <p className="mt-3 text-sm font-medium text-emerald-700">
            Ventes payees uniquement
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Panier moyen</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatMoney(averageBasket)}
          </div>
          <p className="mt-3 text-sm font-medium text-violet-700">
            Sur ventes payees
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Credit ouvert</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatMoney(pendingAmount)}
          </div>
          <p className="mt-3 text-sm font-medium text-orange-700">
            {pendingSales.length} vente(s) en attente
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px_180px]">
          <div className="relative">
            <i
              className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
              aria-hidden="true"
            ></i>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher reference, client, caissier..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Tous</option>
            <option>Payee</option>
            <option>En attente</option>
            <option>Annulee</option>
          </select>

          <select
            value={payment}
            onChange={(event) => setPayment(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Tous</option>
            <option>Especes</option>
            <option>Mobile money</option>
            <option>Carte bancaire</option>
            <option>Credit client</option>
          </select>

          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Aujourd hui</option>
            <option>7 jours</option>
            <option>30 jours</option>
            <option>Cette annee</option>
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Liste des ventes
            </h2>
            <p className="text-sm text-slate-500">
              {filteredSales.length} resultat(s)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th>Reference</th>
                <th>Date</th>
                <th>Client</th>
                <th>Articles</th>
                <th>Total</th>
                <th>Paiement</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                      <i className="fas fa-receipt"></i>
                    </div>
                    <p className="mt-3 font-semibold text-slate-700">
                      Aucune vente trouvee
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Modifiez les filtres pour afficher plus de resultats.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="font-semibold text-slate-800">{sale.id}</td>
                    <td>
                      <div className="font-medium text-slate-700">
                        {sale.date}
                      </div>
                      <div className="text-xs text-slate-500">{sale.time}</div>
                    </td>
                    <td>{sale.customer}</td>
                    <td>{sale.items}</td>
                    <td className="font-bold text-slate-900">
                      {formatMoney(sale.total)}
                    </td>
                    <td>{sale.payment}</td>
                    <td>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[sale.status]}`}
                      >
                        {sale.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                          aria-label={`Voir ${sale.id}`}
                          type="button"
                        >
                          <i className="fas fa-eye text-xs"></i>
                        </button>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                          aria-label={`Imprimer ${sale.id}`}
                          type="button"
                        >
                          <i className="fas fa-print text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
