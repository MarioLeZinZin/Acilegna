# Acilegna, site portfolio : brief de développement

Site one-page pour Angélica, qui travaille sous la marque **Acilegna** (« J’humanise votre communication ») : communication, réseaux sociaux et visibilité en ligne pour les entreprises.

Le design reprend l’identité de son portfolio PDF : l’or du logo, le fond crème, les accents manuscrits et le fil à linge des réalisations.

## Contenu du dossier

| Élément | Rôle |
|---|---|
| `index.html` | **Maquette de référence**, complète et autonome (HTML, CSS et JS sans dépendance). Elle fait foi pour les couleurs, tailles, espacements et comportements. Ouvrez-la dans un navigateur. |
| `assets/angelica-portrait.png` | Portrait détouré (PNG transparent, 567 × 947). |
| `assets/acilegna-logo.png` | Logo complet avec fond transparent (305 × 295). |
| `assets/machine-a-ecrire.png` | Machine à écrire détourée, section À propos. Elle s’affiche avec `mix-blend-mode: multiply`. |
| `assets/texture-papier.jpg` | Texture papier raccordable de 512 px, en fond de la section Réalisations. |
| `assets/grille-*.jpg` | Aperçus Instagram des 5 clients, extraits des slides. |
| `captures/` | Rendus de référence : ordinateur 1440 px, mobile 390 px, menu mobile ouvert. |

## Travail attendu

1. **Reproduire `index.html` à l’identique.** Recopiez les valeurs exactes (couleurs, tailles, espacements, rayons, ombres) sans les arrondir. Une page statique suffit, mais la mise en page peut être portée dans un framework si le projet en utilise un.
2. **Optimiser les images.** Convertissez-les en WebP ou AVIF et ajoutez des `srcset`. Le portrait et la machine à écrire pèsent environ 730 Ko chacun en PNG. Gardez `loading="lazy"` sous la ligne de flottaison.
3. **Auto-héberger les polices** : Fraunces (variable : `wght`, `opsz`, `SOFT`, `WONK`), Great Vibes et Montserrat (variable `wght`). C’est plus rapide, et aucune adresse IP de visiteur n’est envoyée à Google. La maquette les charge pour l’instant depuis Google Fonts.
4. **Ajouter le référencement de base** : balises Open Graph avec une image de partage, favicon décliné depuis le logo et données structurées `Person` ou `ProfessionalService`.
5. **Créer la page Mentions légales.** Le lien du pied de page pointe pour l’instant vers `#`.

## Jetons de design

Toutes les variables sont déclarées sur `.ac-root` dans `index.html`.

| Variable | Valeur | Usage |
|---|---|---|
| `--creme` | `#F7F2EC` | Fond principal |
| `--ivoire` | `#FFFDF9` | Cartes chiffres, bandeau clients, section contact |
| `--papier` | `#F4ECDF` | Section Réalisations, sous la texture |
| `--or` | `#D7B66B` | Or du logo : cercle, perles, filets, fond des boutons |
| `--or-fonce` | `#C9A55A` | Survol des boutons |
| `--or-titre` | `#A47B33` | Titres de 24 px et plus (3,5:1 sur crème) |
| `--or-texte` | `#86621F` | Petits textes dorés et liens (5:1 sur crème) |
| `--encre` | `#1F1A15` | Texte principal (15,5:1) |
| `--encre-2` | `#4B433A` | Paragraphes (8,7:1) |
| `--encre-3` | `#6B6157` | Légendes et notes (5,4:1) |

**Typographies**

- **Fraunces** (titres, noms, chiffres) : graisses 500 à 650, axes `"SOFT" 100, "WONK" 0`. Le nom du héros est en clamp(4.6rem, 11vw, 9.6rem), les titres de section en clamp(2.6rem, 5.2vw, 4.6rem).
- **Great Vibes** (accents manuscrits) : une seule touche par section, jamais pour du texte courant.
- **Montserrat** (texte et interface) : 17 px avec un interligne de 1,7 (16 px sur mobile). Graisse 600 pour les boutons, 700 pour les libellés.

**Mise en page** : conteneur de 1240 px, marges latérales `clamp(20px, 5vw, 64px)`. Boutons en pilule de 54 px de haut (44 px en version compacte). Le texte des boutons est en encre sur fond or (8,9:1).

