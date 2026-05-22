import { useMemo, useState } from 'react'

type UserStatus = 'Actif' | 'Suspendu'

const users = [
  { id: 'USR-001', name: 'Nouhoum', role: 'Administrateur', phone: '+223 70 00 00 00', lastLogin: '2026-05-22 10:12', status: 'Actif' as UserStatus },
  { id: 'USR-002', name: 'Awa Traore', role: 'Caissier', phone: '+223 76 21 45 88', lastLogin: '2026-05-21 18:30', status: 'Actif' as UserStatus },
  { id: 'USR-003', name: 'Ibrahim Diallo', role: 'Stock', phone: '+223 66 12 44 90', lastLogin: '2026-05-19 09:05', status: 'Suspendu' as UserStatus },
]

const permissions = ['Ventes', 'Stock', 'Articles', 'Clients', 'Rapports']

const statusClasses: Record<UserStatus, string> = {
  Actif: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Suspendu: 'bg-red-50 text-red-700 ring-red-100',
}

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('Tous')

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch = query ? [user.id, user.name, user.role, user.phone].join(' ').toLowerCase().includes(query) : true
      const matchesRole = role === 'Tous' || user.role === role
      return matchesSearch && matchesRole
    })
  }, [role, search])

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Administration</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Gestion des utilisateurs</h1>
            <p className="mt-1 text-sm text-slate-500">Gerez les comptes, les roles et les droits d acces.</p>
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white hover:bg-blue-700" type="button">
            <i className="fas fa-user-plus text-xs"></i>
            Nouvel utilisateur
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Utilisateurs</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">{users.length}</div>
          <p className="mt-3 text-sm font-medium text-blue-700">Comptes crees</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Actifs</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">{users.filter((user) => user.status === 'Actif').length}</div>
          <p className="mt-3 text-sm font-medium text-emerald-700">Peuvent se connecter</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Roles</p>
          <div className="mt-2 text-2xl font-bold text-slate-900">{new Set(users.map((user) => user.role)).size}</div>
          <p className="mt-3 text-sm font-medium text-violet-700">Profils disponibles</p>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-3 border-b border-slate-200 p-5 lg:grid-cols-[1fr_180px]">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher utilisateur..." className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            <select value={role} onChange={(event) => setRole(event.target.value)} className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none">
              <option>Tous</option>
              <option>Administrateur</option>
              <option>Caissier</option>
              <option>Stock</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr><th>Code</th><th>Utilisateur</th><th>Role</th><th>Derniere connexion</th><th>Statut</th><th className="text-right">Actions</th></tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="font-semibold text-slate-800">{user.id}</td>
                    <td><div className="font-medium text-slate-800">{user.name}</div><div className="text-xs text-slate-500">{user.phone}</div></td>
                    <td>{user.role}</td>
                    <td>{user.lastLogin}</td>
                    <td><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[user.status]}`}>{user.status}</span></td>
                    <td><div className="flex justify-end gap-2"><button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" type="button"><i className="fas fa-pen text-xs"></i></button><button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" type="button"><i className="fas fa-key text-xs"></i></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Permissions rapides</h2>
          <div className="mt-5 space-y-3">
            {permissions.map((permission) => (
              <label key={permission} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                {permission}
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </label>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
