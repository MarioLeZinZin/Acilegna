#!/bin/sh
# Build Vercel : aligne les adresses absolues (canonical, Open Graph, JSON-LD, robots.txt, sitemap.xml)
# sur le domaine de production que Vercel attribue au projet (VERCEL_PROJECT_PRODUCTION_URL, sans https://).
# Si ce domaine est déjà https://acilegna.vercel.app, ou hors de Vercel, les fichiers restent tels quels.
set -eu

DEFAUT="https://acilegna.vercel.app"
DOMAINE="${VERCEL_PROJECT_PRODUCTION_URL:-}"

if [ -z "$DOMAINE" ] || [ "https://$DOMAINE" = "$DEFAUT" ]; then
  echo "Adresse du site : $DEFAUT"
  exit 0
fi

for f in site/index.html site/mentions-legales.html site/robots.txt site/sitemap.xml; do
  sed "s#$DEFAUT#https://$DOMAINE#g" "$f" > "$f.tmp"
  mv "$f.tmp" "$f"
done
echo "Adresse du site : https://$DOMAINE"
