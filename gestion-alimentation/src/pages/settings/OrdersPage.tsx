import { useMemo, useState } from 'react'

type OrderType = 'Fournisseur' | 'Client'
type OrderStatus = 'Brouillon' | 'Envoyee' | 'Recue' | 'En retard' | 'Annulee'

type Order = {
  id: string
  type: OrderType
  partner: string
  date: string
  dueDate: string
  items: number
  amount: number
  status: OrderStatus
  priority: 'Normale' | 'Haute'
}

const orders: Order[] = [
  {
    id: 'CMD-2041',
    type: 'Fournisseur',
    partner: 'Mali Agro Distribution',
    date: '2026-05-22',
    dueDate: '2026-05-25',
    items: 8,
    amount: 485000,
    status: 'Envoyee',
    priority: 'Haute',
  },
  {
    id: 'CMD-2040',
    type: 'Client',
    partner: 'Aminata Coulibaly',
    date: '2026-05-22',
    dueDate: '2026-05-22',
    items: 5,
    amount: 42000,
    status: 'Recue',
    priority: 'Normale',
  },
  {
    id: 'CMD-2039',
    type: 'Fournisseur',
    partner: 'Sodima Import',
    date: '2026-05-21',
    dueDate: '2026-05-23',
    items: 12,
    amount: 720000,
    status: 'En retard',
    priority: 'Haute',
  },
  {
    id: 'CMD-2038',
    type: 'Client',
    partner: 'Moussa Traore',
    date: '2026-05-21',
    dueDate: '2026-05-24',
    items: 3,
    amount: 18500,
    status: 'Brouillon',
    priority: 'Normale',
  },
  {
    id: 'CMD-2037',
    type: 'Fournisseur',
    partner: 'Grossiste Central',
    date: '2026-05-20',
    dueDate: '2026-05-26',
    items: 6,
    amount: 312000,
    status: 'Recue',
    priority: 'Normale',
  },
  {
    id: 'CMD-2036',
    type: 'Client',
    partner: 'Fatoumata Diallo',
    date: '2026-05-20',
    dueDate: '2026-05-21',
    items: 2,
    amount: 9000,
    status: 'Annulee',
    priority: 'Normale',
  },
]

const formatMoney = (value: number) => `${value.toLocaleString('fr-FR')} F`

const statusClasses: Record<OrderStatus, string> = {
  Brouillon: 'bg-slate-50 text-slate-700 ring-slate-200',
  Envoyee: 'bg-blue-50 text-blue-700 ring-blue-100',
  Recue: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'En retard': 'bg-orange-50 text-orange-700 ring-orange-100',
  Annulee: 'bg-red-50 text-red-700 ring-red-100',
}

const typeClasses: Record<OrderType, string> = {
  Fournisseur: 'bg-violet-50 text-violet-700 ring-violet-100',
  Client: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
}

export default function OrdersPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('Tous')
  const [status, setStatus] = useState('Tous')

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()

    return orders.filter((order) => {
      const matchesSearch = query
        ? [order.id, order.partner, order.type, order.status]
            .join(' ')
            .toLowerCase()
            .includes(query)
        : true
      const matchesType = type === 'Tous' || order.type === type
      const matchesStatus = status === 'Tous' || order.status === status

      return matchesSearch && matchesType && matchesStatus
    })
  }, [search, status, type])

  const supplierOrders = filteredOrders.filter(
    (order) => order.type === 'Fournisseur',
  )
  const customerOrders = filteredOrders.filter((order) => order.type === 'Client')
  const lateOrders = filteredOrders.filter((order) => order.status === 'En retard')
  const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0)

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Suivi des achats et reservations
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Gestion des commandes
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Pilotez les commandes fournisseurs et les demandes clients.
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
              <i className="fas fa-plus text-xs"></i>
              Nouvelle commande
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Commandes affichees
          </p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {filteredOrders.length}
          </div>
          <p className="mt-3 text-sm font-medium text-blue-700">
            Total: {formatMoney(totalAmount)}
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Fournisseurs</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {supplierOrders.length}
          </div>
          <p className="mt-3 text-sm font-medium text-violet-700">
            Reapprovisionnement
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Clients</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {customerOrders.length}
          </div>
          <p className="mt-3 text-sm font-medium text-cyan-700">
            Reservations et demandes
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">En retard</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {lateOrders.length}
          </div>
          <p className="mt-3 text-sm font-medium text-orange-700">
            A relancer rapidement
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px]">
          <div className="relative">
            <i
              className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
              aria-hidden="true"
            ></i>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher reference, partenaire, statut..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Tous</option>
            <option>Fournisseur</option>
            <option>Client</option>
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Tous</option>
            <option>Brouillon</option>
            <option>Envoyee</option>
            <option>Recue</option>
            <option>En retard</option>
            <option>Annulee</option>
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Liste des commandes
              </h2>
              <p className="text-sm text-slate-500">
                {filteredOrders.length} resultat(s)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th>Reference</th>
                  <th>Partenaire</th>
                  <th>Type</th>
                  <th>Echeance</th>
                  <th>Articles</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                        <i className="fas fa-clipboard-list"></i>
                      </div>
                      <p className="mt-3 font-semibold text-slate-700">
                        Aucune commande trouvee
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Modifiez les filtres pour afficher plus de resultats.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className="font-semibold text-slate-800">
                          {order.id}
                        </div>
                        <div className="text-xs text-slate-500">
                          Creee le {order.date}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium text-slate-800">
                          {order.partner}
                        </div>
                        <div className="text-xs text-slate-500">
                          Priorite {order.priority}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${typeClasses[order.type]}`}
                        >
                          {order.type}
                        </span>
                      </td>
                      <td>{order.dueDate}</td>
                      <td>{order.items}</td>
                      <td className="font-bold text-slate-900">
                        {formatMoney(order.amount)}
                      </td>
                      <td>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                            aria-label={`Voir ${order.id}`}
                            type="button"
                          >
                            <i className="fas fa-eye text-xs"></i>
                          </button>
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                            aria-label={`Imprimer ${order.id}`}
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
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              A traiter aujourd hui
            </h2>
            <div className="mt-5 space-y-3">
              {orders
                .filter(
                  (order) =>
                    order.status === 'En retard' || order.priority === 'Haute',
                )
                .slice(0, 3)
                .map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-slate-800">
                        {order.id}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${statusClasses[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-600">
                      {order.partner}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-500">Echeance</span>
                      <span className="font-semibold text-slate-800">
                        {order.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <p className="text-sm text-slate-400">Valeur fournisseurs</p>
            <div className="mt-2 text-2xl font-bold">
              {formatMoney(
                orders
                  .filter((order) => order.type === 'Fournisseur')
                  .reduce((sum, order) => sum + order.amount, 0),
              )}
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Montant estime des commandes de reapprovisionnement.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
