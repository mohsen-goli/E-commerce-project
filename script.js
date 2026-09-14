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

/* =========================
   Shared State
========================= */

let cart = JSON.parse(localStorage.getItem("novatech-cart")) || [];

/* =========================
   Shared Functions
========================= */

function saveCart() {
  localStorage.setItem("novatech-cart", JSON.stringify(cart));
}

function getCartQuantity() {
  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

function getCartTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function updateCartCount() {
  const cartCountElements = document.querySelectorAll(".cart-count");

  const quantity = getCartQuantity();

  cartCountElements.forEach((element) => {
    element.textContent = quantity;
  });
}

/* =========================
   Product Page
========================= */

const productsGrid = document.querySelector(".product-container");
const searchInput = document.querySelector(".search-input");
const categoryFilter = document.querySelector(".category-filter");

function renderProducts(productsToRender) {
  if (!productsGrid) {
    return;
  }

  productsGrid.innerHTML = "";

  if (productsToRender.length === 0) {
    productsGrid.innerHTML = `
      <p class="empty-products">
        No products found.
      </p>
    `;

    return;
  }

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

if (productsGrid) {
  renderProducts(products);
}

/* =========================
   Product Search & Filter
========================= */

function filterProducts() {
  if (!searchInput || !categoryFilter) {
    return;
  }

  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}

if (searchInput) {
  searchInput.addEventListener("input", filterProducts);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", filterProducts);
}

/* =========================
   Add Product To Cart
========================= */

if (productsGrid) {
  productsGrid.addEventListener("click", (event) => {
    if (!event.target.classList.contains("add-to-cart")) {
      return;
    }

    const productId = Number(event.target.dataset.id);

    const product = products.find((item) => item.id === productId);

    if (!product) {
      return;
    }

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    saveCart();
    updateCartCount();

    const button = event.target;

    const originalText = button.textContent;

    button.textContent = "Added";

    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 900);
  });
}

/* =========================
   Cart Page
========================= */

const cartPageItems = document.querySelector(".cart-page-items");

function renderCartPage() {
  if (!cartPageItems) {
    return;
  }

  cartPageItems.innerHTML = "";

  if (cart.length === 0) {
    cartPageItems.innerHTML = `
      <div class="empty-cart-page">
        <h2>Your cart is empty</h2>

        <p>
          You haven't added any products yet.
        </p>

        <a
          href="index.html#products"
          class="empty-cart-button"
        >
          Start Shopping
        </a>
      </div>
    `;

    updateCartSummary();

    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("article");

    cartItem.className = "cart-page-item";

    cartItem.innerHTML = `
      <div class="cart-page-item-image">
        <img
          src="${item.image}"
          alt="${item.name}"
        >
      </div>

      <div class="cart-page-item-content">

        <div class="cart-page-item-top">

          <div>
            <h3>${item.name}</h3>

            <p class="cart-page-item-category">
              ${item.category}
            </p>

            <p class="cart-page-item-price">
              $${item.price}
            </p>
          </div>

          <button
            class="remove-item"
            data-id="${item.id}"
            aria-label="Remove ${item.name}"
          >
            &times;
          </button>

        </div>

        <div class="cart-page-item-bottom">

          <div class="quantity-controls">

            <button
              class="decrease"
              data-id="${item.id}"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span>${item.quantity}</span>

            <button
              class="increase"
              data-id="${item.id}"
              aria-label="Increase quantity"
            >
              +
            </button>

          </div>

          <strong class="cart-page-item-total">
            $${item.price * item.quantity}
          </strong>

        </div>

      </div>
    `;

    cartPageItems.appendChild(cartItem);
  });

  updateCartSummary();
}

/* =========================
   Cart Item Controls
========================= */

if (cartPageItems) {
  cartPageItems.addEventListener("click", (event) => {
    const productId = Number(event.target.dataset.id);

    if (!productId) {
      return;
    }

    const item = cart.find((cartItem) => {
      return cartItem.id === productId;
    });

    if (!item) {
      return;
    }

    if (event.target.classList.contains("increase")) {
      item.quantity += 1;
    }

    if (event.target.classList.contains("decrease")) {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart = cart.filter((cartItem) => {
          return cartItem.id !== productId;
        });
      }
    }

    if (event.target.classList.contains("remove-item")) {
      cart = cart.filter((cartItem) => {
        return cartItem.id !== productId;
      });
    }

    saveCart();
    updateCartCount();
    renderCartPage();
  });
}

/* =========================
   Cart Summary
========================= */

function updateCartSummary() {
  const subtotalElement = document.querySelector(".cart-page-subtotal");
  const totalElement = document.querySelector(".cart-page-total");

  const total = getCartTotal();

  if (subtotalElement) {
    subtotalElement.textContent = `$${total}`;
  }

  if (totalElement) {
    totalElement.textContent = `$${total}`;
  }
}

/* =========================
   Checkout
========================= */

const checkoutItems = document.querySelector(".checkout-items");
const checkoutSubtotal = document.querySelector(".checkout-subtotal");
const checkoutTotal = document.querySelector(".checkout-total");
const checkoutForm = document.querySelector("#checkout-form");
const orderConfirmation = document.querySelector("#order-confirmation");

function renderCheckout() {
  if (!checkoutItems) {
    return;
  }

  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <div class="empty-checkout">
        <p>Your cart is empty.</p>

        <a href="index.html#products">
          Start Shopping
        </a>
      </div>
    `;

    if (checkoutSubtotal) {
      checkoutSubtotal.textContent = "$0";
    }

    if (checkoutTotal) {
      checkoutTotal.textContent = "$0";
    }

    if (checkoutForm) {
      checkoutForm.style.display = "none";
    }

    return;
  }

  cart.forEach((item) => {
    const checkoutItem = document.createElement("div");

    checkoutItem.className = "checkout-item";

    checkoutItem.innerHTML = `
      <div class="checkout-item-image">
        <img
          src="${item.image}"
          alt="${item.name}"
        >
      </div>

      <div class="checkout-item-info">
        <div>
          <h3>${item.name}</h3>

          <p>
            Qty: ${item.quantity}
          </p>
        </div>

        <strong>
          $${item.price * item.quantity}
        </strong>
      </div>
    `;

    checkoutItems.appendChild(checkoutItem);
  });

  const total = getCartTotal();

  if (checkoutSubtotal) {
    checkoutSubtotal.textContent = `$${total}`;
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = `$${total}`;
  }
}

/* =========================
   Place Order
========================= */

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const formData = new FormData(checkoutForm);

    const customer = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
      country: formData.get("country"),
      payment: formData.get("payment"),
    };

    console.log("Customer:", customer);
    console.log("Order:", cart);
    console.log("Total:", getCartTotal());

    checkoutForm.style.display = "none";

    if (orderConfirmation) {
      orderConfirmation.hidden = false;
    }

    cart = [];

    saveCart();
    updateCartCount();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =========================
   Checkout Button From Cart
========================= */

const checkoutButton = document.querySelector(".cart-checkout-button");

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    window.location.href = "checkout.html";
  });
}

/* =========================
   Initial State
========================= */

updateCartCount();
renderCartPage();
renderCheckout();
