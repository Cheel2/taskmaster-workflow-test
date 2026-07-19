# PROJECT-INDEX — TaskMaster v2.0

## Phase 1 : Requirements Engineering (5 skills)

| # | Fichier | Skill | Description |
|---|---------|-------|-------------|
| 1.1 | `docs/phase-1-requirements/01-idea-refine.md` | idea-refine-v2 | Idée brute → concept validé |
| 1.2 | `docs/phase-1-requirements/02-interview-me.md` | interview-me-v2 | Questions d'élicitation |
| 1.3 | `docs/phase-1-requirements/03-spec-driven.md` | spec-driven-development-v2 | Spécifications fonctionnelles |
| 1.4 | `docs/phase-1-requirements/04-requirements-validation.md` | requirements-validation | Validation & sign-off |
| 1.5 | `docs/phase-1-requirements/05-nfr-engineering.md` | nfr-engineering | Exigences non-fonctionnelles |

## Phase 2 : System & Software Design (7 skills)

| # | Fichier | Skill | Description |
|---|---------|-------|-------------|
| 2.1 | `docs/phase-2-design/01-planning-task-breakdown.md` | planning-and-task-breakdown-v2 | Décomposition en tâches exécutables |
| 2.2 | `docs/phase-2-design/02-api-interface-design.md` | api-and-interface-design-v2 | Conception API interne |
| 2.3 | `docs/phase-2-design/03-context-engineering.md` | context-engineering-v2 | Contexte pour Qwen |
| 2.4 | `docs/phase-2-design/04-architectural-patterns.md` | architectural-patterns | Patterns choisis |
| 2.5 | `docs/phase-2-design/05-data-modeling.md` | data-modeling | Modèle de données |
| 2.6 | `docs/phase-2-design/06-scalability-engineering.md` | scalability-engineering | Scalabilité future |
| 2.7 | `docs/phase-2-design/07-trade-off-analysis.md` | trade-off-analysis | Analyse des compromis |

## Phase 3 : Implementation (11 skills)

| # | Fichier | Skill | Description | Statut |
|---|---------|-------|-------------|--------|
| 3.1 | `.qwen-reports/session-001.md` | incremental-implementation-v2 | Setup projet | ⏳ |
| 3.2 | `.qwen-reports/session-002.md` | source-driven-development-v2 | Types & interfaces | ⏳ |
| 3.3 | `.qwen-reports/session-003.md` | function-design + error-handling | Storage layer | ⏳ |
| 3.4 | `.qwen-reports/session-004.md` | test-driven-development-v2 | Tests unitaires | ⏳ |
| 3.5 | `.qwen-reports/session-005.md` | frontend-ui-engineering-v2 | TaskForm | ⏳ |
| 3.6 | `.qwen-reports/session-006.md` | frontend-ui-engineering-v2 | TaskItem | ⏳ |
| 3.7 | `.qwen-reports/session-007.md` | class-design | TaskList | ⏳ |
| 3.8 | `.qwen-reports/session-008.md` | incremental-implementation-v2 | Page principale | ⏳ |
| 3.9 | `.qwen-reports/session-009.md` | naming-conventions | Polish & styles | ⏳ |
| 3.10 | `.qwen-reports/session-010.md` | code-smells | Build & vérification | ⏳ |

## Phase 4 : Verification (11 skills)

| # | Fichier | Skill | Description | Statut |
|---|---------|-------|-------------|--------|
| 4.1 | `.qwen-reports/session-011.md` | test-planning | Plan de test | ⏳ |
| 4.2 | `.qwen-reports/session-012.md` | black-box-testing | Tests boîte noire | ⏳ |
| 4.3 | `.qwen-reports/session-013.md` | white-box-testing | Tests boîte blanche | ⏳ |
| 4.4 | `.qwen-reports/session-014.md` | browser-testing-with-devtools-v2 | Tests navigateur | ⏳ |
| 4.5 | `.qwen-reports/session-015.md` | integration-testing | Tests intégration | ⏳ |

## Phase 5 : Quality Assurance (13 skills)

| # | Fichier | Skill | Description | Statut |
|---|---------|-------|-------------|--------|
| 5.1 | `.qwen-reports/session-016.md` | code-review-and-quality-v2 | Revue de code | ⏳ |
| 5.2 | `.qwen-reports/session-017.md` | code-simplification-v2 | Simplification | ⏳ |
| 5.3 | `.qwen-reports/session-018.md` | security-and-hardening-v2 | Sécurité | ⏳ |
| 5.4 | `.qwen-reports/session-019.md` | performance-optimization-v2 | Performance | ⏳ |

## Phase 6 : Deployment (13 skills)

| # | Fichier | Skill | Description | Statut |
|---|---------|-------|-------------|--------|
| 6.1 | `.qwen-reports/session-020.md` | git-workflow-and-versioning-v2 | Git workflow | ⏳ |
| 6.2 | `.qwen-reports/session-021.md` | ci-cd-and-automation-v2 | CI/CD | ⏳ |
| 6.3 | `.qwen-reports/session-022.md` | shipping-and-launch-v2 | Déploiement | ⏳ |

## Fichiers de configuration

| Fichier | Description | MPE Layer |
|---------|-------------|-----------|
| `.qwen-config/output-report-template.md` | Template de rapport Qwen | Layer 5 (Format) |
| `.qwen-config/qwen-system-prompt.md` | Prompt système Qwen | Layer 1-7 (All) |
| `.qwen-config/kimi-review-prompt.md` | Prompt de review Kimi | Layer 1-7 (All) |
| `.qwen-memory/` | Patterns de feedback persistants | Layer 6 (Memory) |
| `scripts/create-report.sh` | Création manuelle de rapport | Layer 4 (Tools) |
| `scripts/git-ritual.sh` | Commit + push automatique | Layer 4 (Tools) |
| `scripts/consolidate-reports.sh` | Fusion de tous les rapports | Layer 4 (Tools) |
| `.github/workflows/qwen-report-sync.yml` | CI GitHub consolidation | Layer 4 (Tools) |
