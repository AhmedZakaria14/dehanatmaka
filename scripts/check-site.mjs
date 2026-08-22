import { existsSync, readFileSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const routeToFile = (route) => {
  const clean = route.split(/[?#]/)[0].replace(/\/$/, "");
  if (!clean || clean === "/") return "index.html";
  if (clean === "/blog") return "blog/index.html";
  return `${clean.slice(1)}.html`;
};

const resolveLocalHref = (href) => {
  if (!href || href.startsWith("#")) return null;
  if (/^(?:tel:|mailto:|sms:|whatsapp:|data:|javascript:)/i.test(href)) return null;
  if (/^https?:\/\//i.test(href)) {
    try {
      const url = new URL(href);
      if (!["www.dehanatmaka.com", "dehanatmaka.com"].includes(url.hostname)) return null;
      return routeToFile(`${url.pathname}${url.search}${url.hash}`);
    } catch {
      return null;
    }
  }
  if (href.startsWith("/")) return routeToFile(href);
  return href.split(/[?#]/)[0];
};

const localAssetPath = (reference, currentPath) => {
  const clean = reference.split(/[?#]/)[0];
  if (!clean || /^(?:https?:|tel:|mailto:|data:|#)/i.test(clean)) return null;
  if (clean.startsWith("/")) return clean.slice(1);
  return new URL(clean, new URL(currentPath, "file:///site/")).pathname.slice(6);
};

const basePages = [
  ["index.html", "https://www.dehanatmaka.com/"],
  ["interior-paints.html", "https://www.dehanatmaka.com/interior-paints"],
  ["exterior-paints.html", "https://www.dehanatmaka.com/exterior-paints"],
  ["epoxy.html", "https://www.dehanatmaka.com/epoxy"],
  ["kitchen-renovation.html", "https://www.dehanatmaka.com/kitchen-renovation"],
  ["blog/index.html", "https://www.dehanatmaka.com/blog"],
];

const articlePaths = readdirSync(new URL("blog/", root))
  .filter((name) => name.endsWith(".html") && name !== "index.html")
  .sort()
  .map((name) => `blog/${name}`);

const pages = [
  ...basePages,
  ...articlePaths.map((path) => [path, `https://www.dehanatmaka.com/blog/${path.replace(/^blog\//, "").replace(/\.html$/, "")}`]),
];

const newestArticles = new Map([
  ["blog/moalem-epoxy-makkah.html", "/images/blog/moalem-epoxy-makkah-generated.svg"],
  ["blog/dahan-matabikh-makkah.html", "/images/blog/dahan-matabikh-makkah-generated.svg"],
  ["blog/telaa-jodran-matabikh.html", "/images/blog/telaa-jodran-matabikh-generated.svg"],
  ["blog/dahan-matabikh-khashab-makkah.html", "/images/blog/dahan-matabikh-khashab-makkah-generated.svg"],
]);

const articleKeywords = new Map([
  ["blog/moalem-dahanat-makkah.html", ["معلم دهانات مكة","معلم دهانات مكه","معلم دهانات بمكه","معلم دهانات بمكة","معلم دهانات مكه المكرمه","معلم دهانات بمكه المكرمه","معلم دهانات مكة المكرمة","أفضل معلم دهانات","معلم دهانات","معلم دهانات جده","معلم دهانات جدة","معلم دهانات الطائف","معلم دهانات بجدة","معلم دهانات بجده","فني دهانات","معلم دهانات في جده","معلم دهانات الطايف","فني دهان","دهان الطايف","معلم دهانات في جدة","أفضل معلم دهانات في جدة","معلم اصباغ","افضل معلم دهانات في جدة","افضل عمال دهانات","شغل دهانات ترخيم","فروع جوتن الطائف","معلم دهان باكستاني","معلم دهانات اوسكار","معلم دهانات بالطائف","معلم دهانات بجدة جدة","معلم دهانات بجدة دهانات","معلم دهانات جوتن","معلم دهانات داخلية وخارجية","مقاول دهانات جدة","معلم دهان بجدة","معلم دهان بجده","معلم دهان في جدة"]],
  ["blog/moalem-boya-makkah.html", ["معلم بويه مكه","معلم بوية","معلم بويه في مكه","معلم بويات مكه","معلم بويات","معلم بوية في مكة","معلم بويات مكة","معلم بويه جده","معلم بويه بجده","معلم بويات جده","معلم بوية جدة","معلم بويه في جده","معلم بويات جدة","لون بويه اوف وايت","معلم بويه الطائف","معلم بوية باكستاني بجدة","معلم بويه باكستاني بجدة","عمال بويه في جده","دهان بويه في جده","افضل معلم بويه في جده","بويات خارجيه للعمائر","معلم بويات بالطائف","معلم بويات في جدة","معلم بوية في جدة","معلم بويه بجده جدة","معلم بويه في الطائف","معلم بويه ممتاز في جده","معلم بويه جدة","بوية شبيه الرخام"]],
  ["blog/moalem-dahanat-decor-makkah.html", ["معلم دهانات وديكورات مكة","معلم دهانات وديكورات مكه","دهانات وديكورات مكه","معلم بويات وديكورات مكه","معلم دهانات وديكورات الطائف","معلم دهانات وديكورات","معلم دهانات وديكورات جدة","فني دهانات وديكورات","معلم دهانات وديكورات جده","معلم دهانات وديكورات الطايف","دهانات وديكورات الطايف","مقاول دهانات وديكورات"]],
  ["blog/dahn-abwab-khashab-makkah.html", ["معلم دهان ابواب خشب","معلم بويه ابواب خشب","معلم دهان ابواب خشب مكة","معلم دهان ابواب خشب بجده","معلم دهان ابواب خشب جدة","معلم دهان ابواب","معلم دهان ابواب خشب بجدة","معلم دهان خشب","دهان ابواب خشب جدة","دهان بجده دهان ابواب خشب بجدة","دهان موبيليا جدة","معلم دهان ابواب خشب جده","دهان ابواب خشب سنديان"]],
  ["blog/dahn-abwab-hadid-makkah.html", ["معلم دهان ابواب حديد"]],
  ["blog/moalem-boya-al-sharaie-makkah.html", ["معلم بويه مكه الشرايع","معلم بويه في الشرائع","معلم دهانات بمكه الشرايع","دهانات وديكورات الطائف الحويه","معلم دهانات جنوب جده","معلم بوية الحمدانية","دهانات وديكورات الطايف الحويه"]],
  ["blog/moalem-boya-haraj-makkah.html", ["معلم بويه حراج","معلم بويه جده حراج","معلم دهانات جده حراج","معلم دهانات جدة حراج","معلم دهانات حراج"]],
  ["blog/tajdid-matabikh-qadima-errors.html", ["تجديد مطابخ","تجديد المطابخ","تجديد المطابخ القديمه","تجديد مطابخ قديمه","مطابخ قبل وبعد التجديد","أفكار لتجديد المطبخ"]],
  ["blog/tajdid-matabikh-khashab.html", ["تجديد مطابخ خشب","تجديد المطبخ الخشب","كيفية تجديد المطبخ الخشب"]],
  ["blog/tajdid-matabikh-aluminium.html", ["تجديد مطابخ الالمنيوم","تجديد المطبخ الالوميتال","تجديد مطبخ الوميتال"]],
  ["blog/taghyir-lawn-matbakh-alumetal.html", ["تغيير لون مطبخ الوميتال","تغير لون المطبخ الالوميتال","تغير لون مطبخ الوميتال","تغيير لون الوميتال المطبخ","تغيير لون دواليب المطبخ الالمنيوم"]],
  ["blog/moalem-epoxy-makkah.html", ["معلم ابوكسي","معلم ايبوكسي"]],
  ["blog/dahan-matabikh-makkah.html", ["دهان مطابخ","طلاء مطابخ"]],
  ["blog/telaa-jodran-matabikh.html", ["طلاء جدران مطابخ","طلاء جدران الوان دهانات حوائط المطبخ"]],
  ["blog/dahan-matabikh-khashab-makkah.html", ["دهان المطابخ الخشب","دهان دولاب مطبخ","دهان مطابخ خشب قديم","دهان مطابخ خشب لاكيه"]],
]);

const titles = new Map();
const sitemap = read("sitemap.xml");

for (const [path, canonical] of pages) {
  const html = read(path);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];

  assert(Boolean(title), `${path}: missing title`);
  assert(Boolean(description), `${path}: missing meta description`);
  assert(html.includes(`<link rel="canonical" href="${canonical}"`), `${path}: incorrect canonical`);
  assert(html.includes(`content="${canonical}"`) || path === "index.html", `${path}: canonical URL is not repeated in social metadata`);
  assert(/<h1(?:\s[^>]*)?>[^<]+<\/h1>/.test(html), `${path}: missing static H1`);
  assert(!html.includes("yourdomain.com"), `${path}: placeholder domain found`);
  assert(!/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/.test(html), `${path}: zoom is disabled`);
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap: missing ${canonical}`);

  if (title) {
    assert(!titles.has(title), `${path}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, path);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)) {
    try { JSON.parse(match[1]); }
    catch { failures.push(`${path}: invalid JSON-LD`); }
  }

  for (const match of html.matchAll(/<(?:img|script|link)[^>]+(?:src|href)="([^"]+)"/g)) {
    const asset = localAssetPath(match[1], path);
    if (!asset) continue;
    assert(existsSync(new URL(asset, root)), `${path}: missing local asset ${match[1]}`);
  }

  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const target = resolveLocalHref(match[1]);
    if (!target) continue;
    assert(existsSync(new URL(target, root)), `${path}: broken internal link ${match[1]} -> ${target}`);
  }

  if (path.startsWith("blog/") && path !== "blog/index.html") {
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const graphEntries = scripts.flatMap((script) => script["@graph"] ?? [script]);
    const articleSchema = graphEntries.find((entry) => entry["@type"] === "BlogPosting");
    const breadcrumbs = graphEntries.find((entry) => entry["@type"] === "BreadcrumbList");

    assert(html.includes('property="og:type" content="article"'), `${path}: missing article Open Graph type`);
    assert(description === html.match(/<meta property="og:description" content="([^"]+)"/)?.[1], `${path}: Open Graph description differs`);
    assert(description === html.match(/<meta name="twitter:description" content="([^"]+)"/)?.[1], `${path}: Twitter description differs`);
    assert(title === html.match(/<meta property="og:title" content="([^"]+)"/)?.[1], `${path}: Open Graph title differs`);
    assert(title === html.match(/<meta name="twitter:title" content="([^"]+)"/)?.[1], `${path}: Twitter title differs`);
    assert(new RegExp(`<meta property="og:image" content="https:\\/\\/www\\.dehanatmaka\\.com\\/images\\/(?:blog\\/)?[^\"]+\\.(?:webp|svg)"`).test(html), `${path}: missing local OG image`);
    assert(new RegExp(`<meta name="twitter:image" content="https:\\/\\/www\\.dehanatmaka\\.com\\/images\\/(?:blog\\/)?[^\"]+\\.(?:webp|svg)"`).test(html), `${path}: missing local Twitter image`);
    assert(/<img class="article-cover"[^>]+width="1600" height="900"[^>]+fetchpriority="high"/.test(html), `${path}: incomplete article cover attributes`);
    assert(Boolean(articleSchema), `${path}: missing BlogPosting schema`);
    assert(Boolean(breadcrumbs), `${path}: missing BreadcrumbList schema`);
    assert(articleSchema?.mainEntityOfPage?.["@id"] === canonical, `${path}: BlogPosting mainEntityOfPage does not match canonical`);

    const metaKeywords = html.match(/<meta name="keywords" content="([^"]+)"/)?.[1].split(/,\s*/) ?? [];
    const expectedKeywords = articleKeywords.get(path) ?? [];
    assert(expectedKeywords.length > 0, `${path}: no target keyword mapping`);
    assert(expectedKeywords.every((keyword) => metaKeywords.includes(keyword)), `${path}: target keywords are missing from meta keywords`);
    assert(expectedKeywords.every((keyword) => articleSchema?.keywords?.includes(keyword)), `${path}: target keywords are missing from BlogPosting schema`);

    const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
    const internalLinksInMain = [...main.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)]
      .map((match) => resolveLocalHref(match[1]))
      .filter(Boolean);
    assert(internalLinksInMain.length >= 2, `${path}: too few internal links inside article area`);
    if (newestArticles.has(path)) {
      assert(internalLinksInMain.length >= 4, `${path}: newest article needs richer internal linking`);
      const generatedImage = newestArticles.get(path);
      assert(existsSync(new URL(generatedImage.slice(1), root)), `${path}: generated article image is missing`);
      const buildScript = read("scripts/build-vercel.sh");
      assert(buildScript.includes(path.replace("blog/", "dist/blog/")), `${path}: build script does not target this newest article`);
      assert(buildScript.includes(generatedImage), `${path}: build script does not apply the generated image`);
    }
  }
}

const blogIndex = read("blog/index.html");
for (const path of articlePaths) {
  const slug = path.replace(/^blog\//, "").replace(/\.html$/, "");
  assert(blogIndex.includes(`/blog/${slug}`), `blog/index.html: missing card for ${slug}`);
}
for (const image of newestArticles.values()) {
  assert(read("scripts/build-vercel.sh").includes(image), `build-vercel.sh: missing generated image replacement ${image}`);
}

const staticNavigation = read("assets/static-navigation.js");
assert(staticNavigation.includes("mobile-blog-link"), "navigation: mobile blog link wrapper is missing");

const blogStyles = read("assets/blog.css");
assert(blogStyles.includes(".blog-main > .container { width: 100%; }"), "blog: mobile cards container is not full width");
assert(blogStyles.includes("min-height: 44px"), "blog: mobile read-more target is too small");

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
console.log(`Validated ${pages.length} pages, ${articlePaths.length} blog articles, SEO metadata, schema, internal links, images, sitemap, and JavaScript.`);
