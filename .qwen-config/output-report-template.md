# QWEN OUTPUT REPORT — SESSION [NNN]
Template: Mastering Prompt Engineering v2.0 — Verification Loop Pattern

================================================================================
SECTION 1: MÉTADONNÉES (Layer 2: Context)
================================================================================

| Field | Value |
|-------|--------|
| Session ID | [NNN] |
| Timestamp | YYYY-MM-DD HH:MM:SS |
| Phase | [3 / 4 / 5 / 6] |
| Skill | [skill-name-v2] |
| Reasoning Pattern | [CoT / ReAct / ToT / DecisionTree / SelfConsistency / VerificationLoop] |
| Model | [qwen-coder-2.5 / qwen-coder-3 / etc.] |
| Context Window | [tokens used / remaining] |

================================================================================
SECTION 2: PROMPT ORIGINAL (Layer 2: Context — FULL TEXT)
================================================================================

[COPY THE EXACT PROMPT GIVEN TO QWEN HERE — NO SUMMARY — FULL TEXT]

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
| 2 | | | | | |
| 3 | | | | | |

Total Lines Created: [X]

================================================================================
SECTION 5: FILES MODIFIED (Layer 5: Format — Diff Inventory)
================================================================================

| # | File | Lines Added | Lines Removed | Lines Changed | Description |
|---|------|-------------|---------------|---------------|-------------|
| 1 | | | | | |
| 2 | | | | | |

================================================================================
SECTION 6: COMPLETE CODE OUTPUT (Layer 5: Format — NO TRUNCATION)
================================================================================

### File 1/[N]: `[path]` ([X] lines, [Language])

```[Language]
[EVERY SINGLE LINE OF CODE — NO "..." — NO "// rest" — NO PLACEHOLDERS]
[IF FILE > 200 LINES: Split into logical modules, report each separately]
```

### File 2/[N]: `[path]` ([X] lines, [Language])

```[Language]
[COMPLETE CODE]
```

### File 3/[N]: `[path]` ([X] lines, [Language])

```[Language]
[COMPLETE CODE]
```

================================================================================
SECTION 7: ARCHITECTURAL DECISIONS (Layer 3: Decision — Justified)
================================================================================

| Decision | Status | Justification | Impact | Alternatives Rejected |
|----------|--------|--------------|--------|----------------------|
| | [FACT] / [INFERENCE] / [HYPOTHESIS] | | | |

================================================================================
SECTION 8: DEPENDENCIES ADDED (Layer 4: Tools — Package Inventory)
================================================================================

| Package | Version | Source | Reason | Security Check |
|---------|---------|--------|--------|----------------|
| | | npm / yarn / pnpm | | [PASS / REVIEW] |

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
# Command 1: Status check
git status

# Command 2: Stage report
git add .qwen-reports/session-[NNN].md

# Command 3: Stage code files
git add [file1] [file2] [file3]

# Command 4: Commit
git commit -m "qwen-output-[NNN]: [description]

Prompt: [first 80 chars of prompt]
Files: [list]
Lines: [total]
Phase: [3/4/5/6]
Skill: [name]
Pattern: [reasoning pattern]"

# Command 5: Push
git push origin [current-branch]
```

================================================================================
SECTION 11: NOTES & ALERTS (Layer 6: Memory — State Capture)
================================================================================

| Type | Description | Severity | Action Required |
|------|-------------|----------|-----------------|
| [INFO / WARNING / ERROR] | | [LOW / MED / HIGH] | |

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

Next Action: Kimi will review this report against:
- docs/phase-1-requirements/03-spec-driven.md
- docs/phase-2-design/01-planning-task-breakdown.md
- docs/phase-2-design/04-architectural-patterns.md
- docs/phase-2-design/05-data-modeling.md

Expected Output: Score /10 + Issues (Critical/Major/Minor) + Corrective Prompt
