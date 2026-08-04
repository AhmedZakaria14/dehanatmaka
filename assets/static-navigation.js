(() => {
  const blogLinkExists = (root) => Boolean(root?.querySelector('a[href="/blog"], a[href="/blog/"]'));

  const addBlogLinks = () => {
    let complete = true;

    document.querySelectorAll("header nav, aside nav").forEach((nav) => {
      if (blogLinkExists(nav)) return;
      const link = document.createElement("a");
      link.href = "/blog";
      link.textContent = "المدونة";
      const isMobileNavigation = Boolean(nav.closest("aside"));

      if (isMobileNavigation) {
        link.className = "block text-lg font-semibold text-brand-dark p-4 rounded-lg hover:bg-gray-100";
        const item = document.createElement("div");
        item.className = "mobile-blog-link";
        item.append(link);
        nav.append(item);
      } else {
        link.className = "font-bold text-brand-dark transition-colors hover:text-brand-blue";
        nav.append(link);
      }
    });

    document.querySelectorAll("footer nav ul").forEach((list) => {
      if (blogLinkExists(list)) return;
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "/blog";
      link.textContent = "المدونة";
      link.className = "hover:text-brand-blue transition-colors";
      item.append(link);
      list.append(item);
    });

    if (!document.querySelector("header nav") || !document.querySelector("footer")) complete = false;
    return complete;
  };

  // The React mobile drawer is mounted only after its menu button is pressed.
  // Re-run the idempotent injection after that state update, even if the
  // initial observer has already disconnected.
  document.addEventListener(
    "click",
    (event) => {
      if (!event.target.closest("header button")) return;
      window.requestAnimationFrame(() => {
        addBlogLinks();
        window.requestAnimationFrame(addBlogLinks);
      });
    },
    true,
  );

  if (addBlogLinks()) return;

  const observer = new MutationObserver(() => {
    if (addBlogLinks()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 5000);
})();
