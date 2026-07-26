import { filterProducts } from './productFilters.js';

const products = [
  {
    id: 1,
    name: 'Galaxy A55 5G',
    category: 'Smartphones',
    price: 28999,
    originalPrice: 32999,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    desc: '6.6-inch AMOLED • 50MP triple camera • 5000mAh battery',
    badge: 'Best Seller',
    brand: 'Samsung',
    specs: ['5G', 'Camera', 'Battery']
  },
  {
    id: 2,
    name: 'iPhone 14 Plus',
    category: 'Smartphones',
    price: 79999,
    originalPrice: 89999,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80',
    desc: 'Large display • A15 Bionic • Advanced camera system',
    badge: 'New Launch',
    brand: 'Apple',
    specs: ['5G', 'Camera']
  },
  {
    id: 3,
    name: 'Noise Buds VS104',
    category: 'Accessories',
    price: 1499,
    originalPrice: 2299,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
    desc: '40H playback • ENC mic • Quick pairing',
    badge: 'Hot Deal',
    brand: 'Noise',
    specs: ['Battery', 'Fast charging']
  },
  {
    id: 4,
    name: 'Samsung Tab S9',
    category: 'Tablets',
    price: 54999,
    originalPrice: 62999,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    desc: 'Dynamic AMOLED • S Pen included • Premium productivity',
    badge: 'Top Rated',
    brand: 'Samsung',
    specs: ['Camera', 'Battery']
  },
  {
    id: 5,
    name: 'Sony Bravia 55"',
    category: 'Smart TVs',
    price: 49999,
    originalPrice: 58999,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    desc: '4K HDR • Google TV • Dolby Atmos',
    badge: 'Limited Stock',
    brand: 'Sony',
    specs: ['5G', 'Battery']
  },
  {
    id: 6,
    name: 'Anker 65W Charger',
    category: 'Accessories',
    price: 2499,
    originalPrice: 2999,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    desc: 'Fast charging • Compact design • Universal compatibility',
    badge: 'Fast Shipping',
    brand: 'Anker',
    specs: ['Fast charging', 'Battery']
  }
];

const state = {
  currentCategory: 'All',
  sortBy: 'featured',
  searchTerm: '',
  cart: JSON.parse(localStorage.getItem('ss-mobile-cart') || '[]'),
  maxPrice: 100000,
  selectedBrand: 'All',
  selectedSpecs: []
};

const productGrid = document.getElementById('productGrid');
const categoryFilters = document.getElementById('categoryFilters');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const cartToggle = document.getElementById('cartToggle');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const checkoutForm = document.getElementById('checkoutForm');
const filterToggle = document.getElementById('filterToggle');
const filterDrawer = document.getElementById('filterDrawer');
const filterOverlay = document.getElementById('filterOverlay');
const closeFilter = document.getElementById('closeFilter');
const maxPriceInput = document.getElementById('maxPriceInput');
const maxPriceValue = document.getElementById('maxPriceValue');
const brandSelect = document.getElementById('brandSelect');
const specFilters = Array.from(document.querySelectorAll('.spec-filter'));
const applyFilters = document.getElementById('applyFilters');
const resetFilters = document.getElementById('resetFilters');
const accountSheet = document.getElementById('accountSheet');
const accountOverlay = document.getElementById('accountOverlay');
const closeAccount = document.getElementById('closeAccount');
const topbar = document.getElementById('topbar');
const hero360Button = document.getElementById('hero360Button');
const view360Modal = document.getElementById('view360Modal');
const view360Overlay = document.getElementById('view360Overlay');
const close360View = document.getElementById('close360View');
const view360Image = document.getElementById('view360Image');
const view360Title = document.getElementById('view360Title');
const view360Counter = document.getElementById('view360Counter');
const prev360 = document.getElementById('prev360');
const next360 = document.getElementById('next360');
let current360Frames = [];
let current360Index = 0;
let current360Product = null;

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function saveCart() {
  localStorage.setItem('ss-mobile-cart', JSON.stringify(state.cart));
}

function renderCategories() {
  const categories = ['All', ...new Set(products.map((product) => product.category))];
  categoryFilters.innerHTML = categories
    .map((category) => {
      const active = state.currentCategory === category ? 'active' : '';
      return `<button class="filter-btn ${active}" data-category="${category}">${category}</button>`;
    })
    .join('');
}

function syncFilterUI() {
  maxPriceInput.value = state.maxPrice;
  maxPriceValue.textContent = formatPrice(state.maxPrice);
  brandSelect.value = state.selectedBrand;
  specFilters.forEach((checkbox) => {
    checkbox.checked = state.selectedSpecs.includes(checkbox.value);
  });
}

function getFilteredProducts() {
  return filterProducts(products, state);
}

