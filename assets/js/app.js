const books = [
  {
    id: "midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 22,
    genre: "Fiction",
    description:
      "Between life and death there is a library. Nora Seed finds herself faced with the possibility of changing her life for a better one.",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 26,
    genre: "Science Fiction",
    description:
      "A lone astronaut must save the earth from disaster in this high-stakes tale of discovery, speculation, and survival.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
  },
  {
    id: "crying-in-h-mart",
    title: "Crying in H Mart",
    author: "Michelle Zauner",
    price: 18,
    genre: "Memoir",
    description:
      "A powerful memoir about family, food, grief, and endurance from the indie rock star of Japanese Breakfast.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: false,
  },
  {
    id: "fourth-wing",
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    price: 24,
    genre: "Fantasy",
    description:
      "At Basgiath War College, there are only two paths: graduate or die. Violet must fight to survive the elite dragon riders.",
    image:
      "https://images.unsplash.com/photo-1455885666463-9ae64deff62e?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
  },
  {
    id: "tom-lake",
    title: "Tom Lake",
    author: "Ann Patchett",
    price: 21,
    genre: "Literary",
    description:
      "On a family farm in Michigan, a mother tells her daughters about her romance with a famous actor during a summer stock season.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
  },
  {
    id: "remarkably-bright",
    title: "Remarkably Bright Creatures",
    author: "Shelby Van Pelt",
    price: 20,
    genre: "Contemporary",
    description:
      "After Tova Sullivan starts working the night shift at the aquarium, she forms an unexpected friendship with a giant Pacific octopus.",
    image:
      "https://images.unsplash.com/photo-1496104679561-38d3af7fdd9d?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
  },
  {
    id: "tomorrow-tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    price: 19,
    genre: "Literary",
    description:
      "Two friends collaborate to build video games, catapulting them to stardom while testing the limits of their friendship.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
  },
  {
    id: "how-to-know-a-person",
    title: "How to Know a Person",
    author: "David Brooks",
    price: 17,
    genre: "Non-fiction",
    description:
      "An exploration of the subtle art of truly seeing one another and the tools to build deeper connections.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
  },
  {
    id: "yellowface",
    title: "Yellowface",
    author: "R. F. Kuang",
    price: 18,
    genre: "Thriller",
    description:
      "A darkly comedic publishing thriller about ambition, identity, and the stories we claim.",
    image:
      "https://images.unsplash.com/photo-1529651737248-dad5e287768e?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const state = {
  items: new Map(),
};

const els = {
  bookGrid: document.querySelector("[data-book-grid]"),
  carouselTrack: document.querySelector("[data-carousel-track]"),
  carouselPrev: document.querySelector("[data-carousel-prev]"),
  carouselNext: document.querySelector("[data-carousel-next]"),
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector("[data-search-input]"),
  cartCount: document.querySelector("[data-cart-count]"),
  cart: document.querySelector("[data-cart]"),
  cartOpen: document.querySelectorAll("[data-cart-open]"),
  cartClose: document.querySelectorAll("[data-cart-close]"),
  cartItems: document.querySelector("[data-cart-items]"),
  cartTotal: document.querySelector("[data-cart-total]"),
  checkoutButton: document.querySelector("[data-checkout]"),
  payment: document.querySelector("[data-payment]"),
  paymentClose: document.querySelectorAll("[data-payment-close]"),
  paymentItems: document.querySelector("[data-payment-items]"),
  paymentEmpty: document.querySelector("[data-payment-empty]"),
  paymentTotals: document.querySelector("[data-payment-totals]"),
  paymentSubtotal: document.querySelector("[data-payment-subtotal]"),
  paymentShipping: document.querySelector("[data-payment-shipping]"),
  paymentTotal: document.querySelector("[data-payment-total]"),
  paymentForm: document.querySelector("[data-payment-form]"),
  paymentSuccess: document.querySelector("[data-payment-success]"),
  paymentContinue: document.querySelector("[data-payment-continue]"),
  paymentSuccessMethod: document.querySelector("[data-payment-success-method]"),
  navToggle: document.querySelector("[data-nav-toggle]"),
  navMenu: document.querySelector("[data-nav-menu]"),
};

const templates = {
  bookCard: document.getElementById("book-card-template"),
  cartItem: document.getElementById("cart-item-template"),
};

function init() {
  if (els.navMenu) {
    els.navMenu.dataset.open = "false";
  }
  renderFeatured(books.filter((book) => book.featured));
  renderBestSellers(books.filter((book) => book.bestSeller));
  attachEventListeners();
  updateYear();
}

function renderFeatured(collection) {
  els.bookGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  collection.forEach((book) => {
    const card = templates.bookCard.content.cloneNode(true);
    card.querySelector("[data-book-image]").src = book.image;
    card.querySelector("[data-book-image]").alt = `${book.title} cover`;
    card.querySelector("[data-book-title]").textContent = book.title;
    card.querySelector("[data-book-author]").textContent = book.author;
    card.querySelector("[data-book-description]").textContent = book.description;
    card.querySelector("[data-book-genre]").textContent = book.genre;
    card.querySelector("[data-book-price]").textContent = currency.format(book.price);
    const button = card.querySelector("[data-add-to-cart]");
    button.dataset.bookId = book.id;
    fragment.appendChild(card);
  });

  els.bookGrid.appendChild(fragment);
}

function renderBestSellers(collection) {
  els.carouselTrack.innerHTML = "";
  const fragment = document.createDocumentFragment();

  collection.forEach((book) => {
    const card = templates.bookCard.content.cloneNode(true);
    card.querySelector("[data-book-image]").src = book.image;
    card.querySelector("[data-book-image]").alt = `${book.title} cover`;
    card.querySelector("[data-book-title]").textContent = book.title;
    card.querySelector("[data-book-author]").textContent = book.author;
    card.querySelector("[data-book-description]").textContent = book.description;
    card.querySelector("[data-book-genre]").textContent = book.genre;
    card.querySelector("[data-book-price]").textContent = currency.format(book.price);
    const button = card.querySelector("[data-add-to-cart]");
    button.dataset.bookId = book.id;
    fragment.appendChild(card);
  });

  els.carouselTrack.appendChild(fragment);
}

function attachEventListeners() {
  els.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterBooks(els.searchInput.value.trim());
  });

  els.searchInput.addEventListener("input", () => {
    if (!els.searchInput.value.trim()) {
      renderFeatured(books.filter((book) => book.featured));
    }
  });

  els.cartOpen.forEach((trigger) =>
    trigger.addEventListener("click", () => toggleCart(true))
  );

  els.cartClose.forEach((trigger) =>
    trigger.addEventListener("click", () => toggleCart(false))
  );

  els.cartItems.addEventListener("click", handleCartQuantity);
  els.checkoutButton.addEventListener("click", openPayment);

  els.paymentClose.forEach((btn) =>
    btn.addEventListener("click", () => togglePayment(false))
  );

  els.paymentForm.addEventListener("submit", handlePaymentSubmit);
  if (els.paymentContinue) {
    els.paymentContinue.addEventListener("click", () => togglePayment(false));
  }

  document.querySelectorAll("[data-payment-method]").forEach((tab) =>
    tab.addEventListener("click", () => selectPaymentMethod(tab.dataset.paymentMethod))
  );

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-to-cart][data-book-id]");
    if (!button) return;
    event.preventDefault();
    addToCart(button.dataset.bookId);
  });

  if (els.carouselPrev && els.carouselNext && els.carouselTrack) {
    els.carouselPrev.addEventListener("click", () => scrollCarousel(-1));
    els.carouselNext.addEventListener("click", () => scrollCarousel(1));
  }

  if (els.navToggle && els.navMenu) {
    els.navToggle.addEventListener("click", toggleNavMenu);
    els.navMenu
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", () => closeNavMenu()));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!els.payment.hasAttribute("hidden")) {
      togglePayment(false);
    } else if (!els.cart.hasAttribute("hidden")) {
      toggleCart(false);
    }
  });
}

