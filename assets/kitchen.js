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
