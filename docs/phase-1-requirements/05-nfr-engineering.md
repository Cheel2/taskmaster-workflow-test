# Phase 1.5 — Non-Functional Requirements (nfr-engineering)

## NFR — TaskMaster MVP

### Performance

| Métrique | Cible | Mesure |
|----------|-------|--------|
| Time to Interactive (TTI) | < 1s | Lighthouse |
| Création d'une tâche | < 100ms | Manuel / React DevTools |
| Toggle done | < 50ms | Manuel / React DevTools |
| Suppression | < 100ms | Manuel |
| Bundle size | < 100KB gzip | `next build` output |

### Sécurité

| Exigence | Implémentation |
|----------|---------------|
| XSS prevention | Pas de `dangerouslySetInnerHTML`. Tout texte échappé par React. |
| No secrets | Pas de clés API, pas de tokens, pas de auth |
| localStorage isolation | Clé préfixée (`taskmaster_`) pour éviter les collisions |

### Accessibilité (WCAG 2.1 AA)

| Critère | Implémentation |
|---------|---------------|
| Keyboard navigation | Tab order logique, Enter pour submit, Space pour checkbox |
| Screen reader | Labels `aria-label`, rôles `role="list"`, `role="listitem"` |
| Contrast | Ratio 4.5:1 minimum (Tailwind slate-900 sur slate-50) |
| Focus visible | `focus:ring-2 focus:ring-blue-500` |

### Compatibilité

| Navigateur | Version | Support |
|------------|---------|---------|
| Chrome | 120+ | ✅ |
| Firefox | 120+ | ✅ |
| Safari | 17+ | ✅ |
| Edge | 120+ | ✅ |
| IE 11 | — | ❌ (pas supporté) |
| Mobile | iOS Safari, Chrome Android | ✅ |

### Maintenabilité

| Exigence | Implémentation |
|----------|---------------|
| TypeScript strict | `strict: true` dans tsconfig |
| Pas de `any` | ESLint rule `@typescript-eslint/no-explicit-any` |
| Commentaires | JSDoc pour les fonctions complexes |
| Documentation | README + ce dossier docs/ |

### Scalabilité (future — v2)

| Exigence | MVP | V2 |
|----------|-----|-----|
| Nombre de tâches | < 1000 (localStorage) | Backend + pagination |
| Multi-utilisateur | Non | Comptes + auth |
| Sync cross-device | Non | Cloud sync |
| Offline | Oui (local) | PWA + service worker |

### Monitoring (Phase 6)

| Métrique | Outil | Seuil d'alerte |
|----------|-------|---------------|
| Erreurs JS | Sentry (free tier) | > 0 erreur / jour |
| Performance | Vercel Analytics | TTI > 2s |
| Uptime | Vercel | < 99.9% |
