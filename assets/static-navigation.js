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
    ]);

    const route = url.pathname.replace(/\.html$/, "").replace(/\/$/, "");
    if (!staticRoutes.has(route)) return;

    event.preventDefault();
    window.location.assign(route);
  },
  true,
);
