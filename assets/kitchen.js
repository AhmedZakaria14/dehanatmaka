const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");

document.querySelectorAll(".img-container").forEach((container) => {
  const open = () => {
    const image = container.querySelector("img");
    if (!image || !lightbox || !lightboxImage) return;

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("active");
  };

  container.addEventListener("click", open);
  container.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
});

lightbox?.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") lightbox?.classList.remove("active");
});
