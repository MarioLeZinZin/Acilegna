# Acilegna, site portfolio

Site one-page d’Angélica (« J’humanise votre communication »).

| Dossier | Contenu |
|---|---|
| `site/` | **Site de production**, à publier tel quel (HTML/CSS/JS statiques, sans dépendance ni étape de build). |
| `index.html`, `assets/`, `captures/` | Maquette de référence et images sources, conservées pour comparaison. |
| `BRIEF.md` | Brief de développement. |

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

## À compléter avant la mise en ligne

- [ ] **Domaine** : remplacer `https://domaine-a-preciser.example` par l’adresse définitive dans `site/index.html`, `site/mentions-legales.html`, `site/robots.txt` et `site/sitemap.xml` (balises canonical, Open Graph et JSON-LD).
- [ ] Objectif de la mission **Châlons Sarry Basket**.
- [ ] Objectif de la mission **Jeune Chambre économique de Châlons Agglo**.
- [ ] **Période** de mesure des chiffres.
- [ ] **Client** de la 3e carte de chiffres (32,7 K vues, +7 700 %).
- [ ] Vérifier l’attribution des deux autres cartes de chiffres.
- [ ] Mentions légales : nom complet, statut, SIRET, adresse, hébergeur (nom, adresse, téléphone).
- [ ] Photo et captures Instagram en haute définition si possible. Pour les intégrer, remplacer les fichiers de `assets/` (mêmes noms) puis relancer `python3 outils/convertir-images.py assets site/assets/img`.