## Sections, dans l’ordre

1. **En-tête collant** : logotype manuscrit, 4 ancres et bouton « Me contacter ». Fond crème translucide et flouté.
2. **Héros** : « Salut, je suis / Angélica », accroche, paragraphe, bouton « Discutons de votre projet » et lien « Voir mes réalisations ». À droite, le portrait détouré dans le double cercle doré du logo, avec des perles devant et derrière.
3. **Bandeau clients** : « Ils m’ont fait confiance », suivi des 5 noms séparés par des perles.
4. **À propos** : « Qui est Acilegna ? ». Le mot Acilegna se retourne et révèle Angélica (son prénom à l’envers). Suivent son texte, sa phrase d’objectif en citation, puis la machine à écrire avec 6 étiquettes de ses passions.
5. **Réalisations** : titre « Réalisations », sous-titre manuscrit « Projets et créations » et intro. Les 5 aperçus Instagram sont suspendus à un fil par des pinces à linge, chacun avec le nom du client et son objectif.
6. **Quelques chiffres** : 3 cartes de statistiques Meta (vues, évolution, interactions, abonnés, publication la plus vue).
7. **Contact** : titre, phrase manuscrite, texte, téléphone, e-mail avec bouton « Copier l’adresse », bouton « Écrire un e-mail » et logo.
8. **Pied de page** : logotype, signature, ancres, © et mentions légales.

## Comportements

| Élément | Comportement |
|---|---|
| Perles et cercle du héros | Parallaxe au curseur : perles arrière −12 px, perles avant +20 px, cercle −5 px, lissage 8 % par image. Désactivée au toucher et avec `prefers-reduced-motion`. |
| « Acilegna » dans le titre À propos | Vrai `<button>` (`aria-pressed`). Au survol, au focus ou au clic, le mot se retourne (`rotateX(180deg)`, 0,75 s) et affiche « Angélica ». |
| Étiquettes de passions | Au survol, elles se redressent (rotation à 0) et montent de 4 px. |
| Tirages suspendus | Au survol, le tirage se balance autour de sa pince (keyframes `ac-swing`, 1,3 s). Sous 1024 px, la rangée défile horizontalement avec `scroll-snap`. |
| Copier l’adresse | Copie l’e-mail. Le libellé devient « Adresse copiée » pendant 2,4 s. |
| Menu mobile | Sous 760 px, un bouton Menu (`aria-expanded`) déplie les liens. Le menu se referme au clic sur un lien. |
| Ancres | Défilement fluide, avec `scroll-margin-top: 84px` pour ne pas passer sous l’en-tête. |

**Points de rupture** : à 1024 px, les colonnes s’empilent et le logo du contact passe au-dessus. À 760 px, le menu mobile apparaît, les clients passent sur deux colonnes et le bouton principal prend toute la largeur.

## Accessibilité (à conserver)

- Les contrastes sont vérifiés (voir le tableau des jetons). Les petits textes dorés utilisent toujours `--or-texte`, jamais `--or`.
- Les contrôles sont de vrais `button` et `a`, avec un focus visible (contour or de 2 px) et des cibles d’au moins 44 px.
- Les textes alternatifs sont en place. Les éléments décoratifs (perles, fil, pinces) sont en `aria-hidden`.
- Avec `prefers-reduced-motion`, la parallaxe, le balancement et les transitions sont coupés.

## À compléter avec Angélica avant la mise en ligne

Les zones encadrées en pointillés dans la maquette (`.ac-todo`) attendent ces informations :

- [ ] Objectif de la mission **Châlons Sarry Basket**.
- [ ] Objectif de la mission **Jeune Chambre économique de Châlons Agglo**.
- [ ] **Période** de mesure des chiffres.
- [ ] **Client** de la 3e carte de chiffres (32,7 K vues, +7 700 %).
- [ ] Vérifier l’attribution des deux autres cartes. Je l’ai déduite des miniatures de publications visibles sur les captures : 363,8 K pour Châlons Sarry Basket, 80,8 K pour Toyota Châlons.
- [ ] Informations des mentions légales : statut, SIRET, hébergeur.
- [ ] Si possible, une **photo et des captures Instagram en haute définition**. Celles du dossier sont extraites des slides et manquent un peu de netteté sur écran Retina.
