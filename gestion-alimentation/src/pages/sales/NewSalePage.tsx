import { useMemo, useState } from 'react'

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  unit: string
}

type CartItem = Product & {
  quantity: number
}

const products: Product[] = [
  {
    id: 'ART-001',
    name: 'Riz local 25kg',
    category: 'Cereales',
    price: 18500,
    stock: 18,
    unit: 'sac',
  },
  {
    id: 'ART-002',
    name: 'Huile 5L',
    category: 'Epicerie',
    price: 6500,
    stock: 24,
    unit: 'bidon',
  },
  {
    id: 'ART-003',
    name: 'Sucre 1kg',
    category: 'Epicerie',
    price: 750,
    stock: 52,
    unit: 'paquet',
  },
  {
    id: 'ART-004',
    name: 'Lait en poudre',
    category: 'Boissons',
    price: 3200,
    stock: 11,
    unit: 'boite',
  },
  {
    id: 'ART-005',
    name: 'Spaghetti 500g',
    category: 'Pates',
    price: 600,
    stock: 36,
    unit: 'paquet',
  },
  {
    id: 'ART-006',
    name: 'Tomate concentree',
    category: 'Conserves',
    price: 500,
    stock: 42,
    unit: 'boite',
  },
]

const customers = ['Client comptoir', 'Aminata Coulibaly', 'Moussa Traore']

const formatMoney = (value: number) => `${value.toLocaleString('fr-FR')} F`

export default function NewSalePage() {
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [customer, setCustomer] = useState(customers[0])
  const [paymentMethod, setPaymentMethod] = useState('Especes')
  const [amountPaid, setAmountPaid] = useState('')

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return products
    }

    return products.filter((product) =>
      [product.name, product.category, product.id]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [search])

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const discount = 0
  const total = subtotal - discount
  const paidValue = Number(amountPaid || 0)
  const change = Math.max(paidValue - total, 0)

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item,
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(1, Math.min(quantity, item.stock)),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (productId: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
      <section className="space-y-5">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Caisse rapide
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">
                Nouvelle vente
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Selectionnez les articles, verifiez le panier puis encaissez.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                type="button"
              >
                <i className="fas fa-barcode text-xs"></i>
                Scanner
              </button>
              <button
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                type="button"
              >
                <i className="fas fa-user-plus text-xs"></i>
                Nouveau client
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <i
                className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
                aria-hidden="true"
              ></i>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher par nom, code ou categorie..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option>Toutes categories</option>
              <option>Epicerie</option>
              <option>Cereales</option>
              <option>Boissons</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              className="rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => addToCart(product)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400">
                    {product.id}
                  </p>
                  <h2 className="mt-1 truncate text-base font-bold text-slate-900">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {product.category}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <i className="fas fa-plus"></i>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-lg font-bold text-slate-900">
                  {formatMoney(product.price)}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    product.stock <= 12
                      ? 'bg-orange-50 text-orange-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {product.stock} {product.unit}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <aside className="space-y-5">
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Panier</h2>
              <p className="text-sm text-slate-500">
                {cart.length} article{cart.length > 1 ? 's' : ''}
              </p>
            </div>
            <button
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              onClick={() => setCart([])}
              type="button"
            >
              Vider
            </button>
          </div>

          <div className="max-h-[380px] divide-y divide-slate-100 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                  <i className="fas fa-cart-shopping"></i>
                </div>
                <p className="mt-3 font-semibold text-slate-700">
                  Panier vide
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Cliquez sur un article pour l ajouter.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {formatMoney(item.price)} / {item.unit}
                      </p>
                    </div>
                    <button
                      className="text-slate-400 transition-colors hover:text-red-600"
                      aria-label={`Retirer ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                    >
                      <i className="fas fa-xmark"></i>
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-lg border border-slate-200">
                      <button
                        className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-50"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        type="button"
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(item.id, Number(event.target.value))
                        }
                        className="h-9 w-14 border-x border-slate-200 text-center text-sm font-semibold outline-none"
                      />
                      <button
                        className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-50"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        type="button"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>

                    <div className="font-bold text-slate-900">
                      {formatMoney(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Paiement</h2>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="sale-customer"
                className="text-sm font-semibold text-slate-700"
              >
                Client
              </label>
              <select
                id="sale-customer"
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {customers.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="payment-method"
                className="text-sm font-semibold text-slate-700"
              >
                Mode de paiement
              </label>
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Especes</option>
                <option>Mobile money</option>
                <option>Carte bancaire</option>
                <option>Credit client</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="amount-paid"
                className="text-sm font-semibold text-slate-700"
              >
                Montant recu
              </label>
              <input
                id="amount-paid"
                type="number"
                min={0}
                value={amountPaid}
                onChange={(event) => setAmountPaid(event.target.value)}
                placeholder="0"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-5 space-y-3 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Sous-total</span>
              <span className="font-semibold text-slate-800">
                {formatMoney(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Remise</span>
              <span className="font-semibold text-slate-800">
                {formatMoney(discount)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-slate-900">
                {formatMoney(total)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Monnaie</span>
              <span className="font-semibold text-emerald-700">
                {formatMoney(change)}
              </span>
            </div>
          </div>

          <button
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={cart.length === 0}
            type="button"
          >
            <i className="fas fa-check"></i>
            Valider la vente
          </button>

          <button
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
            disabled={cart.length === 0}
            type="button"
          >
            <i className="fas fa-print"></i>
            Imprimer le recu
          </button>
        </div>
      </aside>
    </div>
  )
}
