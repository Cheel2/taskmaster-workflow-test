#!/bin/bash
# git-ritual.sh — Commit + push après un output Qwen

if [ -z "$1" ]; then
    echo "❌ Usage: ./scripts/git-ritual.sh "message de commit""
    echo "   Exemple: ./scripts/git-ritual.sh "qwen-output-001: setup Next.js + Tailwind""
    exit 1
fi

MESSAGE="$1"

echo "🔍 État actuel du repo :"
git status

echo ""
echo "📦 Ajout des fichiers..."
git add .qwen-reports/
git add src/
git add docs/
git add package.json package-lock.json 2>/dev/null
git add tsconfig.json tailwind.config.ts next.config.ts 2>/dev/null
git add .github/ 2>/dev/null
git add .qwen-config/ 2>/dev/null
git add .qwen-memory/ 2>/dev/null
git add scripts/ 2>/dev/null
git add PROJECT-INDEX.md README.md .gitignore 2>/dev/null

echo ""
echo "📝 Commit :"
git commit -m "$MESSAGE"

echo ""
echo "🚀 Push vers GitHub :"
git push origin $(git branch --show-current)

echo ""
echo "✅ Rituel Git terminé !"
echo "📄 Dernier rapport : $(ls -t .qwen-reports/session-*.md 2>/dev/null | head -1)"
