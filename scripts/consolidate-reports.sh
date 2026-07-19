#!/bin/bash
# consolidate-reports.sh — Fusionne tous les rapports en un seul fichier

REPORTS_DIR=".qwen-reports"
OUTPUT="docs/phase-5-quality-assurance/consolidated-review.md"

echo "# CONSOLIDATED REVIEW — All Qwen Outputs" > "$OUTPUT"
echo "" >> "$OUTPUT"
echo "**Date de consolidation :** $(date +%Y-%m-%d_%H:%M:%S)" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "**Total sessions :** $(ls -1 $REPORTS_DIR/session-*.md 2>/dev/null | wc -l)" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "---" >> "$OUTPUT"
echo "" >> "$OUTPUT"

for file in $(ls -1 "$REPORTS_DIR"/session-*.md 2>/dev/null | sort); do
    echo "## $(basename $file .md)" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo "---" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
done

echo "✅ Consolidation terminée : $OUTPUT"
echo "📊 $(ls -1 $REPORTS_DIR/session-*.md 2>/dev/null | wc -l) sessions consolidées"
