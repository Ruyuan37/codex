const books = [
  {
    id: 'midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    description:
      'A spellbinding tale exploring infinite lives and the choices that define us.',
    price: 18.99,
    image:
      'https://images.unsplash.com/photo-1544937950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    featured: true,
    bestSeller: true,
  },
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    description:
      'A lone astronaut must save Earth from disaster while solving an alien mystery.',
    price: 21.5,
    image:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80',
    featured: true,
    bestSeller: true,
  },
  {
    id: 'braiding-sweetgrass',
    title: 'Braiding Sweetgrass',
    author: 'Robin Wall Kimmerer',
    genre: 'Non-Fiction',
    description:
      'Indigenous wisdom, scientific knowledge, and the lessons of plants intertwined.',
    price: 17.75,
    image:
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=400&q=80',
    featured: true,
    bestSeller: false,
  },
  {
    id: 'the-house-in-the-cerulean-sea',
    title: 'The House in the Cerulean Sea',
    author: 'TJ Klune',
    genre: 'Fantasy',
    description:
      'A magical island orphanage challenges a caseworker to rethink what family means.',
    price: 16.25,
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
    featured: true,
    bestSeller: true,
  },
  {
    id: 'klara-and-the-sun',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    genre: 'Literary Fiction',
    description:
      'An Artificial Friend observes the complexities of human relationships.',
    price: 19.0,
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80',
    featured: false,
    bestSeller: true,
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Improvement',
    description:
      'Build better habits and break bad ones with tiny, transformative changes.',
    price: 18.5,
    image:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=400&q=80',
    featured: false,
    bestSeller: true,
  },
  {
    id: 'legendborn',
    title: 'Legendborn',
    author: 'Tracy Deonn',
    genre: 'Young Adult',
    description:
      'A modern-day magic society rooted in Arthurian legend tests a brave teen.',
    price: 15.25,
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80',
    featured: false,
    bestSeller: false,
  },
  {
    id: 'the-invisible-life-of-addie-larue',
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    genre: 'Fantasy',
    description:
      'A Faustian bargain leaves Addie forgotten by everyone—until someone remembers.',
    price: 17.95,
    image:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=400&q=80',
    featured: false,
    bestSeller: false,
  },
];

const cart = new Map();

const selectors = {
  bookGrid: document.querySelector('[data-book-grid]'),
  bookTemplate: document.getElementById('book-card-template'),
  cartTemplate: document.getElementById('cart-item-template'),
  cartContainer: document.querySelector('[data-cart-items]'),
  cartTotal: document.querySelector('[data-cart-total]'),
  cartCount: document.querySelector('[data-cart-count]'),
  cartElement: document.querySelector('[data-cart]'),
  cartOpen: document.querySelector('[data-cart-open]'),
  cartClose: document.querySelectorAll('[data-cart-close]'),
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('[data-search-input]'),
  carouselTrack: document.querySelector('[data-carousel-track]'),
  carouselNext: document.querySelector('[data-carousel-next]'),
  carouselPrev: document.querySelector('[data-carousel-prev]'),
};

const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(value);

const renderBooks = (items) => {
  selectors.bookGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  if (items.length === 0) {
    selectors.bookGrid.innerHTML = '<p class="empty-state">No books matched your search. Try another keyword or explore our categories.</p>';
    return;
  }

  items.forEach((book) => {
    const node = selectors.bookTemplate.content.cloneNode(true);
    node.querySelector('[data-book-title]').textContent = book.title;
    node.querySelector('[data-book-author]').textContent = `by ${book.author}`;
    node.querySelector('[data-book-genre]').textContent = book.genre;
    node.querySelector('[data-book-description]').textContent = book.description;
    node.querySelector('[data-book-price]').textContent = formatCurrency(book.price);
    const image = node.querySelector('[data-book-image]');
    image.src = book.image;
    image.alt = `${book.title} cover art`;
    node.querySelector('[data-add-to-cart]').dataset.bookId = book.id;
    fragment.appendChild(node);
  });

  selectors.bookGrid.appendChild(fragment);
};

