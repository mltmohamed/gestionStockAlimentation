import { useMemo, useState } from 'react'

type CustomerStatus = 'Actif' | 'Credit ouvert' | 'Inactif'
type CustomerSegment = 'Comptoir' | 'Regulier' | 'Grossiste'

type Customer = {
  id: string
  name: string
  phone: string
  segment: CustomerSegment
  orders: number
  totalSpent: number
  credit: number
  lastPurchase: string
  status: CustomerStatus
}

const customers: Customer[] = [
  {
    id: 'CL-001',
    name: 'Client comptoir',
    phone: '-',
    segment: 'Comptoir',
    orders: 31,
    totalSpent: 152000,
    credit: 0,
    lastPurchase: '2026-05-22',
    status: 'Actif',
  },
  {
    id: 'CL-002',
    name: 'Aminata Coulibaly',
    phone: '+223 76 45 12 30',
    segment: 'Regulier',
    orders: 14,
    totalSpent: 286000,
    credit: 0,
    lastPurchase: '2026-05-22',
    status: 'Actif',
  },
  {
    id: 'CL-003',
    name: 'Moussa Traore',
    phone: '+223 70 88 41 22',
    segment: 'Regulier',
    orders: 9,
    totalSpent: 174500,
    credit: 12750,
    lastPurchase: '2026-05-21',
    status: 'Credit ouvert',
  },
  {
    id: 'CL-004',
    name: 'Fatoumata Diallo',
    phone: '+223 66 10 33 45',
    segment: 'Grossiste',
    orders: 6,
    totalSpent: 438000,
    credit: 42000,
    lastPurchase: '2026-05-20',
    status: 'Credit ouvert',
  },
  {
    id: 'CL-005',
    name: 'Boubacar Keita',
    phone: '+223 79 21 90 11',
    segment: 'Regulier',
    orders: 2,
    totalSpent: 33500,
    credit: 0,
    lastPurchase: '2026-04-18',
    status: 'Inactif',
  },
]

const recentActivity = [
  {
    customer: 'Aminata Coulibaly',
    action: 'Achat regle',
    amount: 42000,
    date: '2026-05-22',
  },
  {
    customer: 'Moussa Traore',
    action: 'Credit client',
    amount: 12750,
    date: '2026-05-21',
  },
  {
    customer: 'Client comptoir',
    action: 'Achat comptoir',
    amount: 18500,
    date: '2026-05-22',
  },
]

const formatMoney = (value: number) => `${value.toLocaleString('fr-FR')} F`

const statusClasses: Record<CustomerStatus, string> = {
  Actif: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'Credit ouvert': 'bg-orange-50 text-orange-700 ring-orange-100',
  Inactif: 'bg-slate-50 text-slate-700 ring-slate-200',
}

