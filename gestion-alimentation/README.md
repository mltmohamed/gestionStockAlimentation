# Gestion Alimentation

Application desktop de gestion de stock et de ventes, construite avec Electron,
Vite, React et TypeScript.

## Structure du projet

```text
gestion-alimentation/
├─ electron/                 # Processus principal Electron et preload
│  ├─ main.ts
│  └─ preload.ts
├─ public/                   # Assets statiques exposés par Vite
├─ src/                      # Application React
│  ├─ assets/                # Images et fichiers statiques du renderer
│  ├─ components/
│  │  └─ layout/             # Structure globale: sidebar, topbar, footer
│  ├─ config/                # Configuration UI: navigation, titres
│  ├─ pages/                 # Pages principales de l'application
│  │  ├─ dashboard/
│  │  ├─ sales/
│  │  ├─ customers/
│  │  ├─ inventory/
│  │  ├─ reports/
│  │  └─ settings/
│  ├─ types/                 # Types TypeScript partagés
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ package.json
└─ vite.config.ts
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Prochaines fondations à ajouter

- Une couche `services/` ou `database/` pour SQLite côté Electron.
- Des modules métier par domaine: ventes, clients, articles, stock.
- Des composants UI réutilisables pour formulaires, tableaux et modales.
- Des dépendances locales pour Tailwind, Font Awesome et Chart.js afin de ne
  plus dépendre des CDN dans l'application desktop.