function toggleNavMenu() {
  const isOpen = els.navMenu.dataset.open === "true";
  els.navMenu.dataset.open = String(!isOpen);
  els.navToggle.setAttribute("aria-expanded", String(!isOpen));
}

function closeNavMenu() {
  els.navMenu.dataset.open = "false";
  els.navToggle.setAttribute("aria-expanded", "false");
}

function scrollCarousel(direction) {
  const itemWidth = els.carouselTrack.querySelector(".book-card")?.offsetWidth;
  if (!itemWidth) return;
  const gap = 24;
  els.carouselTrack.scrollBy({
    left: direction * (itemWidth + gap),
    behavior: "smooth",
  });
}

function filterBooks(query) {
  if (!query) {
    renderFeatured(books.filter((book) => book.featured));
    return;
  }

  const term = query.toLowerCase();
  const filtered = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.genre.toLowerCase().includes(term)
    );
  });

  if (filtered.length === 0) {
    els.bookGrid.innerHTML = `<p class="empty">No matches for "${query}". Try another search.</p>`;
    return;
  }

  renderFeatured(filtered);
}

function addToCart(bookId) {
  const book = books.find((item) => item.id === bookId);
  if (!book) return;

  const existing = state.items.get(book.id);
  const quantity = existing ? existing.quantity + 1 : 1;
  state.items.set(book.id, { book, quantity });
  updateCartUI();
  toggleCart(true);
}

