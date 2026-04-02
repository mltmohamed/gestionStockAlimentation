import React from 'react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bonjour, Nouhoum !</h1>
          <p className="text-gray-500 mt-1">
            Aujourd'hui, {new Date().toLocaleDateString('fr-FR')} •{' '}
            {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium hidden md:block">
          <i className="fas fa-store mr-2"></i>Point de vente principal
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5 border border-gray-200 flex items-center animate-fade-in">
          <div className="flex-1">
            <div className="text-gray-500 text-sm font-medium">Total Ventes</div>
            <div className="text-3xl font-bold mt-1 text-gray-800">0</div>
            <div className="flex items-center mt-2 text-green-600 text-sm font-medium">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>+12% depuis le mois dernier</span>
            </div>
          </div>
          <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
            <i className="fas fa-cash-register text-2xl"></i>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow p-5 border border-gray-200 flex items-center animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex-1">
            <div className="text-gray-500 text-sm font-medium">Revenu Total</div>
            <div className="text-3xl font-bold mt-1 text-green-600">0 F</div>
            <div className="flex items-center mt-2 text-green-600 text-sm font-medium">
              <i className="fas fa-chart-line mr-1"></i>
              <span>+8.5% par rapport à hier</span>
            </div>
          </div>
          <div className="bg-green-100 text-green-600 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
            <i className="fas fa-hand-holding-usd text-2xl"></i>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow p-5 border border-gray-200 flex items-center animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex-1">
            <div className="text-gray-500 text-sm font-medium">Articles en Stock</div>
            <div className="text-3xl font-bold mt-1 text-purple-600">0</div>
            <div className="flex items-center mt-2 text-gray-500 text-sm">
              <i className="fas fa-boxes mr-1"></i>
              <span>0 articles à réapprovisionner</span>
            </div>
          </div>
          <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
            <i className="fas fa-cubes text-2xl"></i>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow p-5 border border-gray-200 flex items-center animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex-1">
            <div className="text-gray-500 text-sm font-medium">Stock Critique</div>
            <div className="text-3xl font-bold mt-1 text-red-600">0</div>
            <div className="flex items-center mt-2 text-red-600 text-sm font-medium">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              <span>Articles nécessitant une action</span>
            </div>
          </div>
          <div className="bg-red-100 text-red-600 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
            <i className="fas fa-bell text-2xl"></i>
          </div>
        </div>
      </div>

      <div
        className="bg-white rounded-xl shadow border border-gray-200 p-4 animate-fade-in"
        style={{ animationDelay: '0.35s' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-gray-800 flex items-center">
            <i className="fas fa-chart-area mr-2 text-blue-600"></i>
            Évolution des Ventes (6 derniers mois)
          </h2>
        </div>
        <div className="relative h-64 w-full">
          <canvas id="salesChart"></canvas>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
              <i className="fas fa-history mr-2 text-blue-600"></i>
              Ventes Récentes
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center" type="button">
              Voir Tout <i className="fas fa-arrow-right ml-1 text-xs"></i>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Aucune vente récente
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
              <i className="fas fa-exclamation-triangle mr-2 text-red-600"></i>
              Stock Critique (0)
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center" type="button">
              Gérer le Stock <i className="fas fa-arrow-right ml-1 text-xs"></i>
            </button>
          </div>
          <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
            <li className="p-4 text-center text-gray-500">Aucun article en stock critique</li>
          </ul>
        </div>
      </div>

      <div
        className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden animate-fade-in"
        style={{ animationDelay: '0.6s' }}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-gray-800 flex items-center">
            <i className="fas fa-medal mr-2 text-yellow-500"></i>
            Meilleurs Clients
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className="p-5 text-center text-gray-400">
              <div className="text-3xl font-bold mb-1">{rank}</div>
              <div className="italic">Aucun client</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
