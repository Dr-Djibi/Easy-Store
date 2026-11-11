# 📄 PRD — Easyphy Storefront Web
> **Produit** : Easyphy — Plateforme e-commerce clé-en-main pour l'Afrique Francophone  
> **Dépôt** : `menma-store/` (Next.js 15 — Storefront + Admin Web)  
> **Dépôt lié** : `menma-store-app/` (Application Mobile Admin Android — voir son propre PRD)  
> **Version** : 4.0.0 — Ajout interface Admin Web + Rebranding Easyphy  
> **Date** : 11 Novembre 2026  
> **Marché cible** : Afrique Francophone (Guinée, Côte d'Ivoire, Sénégal, Mali, Cameroun, Bénin...)

---

## 1. 🎯 Vision Produit

**Easyphy** est une plateforme e-commerce clé-en-main conçue spécifiquement pour les entrepreneurs, commerçants et marques émergentes d'Afrique Francophone. Elle résout les 3 problèmes fondamentaux du commerce en ligne en Afrique :

1. **Pas de paiement en ligne fiable** → Tunnel de commande 100% WhatsApp natif, paiement à la livraison (COD) en standard
2. **Coûts SaaS insupportables** → Modèle Bring-Your-Own-Supabase (BYO) : zéro commission, zéro abonnement mensuel obligatoire
3. **Connexions lentes, smartphones d'entrée de gamme** → Storefront ultra-léger optimisé 3G/4G, moins de 100KB JS initial

### Marché & Positionnement
| Concurrent | Faiblesse exploitée |
|---|---|
| Shopify | Pas de COD natif, $29+/mois en USD, zéro WhatsApp |
| YouCan | $29–$187/mois + 0.5% commission sur chaque vente |
| Shafrik | Données propriétaires (SaaS), pas de souveraineté |
| Tassyir | Marché algérien uniquement, pas de storefront attractif |

**Easyphy = le meilleur de tous, pensé Afrique Francophone.**

---

## 2. 🏗️ Architecture Technique

```
menma-store/ (CE DÉPÔT — Storefront + Admin Web)
├── src/app/
│   ├── page.tsx                  → Page d'accueil storefront (publique)
│   ├── produit/[slug]/           → Page produit + OrderTunnel WhatsApp
│   ├── contact/                  → Page contact
│   ├── admin/                    → 🆕 Interface Admin Web (protégée auth)
│   │   ├── login/page.tsx        → Connexion admin Supabase
│   │   ├── dashboard/page.tsx    → Stats : CA, commandes, produits, marge
│   │   ├── produits/page.tsx     → Liste + CRUD produits
│   │   ├── produits/nouveau/     → Formulaire nouveau produit
│   │   ├── produits/[id]/        → Édition produit + BlockEditor
│   │   ├── commandes/page.tsx    → Gestion commandes + statuts
│   │   └── reglages/page.tsx     → Paramètres boutique
│   └── api/
│       ├── orders/route.ts       → POST commande publique
│       └── products/route.ts     → GET produits publics
├── src/components/
│   ├── home/                     → HeroBanner, ProductGrid, ProductCard, ReassuranceBar
│   ├── product/                  → OrderTunnel, ContentBlockRenderer
│   ├── layout/                   → Header, Footer
│   └── admin/                    → 🆕 Composants UI admin (AdminSidebar, StatCard...)
└── src/lib/
    ├── supabase/client.ts        → Client côté navigateur
    ├── supabase/server.ts        → Client côté serveur (RSC)
    ├── settings.ts               → Lecture/écriture settings depuis Supabase
    ├── types.ts                  → Types partagés (Product, Order, StoreSettings)
    └── utils.ts                  → formatPrice, buildWhatsAppLink, buildOrderMessage
```

### Stack Technique
- **Framework** : Next.js 15 (App Router, React 19, TypeScript)
- **Style** : Tailwind CSS v4 + variables CSS custom (système bi-thème)
- **Animations** : Framer Motion
- **Backend** : Supabase JS v2 (PostgreSQL + RLS + Storage)
- **Icons** : Lucide React
- **Déploiement** : Vercel (recommandé)

---

## 3. 📱 Fonctionnalités — Storefront Public (EXISTANT ✅)

### 3.1 Page d'Accueil
- [x] `HeroBanner` : Bannière avec titre, sous-titre, image et CTA configurable
- [x] `ProductGrid` : Grille de produits actifs avec cartes
- [x] `ReassuranceBar` : Badges "Paiement à la livraison", "WhatsApp rapide", etc.
- [ ] 🆕 Section `WhyEasyphy` : 3 cartes de différenciation (BYO, WhatsApp, Vitesse)

### 3.2 Page Produit `/produit/[slug]`
- [x] Galerie photos interactive
- [x] `OrderTunnel` : double mode (Direct WhatsApp OU Formulaire + WhatsApp)
- [x] `ContentBlockRenderer` : blocs rich-content (titre/texte/image)
- [x] Gestion rupture de stock avec alerte réassort WhatsApp
- [ ] 🆕 Bouton "Partager" (Web Share API + fallback copie lien)
- [ ] 🆕 Méta-tags OG pour partage Facebook/WhatsApp riche

### 3.3 Page Contact `/contact`
- [x] Coordonnées boutique
- [x] Bouton WhatsApp direct
- [x] Formulaire de contact instantané

---

## 4. 🔐 Fonctionnalités — Admin Web (À CONSTRUIRE 🚧)

> L'Admin Web partage le même dépôt que le storefront. Il s'agit d'une section protégée `/admin/*` avec auth Supabase, accessible depuis n'importe quel navigateur (desktop ou mobile). Elle est complémentaire à l'App Mobile Admin (`menma-store-app/`).

### 4.1 Authentification Admin
- Route `/admin/login` : formulaire email + mot de passe Supabase Auth
- Middleware Next.js : protection de toutes les routes `/admin/*`
- Session persistante via cookies Supabase SSR

### 4.2 Dashboard `/admin/dashboard`
Stats en temps réel depuis Supabase :
- Total produits actifs / inactifs
- Total commandes + répartition par statut
- Chiffre d'affaires total estimé
- 🆕 Marge brute estimée (si `cout_achat` renseigné sur les produits)
- 🆕 Taux de retour (commandes `retourné` / total livré+retourné)

### 4.3 Gestion Produits `/admin/produits`
- Liste paginée avec toggle visibilité, suppression, lien édition
- Formulaire création/édition :
  - Nom, slug (auto-généré), prix, stock, description
  - 🆕 Coût d'achat (pour calcul marge)
  - Upload images (Supabase Storage)
  - `BlockEditor` : ajout/suppression/réordre de blocs rich-content
  - Éditeur description WYSIWYG

### 4.4 Gestion Commandes `/admin/commandes`
- Liste avec filtres par statut et recherche
- Mise à jour statut : `nouveau → confirmé → en_livraison → livré` ou `retourné / annulé`
- Affichage détails client (champs dynamiques)
- 🆕 Badge alerte nouvelles commandes (Supabase Realtime)

### 4.5 Paramètres Boutique `/admin/reglages`
Tous les settings de `StoreSettings` :
- Identité (nom, logo, bannière)
- Contact (WhatsApp, téléphone, réseaux sociaux)
- Devise (`GNF`, `XOF`, `MAD`, `EUR`...)
- Mode commande + champs formulaire + messages WhatsApp
- Thème et couleur accent

---

## 5. 🎨 Design System

### Bi-Thème CSS (via variables CSS)
Le thème est géré par la classe CSS sur `<html>` : `theme-light-minimal` ou `theme-dark-gold`.

**Tokens principaux :**
```css
--color-bg            /* Fond principal */
--color-surface-1     /* Cartes / surfaces */
--color-surface-2     /* Inputs / surfaces enfoncées */
--color-text          /* Texte principal */
--color-text-muted    /* Texte secondaire */
--color-accent        /* Couleur action principale */
--color-border        /* Bordures */
--color-accent-glow   /* Fond badge accent transparent */
```

**Thème Clair (Light Minimal — défaut)** : Blanc, grises ardoise, accent Ambre `#d97706`  
**Thème Sombre (Dark Gold)** : Noir encre `#060501`, accent Or `#facc15`

---

## 6. 🗄️ Schéma Base de Données Supabase

Fichier de référence : `../supabase/schema.sql`

### Table `products`
| Colonne | Type | Description |
|---|---|---|
| `id` | UUID | Clé primaire |
| `slug` | TEXT UNIQUE | URL-friendly |
| `nom` | TEXT | Nom du produit |
| `prix` | BIGINT | Prix entier (GNF, XOF…) |
| `stock` | INTEGER | Quantité en stock |
| `cout_achat` | BIGINT | 🆕 Coût d'achat (calcul marge) |
| `description` | TEXT | Description longue |
| `images` | TEXT[] | URLs Supabase Storage |
| `content_blocks` | JSONB | Blocs rich-content |
| `actif` | BOOLEAN | Visibilité publique |

### Table `orders`
| Colonne | Type | Description |
|---|---|---|
| `statut` | TEXT | `nouveau` \| `confirmé` \| `en_livraison` \| `livré` \| `retourné` \| `annulé` |

### Table `settings`
Paires clé-valeur. Clés : voir `StoreSettings` dans `src/lib/types.ts`.

---

## 7. 🔗 Lien avec le Dépôt Mobile Admin

> **Dépôt lié** : `menma-store-app/` — Application Android native (Expo SDK 52)  
> **PRD Mobile** : voir `menma-store-app/PRD.md`

L'Admin Web et l'App Mobile Admin partagent **exactement le même backend Supabase**. Ils sont deux interfaces distinctes pour le même propriétaire de boutique :

| | Admin Web (`menma-store/`) | App Mobile (`menma-store-app/`) |
|---|---|---|
| **Accès** | Navigateur desktop/mobile | APK Android natif |
| **Avantage** | Ergonomie desktop, BlockEditor complet | Notifications push, utilisation mobile |
| **Auth** | Supabase Auth SSR (cookies) | Supabase Auth (AsyncStorage) |
| **Connexion** | Variables d'env Vercel | Saisie manuelle URL+clé dans l'app |

---

## 8. 🚀 Variables d'Environnement Requises (Vercel)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...  # Pour les routes API admin
```

---

## 9. 📋 Roadmap

### Sprint 1 — Admin Web (PRIORITÉ 1)
- [ ] Middleware auth Next.js pour `/admin/*`
- [ ] Page `/admin/login`
- [ ] Layout admin avec sidebar navigation
- [ ] Dashboard avec StatCards (CA, commandes, marge, taux retour)
- [ ] CRUD produits complet (avec BlockEditor porté depuis l'app mobile)
- [ ] Gestion commandes avec mise à jour statuts enrichis
- [ ] Page réglages boutique

### Sprint 2 — Features Africaines
- [ ] Colonne `cout_achat` dans la DB + marge brute dashboard
- [ ] Statuts enrichis commandes (`en_livraison`, `retourné`)
- [ ] Section `WhyEasyphy` sur la home
- [ ] Bouton partage produit (Web Share API)
- [ ] Méta-tags OG produits pour partage WhatsApp/Facebook

### Sprint 3 — Performance & Polish
- [ ] ISR (Incremental Static Regeneration) sur les pages produit
- [ ] Optimisation images Next.js Image + WebP
- [ ] PWA manifest pour installation sur mobile
- [ ] Analytics basiques (Vercel Analytics)