const segmentClasses: Record<CustomerSegment, string> = {
  Comptoir: 'bg-blue-50 text-blue-700 ring-blue-100',
  Regulier: 'bg-violet-50 text-violet-700 ring-violet-100',
  Grossiste: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
}

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [segment, setSegment] = useState('Tous')
  const [status, setStatus] = useState('Tous')

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return customers.filter((customer) => {
      const matchesSearch = query
        ? [customer.id, customer.name, customer.phone, customer.segment]
            .join(' ')
            .toLowerCase()
            .includes(query)
        : true
      const matchesSegment = segment === 'Tous' || customer.segment === segment
      const matchesStatus = status === 'Tous' || customer.status === status

      return matchesSearch && matchesSegment && matchesStatus
    })
  }, [search, segment, status])

  const totalSpent = filteredCustomers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0,
  )
  const totalCredit = filteredCustomers.reduce(
    (sum, customer) => sum + customer.credit,
    0,
  )
  const creditCustomers = filteredCustomers.filter(
    (customer) => customer.credit > 0,
  ).length
  const activeCustomers = filteredCustomers.filter(
    (customer) => customer.status !== 'Inactif',
  ).length

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Portefeuille clients
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Gestion des clients
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Suivez les contacts, les achats et les credits ouverts.
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
              <i className="fas fa-user-plus text-xs"></i>
              Nouveau client
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Clients affiches
          </p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {filteredCustomers.length}
          </div>
          <p className="mt-3 text-sm font-medium text-blue-700">
            {activeCustomers} actif(s)
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Chiffre client
          </p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatMoney(totalSpent)}
          </div>
          <p className="mt-3 text-sm font-medium text-emerald-700">
            Achats cumules
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Credit ouvert</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatMoney(totalCredit)}
          </div>
          <p className="mt-3 text-sm font-medium text-orange-700">
            {creditCustomers} client(s)
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Panier moyen</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatMoney(
              filteredCustomers.reduce(
                (sum, customer) => sum + customer.orders,
                0,
              ) === 0
                ? 0
                : Math.round(
                    totalSpent /
                      filteredCustomers.reduce(
                        (sum, customer) => sum + customer.orders,
                        0,
                      ),
                  ),
            )}
          </div>
          <p className="mt-3 text-sm font-medium text-violet-700">
            Moyenne achat
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
              placeholder="Rechercher nom, telephone, segment..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={segment}
            onChange={(event) => setSegment(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Tous</option>
            <option>Comptoir</option>
            <option>Regulier</option>
            <option>Grossiste</option>
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Tous</option>
            <option>Actif</option>
            <option>Credit ouvert</option>
            <option>Inactif</option>
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Liste des clients
              </h2>
              <p className="text-sm text-slate-500">
                {filteredCustomers.length} resultat(s)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th>Code</th>
                  <th>Client</th>
                  <th>Segment</th>
                  <th>Achats</th>
                  <th>Total</th>
                  <th>Credit</th>
                  <th>Statut</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                        <i className="fas fa-users"></i>
                      </div>
                      <p className="mt-3 font-semibold text-slate-700">
                        Aucun client trouve
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Modifiez les filtres ou ajoutez un nouveau client.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="font-semibold text-slate-800">
                        {customer.id}
                      </td>
                      <td>
                        <div className="font-medium text-slate-800">
                          {customer.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {customer.phone}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${segmentClasses[customer.segment]}`}
                        >
                          {customer.segment}
                        </span>
                      </td>
                      <td>{customer.orders}</td>
                      <td className="font-bold text-slate-900">
                        {formatMoney(customer.totalSpent)}
                      </td>
                      <td
                        className={
                          customer.credit > 0
                            ? 'font-bold text-orange-700'
                            : 'text-slate-500'
                        }
                      >
                        {formatMoney(customer.credit)}
                      </td>
                      <td>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[customer.status]}`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                            aria-label={`Voir ${customer.name}`}
                            type="button"
                          >
                            <i className="fas fa-eye text-xs"></i>
                          </button>
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                            aria-label={`Modifier ${customer.name}`}
                            type="button"
                          >
                            <i className="fas fa-pen text-xs"></i>
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
              Fiche client rapide
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Preparation du formulaire d ajout ou modification.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  placeholder="Ex: Aminata Coulibaly"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Telephone
                </label>
                <input
                  type="text"
                  placeholder="+223 ..."
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Segment
                  </label>
                  <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                    <option>Comptoir</option>
                    <option>Regulier</option>
                    <option>Grossiste</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Plafond credit
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <button
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
                type="button"
              >
                <i className="fas fa-floppy-disk text-xs"></i>
                Enregistrer client
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Activite recente
            </h2>
            <div className="mt-5 space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={`${activity.customer}-${activity.date}-${activity.amount}`}
                  className="rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-semibold text-slate-800">
                      {activity.customer}
                    </span>
                    <span className="font-bold text-slate-900">
                      {formatMoney(activity.amount)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.action}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {activity.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
