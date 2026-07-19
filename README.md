# TaskMaster — Workflow Vibe Coding v2.0

## 🎯 Objectif
Tester le workflow complet : Requirements → Design → Implementation → Verification → QA → Deployment
avec Qwen (génération) + Git (versionnement) + Kimi (review).

## 📁 Structure des phases

| Phase | Dossier | Statut | Responsable |
|-------|---------|--------|-------------|
| 1 — Requirements | `docs/phase-1-requirements/` | ✅ Prêt | Toi + Kimi |
| 2 — Design | `docs/phase-2-design/` | ✅ Prêt | Toi + Kimi |
| 3 — Implementation | `docs/phase-3-implementation/` | ⏳ Vide | Qwen |
| 4 — Verification | `docs/phase-4-verification/` | ⏳ Vide | Qwen + Toi |
| 5 — Quality Assurance | `docs/phase-5-quality-assurance/` | ⏳ Vide | Kimi + Qwen |
| 6 — Deployment | `docs/phase-6-deployment/` | ⏳ Vide | Qwen |
| 7 — Evolution | `docs/phase-7-evolution/` | ⏳ Vide | Future |

## 🚀 Workflow par phase

### Phase 1 & 2 (Requirements + Design)
1. Tu lis les documents dans `docs/phase-1-requirements/` et `docs/phase-2-design/`
2. Tu valides avec Kimi si besoin
3. Tu as maintenant le contexte complet pour Qwen

### Phase 3 (Implementation)
1. Ouvre Qwen
2. Copie-colle le contenu de `.qwen-config/qwen-system-prompt.md`
3. Donne les prompts un par un (voir `docs/phase-2-design/01-planning-task-breakdown.md`)
4. Après CHAQUE output, exécute `scripts/git-ritual.sh`
5. Le rapport est créé dans `.qwen-reports/session-NNN.md`

### Phase 4-5 (Verification + QA)
1. Copie le rapport `.qwen-reports/session-NNN.md`
2. Colle dans Kimi avec le prompt de `.qwen-config/kimi-review-prompt.md`
3. Kimi génère un score + problèmes + prompt correctif
4. Si correctif nécessaire → retour à Qwen (nouveau rapport)

### Phase 6 (Deployment)
1. Qwen génère la config CI/CD
2. Push sur GitHub
3. Déployer

## 🔧 Commandes rapides

```bash
# Voir le dernier rapport
cat .qwen-reports/$(ls -t .qwen-reports/ | head -1)

# Copier le dernier rapport dans le clipboard (Mac)
cat .qwen-reports/$(ls -t .qwen-reports/ | head -1) | pbcopy

# Commit + push après un output
./scripts/git-ritual.sh "qwen-output-001: description"

# Consolidation de tous les rapports
./scripts/consolidate-reports.sh
```

## 📋 Index des documents
Voir `PROJECT-INDEX.md` pour la liste complète de tous les fichiers.

## 📚 Méthodologie
Ce projet utilise **Mastering Prompt Engineering v2.0** (MPE) pour structurer les instructions :
- 7 couches empilées (Identity → Context → Decision → Tools → Format → Memory → Guardrails)
- 5 composants obligatoires (Rôle → Contexte → Tâche → Contraintes → Format)
- 6 patterns de raisonnement (CoT, ReAct, ToT, Decision Tree, Self-Consistency, Verification Loop)
- 5 règles anti-hallucination (Vérification, Citation, Statut épistémique, Refus, Confirmation)
