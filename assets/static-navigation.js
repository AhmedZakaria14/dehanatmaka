(() => {
  const blogLinkExists = (root) => Boolean(root?.querySelector('a[href="/blog"], a[href="/blog/"]'));

  const addBlogLinks = () => {
    let complete = true;

    document.querySelectorAll("header nav, aside nav").forEach((nav) => {
      if (blogLinkExists(nav)) return;
      const link = document.createElement("a");
      link.href = "/blog";
      link.textContent = "المدونة";
      link.className = "font-bold text-brand-dark transition-colors hover:text-brand-blue";
      nav.append(link);
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

  if (addBlogLinks()) return;

  const observer = new MutationObserver(() => {
    if (addBlogLinks()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 5000);
})();