function renderProducts() {
  const filtered = getFilteredProducts();
  if (!filtered.length) {
    productGrid.innerHTML = '<div class="empty-state">No products match your search. Try a different keyword.</div>';
    return;
  }

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-body">
            <div class="product-meta">${product.badge} • ${product.rating}★</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="product-footer">
              <div class="price-box">
                <strong>${formatPrice(product.price)}</strong>
                <span>${formatPrice(product.originalPrice)}</span>
              </div>
            </div>
            <div class="product-actions">
              <button class="btn btn-secondary view-360" data-id="${product.id}">360 View</button>
              <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to cart</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function updateCartCount() {
  const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function renderCart() {
  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="empty-state">Your cart is empty. Add some devices to get started.</div>';
    subtotalEl.textContent = formatPrice(0);
    totalEl.textContent = formatPrice(0);
    return;
  }

  cartItems.innerHTML = state.cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      if (!product) return '';
      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" />
          <div class="cart-item-body">
            <strong>${product.name}</strong>
            <div>${formatPrice(product.price)}</div>
            <div class="qty-controls">
              <button data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">${formatPrice(product.price * item.quantity)}</div>
          </div>
        </div>
      `;
    })
    .join('');

  const subtotal = state.cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  subtotalEl.textContent = formatPrice(subtotal);
  totalEl.textContent = formatPrice(subtotal);
}

function closeAllPanels() {
  cartDrawer.classList.add('hidden');
  cartOverlay.classList.add('hidden');
  filterDrawer.classList.add('hidden');
  filterOverlay.classList.add('hidden');
  accountSheet.classList.add('hidden');
  accountOverlay.classList.add('hidden');
  view360Modal.classList.add('hidden');
  view360Overlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
}

function toggleCart(open) {
  if (open) {
    closeAllPanels();
    cartDrawer.classList.remove('hidden');
    cartOverlay.classList.remove('hidden');
    document.body.classList.add('body-drawer-open');
    return;
  }

  cartDrawer.classList.add('hidden');
  cartOverlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
}

function openFilterDrawer() {
  closeAllPanels();
  filterDrawer.classList.remove('hidden');
  filterOverlay.classList.remove('hidden');
  document.body.classList.add('body-drawer-open');
}

function openAccountSheet() {
  closeAllPanels();
  accountSheet.classList.remove('hidden');
  accountOverlay.classList.remove('hidden');
  document.body.classList.add('body-drawer-open');
}

function build360Frames(product) {
  return Array.from({ length: 6 }, (_, idx) => {
    const glow = ['#2563eb', '#1d4ed8', '#0f172a'][idx % 3];
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640">
        <rect width="480" height="640" rx="34" fill="#eef4ff" />
        <rect x="110" y="80" width="260" height="480" rx="44" fill="${glow}" />
        <rect x="142" y="122" width="196" height="396" rx="30" fill="#f8fbff" />
        <circle cx="240" cy="170" r="42" fill="#dbeafe" />
        <rect x="148" y="260" width="184" height="130" rx="18" fill="#eff6ff" />
        <text x="240" y="325" text-anchor="middle" font-family="Inter, Arial" font-size="24" fill="#1d4ed8">${product.name}</text>
        <text x="240" y="360" text-anchor="middle" font-family="Inter, Arial" font-size="16" fill="#475569">360° preview</text>
        <rect x="160" y="420" width="160" height="20" rx="10" fill="#bfdbfe" />
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  });
}

function update360View() {
  if (!current360Product) return;
  view360Image.src = current360Frames[current360Index];
  view360Title.textContent = `${current360Product.name} • 360°`;
  view360Counter.textContent = `Frame ${current360Index + 1} / ${current360Frames.length}`;
}

function open360View(productId) {
  const product = products.find((entry) => entry.id === productId);
  if (!product) return;
  current360Product = product;
  current360Frames = build360Frames(product);
  current360Index = 0;
  update360View();
  closeAllPanels();
  view360Modal.classList.remove('hidden');
  view360Overlay.classList.remove('hidden');
  document.body.classList.add('body-drawer-open');
}

function addToCart(productId) {
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  renderCart();
  toggleCart(true);
}

function updateQuantity(productId, delta) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }
  saveCart();
  updateCartCount();
  renderCart();
}

categoryFilters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  state.currentCategory = button.dataset.category;
  renderCategories();
  renderProducts();
});

sortSelect.addEventListener('change', (event) => {
  state.sortBy = event.target.value;
  renderProducts();
});

searchInput.addEventListener('input', (event) => {
  state.searchTerm = event.target.value;
  renderProducts();
});

cartToggle.addEventListener('click', () => toggleCart(true));
closeCart.addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', () => toggleCart(false));

filterToggle.addEventListener('click', openFilterDrawer);
closeFilter.addEventListener('click', () => {
  filterDrawer.classList.add('hidden');
  filterOverlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
});
filterOverlay.addEventListener('click', () => {
  filterDrawer.classList.add('hidden');
  filterOverlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
});

maxPriceInput.addEventListener('input', (event) => {
  state.maxPrice = Number(event.target.value);
  maxPriceValue.textContent = formatPrice(state.maxPrice);
});

brandSelect.addEventListener('change', (event) => {
  state.selectedBrand = event.target.value;
});

specFilters.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    state.selectedSpecs = specFilters.filter((entry) => entry.checked).map((entry) => entry.value);
  });
});

applyFilters.addEventListener('click', () => {
  renderProducts();
  filterDrawer.classList.add('hidden');
  filterOverlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
});

resetFilters.addEventListener('click', () => {
  state.maxPrice = 100000;
  state.selectedBrand = 'All';
  state.selectedSpecs = [];
  syncFilterUI();
  renderProducts();
});

accountOverlay.addEventListener('click', () => {
  accountSheet.classList.add('hidden');
  accountOverlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
});
closeAccount.addEventListener('click', () => {
  accountSheet.classList.add('hidden');
  accountOverlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
});

view360Overlay.addEventListener('click', () => {
  view360Modal.classList.add('hidden');
  view360Overlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
});
close360View.addEventListener('click', () => {
  view360Modal.classList.add('hidden');
  view360Overlay.classList.add('hidden');
  document.body.classList.remove('body-drawer-open');
});

prev360.addEventListener('click', () => {
  current360Index = (current360Index - 1 + current360Frames.length) % current360Frames.length;
  update360View();
});

next360.addEventListener('click', () => {
  current360Index = (current360Index + 1) % current360Frames.length;
  update360View();
});

productGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('.add-to-cart');
  if (addButton) {
    addToCart(Number(addButton.dataset.id));
    return;
  }

  const viewButton = event.target.closest('.view-360');
  if (viewButton) {
    open360View(Number(viewButton.dataset.id));
  }
});

cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  if (action === 'increase') updateQuantity(id, 1);
  if (action === 'decrease') updateQuantity(id, -1);
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const customerName = document.getElementById('customerName').value.trim();
  const customerEmail = document.getElementById('customerEmail').value.trim();
  const customerPhone = document.getElementById('customerPhone').value.trim();

  if (!state.cart.length) {
    alert('Your cart is empty.');
    return;
  }

  const successMessage = `Thanks ${customerName}! Your order has been placed successfully. We will send a confirmation to ${customerEmail} and call you at ${customerPhone} shortly.`;
  cartItems.innerHTML = `<div class="order-success">${successMessage}</div>`;
  subtotalEl.textContent = formatPrice(0);
  totalEl.textContent = formatPrice(0);
  state.cart = [];
  saveCart();
  updateCartCount();
  checkoutForm.reset();
});

window.addEventListener('scroll', () => {
  topbar.classList.toggle('compact', window.scrollY > 90);
});

hero360Button.addEventListener('click', () => open360View(1));

const bottomNavButtons = document.querySelectorAll('.bottom-nav button');
bottomNavButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (action === 'search') {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (action === 'cart') {
      toggleCart(true);
    }
    if (action === 'account') {
      openAccountSheet();
    }
  });
});

// ==============================
// Chatbot Logic - SS Mobile Bot
// ==============================
const chatBubble = document.getElementById('chatBubble');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const quickReplies = document.getElementById('quickReplies');

const botResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
    response: `Hello! Welcome to SS Mobile. How can I help you today? You can ask me about: Products, Store info, Offers, or Help.`
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'thanks', 'thank you'],
    response: `You're welcome! Feel free to come back anytime. Have a great day!`
  },
  {
    keywords: ['product', 'phone', 'smartphone', 'mobile', 'galaxy', 'iphone', 'accessories', 'tablet', 'tv', 'bravia'],
    response: `We have a great selection! Here are our product categories: Smartphones - Galaxy A55 5G (Rs 28,999), iPhone 14 Plus (Rs 79,999), Accessories - Noise Buds VS104 (Rs 1,499), Anker 65W Charger (Rs 2,499), Tablets - Samsung Tab S9 (Rs 54,999), Smart TVs - Sony Bravia 55" (Rs 49,999). You can browse all products in the Shop section above!`
  },
  {
    keywords: ['price', 'cost', 'how much', 'rate', 'pricing', 'budget'],
    response: `Here's a quick price overview: Galaxy A55 5G - Rs 28,999 (was Rs 32,999), iPhone 14 Plus - Rs 79,999 (was Rs 89,999), Noise Buds VS104 - Rs 1,499 (was Rs 2,299), Samsung Tab S9 - Rs 54,999 (was Rs 62,999), Sony Bravia 55" - Rs 49,999 (was Rs 58,999), Anker 65W Charger - Rs 2,499 (was Rs 2,999). All prices include applicable discounts!`
  },
  {
    keywords: ['address', 'location', 'store', 'shop location', 'where'],
    response: `SS Mobile Official Store: GP Tower, Main Road, Deglur, Maharashtra 431717. We have 500+ outlets nationwide!`
  },
  {
    keywords: ['hours', 'timing', 'open', 'time', 'when'],
    response: `Store Hours: Monday to Sunday, 10:00 AM to 10:00 PM. We're open all 7 days a week!`
  },
  {
    keywords: ['contact', 'phone', 'call', 'number', 'reach'],
    response: `Call us at: 089565 67534. Or simply place an order online and we'll call you back!`
  },
  {
    keywords: ['offer', 'deal', 'discount', 'sale', 'festival', 'exchange', 'emi'],
    response: `Festival Offers are Live! Up to 30% OFF on select accessories, Free delivery on orders above Rs 999, Easy EMI options available on all phones and TVs, Exchange offers - trade in your old device. Head to the Deals section to claim your offer!`
  },
  {
    keywords: ['delivery', 'shipping', 'ship', 'dispatch', 'courier'],
    response: `Delivery Information: Same-day delivery available in Deglur city, Free shipping on orders above Rs 999, Fast and secure packaging, Track your order easily!`
  },
  {
    keywords: ['help', 'support', 'assist', 'guide', 'how to', 'navigate'],
    response: `How can I assist you? You can browse products in the Shop section, Filter by category or sort by price, Search for any product using the search bar, Add items to cart and place an order, Check out Deals for festival offers. Or just ask me anything!`
  }
];