function handleCartQuantity(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const cartItemEl = button.closest("[data-book-id]");
  const id = cartItemEl?.dataset.bookId;
  if (!id) return;

  const entry = state.items.get(id);
  if (!entry) return;

  if (button.matches("[data-quantity-increase]")) {
    entry.quantity += 1;
  } else if (button.matches("[data-quantity-decrease]")) {
    entry.quantity -= 1;
    if (entry.quantity <= 0) {
      state.items.delete(id);
    }
  }

  updateCartUI();
}

function updateCartUI() {
  const fragment = document.createDocumentFragment();
  els.cartItems.innerHTML = "";

  if (state.items.size === 0) {
    els.cartItems.innerHTML = '<p class="empty">Your cart is empty.</p>';
    updateTotals();
    els.cartCount.textContent = "0";
    els.checkoutButton.disabled = true;
    els.checkoutButton.setAttribute("aria-disabled", "true");
    return;
  }

  let count = 0;
  state.items.forEach(({ book, quantity }) => {
    count += quantity;
    const item = templates.cartItem.content.cloneNode(true);
    item.querySelector("[data-cart-item-title]").textContent = book.title;
    item.querySelector("[data-cart-item-author]").textContent = book.author;
    item.querySelector("[data-cart-item-price]").textContent = currency.format(
      book.price * quantity
    );
    item.querySelector("[data-cart-item-quantity]").textContent = quantity;
    const wrapper = item.firstElementChild;
    wrapper.dataset.bookId = book.id;
    fragment.appendChild(item);
  });

  els.cartItems.appendChild(fragment);
  els.cartCount.textContent = String(count);
  els.checkoutButton.disabled = false;
  els.checkoutButton.setAttribute("aria-disabled", "false");
  updateTotals();
}

function updateTotals() {
  const totals = Array.from(state.items.values()).reduce(
    (acc, { book, quantity }) => {
      acc.subtotal += book.price * quantity;
      acc.count += quantity;
      return acc;
    },
    { subtotal: 0, count: 0 }
  );

  const shipping = totals.subtotal === 0 ? 0 : totals.subtotal >= 60 ? 0 : 4.99;
  const total = totals.subtotal + shipping;

  els.cartTotal.textContent = currency.format(total);
  updatePaymentSummary(totals.subtotal, shipping, total);
}

