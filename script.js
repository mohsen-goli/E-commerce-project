const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49,
    category: "Audio",
    image: "images/headphones.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 79,
    category: "Wearables",
    image: "images/smartwatch.jpg",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: 39,
    category: "Computer",
    image: "images/mouse.jpg",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 89,
    category: "Computer",
    image: "images/keyboard.jpg",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 59,
    category: "Audio",
    image: "images/speaker.jpg",
  },
  {
    id: 6,
    name: "Desktop Computer",
    price: 799,
    category: "Computer",
    image: "images/desktop.jpg",
  },
  {
    id: 7,
    name: "Power Bank",
    price: 29,
    category: "Accessories",
    image: "images/powerbank.jpg",
  },
  {
    id: 8,
    name: "USB-C Hub",
    price: 45,
    category: "Accessories",
    image: "images/usbc-hub.jpg",
  },
  {
    id: 9,
    name: "Game Console",
    price: 399,
    category: "Gaming",
    image: "images/game-console.jpg",
  },
  {
    id: 10,
    name: "Laptop Stand",
    price: 35,
    category: "Computer",
    image: "images/laptop-stand.jpg",
  },
  {
    id: 11,
    name: "Computer Monitor",
    price: 249,
    category: "Computer",
    image: "images/monitor.jpg",
  },
  {
    id: 12,
    name: "Laptop Backpack",
    price: 69,
    category: "Accessories",
    image: "images/backpack.jpg",
  },
];

const productsGrid = document.querySelector(".products-grid");

function renderProducts(productsToRender) {
  productsGrid.innerHTML = "";

  productsToRender.forEach((product) => {
    const productCard = document.createElement("article");

    productCard.className = "product-card";

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="product-price">$${product.price}</p>

        <button class="add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;

    productsGrid.appendChild(productCard);
  });
}

renderProducts(products);