const quickReplyOptions = [
  { text: 'Products', keywords: 'products' },
  { text: 'Prices', keywords: 'price' },
  { text: 'Offers', keywords: 'offer' },
  { text: 'Address', keywords: 'address' },
  { text: 'Hours', keywords: 'hours' },
  { text: 'Contact', keywords: 'contact' },
  { text: 'Delivery', keywords: 'delivery' },
  { text: 'Help', keywords: 'help' }
];

function renderQuickReplies() {
  quickReplies.innerHTML = quickReplyOptions
    .map((opt) => `<button class="quick-reply-btn" data-keywords="${opt.keywords}">${opt.text}</button>`)
    .join('');
}

function scrollChatToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = '<span>🤖</span><div class="typing-indicator"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(div);
  scrollChatToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function addBotMessage(html) {
  removeTypingIndicator();
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `<span>🤖</span><div>${html}</div>`;
  chatMessages.appendChild(div);
  scrollChatToBottom();
}

function addUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `<span>🧑</span><div>${text}</div>`;
  chatMessages.appendChild(div);
  scrollChatToBottom();
}

function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  for (const entry of botResponses) {
    for (const keyword of entry.keywords) {
      if (msg.includes(keyword)) {
        return entry.response;
      }
    }
  }
  const nameMatch = msg.match(/my name is (\w+)/i) || msg.match(/i'm (\w+)/i) || msg.match(/i am (\w+)/i);
  const phoneMatch = msg.match(/(\d{10})/);
  const emailMatch = msg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (nameMatch || phoneMatch || emailMatch) {
    let collected = [];
    if (nameMatch) collected.push('Name: ' + nameMatch[1]);
    if (phoneMatch) collected.push('Phone: ' + phoneMatch[1]);
    if (emailMatch) collected.push('Email: ' + emailMatch[0]);
    return 'Thank you! I have noted your details. Our team will get back to you shortly. Is there anything else I can help with?';
  }
  return 'I am not sure I understand that. Try asking about Products, Prices, Offers, Store, or feel free to leave your name, phone, or email and we will contact you!';
}

function handleUserMessage(message) {
  const trimmed = message.trim();
  if (!trimmed) return;
  addUserMessage(trimmed);
  chatInput.value = '';
  addTypingIndicator();
  setTimeout(() => {
    const response = getBotResponse(trimmed);
    addBotMessage(response);
  }, 800 + Math.random() * 600);
}

quickReplies.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-keywords]');
  if (!btn) return;
  handleUserMessage(btn.dataset.keywords);
});

sendChat.addEventListener('click', () => {
  handleUserMessage(chatInput.value);
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleUserMessage(chatInput.value);
  }
});

chatBubble.addEventListener('click', () => {
  chatWindow.classList.toggle('hidden');
  if (!chatWindow.classList.contains('hidden')) {
    chatInput.focus();
    scrollChatToBottom();
  }
});

closeChat.addEventListener('click', () => {
  chatWindow.classList.add('hidden');
});

syncFilterUI();
renderQuickReplies();
renderCategories();
renderProducts();
updateCartCount();
renderCart();