function toggleCart(open) {
  if (open) {
    els.cart.removeAttribute("hidden");
    els.cart.querySelector(".cart-panel")?.focus();
  } else {
    els.cart.setAttribute("hidden", "");
  }
}

function openPayment() {
  updatePaymentSummary();
  toggleCart(false);
  togglePayment(true);
  focusFirstInput();
}

function togglePayment(open) {
  if (open) {
    els.payment.removeAttribute("hidden");
    els.payment.querySelector(".payment-panel")?.focus();
  } else {
    els.payment.setAttribute("hidden", "");
    els.paymentForm.hidden = false;
    els.paymentSuccess.hidden = true;
    els.paymentForm.reset();
    selectPaymentMethod("card", { focus: false });
  }
}

function focusFirstInput() {
  const activePanel = els.paymentForm.querySelector(
    '.method-panel:not([hidden]) input'
  );
  activePanel?.focus();
}

function updatePaymentSummary(subtotalOverride, shippingOverride, totalOverride) {
  const subtotal =
    subtotalOverride ??
    Array.from(state.items.values()).reduce(
      (sum, { book, quantity }) => sum + book.price * quantity,
      0
    );
  const shipping =
    shippingOverride ?? (subtotal === 0 ? 0 : subtotal >= 60 ? 0 : 4.99);
  const total = totalOverride ?? subtotal + shipping;

  if (subtotal === 0) {
    els.paymentItems.innerHTML = "";
    els.paymentEmpty.hidden = false;
    els.paymentTotals.hidden = true;
    els.checkoutButton.disabled = true;
    els.checkoutButton.setAttribute("aria-disabled", "true");
    return;
  }

  els.paymentEmpty.hidden = true;
  els.paymentTotals.hidden = false;
  els.paymentItems.innerHTML = "";

  const fragment = document.createDocumentFragment();
  state.items.forEach(({ book, quantity }) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${book.title} × ${quantity}</span><span>${currency.format(
      book.price * quantity
    )}</span>`;
    fragment.appendChild(li);
  });

  els.paymentItems.appendChild(fragment);
  els.paymentSubtotal.textContent = currency.format(subtotal);
  els.paymentShipping.textContent =
    shipping === 0 ? "Free" : currency.format(shipping);
  els.paymentTotal.textContent = currency.format(total);
}

function selectPaymentMethod(method, { focus = true } = {}) {
  document.querySelectorAll("[data-payment-method]").forEach((tab) => {
    const isActive = tab.dataset.paymentMethod === method;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  els.paymentForm
    .querySelectorAll("[data-method-panel]")
    .forEach((panel) => {
      const isActive = panel.dataset.methodPanel === method;
      panel.hidden = !isActive;
    });

  if (focus) {
    focusFirstInput();
  }
}

function handlePaymentSubmit(event) {
  event.preventDefault();
  if (state.items.size === 0) return;

  const currentMethod = document
    .querySelector("[data-payment-method].active")
    .dataset.paymentMethod;

  const panel = els.paymentForm.querySelector(
    `[data-method-panel="${currentMethod}"]`
  );
  const inputs = Array.from(panel.querySelectorAll("input"));
  const allValid = inputs.every((input) => input.reportValidity());

  if (!allValid) return;

  els.paymentForm.hidden = true;
  els.paymentSuccess.hidden = false;
  els.paymentSuccess.focus();
  els.paymentSuccessMethod.textContent =
    currentMethod === "card"
      ? "your email"
      : currentMethod === "paypal"
      ? "your PayPal inbox"
      : "your gift card account";

  els.paymentForm.reset();
  state.items.clear();
  updateCartUI();
}

function focusTrap(event) {
  if (event.key !== "Tab") return;
  const dialog = event.currentTarget;
  const focusable = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function attachFocusTraps() {
  els.cart.addEventListener("keydown", focusTrap);
  els.payment.addEventListener("keydown", focusTrap);
}

function updateYear() {
  const yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

attachFocusTraps();
init();
