const statCards = [
  {
    label: 'Ventes du jour',
    value: '18',
    detail: '+4 depuis hier',
    icon: 'fa-cash-register',
    tone: 'blue',
  },
  {
    label: 'Chiffre d affaires',
    value: '245 000 F',
    detail: '+8.5% cette semaine',
    icon: 'fa-sack-dollar',
    tone: 'emerald',
  },
  {
    label: 'Articles en stock',
    value: '426',
    detail: '12 familles de produits',
    icon: 'fa-boxes-stacked',
    tone: 'violet',
  },
  {
    label: 'Stock critique',
    value: '7',
    detail: 'A traiter aujourd hui',
    icon: 'fa-triangle-exclamation',
    tone: 'orange',
  },
]

const salesTrend = [
  { label: 'Lun', value: 42 },
  { label: 'Mar', value: 55 },
  { label: 'Mer', value: 38 },
  { label: 'Jeu', value: 68 },
  { label: 'Ven', value: 74 },
  { label: 'Sam', value: 61 },
]

const recentSales = [
  {
    id: 'V-1024',
    customer: 'Client comptoir',
    total: '18 500 F',
    payment: 'Especes',
    status: 'Payee',
  },
  {
    id: 'V-1023',
    customer: 'Aminata Coulibaly',
    total: '42 000 F',
    payment: 'Mobile money',
    status: 'Payee',
  },
  {
    id: 'V-1022',
    customer: 'Moussa Traore',
    total: '12 750 F',
    payment: 'Credit',
    status: 'En attente',
  },
]

const criticalStock = [
  { name: 'Riz local 25kg', quantity: 3, minimum: 10 },
  { name: 'Huile 5L', quantity: 5, minimum: 12 },
  { name: 'Sucre 1kg', quantity: 8, minimum: 20 },
  { name: 'Lait en poudre', quantity: 4, minimum: 15 },
]

const topCustomers = [
  { name: 'Aminata Coulibaly', orders: 14, amount: '286 000 F' },
  { name: 'Moussa Traore', orders: 9, amount: '174 500 F' },
  { name: 'Client comptoir', orders: 31, amount: '152 000 F' },
]

const quickActions = [
  { label: 'Nouvelle vente', icon: 'fa-plus', color: 'bg-blue-600' },
  { label: 'Ajouter article', icon: 'fa-box-open', color: 'bg-slate-800' },
  { label: 'Mouvement stock', icon: 'fa-right-left', color: 'bg-emerald-600' },
]

const toneClasses: Record<
  string,
  { icon: string; ring: string; text: string; bg: string }
> = {
  blue: {
    icon: 'bg-blue-50 text-blue-600',
    ring: 'ring-blue-100',
    text: 'text-blue-700',
    bg: 'bg-blue-500',
  },
  emerald: {
    icon: 'bg-emerald-50 text-emerald-600',
    ring: 'ring-emerald-100',
    text: 'text-emerald-700',
    bg: 'bg-emerald-500',
  },
  violet: {
    icon: 'bg-violet-50 text-violet-600',
    ring: 'ring-violet-100',
    text: 'text-violet-700',
    bg: 'bg-violet-500',
  },
  orange: {
    icon: 'bg-orange-50 text-orange-600',
    ring: 'ring-orange-100',
    text: 'text-orange-700',
    bg: 'bg-orange-500',
  },
}

export default function DashboardPage() {
  const currentTime = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Tableau de bord
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">
                Bonjour, Nouhoum
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Resume de l activite du point de vente a {currentTime}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className={`inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 ${action.color}`}
                  type="button"
                >
                  <i className={`fas ${action.icon} text-xs`}></i>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Caisse active</p>
              <div className="mt-1 text-2xl font-bold">245 000 F</div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
              <i className="fas fa-wallet text-xl text-emerald-300"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4 text-sm">
            <span className="text-slate-400">Statut</span>
            <span className="inline-flex items-center gap-2 font-semibold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Ouverte
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const tone = toneClasses[card.tone]

          return (
            <article
              key={card.label}
              className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ring-1 ${tone.ring}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.label}
                  </p>
                  <div className="mt-2 text-2xl font-bold text-slate-900">
                    {card.value}
                  </div>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${tone.icon}`}
                >
                  <i className={`fas ${card.icon}`}></i>
                </div>
              </div>
              <p className={`mt-4 text-sm font-medium ${tone.text}`}>
                {card.detail}
              </p>
            </article>
          )
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Evolution des ventes
              </h2>
              <p className="text-sm text-slate-500">6 derniers jours</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              +12.4%
            </span>
          </div>

          <div className="mt-6 flex h-64 items-end gap-3 rounded-lg bg-slate-50 p-4">
            {salesTrend.map((item) => (
              <div key={item.label} className="flex h-full flex-1 flex-col justify-end gap-2">
                <div className="flex flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-blue-600 shadow-sm"
                    style={{ height: `${item.value}%` }}
                    aria-label={`Ventes ${item.label}: ${item.value}%`}
                  ></div>
                </div>
                <span className="text-center text-xs font-medium text-slate-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Stock critique
              </h2>
              <p className="text-sm text-slate-500">Articles a recharger</p>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              {criticalStock.length} alertes
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {criticalStock.map((item) => {
              const percent = Math.min((item.quantity / item.minimum) * 100, 100)

              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-slate-700">
                      {item.name}
                    </span>
                    <span className="font-semibold text-orange-700">
                      {item.quantity}/{item.minimum}
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-orange-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Ventes recentes
              </h2>
              <p className="text-sm text-slate-500">
                Dernieres operations encaissees
              </p>
            </div>
            <button
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              type="button"
            >
              Voir tout
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th>Reference</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Paiement</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="font-semibold text-slate-700">{sale.id}</td>
                    <td>{sale.customer}</td>
                    <td className="font-semibold text-slate-900">
                      {sale.total}
                    </td>
                    <td>{sale.payment}</td>
                    <td>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          sale.status === 'Payee'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-orange-50 text-orange-700'
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Meilleurs clients
            </h2>
            <p className="text-sm text-slate-500">Classement du mois</p>
          </div>

          <div className="mt-5 space-y-3">
            {topCustomers.map((customer, index) => (
              <div
                key={customer.name}
                className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-700 shadow-sm">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-slate-800">
                    {customer.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {customer.orders} achats
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {customer.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
