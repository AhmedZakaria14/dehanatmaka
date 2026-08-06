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

rm -rf dist/.publish-payload dist/.article-payload dist/.github

(
  cd dist
  npm test
)
