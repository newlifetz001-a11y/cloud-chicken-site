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

const collectMenuItems = (value, items = []) => {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectMenuItems(entry, items));
    return items;
  }

  if (value && typeof value === "object") {
    if (typeof value.name === "string" || typeof value.title === "string") {
      items.push(value);
    }

    Object.values(value).forEach((entry) => collectMenuItems(entry, items));
  }

  return items;
};

const normalizeName = (name) => name.trim().toLowerCase();

const formatPrice = (price) => {
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }

  if (typeof price === "string" && price.trim()) {
    return price.trim().startsWith("$") ? price.trim() : `$${price.trim()}`;
  }

  return "";
};

const renderMenuPrices = async () => {
  const priceTargets = document.querySelectorAll("[data-price-for]");

  if (!priceTargets.length) {
    return;
  }

  try {
    const response = await fetch("data/menu.json");
    const menuData = await response.json();
    const menuItems = collectMenuItems(menuData);

    priceTargets.forEach((target) => {
      const targetName = normalizeName(target.dataset.priceFor || "");
      const match = menuItems.find((item) => {
        const itemName = item.name || item.title || "";
        return normalizeName(itemName) === targetName;
      });
      const price = match ? formatPrice(match.price) : "";

      if (price) {
        target.textContent = price;
        target.hidden = false;
      }
    });
  } catch (error) {
    priceTargets.forEach((target) => {
      target.hidden = true;
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  markMissingImages();
  renderMenuPrices();
});
