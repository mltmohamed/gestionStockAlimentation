import { useMemo, useState } from 'react'

type StockStatus = 'Normal' | 'Bas' | 'Rupture'
type MovementType = 'Entree' | 'Sortie' | 'Correction'

type StockItem = {
  id: string
  name: string
  category: string
  quantity: number
  minQuantity: number
  maxQuantity: number
  unit: string
  location: string
  value: number
  status: StockStatus
}

type StockMovement = {
  id: string
  date: string
  product: string
  type: MovementType
  quantity: number
  reason: string
  user: string
}

const stockItems: StockItem[] = [
  {
    id: 'ART-001',
    name: 'Riz local 25kg',
    category: 'Cereales',
    quantity: 18,
    minQuantity: 10,
    maxQuantity: 60,
    unit: 'sac',
    location: 'Depot A',
    value: 288000,
    status: 'Normal',
  },
  {
    id: 'ART-002',
    name: 'Huile 5L',
    category: 'Epicerie',
    quantity: 8,
    minQuantity: 12,
    maxQuantity: 50,
    unit: 'bidon',
    location: 'Rayon 2',
    value: 44800,
    status: 'Bas',
  },
  {
    id: 'ART-003',
    name: 'Sucre 1kg',
    category: 'Epicerie',
    quantity: 52,
    minQuantity: 20,
    maxQuantity: 100,
    unit: 'paquet',
    location: 'Depot B',
    value: 31200,
    status: 'Normal',
  },
  {
    id: 'ART-004',
    name: 'Lait en poudre',
    category: 'Boissons',
    quantity: 4,
    minQuantity: 15,
    maxQuantity: 45,
    unit: 'boite',
    location: 'Rayon 1',
    value: 11200,
    status: 'Bas',
  },
  {
    id: 'ART-006',
    name: 'Tomate concentree',
    category: 'Conserves',
    quantity: 0,
    minQuantity: 10,
    maxQuantity: 80,
    unit: 'boite',
    location: 'Depot A',
    value: 0,
    status: 'Rupture',
  },
]

const movements: StockMovement[] = [
  {
    id: 'MVT-3051',
    date: '2026-05-22 10:30',
    product: 'Riz local 25kg',
    type: 'Sortie',
    quantity: 2,
    reason: 'Vente caisse',
    user: 'Nouhoum',
  },
  {
    id: 'MVT-3050',
    date: '2026-05-22 09:45',
    product: 'Huile 5L',
    type: 'Entree',
    quantity: 10,
    reason: 'Reception fournisseur',
    user: 'Nouhoum',
  },
  {
    id: 'MVT-3049',
    date: '2026-05-21 17:20',
    product: 'Lait en poudre',
    type: 'Correction',
    quantity: 1,
    reason: 'Inventaire rayon',
    user: 'Nouhoum',
  },
  {
    id: 'MVT-3048',
    date: '2026-05-21 15:05',
    product: 'Sucre 1kg',
    type: 'Sortie',
    quantity: 6,
    reason: 'Vente caisse',
    user: 'Nouhoum',
  },
]

const formatMoney = (value: number) => `${value.toLocaleString('fr-FR')} F`

const statusClasses: Record<StockStatus, string> = {
  Normal: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Bas: 'bg-orange-50 text-orange-700 ring-orange-100',
  Rupture: 'bg-red-50 text-red-700 ring-red-100',
}

const movementClasses: Record<MovementType, string> = {
  Entree: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Sortie: 'bg-blue-50 text-blue-700 ring-blue-100',
  Correction: 'bg-violet-50 text-violet-700 ring-violet-100',
}

