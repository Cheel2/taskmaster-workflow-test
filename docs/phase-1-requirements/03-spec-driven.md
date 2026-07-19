# Phase 1.3 — Specification (spec-driven-development-v2)

## Spécifications fonctionnelles — TaskMaster MVP

### US-001 : Créer une tâche
**En tant qu'** utilisateur
**Je veux** créer une nouvelle tâche avec un titre et une description optionnelle
**Afin de** noter ce que j'ai à faire

**Critères d'acceptation :**
- [ ] Le formulaire affiche un champ "Titre" (input text, max 100 chars)
- [ ] Le formulaire affiche un champ "Description" (textarea, max 500 chars, optionnel)
- [ ] Le bouton "Ajouter" est désactivé si le titre est vide
- [ ] Au clic sur "Ajouter", la tâche apparaît en haut de la liste
- [ ] Le formulaire se vide après création
- [ ] La tâche est persistée dans localStorage

### US-002 : Marquer une tâche comme terminée
**En tant qu'** utilisateur
**Je veux** cocher une case pour marquer une tâche comme faite
**Afin de** voir ma progression

**Critères d'acceptation :**
- [ ] Chaque tâche affiche une checkbox à gauche
- [ ] Cocher la case barre le titre et grise la tâche
- [ ] Décocher la case restaure l'apparence normale
- [ ] Le statut est persisté dans localStorage
- [ ] Le toggle est instantané (< 50ms)

### US-003 : Supprimer une tâche
**En tant qu'** utilisateur
**Je veux** supprimer une tâche de la liste
**Afin de** nettoyer les tâches terminées ou obsolètes

**Critères d'acceptation :**
- [ ] Chaque tâche affiche un bouton "🗑️" à droite
- [ ] Au clic, la tâche disparaît avec une animation (fade out, 200ms)
- [ ] La suppression est persistée dans localStorage
- [ ] Pas de confirmation pour MVP (suppression directe)

### US-004 : Voir la liste des tâches
**En tant qu'** utilisateur
**Je veux** voir toutes mes tâches dans une liste
**Afin de** avoir une vue d'ensemble

**Critères d'acceptation :**
- [ ] La liste s'affiche sous le formulaire
- [ ] Les tâches actives apparaissent avant les terminées
- [ ] Les tâches sont ordonnées par date de création (plus récente en haut)
- [ ] Si aucune tâche, afficher "Aucune tâche pour le moment. Créez-en une !"
- [ ] Le nombre total de tâches est affiché ("3 tâches")

### US-005 : Persistance des données
**En tant qu'** utilisateur
**Je veux** que mes tâches survivent au refresh de page
**Afin de** ne pas perdre mon travail

**Critères d'acceptation :**
- [ ] Les tâches sont stockées dans localStorage
- [ ] Clé : `taskmaster_tasks`
- [ ] Format : JSON array
- [ ] Chargement au mount de l'app
- [ ] Sauvegarde automatique à chaque modification

## Spécifications techniques (dérivées)

| Spec | Valeur |
|------|--------|
| Stack | React 19 + TypeScript + Tailwind CSS |
| Bundler | Next.js 15 (App Router) |
| State | React useState + localStorage |
| Tests | Jest + React Testing Library (Phase 4) |
| Build | Static export (`next export`) |
| Deploy | Vercel (Phase 6) |
