#!/bin/bash
# create-report.sh — Crée un rapport Qwen manuellement (si Qwen web)

REPORTS_DIR=".qwen-reports"
mkdir -p "$REPORTS_DIR"

# Trouver le prochain numéro de session
LAST_NUM=$(ls -1 "$REPORTS_DIR"/session-*.md 2>/dev/null | \
    sed 's/.*session-//' | sed 's/\.md$//' | sort -n | tail -1)

if [ -z "$LAST_NUM" ]; then
    NEXT_NUM="001"
else
    NEXT_NUM=$(printf "%03d" $((10#$LAST_NUM + 1)))
fi

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)
FILENAME="$REPORTS_DIR/session-$NEXT_NUM.md"

cat > "$FILENAME" << 'EOF'
# QWEN OUTPUT REPORT — SESSION [NNN]
Template: Mastering Prompt Engineering v2.0 — Verification Loop Pattern

================================================================================
SECTION 1: MÉTADONNÉES (Layer 2: Context)
================================================================================

| Field | Value |
|-------|--------|
| Session ID | [NNN] |
| Timestamp | [DATE] |
| Phase | [3 / 4 / 5 / 6] |
| Skill | [skill-name-v2] |
| Reasoning Pattern | [CoT / ReAct / ToT / DecisionTree / SelfConsistency / VerificationLoop] |
| Model | [qwen-coder-2.5 / qwen-coder-3 / etc.] |

================================================================================
SECTION 2: PROMPT ORIGINAL (Layer 2: Context — FULL TEXT)
================================================================================

[COPIER LE PROMPT COMPLET ICI]

================================================================================
SECTION 3: DECISION TREE TRAVERSAL (Layer 3: Decision Architecture)
================================================================================

Step 0: Simple config task? → [YES/NO] → [Action]
Step 1: Skill required? → [YES/NO] → [Skill loaded / Action]
Step 2: Multiple files? → [YES/NO] → [Files generated / Action]
Step 3: Research needed? → [YES/NO] → [Research done / Clarification asked]
Step 4: Default → [Code + Report + Git]

================================================================================
SECTION 4: FILES CREATED (Layer 5: Format — Complete Inventory)
================================================================================

| # | File | Path | Lines | Language | Description |
|---|------|------|-------|----------|-------------|
| 1 | | | | | |

================================================================================
SECTION 5: FILES MODIFIED (Layer 5: Format — Diff Inventory)
================================================================================

| # | File | Lines Added | Lines Removed | Lines Changed | Description |
|---|------|-------------|---------------|---------------|-------------|
| 1 | | | | | |

================================================================================
SECTION 6: COMPLETE CODE OUTPUT (Layer 5: Format — NO TRUNCATION)
================================================================================

### File 1/1: `[chemin]` ([X] lines, [Language])

```[Language]
[COPIER LE CODE COMPLET ICI — AUCUNE TRUNCATION]
```

================================================================================
SECTION 7: ARCHITECTURAL DECISIONS (Layer 3: Decision — Justified)
================================================================================

| Decision | Status | Justification | Impact | Alternatives Rejected |
|----------|--------|--------------|--------|----------------------|

================================================================================
SECTION 8: DEPENDENCIES ADDED (Layer 4: Tools — Package Inventory)
================================================================================

| Package | Version | Source | Reason | Security Check |
|---------|---------|--------|--------|----------------|

================================================================================
SECTION 9: VERIFICATION LOOP (Layer 5: Self-Audit — CRITICAL)
================================================================================

Before finalizing, I performed internal audit:

Audit Item 1: File Completeness
- [ ] All files from Section 4 are present in Section 6
- [ ] No file is truncated (checked line count matches)
- [ ] No placeholder text ("TODO", "FIXME", "implement later")

Audit Item 2: Code Quality
- [ ] No `any` (explicit or implicit)
- [ ] No `console.log` or `debugger`
- [ ] No `dangerouslySetInnerHTML`
- [ ] No unused variables or imports
- [ ] All types imported from correct paths

Audit Item 3: Coherence
- [ ] Imports match existing file structure
- [ ] Component props match TypeScript interfaces
- [ ] Function signatures match call sites
- [ ] No circular dependencies

Audit Item 4: Security
- [ ] No secrets in code (API keys, tokens, passwords)
- [ ] No hardcoded credentials
- [ ] localStorage key prefixed (`taskmaster_`)
- [ ] XSS prevention: no innerHTML, all text escaped

Audit Item 5: Workflow
- [ ] Report saved to `.qwen-reports/session-[NNN].md`
- [ ] Git ritual executed (add, commit, push)
- [ ] Commit message includes session ID and file list

Audit Item 6: Accessibility (if UI)
- [ ] aria-label on interactive elements
- [ ] role attributes on semantic structures
- [ ] keyboard navigation possible
- [ ] focus-visible styles present

Audit Result: [PASS / PASS_WITH_NOTES / FAIL — see Section 11]

================================================================================
SECTION 10: GIT COMMANDS EXECUTED (Layer 4: Tools — Exact Commands)
================================================================================

```bash
# [À REMPLIR]
```

================================================================================
SECTION 11: NOTES & ALERTS (Layer 6: Memory — State Capture)
================================================================================

| Type | Description | Severity | Action Required |
|------|-------------|----------|-----------------|

================================================================================
SECTION 12: EPISTEMIC STATUS (Layer 5: Anti-Hallucination)
================================================================================

All claims in this report are prefixed:
- [FACT]: Verified against source code or documentation
- [INFERENCE]: Deduced from verified facts
- [HYPOTHESIS]: Speculation based on patterns
- [OPINION]: Subjective judgment

================================================================================
STATUS: ⏳ AWAITING KIMI REVIEW
================================================================================
EOF

# Remplacer les placeholders
sed -i "s/\[NNN\]/$NEXT_NUM/g" "$FILENAME"
sed -i "s/\[DATE\]/$DATE $TIME/g" "$FILENAME"

echo "✅ Rapport créé : $FILENAME"
echo "📋 Prochaine étape : Copier le code de Qwen dans ce fichier"
echo "🔧 Puis exécuter : ./scripts/git-ritual.sh "qwen-output-$NEXT_NUM: description""
