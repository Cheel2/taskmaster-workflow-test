# Phase 1.2 — Interview & Elicitation (interview-me-v2)

## Questions d'élicitation pour TaskMaster

### Questions fonctionnelles

**Q1 : Qu'est-ce qu'une "tâche" exactement ?**
- R : Une tâche a un titre (obligatoire), une description (optionnelle), un statut (active/terminée), une date de création.

**Q2 : Quelles sont les actions possibles sur une tâche ?**
- R : Créer, marquer comme terminée (toggle), supprimer. Pas d'édition pour MVP (supprimer + recréer).

**Q3 : L'ordre des tâches est-il important ?**
- R : Oui, ordre de création (plus récente en haut). Pas de réordonnancement pour MVP.

**Q4 : Y a-t-il des limites ?**
- R : Pas de limite explicite, mais localStorage ~5MB. À documenter.

### Questions non-fonctionnelles

**Q5 : Performance attendue ?**
- R : < 100ms pour créer une tâche. < 50ms pour toggle. Instantané sur < 1000 tâches.

**Q6 : Accessibilité ?**
- R : WCAG 2.1 AA minimum. Keyboard navigation. Screen reader compatible.

**Q7 : Navigateurs supportés ?**
- R : Chrome, Firefox, Safari, Edge (dernières 2 versions). Pas IE.

**Q8 : Offline ?**
- R : Oui, tout est local. Pas de service worker pour MVP (pas de PWA).

### Questions de sécurité

**Q9 : Données sensibles ?**
- R : Non, c'est du localStorage. Pas de données personnelles. Pas d'auth.

**Q10 : XSS ?**
- R : Tout input utilisateur doit être sanitized. Pas de innerHTML.

### Questions de maintenance

**Q11 : Qui maintient ?**
- R : Un seul développeur (toi). Pas d'équipe.

**Q12 : Durée de vie du projet ?**
- R : MVP = 1-2 jours. V2 = semaine suivante si feedback positif.
