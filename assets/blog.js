(() => {
  const whatsappUrl = "https://wa.me/966560703844?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D8%AE%D8%AF%D9%85%D8%A9%20%D8%AF%D9%87%D8%A7%D9%86%D8%A7%D8%AA%20%D9%81%D9%8A%20%D9%85%D9%83%D8%A9.";

  const primaryHeader = `
    <header class="primary-site-header bg-white/90 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center gap-3" aria-label="معلم دهانات مكة - الرئيسية">
          <svg class="text-brand-blue h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 11 8-8 4 4-8 8"/><path d="m16 8 2 2"/><path d="M5 14a4 4 0 1 0 4 4c0-1.7-1.3-3-4-4Z"/></svg>
          <span class="text-2xl font-black text-brand-dark tracking-tighter">معلم <span class="text-brand-blue">دهانات مكة</span></span>
        </a>
        <nav class="hidden lg:flex items-center gap-6" aria-label="التنقل الرئيسي">
          <a href="/" class="font-bold text-brand-dark transition-colors hover:text-brand-blue">الرئيسية</a>
          <div class="primary-services relative group">
            <button class="primary-services-button font-bold text-brand-dark transition-colors hover:text-brand-blue flex items-center gap-1" type="button" aria-expanded="false" aria-controls="primary-services-menu">خدماتنا<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="primary-services-menu absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[200px]" id="primary-services-menu">
              <a href="/interior-paints" class="block px-4 py-2 font-semibold text-brand-dark transition-colors hover:bg-gray-100">دهانات داخلية</a>
              <a href="/exterior-paints" class="block px-4 py-2 font-semibold text-brand-dark transition-colors hover:bg-gray-100">دهانات خارجية</a>
              <a href="/epoxy" class="block px-4 py-2 font-semibold text-brand-dark transition-colors hover:bg-gray-100">إيبوكسي</a>
              <a href="/kitchen-renovation" class="block px-4 py-2 font-semibold text-brand-dark transition-colors hover:bg-gray-100">تجديد مطابخ</a>
            </div>
          </div>
          <a href="/#contact" class="font-bold text-brand-dark transition-colors hover:text-brand-blue">تواصل معنا</a>
          <a href="/blog" class="font-bold text-brand-blue transition-colors hover:text-brand-blue" aria-current="page">المدونة</a>
        </nav>
        <button class="primary-menu-open text-brand-dark lg:hidden" type="button" aria-label="فتح القائمة" aria-controls="primary-mobile-menu" aria-expanded="false"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="hidden lg:block bg-brand-gold text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform">واتساب</a>
      </div>
    </header>
    <div class="primary-mobile-backdrop fixed inset-0 bg-black/50 z-40" aria-hidden="true"></div>
    <aside class="primary-mobile-menu fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-2xl p-6 flex flex-col" id="primary-mobile-menu" aria-hidden="true" aria-label="قائمة الهاتف">
      <div class="flex justify-between items-center mb-10">
        <span class="text-xl font-bold text-brand-dark">القائمة</span>
        <button class="primary-menu-close text-gray-500 hover:text-brand-dark" type="button" aria-label="إغلاق القائمة"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      </div>
      <nav class="flex flex-col gap-2" aria-label="التنقل عبر الهاتف">
        <a href="/" class="block text-lg font-semibold text-brand-dark p-4 rounded-lg hover:bg-gray-100">الرئيسية</a>
        <a href="/interior-paints" class="block text-lg font-semibold text-brand-dark p-4 rounded-lg hover:bg-gray-100">دهانات داخلية</a>
        <a href="/exterior-paints" class="block text-lg font-semibold text-brand-dark p-4 rounded-lg hover:bg-gray-100">دهانات خارجية</a>
        <a href="/epoxy" class="block text-lg font-semibold text-brand-dark p-4 rounded-lg hover:bg-gray-100">إيبوكسي</a>
        <a href="/kitchen-renovation" class="block text-lg font-semibold text-brand-dark p-4 rounded-lg hover:bg-gray-100">تجديد مطابخ</a>
        <a href="/blog" class="block text-lg font-semibold text-brand-blue bg-blue-50 p-4 rounded-lg" aria-current="page">المدونة</a>
        <a href="/#contact" class="block text-lg font-semibold text-brand-dark p-4 rounded-lg hover:bg-gray-100">تواصل معنا</a>
      </nav>
      <div class="mt-auto border-t pt-6 space-y-4">
        <a href="tel:0560703844" class="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"><svg class="text-brand-blue h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z"/></svg><span class="font-bold text-brand-dark" dir="ltr">056 070 3844</span></a>
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-3 p-3 bg-green-500 text-white rounded-lg font-bold"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 8.5 8.5 0 0 1-3.7-.9L3 21l1.9-5.1A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.2 8.1c.4 3.5 2.2 5.4 5.7 5.8l1.2-1.2"/></svg><span>واتساب</span></a>
        <div class="flex items-center gap-3 text-sm text-gray-500 pt-2"><svg class="text-gray-400 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span>متواجدون في جميع أحياء مكة المكرمة</span></div>
      </div>
    </aside>`;

  const primaryFooter = `
    <footer class="primary-site-footer bg-brand-dark text-gray-400 py-10">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <div class="flex justify-center md:justify-start items-center gap-2 mb-4"><svg class="text-brand-blue h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 11 8-8 4 4-8 8"/><path d="m16 8 2 2"/><path d="M5 14a4 4 0 1 0 4 4c0-1.7-1.3-3-4-4Z"/></svg><span class="text-xl font-bold text-white">معلم دهانات مكة</span></div>
            <p class="text-sm">جودة، إتقان، والتزام بالمواعيد في قلب مكة المكرمة.</p>
          </div>
          <nav aria-label="روابط سريعة">
            <p class="text-lg font-bold text-white mb-4">روابط سريعة</p>
            <ul class="space-y-2"><li><a href="/" class="hover:text-brand-blue transition-colors">الرئيسية</a></li><li><a href="/interior-paints" class="hover:text-brand-blue transition-colors">دهانات داخلية</a></li><li><a href="/exterior-paints" class="hover:text-brand-blue transition-colors">دهانات خارجية</a></li><li><a href="/epoxy" class="hover:text-brand-blue transition-colors">إيبوكسي</a></li><li><a href="/blog" class="text-brand-blue hover:text-brand-blue transition-colors">المدونة</a></li><li><a href="/#contact" class="hover:text-brand-blue transition-colors">تواصل معنا</a></li></ul>
          </nav>
          <div>
            <p class="text-lg font-bold text-white mb-4">خدماتنا</p>
            <ul class="space-y-2 text-sm"><li>دهانات داخلية احترافية</li><li>دهانات خارجية متينة</li><li>إيبوكسي أرضيات ومطابخ</li><li>تركيب ديكورات فوم</li><li>ترميم الدهانات القديمة</li></ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p class="mb-6">© 2026 جميع الحقوق محفوظة - تم التطوير بواسطة NasharHub.com.</p>
          <div class="border-t border-gray-700/50 pt-6"><a href="https://nasharhub.com" target="_blank" rel="noopener noreferrer" class="inline-flex flex-col items-center gap-3 group"><img src="/images/aaf76befe46d6f3fc74e7d46ecb43064.png" alt="NasharHub logo" width="180" height="40" class="footer-brand-logo opacity-80 group-hover:opacity-100 transition-opacity duration-300"><span class="text-gray-500 text-xs md:text-sm group-hover:text-brand-blue transition-colors duration-300">تم إنشاء هذا الموقع بواسطة NasharHub</span></a></div>
        </div>
      </div>
    </footer>`;

  const oldHeader = document.querySelector(".site-header, .primary-site-header");
  const oldFooter = document.querySelector(".site-footer, .primary-site-footer");
  if (oldHeader) oldHeader.outerHTML = primaryHeader;
  if (oldFooter) oldFooter.outerHTML = primaryFooter;

  const menuButton = document.querySelector(".primary-menu-open");
  const closeButton = document.querySelector(".primary-menu-close");
  const drawer = document.querySelector(".primary-mobile-menu");
  const backdrop = document.querySelector(".primary-mobile-backdrop");
  const services = document.querySelector(".primary-services-menu");
  const servicesButton = document.querySelector(".primary-services-button");

  const setMenuState = (open) => {
    menuButton?.setAttribute("aria-expanded", String(open));
    drawer?.setAttribute("aria-hidden", String(!open));
    drawer?.classList.toggle("is-open", open);
    backdrop?.classList.toggle("is-open", open);
    document.body.classList.toggle("primary-menu-open", open);
    if (open) closeButton?.focus();
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
    if (event.key !== "Escape") return;
    setMenuState(false);
    servicesButton?.setAttribute("aria-expanded", "false");
    services?.classList.remove("is-open");
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
