const orderOnlineUrl = "https://pos.chowbus.com/online-ordering/store/cloud-chicken/21093";

const formatMenuPrice = (price) => {
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }

  if (typeof price === "string" && price.trim()) {
    return price.trim().startsWith("$") ? price.trim() : `$${price.trim()}`;
  }

  return "";
};

const createMenuItemCard = (item) => {
  const article = document.createElement("article");
  article.className = "menu-item-card";

  const content = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = item.name;
  content.append(title);

  if (item.description) {
    const description = document.createElement("p");
    description.textContent = item.description;
    content.append(description);
  }

  article.append(content);

  const price = formatMenuPrice(item.price);
  if (price) {
    const priceElement = document.createElement("p");
    priceElement.className = "menu-price";
    priceElement.textContent = price;
    article.append(priceElement);
  }

  const orderLink = document.createElement("a");
  orderLink.className = "button button-small";
  orderLink.href = orderOnlineUrl;
  orderLink.textContent = "Order Now";
  article.append(orderLink);

  return article;
};

const createMenuCategorySection = (category) => {
  const section = document.createElement("section");
  section.className = category.id === "best-sellers" ? "section" : "section menu-category";
  section.id = category.id;
  section.setAttribute("aria-labelledby", `${category.id}-title`);

  const heading = document.createElement("div");
  heading.className = category.id === "best-sellers" ? "section-heading" : "menu-category-heading";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = category.name;

  const title = document.createElement("h2");
  title.id = `${category.id}-title`;
  title.textContent = category.id === "best-sellers" ? "Customer favorites" : category.name;

  heading.append(eyebrow, title);

  const grid = document.createElement("div");
  grid.className = "menu-item-grid";
  category.items.forEach((item) => grid.append(createMenuItemCard(item)));

  section.append(heading, grid);
  return section;
};

const renderMenuCategories = async () => {
  const menuRoot = document.querySelector("[data-menu-root]");

  if (!menuRoot) {
    return;
  }

  try {
    const response = await fetch("../data/menu.json");
    const menuData = await response.json();
    const categories = Array.isArray(menuData.categories) ? menuData.categories : [];

    menuRoot.textContent = "";
    categories.forEach((category) => {
      menuRoot.append(createMenuCategorySection(category));
    });
  } catch (error) {
    menuRoot.textContent = "";
  }
};

document.addEventListener("DOMContentLoaded", renderMenuCategories);
