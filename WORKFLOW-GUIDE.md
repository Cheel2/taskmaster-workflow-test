# WORKFLOW GUIDE — TaskMaster Vibe Coding v2.0

## 📚 Méthodologie : Mastering Prompt Engineering v2.0

Ce projet utilise **MPE v2.0** pour structurer toutes les instructions IA :
- **7 couches empilées** : Identity → Context → Decision → Tools → Format → Memory → Guardrails
- **5 composants obligatoires** : Rôle → Contexte → Tâche → Contraintes → Format
- **6 patterns de raisonnement** : CoT, ReAct, ToT, Decision Tree, Self-Consistency, Verification Loop
- **5 règles anti-hallucination** : Vérification, Citation, Statut épistémique, Refus, Confirmation

---

## 🏗️ Architecture du Workflow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   QWEN      │────▶│   GIT       │────▶│  GITHUB     │────▶│   KIMI      │
│  (génère)   │     │ (commit)    │     │ (remote)    │     │  (review)   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │                   │
       └───────────────────┴───────────────────┴───────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  .qwen-reports/    │
                    │  session-NNN.md   │
                    │  (fichiers MD)    │
                    └───────────────────┘
```

---

## 🚀 Phase par Phase

### Phase 1-2 : Requirements + Design (TOI + KIMI)

**Qui fait quoi :**
- Toi : Lis les documents, valide, pose des questions
- Kimi : Aide à affiner, détecter les incohérences, suggérer des améliorations

**Documents :**
- `docs/phase-1-requirements/` (5 fichiers)
- `docs/phase-2-design/` (7 fichiers)

**Validation :**
- [ ] Toutes les US ont des critères d'acceptation
- [ ] L'architecture est cohérente
- [ ] Les trade-offs sont documentés
- [ ] La stack est décidée

---

### Phase 3 : Implementation (QWEN)

**Avant de commencer :**
1. Ouvre Qwen (web, IDE, ou CLI)
2. Copie-colle `.qwen-config/qwen-system-prompt.md`
3. Qwen confirme : "PROTOCOL UNDERSTOOD..."

**Séquence des 10 prompts :**

| # | Prompt | Skill | Output | Rapport |
|---|--------|-------|--------|---------|
| 1 | Setup Next.js + TS + Tailwind | incremental-implementation-v2 | Config files | `session-001.md` |
| 2 | Types Task | source-driven-development-v2 | `src/types/task.ts` | `session-002.md` |
| 3 | Storage layer | function-design + error-handling | `src/lib/storage.ts` | `session-003.md` |
| 4 | Tests unitaires | test-driven-development-v2 | `src/lib/storage.test.ts` | `session-004.md` |
| 5 | TaskForm | frontend-ui-engineering-v2 | `src/components/TaskForm.tsx` | `session-005.md` |
| 6 | TaskItem | frontend-ui-engineering-v2 | `src/components/TaskItem.tsx` | `session-006.md` |
| 7 | TaskList | class-design | `src/components/TaskList.tsx` | `session-007.md` |
| 8 | Page principale | incremental-implementation-v2 | `src/app/page.tsx` | `session-008.md` |
| 9 | Polish & styles | naming-conventions | Modifs | `session-009.md` |
| 10 | Build & vérif | code-smells | Build log | `session-010.md` |

**Après CHAQUE prompt :**

```bash
# Si Qwen web (pas d'accès filesystem) :
# 1. Copie la réponse de Qwen
# 2. Crée le rapport :
./scripts/create-report.sh
# 3. Colle le code dans le rapport
# 4. Git :
./scripts/git-ritual.sh "qwen-output-001: setup Next.js + Tailwind"

# Si Qwen IDE (accès filesystem) :
# Qwen crée automatiquement le rapport
# Tu fais juste :
./scripts/git-ritual.sh "qwen-output-001: setup Next.js + Tailwind"
```

---

### Phase 4-5 : Verification + QA (KIMI)

**Pour chaque rapport Qwen :**

1. **Récupère le rapport :**
```bash
cat .qwen-reports/session-001.md
# ou
cat .qwen-reports/$(ls -t .qwen-reports/ | head -1)
```

2. **Copie le contenu complet**

3. **Ouvre Kimi, colle le prompt de `.qwen-config/kimi-review-prompt.md`**

4. **Colle le rapport Qwen**

5. **Kimi génère :**
   - Score /10
   - Requirements Traceability Matrix
   - Issues (Critical/Major/Minor/Info)
   - Corrective Prompt (si besoin)
   - Decision (Approve/Conditional/Reject)

**Si Corrective Prompt :**
```
Toi → Qwen : [Colle le prompt correctif]
        ↓
Qwen → Génère le fix
        ↓
Qwen → Crée `session-001-fix-01.md` (NOUVEAU rapport)
        ↓
