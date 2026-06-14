const orderPickupUrl = "https://pos.chowbus.com/online-ordering/store/cloud-chicken/21093";
const directionsUrl = "https://www.google.com/maps/search/?api=1&query=66%20South%20Dobson%20Road%20%23124%2C%20Mesa%2C%20AZ%2085202";
const phoneUrl = "tel:+14808598802";

const markMissingImages = () => {
  document.querySelectorAll(".image-slot img").forEach((image) => {
    const slot = image.closest(".image-slot");

    if (!slot) {
      return;
    }

    if (image.complete && image.naturalWidth === 0) {
      slot.classList.add("is-missing");
    }

    image.addEventListener("error", () => {
      slot.classList.add("is-missing");
    });

    image.addEventListener("load", () => {
      slot.classList.remove("is-missing");
    });
  });
};

const createStickyActionBar = () => {
  if (document.querySelector(".mobile-action-bar")) {
    return;
  }

  const bar = document.createElement("nav");
  bar.className = "mobile-action-bar";
  bar.setAttribute("aria-label", "Quick actions");

  const actions = [
    { label: "Order", href: orderPickupUrl, aria: "Order pickup online" },
    { label: "Directions", href: directionsUrl, aria: "Get directions to Cloud Chicken" },
    { label: "Call", href: phoneUrl, aria: "Call Cloud Chicken" }
  ];

  actions.forEach((action) => {
    const link = document.createElement("a");
    link.href = action.href;
    link.textContent = action.label;
    link.setAttribute("aria-label", action.aria);
    bar.append(link);
  });

  document.body.append(bar);
};

document.addEventListener("DOMContentLoaded", () => {
  markMissingImages();
  createStickyActionBar();
});