const renderCarousel = () => {
  selectors.carouselTrack.innerHTML = '';
  const fragment = document.createDocumentFragment();

  books
    .filter((book) => book.bestSeller)
    .forEach((book) => {
      const slide = document.createElement('article');
      slide.className = 'book-card';
      slide.innerHTML = `
        <div class="book-cover">
          <img src="${book.image}" alt="${book.title} cover art" loading="lazy" />
        </div>
        <div class="book-content">
          <span class="badge">${book.genre}</span>
          <h3>${book.title}</h3>
          <p class="book-author">by ${book.author}</p>
          <div class="book-meta">
            <span class="price">${formatCurrency(book.price)}</span>
            <button class="secondary" type="button" data-add-to-cart data-book-id="${book.id}">Add to Cart</button>
          </div>
        </div>`;
      fragment.appendChild(slide);
    });

  selectors.carouselTrack.appendChild(fragment);
};

const updateCartBadge = () => {
  const totalQuantity = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  selectors.cartCount.textContent = totalQuantity;
};

const updateCartTotal = () => {
  const total = [...cart.values()].reduce((sum, item) => sum + item.quantity * item.price, 0);
  selectors.cartTotal.textContent = formatCurrency(total);
};

const renderCart = () => {
  selectors.cartContainer.innerHTML = '';
  if (cart.size === 0) {
    selectors.cartContainer.innerHTML = '<p class="empty">Your cart is empty. Start adding your next read!</p>';
    updateCartBadge();
    updateCartTotal();
    return;
  }

  const fragment = document.createDocumentFragment();
  cart.forEach((item) => {
    const node = selectors.cartTemplate.content.cloneNode(true);
    node.querySelector('[data-cart-item-title]').textContent = item.title;
    node.querySelector('[data-cart-item-author]').textContent = item.author;
    node.querySelector('[data-cart-item-price]').textContent = formatCurrency(item.price * item.quantity);
    node.querySelector('[data-cart-item-quantity]').textContent = item.quantity;
    const root = node.querySelector('.cart-item');
    root.dataset.bookId = item.id;
    fragment.appendChild(node);
  });

  selectors.cartContainer.appendChild(fragment);
  updateCartBadge();
  updateCartTotal();
};

const addToCart = (bookId) => {
  const book = books.find((item) => item.id === bookId);
  if (!book) return;

  const existing = cart.get(bookId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.set(bookId, { ...book, quantity: 1 });
  }

  renderCart();
  selectors.cartElement.hidden = false;
  selectors.cartElement.querySelector('.cart-panel').focus?.();
};

const changeQuantity = (bookId, delta) => {
  const item = cart.get(bookId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart.delete(bookId);
  }
  renderCart();
};

const handleSearch = (event) => {
  event.preventDefault();
  const query = selectors.searchInput.value.trim().toLowerCase();
  if (!query) {
    renderBooks(books.filter((book) => book.featured));
    return;
  }

  const results = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
  });

  renderBooks(results);
};

const bindEvents = () => {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-add-to-cart]');
    if (!target) return;
    addToCart(target.dataset.bookId);
  });

  selectors.cartContainer.addEventListener('click', (event) => {
    if (event.target.matches('[data-quantity-increase]')) {
      const id = event.target.closest('.cart-item').dataset.bookId;
      changeQuantity(id, 1);
    }

    if (event.target.matches('[data-quantity-decrease]')) {
      const id = event.target.closest('.cart-item').dataset.bookId;
      changeQuantity(id, -1);
    }
  });

  selectors.cartOpen.addEventListener('click', () => {
    selectors.cartElement.hidden = false;
  });

  selectors.cartClose.forEach((button) =>
    button.addEventListener('click', () => {
      selectors.cartElement.hidden = true;
    }),
  );

  selectors.cartElement.addEventListener('click', (event) => {
    if (event.target === selectors.cartElement) {
      selectors.cartElement.hidden = true;
    }
  });

  selectors.searchForm.addEventListener('submit', handleSearch);

  selectors.carouselNext.addEventListener('click', () => {
    selectors.carouselTrack.scrollBy({ left: 240, behavior: 'smooth' });
  });

  selectors.carouselPrev.addEventListener('click', () => {
    selectors.carouselTrack.scrollBy({ left: -240, behavior: 'smooth' });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      selectors.cartElement.hidden = true;
    }
  });
};

const init = () => {
  document.querySelector('[data-current-year]').textContent = new Date().getFullYear();
  renderBooks(books.filter((book) => book.featured));
  renderCarousel();
  renderCart();
  bindEvents();
};

init();