Toi → Git : ./scripts/git-ritual.sh "qwen-output-001-fix-01: correction..."
        ↓
Toi → Kimi : Review le nouveau rapport
        ↓
Kimi → Score + Decision
```

---

### Phase 6 : Deployment (QWEN)

**Prompts :**
- 6.1 : Git workflow (`git-workflow-and-versioning-v2`)
- 6.2 : CI/CD (`ci-cd-and-automation-v2`)
- 6.3 : Deploy (`shipping-and-launch-v2`)

---

## 📋 Checklist Quotidienne

### Avant de coder
- [ ] `.qwen-config/qwen-system-prompt.md` est chargé dans Qwen
- [ ] Le dernier rapport est lu (continuité)
- [ ] Les requirements et design sont à portée de main

### Pendant le coding
- [ ] 1 prompt = 1 rapport
- [ ] Tout le code est dans le rapport (pas de truncation)
- [ ] Git ritual exécuté après chaque output

### Après le coding
- [ ] Rapport copié dans Kimi
- [ ] Kimi review complète
- [ ] Score >= 8 ? → Prochaine tâche
- [ ] Score < 8 ? → Prompt correctif → Qwen

---

## 🔧 Commandes Essentielles

```bash
# Voir le dernier rapport
cat .qwen-reports/$(ls -t .qwen-reports/ | head -1)

# Copier le dernier rapport (Mac)
cat .qwen-reports/$(ls -t .qwen-reports/ | head -1) | pbcopy

# Copier le dernier rapport (Linux)
cat .qwen-reports/$(ls -t .qwen-reports/ | head -1) | xclip -selection clipboard

# Créer un rapport manuel
./scripts/create-report.sh

# Commit + push
./scripts/git-ritual.sh "qwen-output-NNN: description"

# Consolidation
./scripts/consolidate-reports.sh

# Voir l'historique des outputs
 git log --oneline --grep="qwen-output"
```

---

## 📁 Structure Complète

```
taskmaster-workflow-test/
│
├── .github/workflows/
│   └── qwen-report-sync.yml          # CI auto-consolidation
│
├── .qwen-config/                     # 🔴 CERVEAU DU WORKFLOW
│   ├── output-report-template.md     # Template rapport (MPE Layer 5)
│   ├── qwen-system-prompt.md         # Instructions Qwen (MPE 7 Layers)
│   └── kimi-review-prompt.md         # Instructions Kimi (MPE 7 Layers)
│
├── .qwen-memory/                     # 🟡 Patterns persistants
│   └── (YAML feedback files)
│
├── .qwen-reports/                    # 🔴 HISTORIQUE QWEN
│   ├── session-001.md
│   ├── session-002.md
│   └── ...
│
├── docs/
│   ├── phase-1-requirements/         # ✅ 5 fichiers
│   ├── phase-2-design/               # ✅ 7 fichiers
│   ├── phase-3-implementation/       # ⏳ Vide (Qwen)
│   ├── phase-4-verification/         # ⏳ Vide (Qwen)
│   ├── phase-5-quality-assurance/   # ⏳ Vide (Kimi)
│   ├── phase-6-deployment/           # ⏳ Vide (Qwen)
│   └── phase-7-evolution/            # ⏳ Vide (Future)
│
├── scripts/                          # 🔴 AUTOMATISATION
│   ├── create-report.sh              # Création manuelle rapport
│   ├── git-ritual.sh                 # Commit + push
│   └── consolidate-reports.sh       # Fusion rapports
│
├── src/                              # ⏳ Vide (Qwen crée)
│
├── .gitignore
├── README.md
├── PROJECT-INDEX.md
└── WORKFLOW-GUIDE.md                 # 🟡 CE FICHIER
```

---

## ⚠️ Règles Absolues

| Règle | Pourquoi | Si violée |
|-------|----------|-----------|
| 1 prompt = 1 rapport | Traçabilité | Workflow cassé |
| Tout le code dans le rapport | Kimi peut review | Review incomplète |
| Git après chaque output | Versionnement | Perte de travail |
| Pas de `any` | Type safety | Kimi reject |
| Pas de truncation | Intégrité | Code incomplet |
| Pas de `console.log` | Production clean | Debug artifacts |

---

## 🎯 Métriques de Succès

| Métrique | Cible | Comment mesurer |
|----------|-------|-----------------|
| Rapports générés | 1 par prompt | `ls .qwen-reports/` |
| Score Kimi moyen | >= 8/10 | Review reports |
| Issues Critical | 0 | Review reports |
| Build pass | 100% | `npm run build` |
| Tests pass | 100% | `npm test` |
| Git push | 100% | `git log` |

---

Document version: 2.0
Last updated: 2026-07-19
Methodology: Mastering Prompt Engineering v2.0
