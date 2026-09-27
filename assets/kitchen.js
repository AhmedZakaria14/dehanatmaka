const resultsContainer = document.querySelector("#kitchen-results .max-w-6xl");

if (resultsContainer && !document.getElementById("grey-kitchen-renovation")) {
  resultsContainer.insertAdjacentHTML(
    "beforeend",
    `<article class="project-card" id="grey-kitchen-renovation" aria-labelledby="grey-kitchen-title"><div class="p-6 border-b"><h3 id="grey-kitchen-title" class="text-xl font-black">تجديد مطبخ رمادي مع رخام إيبوكسي أسود</h3></div><div class="p-6"><div class="before-after-grid"><button type="button" class="img-container" aria-label="تكبير صورة المطبخ قبل التجديد"><span class="label-badge">قبل</span><img src="https://raw.githubusercontent.com/AhmedZakaria14/tegdedmatabekhmakka/main/images/grey-kitchen-before.webp" alt="المطبخ الرمادي والسطح البيج قبل التجديد" loading="lazy" decoding="async"></button><button type="button" class="img-container" aria-label="تكبير صورة المطبخ بعد التجديد"><span class="label-badge label-after">بعد</span><img src="https://raw.githubusercontent.com/AhmedZakaria14/tegdedmatabekhmakka/main/images/grey-kitchen-after.webp" alt="المطبخ بعد تجديد الدواليب باللون الأبيض والسطح الأسود" loading="lazy" decoding="async"></button></div></div></article>`
  );
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
let lightboxTrigger = null;

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lightboxTrigger?.focus();
};

document.querySelectorAll(".img-container").forEach((container) => {
  const open = () => {
    const image = container.querySelector("img");
    if (!image || !lightbox || !lightboxImage) return;

    lightboxTrigger = container;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightbox.focus();
  };

  container.addEventListener("click", open);
});

lightbox?.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("active")) closeLightbox();
});
