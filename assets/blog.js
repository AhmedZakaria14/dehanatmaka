(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    const backdrop = document.createElement("div");
    backdrop.className = "menu-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);

    const setMenuState = (open) => {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
      navigation.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    };

    menuButton.addEventListener("click", () => {
      setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
    });
    backdrop.addEventListener("click", () => setMenuState(false));
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuState(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuState(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) setMenuState(false);
    });
  }

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
          link.classList.toggle("active", link.getAttribute("href") === "#" + visible.target.id);
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
