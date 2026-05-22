const kpis = [
  { label: 'Chiffre d affaires', value: '1 245 000 F', detail: '+12% ce mois', color: 'text-emerald-700' },
  { label: 'Ventes', value: '284', detail: 'Panier moyen 4 384 F', color: 'text-blue-700' },
  { label: 'Marge estimee', value: '28%', detail: '+3 points', color: 'text-violet-700' },
  { label: 'Ruptures evitees', value: '16', detail: 'Grace aux alertes', color: 'text-orange-700' },
]

const salesByCategory = [
  { label: 'Epicerie', value: 38, amount: '472 000 F' },
  { label: 'Cereales', value: 26, amount: '318 000 F' },
  { label: 'Boissons', value: 18, amount: '224 000 F' },
  { label: 'Conserves', value: 12, amount: '148 000 F' },
  { label: 'Pates', value: 6, amount: '83 000 F' },
]

const bestProducts = [
  { name: 'Riz local 25kg', sold: 42, revenue: '777 000 F' },
  { name: 'Huile 5L', sold: 35, revenue: '227 500 F' },
  { name: 'Sucre 1kg', sold: 88, revenue: '66 000 F' },
  { name: 'Spaghetti 500g', sold: 64, revenue: '38 400 F' },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Pilotage</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Analyses et statistiques</h1>
            <p className="mt-1 text-sm text-slate-500">Suivez les ventes, les marges et les performances du stock.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none">
              <option>Ce mois</option>
              <option>7 jours</option>
              <option>30 jours</option>
              <option>Cette annee</option>
            </select>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white hover:bg-blue-700" type="button">
              <i className="fas fa-file-export text-xs"></i>
              Exporter
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <article key={item.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <div className="mt-2 text-2xl font-bold text-slate-900">{item.value}</div>
            <p className={`mt-3 text-sm font-medium ${item.color}`}>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Ventes par categorie</h2>
              <p className="text-sm text-slate-500">Repartition du chiffre d affaires</p>
            </div>
          </div>
          <div className="mt-6 space-y-5">
            {salesByCategory.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800">{item.label}</span>
                  <span className="font-bold text-slate-900">{item.amount}</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-blue-600" style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Meilleurs articles</h2>
          <div className="mt-5 space-y-3">
            {bestProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-700 shadow-sm">{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-slate-800">{product.name}</div>
                  <div className="text-xs text-slate-500">{product.sold} vendus</div>
                </div>
                <div className="text-sm font-bold text-slate-900">{product.revenue}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
