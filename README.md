# 🛒 Menma Store (Storefront Web)

Site web e-commerce ultra-rapide et responsive, conçu pour Next.js (App Router) et déployé sur Vercel.

## 🚀 Caractéristiques
- **Architecture Bring-Your-Own-Supabase** : Aucune dépendance SaaS centrale.
- **Support des Blocs Modulaires (Rich-Content)** : Rendu fluide des pages produits copywriting (Titres, Paragraphes, Images d'illustration).
- **Double tunnel de commande** :
  - Mode Formulaire dynamique avec transmission WhatsApp
  - Mode Bouton direct WhatsApp
- **Thèmes & Styling fluides** : Thème sombre doré (Dark Gold), Obsidian, Rose, Emerald & Light minimaliste.

## ⚙️ Configuration (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
```

## 📦 Commandes
```bash
npm install
npm run dev
npm run build
```
