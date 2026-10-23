# Acilegna, site portfolio

Site one-page d’Angélica (« J’humanise votre communication »).

| Dossier | Contenu |
|---|---|
| `site/` | **Site de production**, publié par Vercel (HTML/CSS/JS statiques, sans dépendance ni étape de build). |
| `index.html`, `assets/`, `captures/` | Maquette de référence et images sources, conservées pour comparaison. |
| `BRIEF.md` | Brief de développement. |
| `vercel.json` | Configuration Vercel : publie `site/`, lance `outils/vercel-build.sh` et définit les en-têtes de cache et de sécurité. |

## Contenu de `site/`

- `index.html` : reproduction de la maquette (mêmes textes, valeurs et comportements).
- `mentions-legales.html` : page Mentions légales, avec les informations manquantes en zones `[à préciser]`.
- `assets/css/acilegna.css`, `assets/js/acilegna.js` : styles et script de la maquette, partagés par les deux pages.
- `assets/fonts/` : Fraunces (axes `wght`, `opsz`, `SOFT`, `WONK`), Great Vibes et Montserrat (`wght`) en WOFF2, sous-ensembles latin et latin-ext. Aucune requête vers Google.
- `assets/img/` : images en AVIF et WebP à plusieurs largeurs (`srcset`), avec un repli PNG/JPEG. Le portrait passe de 714 Ko (PNG) à 40–62 Ko (AVIF).
- `assets/img/og-image.jpg` : image de partage 1200 × 630.
- Initiale du titre « Angélica » : le « A » manuscrit du logo, vectorisé depuis `assets/acilegna-logo.png` et intégré dans `acilegna.css` sous forme de police d’un seul glyphe (1,2 Ko, entre les marqueurs `<initiale>`). Le titre reste un vrai texte « Angélica ».
- Favicons (`favicon.ico`, `assets/icons/`), `site.webmanifest`, `robots.txt`, `sitemap.xml`, données structurées `ProfessionalService` dans `index.html`.

Pour l’aperçu en local :

```bash
python3 -m http.server 8000 --directory site
```

## Animations

- **Arrivée** : « Salut, je suis » et le « A » du nom s’écrivent, le nom et l’accroche montent en fondu, le cercle et le portrait apparaissent, puis les perles une à une et leur lente flottaison.
- **Au défilement** : chaque bloc apparaît une seule fois (`data-reveal` pour un élément, `data-reveal-group` pour des enfants décalés). Les accents manuscrits s’écrivent, les étiquettes se posent sur la machine à écrire, le fil se tend et les tirages tombent puis se balancent, les chiffres comptent jusqu’à leur valeur, le logo pivote en place.
- **Navigation** : barre de lecture dorée sous l’en-tête, ombre de l’en-tête au défilement, lien de la section en cours surligné, liens du menu mobile en cascade, fondu entre l’accueil et les mentions légales.
- Avec `prefers-reduced-motion`, rien ne bouge : la page est exactement la maquette. L’état final de chaque animation est le style de la maquette.

## Déploiement sur Vercel

1. Sur vercel.com : **Add New… → Project**, puis importer le dépôt GitHub `MarioLeZinZin/Acilegna`.
2. Laisser les réglages proposés : le `vercel.json` à la racine choisit le preset « Other », sans commande de build, et publie le dossier `site/`. Ne pas changer le « Root Directory ».
3. Cliquer sur **Deploy**. Chaque push sur `main` redéploie ensuite le site automatiquement.
4. L’adresse du site est celle de Vercel, `https://acilegna.vercel.app`. Si Vercel en attribue une autre, le script `outils/vercel-build.sh` la reporte automatiquement dans les balises canonical, Open Graph, JSON-LD, `robots.txt` et `sitemap.xml` à chaque déploiement.

Les déploiements de prévisualisation (branches autres que `main`) ne sont pas indexés par les moteurs de recherche. Si Vercel Web Analytics ou Speed Insights est activé, il faudra mettre à jour le paragraphe « Données personnelles » des mentions légales, qui indique qu’aucun outil de mesure d’audience n’est utilisé.

## À compléter avant la mise en ligne

- [ ] Vérifier l’attribution des deux autres cartes de chiffres.
- [ ] Mentions légales : statut, SIRET, téléphone de l’hébergeur (Vercel n’en publie pas officiellement).
- [ ] Photo et captures Instagram en haute définition si possible. Pour les intégrer, remplacer les fichiers de `assets/` (mêmes noms) puis relancer `python3 outils/convertir-images.py assets site/assets/img`.
