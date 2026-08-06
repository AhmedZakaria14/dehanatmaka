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

# Use the dedicated epoxy service image for the epoxy article and its blog card.
if [ -f dist/blog/moalem-epoxy-makkah.html ] && [ -f dist/blog/index.html ]; then
  sed -i 's#/images/blog/moalem-dahanat-decor-makkah.webp#/images/bb51daf26825637272ae1835791a1cc9.webp#g' \
    dist/blog/moalem-epoxy-makkah.html dist/blog/index.html
fi

rm -rf dist/.publish-payload dist/.article-payload dist/.github

(
  cd dist
  npm test
)
