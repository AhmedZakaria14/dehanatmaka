#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

for item in * .[^.]*; do
  case "$item" in
    dist|node_modules|.git|.vercel) continue ;;
  esac
  if [ -e "$item" ]; then
    cp -R "$item" dist/
  fi
done

if [ -f .publish-payload/READY ]; then
  cat .publish-payload/part-* | base64 --decode > /tmp/four-articles.tar.xz
  tar -xJf /tmp/four-articles.tar.xz -C dist
fi

# Use the generated article images for the four newest blog posts while preserving the article template.
if [ -d dist/blog ]; then
  if [ -f dist/blog/moalem-epoxy-makkah.html ]; then
    sed -i \
      -e 's#/images/blog/moalem-dahanat-decor-makkah.webp#/images/blog/moalem-epoxy-makkah-generated.svg#g' \
      -e 's#/images/bb51daf26825637272ae1835791a1cc9.webp#/images/blog/moalem-epoxy-makkah-generated.svg#g' \
      dist/blog/moalem-epoxy-makkah.html
  fi
  if [ -f dist/blog/dahan-matabikh-makkah.html ]; then
    sed -i 's#/images/blog/taghyir-lawn-matbakh-alumetal.webp#/images/blog/dahan-matabikh-makkah-generated.svg#g' dist/blog/dahan-matabikh-makkah.html
  fi
  if [ -f dist/blog/telaa-jodran-matabikh.html ]; then
    sed -i 's#/images/blog/tajdid-matabikh-qadima-errors.webp#/images/blog/telaa-jodran-matabikh-generated.svg#g' dist/blog/telaa-jodran-matabikh.html
  fi
  if [ -f dist/blog/dahan-matabikh-khashab-makkah.html ]; then
    sed -i 's#/images/blog/tajdid-matabikh-khashab.webp#/images/blog/dahan-matabikh-khashab-makkah-generated.svg#g' dist/blog/dahan-matabikh-khashab-makkah.html
  fi
  if [ -f dist/blog/index.html ]; then
    perl -0pi -e 's#(<a href="/blog/moalem-epoxy-makkah"><img src=")[^"]+#$1/images/blog/moalem-epoxy-makkah-generated.svg#' dist/blog/index.html
    perl -0pi -e 's#(<a href="/blog/dahan-matabikh-makkah"><img src=")[^"]+#$1/images/blog/dahan-matabikh-makkah-generated.svg#' dist/blog/index.html
    perl -0pi -e 's#(<a href="/blog/telaa-jodran-matabikh"><img src=")[^"]+#$1/images/blog/telaa-jodran-matabikh-generated.svg#' dist/blog/index.html
    perl -0pi -e 's#(<a href="/blog/dahan-matabikh-khashab-makkah"><img src=")[^"]+#$1/images/blog/dahan-matabikh-khashab-makkah-generated.svg#' dist/blog/index.html
  fi
fi

rm -rf dist/.publish-payload dist/.article-payload dist/.github

(
  cd dist
  npm test
)
