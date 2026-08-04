import { existsSync, readFileSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const pages = [
  ["index.html", "https://www.dehanatmaka.com/"],
  ["interior-paints.html", "https://www.dehanatmaka.com/interior-paints"],
  ["exterior-paints.html", "https://www.dehanatmaka.com/exterior-paints"],
  ["epoxy.html", "https://www.dehanatmaka.com/epoxy"],
  ["kitchen-renovation.html", "https://www.dehanatmaka.com/kitchen-renovation"],
  ["blog/index.html", "https://www.dehanatmaka.com/blog"],
  ["blog/moalem-dahanat-makkah.html", "https://www.dehanatmaka.com/blog/moalem-dahanat-makkah"],
  ["blog/moalem-boya-makkah.html", "https://www.dehanatmaka.com/blog/moalem-boya-makkah"],
  ["blog/moalem-dahanat-decor-makkah.html", "https://www.dehanatmaka.com/blog/moalem-dahanat-decor-makkah"],
  ["blog/dahn-abwab-khashab-makkah.html", "https://www.dehanatmaka.com/blog/dahn-abwab-khashab-makkah"],
  ["blog/dahn-abwab-hadid-makkah.html", "https://www.dehanatmaka.com/blog/dahn-abwab-hadid-makkah"],
  ["blog/moalem-boya-al-sharaie-makkah.html", "https://www.dehanatmaka.com/blog/moalem-boya-al-sharaie-makkah"],
  ["blog/moalem-boya-haraj-makkah.html", "https://www.dehanatmaka.com/blog/moalem-boya-haraj-makkah"],
  ["blog/tajdid-matabikh-qadima-errors.html", "https://www.dehanatmaka.com/blog/tajdid-matabikh-qadima-errors"],
  ["blog/tajdid-matabikh-khashab.html", "https://www.dehanatmaka.com/blog/tajdid-matabikh-khashab"],
  ["blog/tajdid-matabikh-aluminium.html", "https://www.dehanatmaka.com/blog/tajdid-matabikh-aluminium"],
  ["blog/taghyir-lawn-matbakh-alumetal.html", "https://www.dehanatmaka.com/blog/taghyir-lawn-matbakh-alumetal"],
];

const titles = new Map();
for (const [path, canonical] of pages) {
  const html = read(path);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(Boolean(title), `${path}: missing title`);
  assert(/<meta name="description" content="[^"]+"/.test(html), `${path}: missing description`);
  assert(html.includes(`<link rel="canonical" href="${canonical}"`), `${path}: incorrect canonical`);
  assert(/<h1(?:\s[^>]*)?>[^<]+<\/h1>/.test(html), `${path}: missing static H1`);
  assert(!html.includes("yourdomain.com"), `${path}: placeholder domain found`);
  assert(!/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/.test(html), `${path}: zoom is disabled`);
  if (path.startsWith("blog/") && path !== "blog/index.html") {
    assert(html.includes("\"@type\":\"BlogPosting\""), `${path}: missing BlogPosting schema`);
    assert(/<meta property="og:image" content="https:\/\/www\.dehanatmaka\.com\/images\/blog\/[^"]+\.webp"/.test(html), `${path}: missing local OG image`);
    assert(/<img class="article-cover"[^>]+width="1600" height="900"[^>]+fetchpriority="high"/.test(html), `${path}: incomplete article cover attributes`);
  }

  if (title) {
    assert(!titles.has(title), `${path}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, path);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)) {
    try { JSON.parse(match[1]); }
    catch { failures.push(`${path}: invalid JSON-LD`); }
  }

  for (const match of html.matchAll(/<(?:img|script|link)[^>]+(?:src|href)="([^"]+)"/g)) {
    const reference = match[1].split(/[?#]/)[0];
    if (!reference || /^(?:https?:|tel:|mailto:|data:|#)/.test(reference)) continue;
    const resolved = reference.startsWith("/") ? reference.slice(1) : new URL(reference, new URL(path, "file:///site/")).pathname.slice(6);
    assert(existsSync(new URL(resolved, root)), `${path}: missing local asset ${reference}`);
  }
}

const bundle = read("assets/index-9b7776bd.js");
assert(!bundle.includes("yourdomain.com"), "bundle: placeholder canonical found");
assert(bundle.includes('path:"/interior-paints"'), "bundle: interior route is not registered");
assert(!bundle.includes('name:"keywords"'), "bundle: obsolete meta keywords found");

const staticNavigation = read("assets/static-navigation.js");
assert(staticNavigation.includes('event.target.closest("header button")'), "navigation: mobile menu open is not handled");
assert(staticNavigation.includes('nav.closest("aside")'), "navigation: mobile menu is not detected");
assert(staticNavigation.includes("mobile-blog-link"), "navigation: mobile blog link wrapper is missing");

const kitchen = read("kitchen-renovation.html");
for (const image of kitchen.matchAll(/<img[^>]+src="https:\/\/res\.cloudinary\.com[^>]+>/g)) {
  assert(/loading="lazy"/.test(image[0]), "kitchen: Cloudinary image is not lazy-loaded");
  assert(/width="\d+" height="\d+"/.test(image[0]), "kitchen: Cloudinary image is missing dimensions");
  assert(/srcset=/.test(image[0]) && /sizes=/.test(image[0]), "kitchen: Cloudinary image is not responsive");
}

const sitemap = read("sitemap.xml");
for (const [, canonical] of pages) assert(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap: missing ${canonical}`);
assert(read("robots.txt").includes("https://www.dehanatmaka.com/sitemap.xml"), "robots.txt: sitemap missing");
JSON.parse(read("vercel.json"));

for (const file of readdirSync(new URL("assets/", root)).filter((name) => name.endsWith(".js"))) {
  const check = spawnSync(process.execPath, ["--check", new URL(`assets/${file}`, root).pathname], { encoding: "utf8" });
  assert(check.status === 0, `${file}: JavaScript syntax error\n${check.stderr}`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log(`Validated ${pages.length} pages, metadata, JSON-LD, assets, sitemap, and JavaScript.`);
