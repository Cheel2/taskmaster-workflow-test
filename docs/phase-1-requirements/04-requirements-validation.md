# Phase 1.4 — Requirements Validation (requirements-validation)

## Validation des exigences TaskMaster

### Checklist de validation

| # | Critère | État | Notes |
|---|---------|------|-------|
| 1 | Les US sont SMART (Specific, Measurable, Achievable, Relevant, Time-bound) | ✅ | Toutes les US ont des critères d'acceptation mesurables |
| 2 | Pas d'ambiguïté | ✅ | "Tâche" est défini (titre + description + statut + date) |
| 3 | Pas de conflit entre US | ✅ | US-001 (créer) et US-003 (supprimer) sont complémentaires |
| 4 | Traçabilité | ✅ | Chaque US a un ID (US-001 à US-005) |
| 5 | Testable | ✅ | Chaque critère d'acceptation est vérifiable |
| 6 | Réalisable dans le temps | ✅ | MVP estimé à 1-2 jours (10 prompts Qwen) |
| 7 | Aligné avec l'objectif | ✅ | Toutes les US servent le "gestionnaire de tâches simple" |

### Tests de cohérence

**Test 1 : Couverture**
- Créer ✅ (US-001)
- Lire ✅ (US-004)
- Update ✅ (US-002 — toggle)
- Delete ✅ (US-003)
→ CRUD complet couvert

**Test 2 : Dépendances**
- US-002 dépend de US-001 (il faut une tâche pour la marquer)
- US-003 dépend de US-001
- US-004 dépend de US-001
- US-005 dépend de US-001, 002, 003
→ Ordre d'implémentation : 001 → 004 → 002 → 003 → 005 (déjà intégré)

**Test 3 : Boundaries**
- Titre max 100 chars → boundary test
- Description max 500 chars → boundary test
- localStorage 5MB → boundary test (documenté)
- 0 tâche → état vide (US-004)

### Sign-off

| Rôle | Nom | Date | Statut |
|------|-----|------|--------|
| Product Owner | Toi | 2026-07-18 | ✅ Validé |
| Tech Lead | Toi | 2026-07-18 | ✅ Validé |
| QA Lead | Toi | 2026-07-18 | ✅ Validé |

**Décision :** Les requirements sont validés. Passage à la Phase 2 — Design.