export default function StockPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Tous')
  const [location, setLocation] = useState('Tous')

  const locations = useMemo(
    () => ['Tous', ...Array.from(new Set(stockItems.map((item) => item.location)))],
    [],
  )

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return stockItems.filter((item) => {
      const matchesSearch = query
        ? [item.id, item.name, item.category, item.location]
            .join(' ')
            .toLowerCase()
            .includes(query)
        : true
      const matchesStatus = status === 'Tous' || item.status === status
      const matchesLocation = location === 'Tous' || item.location === location

      return matchesSearch && matchesStatus && matchesLocation
    })
  }, [location, search, status])

  const totalValue = filteredItems.reduce((sum, item) => sum + item.value, 0)
  const totalQuantity = filteredItems.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockCount = filteredItems.filter((item) => item.status === 'Bas').length
  const outOfStockCount = filteredItems.filter(
    (item) => item.status === 'Rupture',
  ).length

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Controle des quantites
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Gestion de stock
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Suivez les niveaux, les ruptures et les mouvements de stock.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              type="button"
            >
              <i className="fas fa-clipboard-check text-xs"></i>
              Inventaire
            </button>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              type="button"
            >
              <i className="fas fa-right-left text-xs"></i>
              Nouveau mouvement
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Articles suivis
          </p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {filteredItems.length}
          </div>
          <p className="mt-3 text-sm font-medium text-blue-700">
            {totalQuantity} unites en stock
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Valeur stock</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatMoney(totalValue)}
          </div>
          <p className="mt-3 text-sm font-medium text-emerald-700">
            Selon prix d achat
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Stock bas</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {lowStockCount}
          </div>
          <p className="mt-3 text-sm font-medium text-orange-700">
            A reapprovisionner
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Ruptures</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {outOfStockCount}
          </div>
          <p className="mt-3 text-sm font-medium text-red-700">
            Vente bloquee
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
              placeholder="Rechercher article, code, emplacement..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Tous</option>
            <option>Normal</option>
            <option>Bas</option>
            <option>Rupture</option>
          </select>

          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Niveaux de stock
              </h2>
              <p className="text-sm text-slate-500">
                {filteredItems.length} resultat(s)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th>Code</th>
                  <th>Article</th>
                  <th>Emplacement</th>
                  <th>Quantite</th>
                  <th>Seuil</th>
                  <th>Valeur</th>
                  <th>Statut</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                        <i className="fas fa-warehouse"></i>
                      </div>
                      <p className="mt-3 font-semibold text-slate-700">
                        Aucun stock trouve
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Modifiez les filtres pour afficher plus de resultats.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const percent = Math.min(
                      (item.quantity / Math.max(item.maxQuantity, 1)) * 100,
                      100,
                    )

                    return (
                      <tr key={item.id}>
                        <td className="font-semibold text-slate-800">
                          {item.id}
                        </td>
                        <td>
                          <div className="font-medium text-slate-800">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.category}
                          </div>
                        </td>
                        <td>{item.location}</td>
                        <td>
                          <div className="min-w-[130px]">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-bold text-slate-900">
                                {item.quantity} {item.unit}
                              </span>
                              <span className="text-xs text-slate-500">
                                max {item.maxQuantity}
                              </span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-slate-100">
                              <div
                                className={`h-2 rounded-full ${
                                  item.status === 'Rupture'
                                    ? 'bg-red-500'
                                    : item.status === 'Bas'
                                      ? 'bg-orange-500'
                                      : 'bg-emerald-500'
                                }`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>{item.minQuantity}</td>
                        <td className="font-bold text-slate-900">
                          {formatMoney(item.value)}
                        </td>
                        <td>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[item.status]}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-end gap-2">
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                              aria-label={`Ajouter stock ${item.name}`}
                              type="button"
                            >
                              <i className="fas fa-plus text-xs"></i>
                            </button>
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                              aria-label={`Corriger stock ${item.name}`}
                              type="button"
                            >
                              <i className="fas fa-pen text-xs"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Mouvement rapide
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enregistrer une entree, une sortie ou une correction.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Type mouvement
                </label>
                <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  <option>Entree</option>
                  <option>Sortie</option>
                  <option>Correction</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Article
                </label>
                <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  {stockItems.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Quantite
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Emplacement
                  </label>
                  <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                    {locations
                      .filter((item) => item !== 'Tous')
                      .map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                  </select>
                </div>
              </div>

              <button
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
                type="button"
              >
                <i className="fas fa-floppy-disk text-xs"></i>
                Enregistrer mouvement
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Derniers mouvements
            </h2>
            <div className="mt-5 space-y-3">
              {movements.map((movement) => (
                <div
                  key={movement.id}
                  className="rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-slate-800">
                      {movement.product}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${movementClasses[movement.type]}`}
                    >
                      {movement.type}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">{movement.reason}</span>
                    <span className="font-bold text-slate-800">
                      {movement.quantity}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {movement.date} - {movement.user}
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
