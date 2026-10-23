# Acilegna, site portfolio

Site one-page d’Angélica (« J’humanise votre communication »).

| Dossier | Contenu |
|---|---|
| `site/` | **Site de production**, publié par Vercel (HTML/CSS/JS statiques, sans dépendance ni étape de build). |
| `index.html`, `assets/`, `captures/` | Maquette de référence et images sources, conservées pour comparaison. |
| `BRIEF.md` | Brief de développement. |
| `vercel.json` | Configuration Vercel : publie `site/` et définit les en-têtes de cache et de sécurité. |

## Contenu de `site/`

- `index.html` : reproduction de la maquette (mêmes textes, valeurs et comportements).
- `mentions-legales.html` : page Mentions légales, avec les informations manquantes en zones `[à préciser]`.
- `assets/css/acilegna.css`, `assets/js/acilegna.js` : styles et script de la maquette, partagés par les deux pages.
- `assets/fonts/` : Fraunces (axes `wght`, `opsz`, `SOFT`, `WONK`), Great Vibes et Montserrat (`wght`) en WOFF2, sous-ensembles latin et latin-ext. Aucune requête vers Google.
- `assets/img/` : images en AVIF et WebP à plusieurs largeurs (`srcset`), avec un repli PNG/JPEG. Le portrait passe de 714 Ko (PNG) à 40–62 Ko (AVIF).
- `assets/img/og-image.jpg` : image de partage 1200 × 630.
- Favicons (`favicon.ico`, `assets/icons/`), `site.webmanifest`, `robots.txt`, `sitemap.xml`, données structurées `ProfessionalService` dans `index.html`.

Pour l’aperçu en local :

```bash
python3 -m http.server 8000 --directory site
```

## Déploiement sur Vercel

1. Sur vercel.com : **Add New… → Project**, puis importer le dépôt GitHub `MarioLeZinZin/Acilegna`.
2. Laisser les réglages proposés : le `vercel.json` à la racine choisit le preset « Other », sans commande de build, et publie le dossier `site/`. Ne pas changer le « Root Directory ».
3. Cliquer sur **Deploy**. Chaque push sur `main` redéploie ensuite le site automatiquement.
4. Ajouter le domaine définitif dans **Settings → Domains**, puis remplacer l’adresse provisoire (voir ci-dessous).

Les déploiements de prévisualisation (branches autres que `main`) ne sont pas indexés par les moteurs de recherche. Si Vercel Web Analytics ou Speed Insights est activé, il faudra mettre à jour le paragraphe « Données personnelles » des mentions légales, qui indique qu’aucun outil de mesure d’audience n’est utilisé.

## À compléter avant la mise en ligne

- [ ] **Domaine** : remplacer `https://domaine-a-preciser.example` par l’adresse définitive (domaine personnalisé ou `xxx.vercel.app`) dans `site/index.html`, `site/mentions-legales.html`, `site/robots.txt` et `site/sitemap.xml` (balises canonical, Open Graph et JSON-LD).
- [ ] Objectif de la mission **Châlons Sarry Basket**.
- [ ] Objectif de la mission **Jeune Chambre économique de Châlons Agglo**.
- [ ] **Période** de mesure des chiffres.
- [ ] **Client** de la 3e carte de chiffres (32,7 K vues, +7 700 %).
- [ ] Vérifier l’attribution des deux autres cartes de chiffres.
- [ ] Mentions légales : statut, SIRET, code postal et ville, téléphone de l’hébergeur (Vercel n’en publie pas officiellement).
- [ ] Photo et captures Instagram en haute définition si possible. Pour les intégrer, remplacer les fichiers de `assets/` (mêmes noms) puis relancer `python3 outils/convertir-images.py assets site/assets/img`.
