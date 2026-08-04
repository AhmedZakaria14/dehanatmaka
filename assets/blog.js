(() => {
  const menuButton = document.querySelector(".primary-menu-open");
  const closeButton = document.querySelector(".primary-menu-close");
  const drawer = document.querySelector(".primary-mobile-menu");
  const backdrop = document.querySelector(".primary-mobile-backdrop");
  const services = document.querySelector(".primary-services-menu");
  const servicesButton = document.querySelector(".primary-services-button");
  let returnFocus = null;
  let menuOpen = false;

  const drawerItems = () => [
    ...drawer?.querySelectorAll('a[href], button:not([disabled])') || [],
  ];

  const setMenuState = (open) => {
    if (!menuButton || !drawer || !backdrop) return;
    const wasOpen = menuOpen;
    if (open && !wasOpen) returnFocus = document.activeElement;
    menuButton.setAttribute("aria-expanded", String(open));
    drawer.inert = !open;
    drawer.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    document.body.classList.toggle("primary-menu-open", open);
    menuOpen = open;
    if (open && !wasOpen) closeButton?.focus();
    else if (!open && wasOpen && returnFocus instanceof HTMLElement) {
      returnFocus.focus();
      returnFocus = null;
    }
  };

  menuButton?.addEventListener("click", () => setMenuState(true));
  closeButton?.addEventListener("click", () => setMenuState(false));
  backdrop?.addEventListener("click", () => setMenuState(false));
  drawer?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  servicesButton?.addEventListener("click", () => {
    const open = servicesButton.getAttribute("aria-expanded") !== "true";
    servicesButton.setAttribute("aria-expanded", String(open));
    services?.classList.toggle("is-open", open);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".primary-services")) {
      servicesButton?.setAttribute("aria-expanded", "false");
      services?.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      servicesButton?.setAttribute("aria-expanded", "false");
      services?.classList.remove("is-open");
      return;
    }
    if (event.key !== "Tab" || !menuOpen) return;

    const items = drawerItems();
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenuState(false);
  });

  const tocLinks = [...document.querySelectorAll(".toc-list a")];
  const headings = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && headings.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        tocLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-110px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((heading) => observer.observe(heading));
  }

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", [...rel].join(" "));
  });
})();
