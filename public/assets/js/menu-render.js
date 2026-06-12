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

const createAltText = (item) => {
  const altTextByName = {
    "Spicy Chicken Sandwich Combo": "Spicy Chicken Sandwich Combo with fries and drink",
    "Crispy Chicken Sandwich Combo": "Crispy Chicken Sandwich Combo with side and drink",
    "Chicken Katsu Sandwich Combo": "Chicken Katsu Sandwich Combo with side and drink",
    "Filet-O-Fish Burger Combo": "Filet-O-Fish Burger Combo with side and drink",
    "Meat-Lover Crispy Chicken Sandwich Combo": "Meat-Lover Crispy Chicken Sandwich Combo with side and drink",
    "Spicy Chicken Sandwich": "Spicy Chicken Sandwich",
    "Crispy Chicken Sandwich": "Crispy Chicken Sandwich",
    "Chicken Katsu Sandwich": "Chicken Katsu Sandwich",
    "Filet-O-Fish Burger": "Filet-O-Fish Burger",
    "Meat-Lover Crispy Chicken Sandwich": "Meat-Lover Crispy Chicken Sandwich",
    "Crispy Chicken Katsu": "Crispy Chicken Katsu",
    "Chicken Wings 2 pcs": "Chicken Wings 2 pcs",
    "Chicken Wings Combo": "Chicken Wings Combo with side and drink",
    "Chicken Wings Bucket 10": "Chicken Wings Bucket 10 with fries",
    "Popcorn Chicken": "Popcorn Chicken",
    "Popcorn Chicken Meal": "Popcorn Chicken Meal",
    "Popcorn Chicken Family Bucket": "Popcorn Chicken Family Bucket",
    "Chicken Nuggets 6 pcs": "Chicken Nuggets 6 pcs",
    "Curry Chicken Katsu Rice Bowl": "Curry Chicken Katsu Rice Bowl",
    "Curry Chicken Katsu Rice Meal": "Curry Chicken Katsu Rice Meal",
    "Spicy Creamy Alfredo Chicken Rice Bowl": "Spicy Creamy Alfredo Chicken Rice Bowl",
    "Spicy Creamy Alfredo Chicken Rice Bowl Combo": "Spicy Creamy Alfredo Chicken Rice Bowl Combo",
    "Mixed Family Bucket - Good for Two": "Mixed Family Bucket",
    "Signature Fries": "Signature Fries",
    "Waffle Cut Fries": "Waffle Cut Fries",
    "Sweet Potato Fries": "Sweet Potato Fries",
    "Onion Rings": "Onion Rings"
  };

  return altTextByName[item.name] || item.name;
};

const createMenuItemImage = (item) => {
  if (!item.image) {
    return null;
  }

  const figure = document.createElement("figure");
  figure.className = "image-slot menu-card-image-slot";
  figure.style.setProperty("--image-position", item.imagePosition || "center center");
  figure.style.setProperty("--image-fit", item.imageFit || "cover");

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = createAltText(item);
  image.loading = "lazy";
  image.addEventListener("error", () => {
    figure.remove();
  });

  figure.append(image);
  return figure;
};

const createMenuItemCard = (item) => {
  const article = document.createElement("article");
  article.className = "menu-item-card";

  const image = createMenuItemImage(item);
  if (image) {
    article.append(image);
  }

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
