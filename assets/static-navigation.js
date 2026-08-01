document.addEventListener(
  "click",
  (event) => {
    const link = event.target.closest("a");

    if (!link?.href) return;

    const url = new URL(link.href);
    if (url.origin !== window.location.origin) return;

    const staticRoutes = new Set([
      "/interior-paints",
      "/kitchen-renovation",
      "/exterior-paints",
      "/epoxy",
      "/blog",
    ]);

    const route = url.pathname.replace(/\.html$/, "").replace(/\/$/, "");
    if (!staticRoutes.has(route)) return;

    event.preventDefault();
    window.location.assign(route);
  },
  true,
);

const injectBlogNavigation = () => {
  document.querySelectorAll("nav").forEach((nav) => {
    const links = [...nav.querySelectorAll("a[href]")];
    const hasSiteLinks = links.some((link) => {
      const path = new URL(link.href).pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
      return path === "/" || path === "/interior-paints" || path === "/epoxy";
    });
    const hasBlogLink = links.some(
      (link) => new URL(link.href).pathname.replace(/\/$/, "") === "/blog",
    );

    if (!hasSiteLinks || hasBlogLink) return;

    const blogLink = document.createElement("a");
    blogLink.href = "/blog";
    blogLink.textContent = "المدونة";
    if (links[0]?.className) blogLink.className = links[0].className;
    nav.appendChild(blogLink);
  });

  document.querySelectorAll("footer ul").forEach((list) => {
    const links = [...list.querySelectorAll("a[href]")];
    const hasHomeLink = links.some((link) => new URL(link.href).pathname === "/");
    const hasBlogLink = links.some(
      (link) => new URL(link.href).pathname.replace(/\/$/, "") === "/blog",
    );

    if (!hasHomeLink || hasBlogLink) return;

    const item = document.createElement("li");
    const blogLink = document.createElement("a");
    blogLink.href = "/blog";
    blogLink.textContent = "المدونة";
    if (links[0]?.className) blogLink.className = links[0].className;
    item.appendChild(blogLink);
    list.appendChild(item);
  });
};

document.addEventListener("DOMContentLoaded", injectBlogNavigation);
new MutationObserver(injectBlogNavigation).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
