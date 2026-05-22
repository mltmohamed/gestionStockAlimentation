import { useMemo, useState } from 'react'

type ArticleStatus = 'Actif' | 'Stock bas' | 'Rupture' | 'Archive'

type Article = {
  id: string
  name: string
  category: string
  purchasePrice: number
  salePrice: number
  stock: number
  minStock: number
  unit: string
  status: ArticleStatus
}

const articles: Article[] = [
  {
    id: 'ART-001',
    name: 'Riz local 25kg',
    category: 'Cereales',
    purchasePrice: 16000,
    salePrice: 18500,
    stock: 18,
    minStock: 10,
    unit: 'sac',
    status: 'Actif',
  },
  {
    id: 'ART-002',
    name: 'Huile 5L',
    category: 'Epicerie',
    purchasePrice: 5600,
    salePrice: 6500,
    stock: 8,
    minStock: 12,
    unit: 'bidon',
    status: 'Stock bas',
  },
  {
    id: 'ART-003',
    name: 'Sucre 1kg',
    category: 'Epicerie',
    purchasePrice: 600,
    salePrice: 750,
    stock: 52,
    minStock: 20,
    unit: 'paquet',
    status: 'Actif',
  },
  {
    id: 'ART-004',
    name: 'Lait en poudre',
    category: 'Boissons',
    purchasePrice: 2800,
    salePrice: 3200,
    stock: 4,
    minStock: 15,
    unit: 'boite',
    status: 'Stock bas',
  },
  {
    id: 'ART-005',
    name: 'Spaghetti 500g',
    category: 'Pates',
    purchasePrice: 450,
    salePrice: 600,
    stock: 36,
    minStock: 15,
    unit: 'paquet',
    status: 'Actif',
  },
  {
    id: 'ART-006',
    name: 'Tomate concentree',
    category: 'Conserves',
    purchasePrice: 380,
    salePrice: 500,
    stock: 0,
    minStock: 10,
    unit: 'boite',
    status: 'Rupture',
  },
]

const formatMoney = (value: number) => `${value.toLocaleString('fr-FR')} F`

const statusClasses: Record<ArticleStatus, string> = {
  Actif: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'Stock bas': 'bg-orange-50 text-orange-700 ring-orange-100',
  Rupture: 'bg-red-50 text-red-700 ring-red-100',
  Archive: 'bg-slate-50 text-slate-700 ring-slate-200',
}

export default function ArticlesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Toutes')
  const [status, setStatus] = useState('Tous')

  const categories = useMemo(
    () => ['Toutes', ...Array.from(new Set(articles.map((item) => item.category)))],
    [],
  )

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase()

    return articles.filter((article) => {
      const matchesSearch = query
        ? [article.id, article.name, article.category]
            .join(' ')
            .toLowerCase()
            .includes(query)
        : true
      const matchesCategory =
        category === 'Toutes' || article.category === category
      const matchesStatus = status === 'Tous' || article.status === status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [category, search, status])

  const stockValue = filteredArticles.reduce(
    (sum, article) => sum + article.stock * article.purchasePrice,
    0,
  )
  const lowStockCount = filteredArticles.filter(
    (article) => article.stock <= article.minStock && article.stock > 0,
  ).length
  const outOfStockCount = filteredArticles.filter(
    (article) => article.stock === 0,
  ).length
  const averageMargin =
    filteredArticles.length === 0
      ? 0
      : Math.round(
          filteredArticles.reduce(
            (sum, article) =>
              sum +
              ((article.salePrice - article.purchasePrice) / article.salePrice) *
                100,
            0,
          ) / filteredArticles.length,
        )

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Catalogue produits
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Gestion des articles
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Creez, classez et surveillez les articles vendus en boutique.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              type="button"
            >
              <i className="fas fa-file-import text-xs"></i>
              Importer
            </button>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              type="button"
            >
              <i className="fas fa-plus text-xs"></i>
              Nouvel article
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Articles affiches
          </p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {filteredArticles.length}
          </div>
          <p className="mt-3 text-sm font-medium text-blue-700">
            {categories.length - 1} categories
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Valeur du stock</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatMoney(stockValue)}
          </div>
          <p className="mt-3 text-sm font-medium text-emerald-700">
            Prix d achat
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Alertes stock</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {lowStockCount}
          </div>
          <p className="mt-3 text-sm font-medium text-orange-700">
            {outOfStockCount} rupture(s)
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Marge moyenne</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {averageMargin}%
          </div>
          <p className="mt-3 text-sm font-medium text-violet-700">
            Sur articles affiches
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
              placeholder="Rechercher code, article ou categorie..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>Tous</option>
            <option>Actif</option>
            <option>Stock bas</option>
            <option>Rupture</option>
            <option>Archive</option>
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Liste des articles
              </h2>
              <p className="text-sm text-slate-500">
                {filteredArticles.length} resultat(s)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th>Code</th>
                  <th>Article</th>
                  <th>Categorie</th>
                  <th>Prix achat</th>
                  <th>Prix vente</th>
                  <th>Stock</th>
                  <th>Statut</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                        <i className="fas fa-box-open"></i>
                      </div>
                      <p className="mt-3 font-semibold text-slate-700">
                        Aucun article trouve
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Modifiez les filtres ou ajoutez un nouvel article.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredArticles.map((article) => {
                    const stockPercent = Math.min(
                      (article.stock / Math.max(article.minStock * 2, 1)) * 100,
                      100,
                    )

                    return (
                      <tr key={article.id}>
                        <td className="font-semibold text-slate-800">
                          {article.id}
                        </td>
                        <td>
                          <div className="font-medium text-slate-800">
                            {article.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Unite: {article.unit}
                          </div>
                        </td>
                        <td>{article.category}</td>
                        <td>{formatMoney(article.purchasePrice)}</td>
                        <td className="font-bold text-slate-900">
                          {formatMoney(article.salePrice)}
                        </td>
                        <td>
                          <div className="min-w-[120px]">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-semibold text-slate-800">
                                {article.stock}
                              </span>
                              <span className="text-xs text-slate-500">
                                min {article.minStock}
                              </span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-slate-100">
                              <div
                                className={`h-2 rounded-full ${
                                  article.stock <= article.minStock
                                    ? 'bg-orange-500'
                                    : 'bg-emerald-500'
                                }`}
                                style={{ width: `${stockPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[article.status]}`}
                          >
                            {article.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-end gap-2">
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                              aria-label={`Modifier ${article.name}`}
                              type="button"
                            >
                              <i className="fas fa-pen text-xs"></i>
                            </button>
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                              aria-label={`Stock ${article.name}`}
                              type="button"
                            >
                              <i className="fas fa-boxes-stacked text-xs"></i>
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
              Fiche article rapide
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Preparation du formulaire d ajout ou modification.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Nom article
                </label>
                <input
                  type="text"
                  placeholder="Ex: Riz local 25kg"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Prix achat
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Prix vente
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Stock initial
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Seuil minimum
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
                Enregistrer article
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <p className="text-sm text-slate-400">Articles a surveiller</p>
            <div className="mt-2 text-2xl font-bold">
              {lowStockCount + outOfStockCount}
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Articles en stock bas ou en rupture.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
