// Flipkart Clone - Interactive Application Logic & Cool Animations

// --- Audio Synthesizer (Native Web Audio API - Zero dependencies) ---
class SoundEffects {
  constructor() {
    this.enabled = localStorage.getItem('fk_sound_enabled') !== 'false';
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('fk_sound_enabled', this.enabled);
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playCartAdd() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.12, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.12);
    });
  }

  playWishlist() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.15, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.35);
    });
  }
}

const sfx = new SoundEffects();

// --- Product Catalog (High Resolution, Authentic Details) ---
const PRODUCTS = [
  {
    id: 1,
    title: 'Apple iPhone 15 Pro (128 GB, Natural Titanium)',
    category: 'Mobiles',
    price: 127990,
    originalPrice: 134900,
    rating: 4.7,
    ratingCount: 14280,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: 'Bestseller',
    badge: 'Deal of the Day',
    dealTime: 7200,
    features: ['A17 Pro Chip', 'Action Button', 'Titanium Design', '48MP Camera'],
    stock: 5,
    colors: ['#8f8a84', '#3b3d40', '#e3e4e6'],
    deliveryDays: 'Tomorrow, by 11 PM'
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)',
    category: 'Mobiles',
    price: 119999,
    originalPrice: 134999,
    rating: 4.8,
    ratingCount: 9840,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: 'Galaxy AI',
    badge: 'Lightning Deal',
    dealTime: 5400,
    features: ['Galaxy AI', 'S-Pen Included', '200MP Quad Camera', 'Snapdragon 8 Gen 3'],
    stock: 8,
    colors: ['#4b4e54', '#f1efe9', '#634b35'],
    deliveryDays: '2 Days, Free Delivery'
  },
  {
    id: 3,
    title: 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones',
    category: 'Electronics',
    price: 26990,
    originalPrice: 34990,
    rating: 4.6,
    ratingCount: 6320,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: 'Top Rated',
    badge: 'Special Price',
    features: ['Industry Leading ANC', '30 Hr Battery', 'Multi-point Connection', 'Hi-Res Audio'],
    stock: 12,
    colors: ['#1c1c1c', '#cfcdc9'],
    deliveryDays: 'Tomorrow, by 2 PM'
  },
  {
    id: 4,
    title: 'Apple MacBook Air M3 (13.6-inch, 8GB Unified, 256GB SSD, Midnight)',
    category: 'Electronics',
    price: 104990,
    originalPrice: 114900,
    rating: 4.9,
    ratingCount: 4180,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: 'Super Saver',
    badge: 'Deal of the Day',
    dealTime: 9600,
    features: ['Apple M3 Chip', 'Liquid Retina Display', 'Up to 18 hrs Battery', 'MagSafe 3'],
    stock: 4,
    colors: ['#1e2530', '#c7c8ca', '#e3dacf'],
    deliveryDays: 'Free Express Delivery'
  },
  {
    id: 5,
    title: 'Nike Air Max 270 React Running Sneakers',
    category: 'Fashion',
    price: 8495,
    originalPrice: 13995,
    rating: 4.4,
    ratingCount: 3120,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: '39% Off',
    badge: 'Trending',
    features: ['Air Max Cushioning', 'Breathable Mesh', 'Lightweight Foam Sole'],
    stock: 15,
    colors: ['#ff2a2a', '#111111', '#0044ff'],
    deliveryDays: '3 Days Delivery'
  },
  {
    id: 6,
    title: 'Nothing Phone (2a) 5G (Black, 128 GB, 8 GB RAM)',
    category: 'Mobiles',
    price: 23999,
    originalPrice: 25999,
    rating: 4.5,
    ratingCount: 18450,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: 'Glyph Interface',
    badge: 'Hot Seller',
    features: ['Dimensity 7200 Pro', 'Iconic Glyph Lights', '120Hz AMOLED', '50MP OIS'],
    stock: 7,
    colors: ['#111111', '#ffffff'],
    deliveryDays: 'Tomorrow, by 7 PM'
  },
  {
    id: 7,
    title: 'Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV',
    category: 'Appliances',
    price: 54990,
    originalPrice: 99900,
    rating: 4.7,
    ratingCount: 8900,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: '45% Off',
    badge: 'Big Billion Deal',
    dealTime: 12400,
    features: ['4K X-Reality PRO', 'Dolby Atmos Audio', 'Google TV OS', 'Motionflow XR'],
    stock: 3,
    colors: ['#111111'],
    deliveryDays: 'Schedule Delivery at Checkout'
  },
  {
    id: 8,
    title: 'Fossil Gen 6 Smartwatch with AMOLED Display & Heart Rate Sensor',
    category: 'Electronics',
    price: 11995,
    originalPrice: 23995,
    rating: 4.2,
    ratingCount: 2840,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    assured: false,
    tag: '50% Off',
    badge: 'Limited Stock',
    features: ['Wear OS by Google', 'SpO2 & Heart Rate', 'Fast Charging 80% in 30min'],
    stock: 6,
    colors: ['#997950', '#2b2b2b'],
    deliveryDays: '2 Days Delivery'
  },
  {
    id: 9,
    title: 'Dyson V8 Absolute Cordless Vacuum Cleaner',
    category: 'Home & Kitchen',
    price: 29900,
    originalPrice: 43900,
    rating: 4.6,
    ratingCount: 1540,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: 'Premium Choice',
    badge: 'Exchange Available',
    features: ['Dyson Digital Motor V8', 'Whole-machine filtration', 'Up to 40 mins runtime'],
    stock: 9,
    colors: ['#ff8800', '#5500aa'],
    deliveryDays: 'Tomorrow, by 4 PM'
  },
  {
    id: 10,
    title: 'Ray-Ban Wayfarer Polarized Sunglasses (Matte Black)',
    category: 'Fashion',
    price: 7490,
    originalPrice: 10590,
    rating: 4.5,
    ratingCount: 4210,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: 'Classic',
    badge: 'Top Pick',
    features: ['100% UV Protection', 'Scratch Resistant', 'Iconic Polarized Lenses'],
    stock: 20,
    colors: ['#000000', '#4a2e18'],
    deliveryDays: 'Tomorrow, by 12 PM'
  },
  {
    id: 11,
    title: 'Philips Air Fryer HD9252/90 with Rapid Air Technology',
    category: 'Appliances',
    price: 6999,
    originalPrice: 12995,
    rating: 4.5,
    ratingCount: 7850,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: '46% Off',
    badge: 'Lightning Deal',
    dealTime: 3600,
    features: ['90% Less Fat', '7 Preset Menus', 'Keep Warm Function', 'Dishwasher Safe'],
    stock: 14,
    colors: ['#1e1e1e'],
    deliveryDays: 'Tomorrow, by 6 PM'
  },
  {
    id: 12,
    title: 'Minimalist 10% Niacinamide Face Serum with Zinc (30ml)',
    category: 'Beauty',
    price: 569,
    originalPrice: 599,
    rating: 4.4,
    ratingCount: 22400,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    assured: true,
    tag: 'Best for Acne',
    badge: 'Flipkart Choice',
    features: ['Reduces Blemishes', 'Balances Sebum', 'Fragrance-Free', 'Dermatologist Tested'],
    stock: 50,
    colors: ['#ffffff'],
    deliveryDays: 'Tomorrow, by 10 AM'
  }
];

// App State
const state = {
  user: JSON.parse(localStorage.getItem('fk_logged_user') || 'null'),
  cart: JSON.parse(localStorage.getItem('fk_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('fk_wishlist') || '[]'),
  superCoins: parseInt(localStorage.getItem('fk_supercoins') || '250', 10),
  activeCategory: 'All',
  searchQuery: '',
  priceRange: 150000,
  minRating: 0,
  sortBy: 'featured',
  onlyAssured: false,
  selectedProduct: null,
  appliedCoupon: null,
  useCoinsDiscount: false
};

// Helper: Format Currency (INR)
function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

// User Navigation & Authentication Header
function renderUserNav() {
  const container = document.getElementById('user-nav-container');
  if (!container) return;

  if (!state.user) {
    container.innerHTML = `
      <div class="relative group">
        <a href="login.html" class="px-5 py-2 bg-white text-blue-600 font-extrabold text-xs sm:text-sm rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-1.5 transition active:scale-95">
          <span>Login</span>
          <i class="fa-solid fa-chevron-down text-[9px] text-gray-400 group-hover:rotate-180 transition-transform"></i>
        </a>
        
        <!-- Hover Dropdown -->
        <div class="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 hidden group-hover:block z-50">
          <div class="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span class="text-xs font-bold text-gray-700 dark:text-gray-300">New customer?</span>
            <a href="login.html" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Sign Up</a>
          </div>
          <a href="login.html" class="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition">
            <i class="fa-regular fa-user text-blue-600"></i> My Profile
          </a>
          <a href="login.html" class="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition">
            <i class="fa-solid fa-box text-blue-600"></i> Orders
          </a>
          <a href="login.html" class="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition">
            <i class="fa-regular fa-heart text-red-500"></i> Wishlist
          </a>
          <a href="login.html" class="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition">
            <i class="fa-solid fa-coins text-yellow-500"></i> SuperCoin Zone
          </a>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="relative group">
        <button class="flex items-center gap-2 bg-blue-700/80 dark:bg-gray-800 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold border border-blue-500/40 dark:border-gray-700 transition shadow-sm active:scale-95">
          <div class="w-6 h-6 rounded-full bg-yellow-400 text-gray-950 font-black text-[10px] flex items-center justify-center shadow-sm">
            ${state.user.avatar || 'FK'}
          </div>
          <span class="max-w-[100px] truncate">${state.user.name.split(' ')[0]}</span>
          <i class="fa-solid fa-chevron-down text-[9px] text-blue-200 group-hover:rotate-180 transition-transform"></i>
        </button>

        <!-- Profile Dropdown Menu -->
        <div class="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 hidden group-hover:block z-50">
          <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-blue-50/60 dark:bg-gray-700/50">
            <p class="text-xs font-bold text-gray-900 dark:text-white">${state.user.name}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">${state.user.identifier}</p>
            <span class="inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-600">
              <i class="fa-solid fa-crown text-[9px]"></i> ${state.user.tier || 'Flipkart VIP Member'}
            </span>
          </div>

          <a href="#" onclick="showToast('Your Flipkart profile is active and verified.', 'info', 'fa-user'); return false;" class="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition">
            <i class="fa-regular fa-user text-blue-600"></i> My Profile
          </a>
          <a href="#" onclick="showToast('All your past orders are delivered on time.', 'info', 'fa-box'); return false;" class="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition">
            <i class="fa-solid fa-box text-blue-600"></i> Orders
          </a>
          <a href="#" onclick="showToast('SuperCoins Rewards Balance: ' + state.superCoins, 'info', 'fa-coins'); return false;" class="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition">
            <i class="fa-solid fa-coins text-yellow-500"></i> SuperCoin Zone (${state.superCoins})
          </a>
          <a href="login.html" class="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition">
            <i class="fa-solid fa-arrow-up-right-from-square text-blue-600"></i> Open Dedicated Login Page
          </a>

          <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>

          <button onclick="logoutUser()" class="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-bold transition text-left">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    `;
  }
}

function logoutUser() {
  state.user = null;
  localStorage.removeItem('fk_logged_user');
  sfx.playClick();
  showToast('Logged out of Flipkart successfully.', 'warning', 'fa-arrow-right-from-bracket');
  renderUserNav();
}

// Save LocalStorage
function persistState() {
  localStorage.setItem('fk_cart', JSON.stringify(state.cart));
  localStorage.setItem('fk_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('fk_supercoins', state.superCoins.toString());
}

// Toast Notifications
function showToast(message, type = 'info', icon = 'fa-circle-info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgStyles = {
    info: 'bg-blue-600 text-white',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-600 text-white',
    error: 'bg-red-600 text-white'
  }[type] || 'bg-neutral-800 text-white';

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl ${bgStyles} toast-enter text-sm font-medium z-50 mb-2 border border-white/10`;
  toast.innerHTML = `
    <i class="fa-solid ${icon} text-lg"></i>
    <span class="flex-1">${message}</span>
    <button class="text-white/70 hover:text-white ml-2 text-xs" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// --- Fly-to-Cart Cool Animation ---
function animateFlyToCart(sourceImgEl) {
  const cartBtn = document.getElementById('cart-btn');
  if (!cartBtn) return;

  let startRect;
  if (sourceImgEl) {
    startRect = sourceImgEl.getBoundingClientRect();
  } else {
    startRect = { top: window.innerHeight / 2, left: window.innerWidth / 2, width: 80, height: 80 };
  }

  const endRect = cartBtn.getBoundingClientRect();

  const ghost = document.createElement('img');
  ghost.src = sourceImgEl ? sourceImgEl.src : PRODUCTS[0].image;
  ghost.className = 'flying-product-ghost';
  ghost.style.top = `${startRect.top}px`;
  ghost.style.left = `${startRect.left}px`;
  ghost.style.width = `${Math.min(startRect.width, 100)}px`;
  ghost.style.height = `${Math.min(startRect.height, 100)}px`;
  ghost.style.opacity = '1';

  document.body.appendChild(ghost);

  // Trigger curve flight on next animation frame
  requestAnimationFrame(() => {
    ghost.style.top = `${endRect.top + endRect.height / 4}px`;
    ghost.style.left = `${endRect.left + endRect.width / 4}px`;
    ghost.style.width = '24px';
    ghost.style.height = '24px';
    ghost.style.opacity = '0.3';
    ghost.style.transform = 'scale(0.3) rotate(360deg)';
  });

  setTimeout(() => {
    ghost.remove();
    cartBtn.classList.remove('cart-wobble');
    void cartBtn.offsetWidth; // retrigger reflow
    cartBtn.classList.add('cart-wobble');
    sfx.playCartAdd();
  }, 750);
}

// Add to Cart
function addToCart(productId, event = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let imgEl = null;
  if (event && event.currentTarget) {
    const card = event.currentTarget.closest('.product-card') || document.getElementById('quickview-modal');
    if (card) {
      imgEl = card.querySelector('img');
    }
  }

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      assured: product.assured
    });
  }

  persistState();
  updateCartBadge();
  animateFlyToCart(imgEl);
  showToast(`Added "${product.title.slice(0, 24)}..." to your cart!`, 'success', 'fa-cart-shopping');
  renderCartDrawer();
}

// Toggle Wishlist
function toggleWishlist(productId, btnEl = null) {
  const index = state.wishlist.indexOf(productId);
  const isAdded = index === -1;

  if (isAdded) {
    state.wishlist.push(productId);
    sfx.playWishlist();
    showToast('Saved to your Wishlist!', 'info', 'fa-heart');
  } else {
    state.wishlist.splice(index, 1);
    sfx.playClick();
    showToast('Removed from Wishlist', 'warning', 'fa-heart-crack');
  }

  persistState();
  updateWishlistBadge();

  if (btnEl) {
    btnEl.classList.remove('heart-pop');
    void btnEl.offsetWidth;
    btnEl.classList.add('heart-pop');
    const heartIcon = btnEl.querySelector('i');
    if (heartIcon) {
      heartIcon.className = isAdded ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-gray-400';
    }
  }
}

// Update Badges
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  }
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-badge');
  const count = state.wishlist.length;
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  }
}

function updateSuperCoinsDisplay() {
  const el = document.getElementById('supercoins-count');
  if (el) {
    el.textContent = state.superCoins;
  }
}

// Render Products Grid
function renderProducts() {
  const container = document.getElementById('products-grid');
  const countIndicator = document.getElementById('results-count');
  if (!container) return;

  let filtered = PRODUCTS.filter(p => {
    const matchCat = state.activeCategory === 'All' || p.category === state.activeCategory;
    const matchSearch = p.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchPrice = p.price <= state.priceRange;
    const matchRating = p.rating >= state.minRating;
    const matchAssured = !state.onlyAssured || p.assured;
    return matchCat && matchSearch && matchPrice && matchRating && matchAssured;
  });

  // Sorting
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'discount') {
    filtered.sort((a, b) => {
      const discA = ((a.originalPrice - a.price) / a.originalPrice);
      const discB = ((b.originalPrice - b.price) / b.originalPrice);
      return discB - discA;
    });
  }

  if (countIndicator) {
    countIndicator.textContent = `Showing ${filtered.length} products`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-24 h-24 mx-auto mb-4 bg-blue-50 dark:bg-gray-800 text-blue-500 rounded-full flex items-center justify-center text-4xl">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">No matching products found</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-sm mx-auto">Try resetting filters or searching with different keywords like "phone", "apple", "headphones".</p>
        <button onclick="resetFilters()" class="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return `
      <div class="product-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between group relative" data-id="${product.id}">
        <!-- Top Tags & Wishlist -->
        <div class="p-4 pb-0 flex items-start justify-between z-10">
          <div>
            ${product.badge ? `
              <span class="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                product.badge.includes('Deal') || product.badge.includes('Lightning')
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              }">
                <i class="fa-solid fa-bolt text-[9px]"></i> ${product.badge}
              </span>
            ` : ''}
          </div>
          <button onclick="toggleWishlist(${product.id}, this); event.stopPropagation();" 
                  class="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700/80 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center transition-transform active:scale-90"
                  title="Save to Wishlist">
            <i class="${isWishlisted ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-gray-400 dark:text-gray-300'} text-base"></i>
          </button>
        </div>

        <!-- Product Image with Zoom on hover -->
        <div class="px-6 py-3 flex items-center justify-center cursor-pointer overflow-hidden" onclick="openProductModal(${product.id})">
          <img src="${product.image}" alt="${product.title}" 
               class="h-48 w-full object-contain transform transition-transform duration-500 group-hover:scale-108"
               loading="lazy" />
        </div>

        <!-- Details -->
        <div class="p-4 pt-2 flex flex-col flex-1 justify-between">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                ${product.rating} <i class="fa-solid fa-star text-[9px]"></i>
              </span>
              <span class="text-xs text-gray-400">(${product.ratingCount.toLocaleString()})</span>
              ${product.assured ? `
                <div class="ml-auto shimmer-badge flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                  <span class="text-[10px] font-black italic text-blue-700 dark:text-blue-300">f-Assured</span>
                  <i class="fa-solid fa-certificate text-[9px] text-yellow-500"></i>
                </div>
              ` : ''}
            </div>

            <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
                onclick="openProductModal(${product.id})">
              ${product.title}
            </h3>

            <!-- Key Feature Bullets -->
            <ul class="mt-2 space-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
              ${product.features.slice(0, 2).map(f => `<li class="flex items-center gap-1.5"><i class="fa-solid fa-check text-[9px] text-green-600"></i> ${f}</li>`).join('')}
            </ul>
          </div>

          <!-- Price & Action CTA -->
          <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="text-lg font-bold text-gray-900 dark:text-white">${formatINR(product.price)}</span>
                <span class="text-xs text-gray-400 line-through">${formatINR(product.originalPrice)}</span>
              </div>
              <span class="text-xs font-semibold text-green-600 dark:text-green-400">${discount}% off</span>
            </div>

            <div class="flex items-center gap-1.5">
              <button onclick="openProductModal(${product.id}); event.stopPropagation();"
                      class="px-2.5 py-1.5 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 rounded-lg font-medium transition"
                      title="Quick View">
                <i class="fa-regular fa-eye"></i>
              </button>
              <button onclick="addToCart(${product.id}, event); event.stopPropagation();"
                      class="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-gray-900 font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all">
                <i class="fa-solid fa-cart-plus text-xs"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Open Product Quick View Modal
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.selectedProduct = product;
  sfx.playClick();

  const modal = document.getElementById('quickview-modal');
  const modalContent = document.getElementById('quickview-content');
  if (!modal || !modalContent) return;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isWishlisted = state.wishlist.includes(product.id);

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <!-- Image Gallery Preview -->
      <div class="flex flex-col items-center">
        <div class="relative w-full h-80 rounded-2xl bg-gray-50 dark:bg-gray-800/80 p-4 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700">
          <img id="modal-main-img" src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110" />
          ${product.assured ? `
            <div class="absolute top-4 left-4 shimmer-badge px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-bold flex items-center gap-1 shadow-md">
              <i class="fa-solid fa-shield-halved text-yellow-300"></i> Flipkart Assured
            </div>
          ` : ''}
          <div class="absolute top-4 right-4">
            <button onclick="toggleWishlist(${product.id}, this)" class="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center hover:scale-110 transition">
              <i class="${isWishlisted ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-gray-400'} text-lg"></i>
            </button>
          </div>
        </div>

        <!-- Color Options preview -->
        ${product.colors ? `
          <div class="flex items-center gap-3 mt-4">
            <span class="text-xs font-medium text-gray-500">Color Options:</span>
            <div class="flex gap-2">
              ${product.colors.map((c, i) => `
                <button class="w-6 h-6 rounded-full border-2 border-white shadow-sm ring-2 ${i === 0 ? 'ring-blue-500' : 'ring-transparent'} hover:scale-110 transition" style="background-color: ${c}"></button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Details Section -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
              ${product.rating} <i class="fa-solid fa-star text-[10px]"></i>
            </span>
            <span class="text-xs text-gray-500 font-medium">${product.ratingCount.toLocaleString()} Ratings & Reviews</span>
            <span class="text-xs text-emerald-600 font-semibold ml-auto"><i class="fa-solid fa-truck-fast"></i> ${product.deliveryDays}</span>
          </div>

          <h2 class="text-xl font-bold text-gray-900 dark:text-white leading-snug">${product.title}</h2>

          <!-- Price & Discounts -->
          <div class="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700">
            <div class="flex items-baseline gap-3">
              <span class="text-3xl font-extrabold text-gray-900 dark:text-white">${formatINR(product.price)}</span>
              <span class="text-base text-gray-400 line-through">${formatINR(product.originalPrice)}</span>
              <span class="text-base font-bold text-green-600 dark:text-green-400">${discount}% OFF</span>
            </div>
            <p class="text-xs text-gray-500 mt-1"><i class="fa-solid fa-coins text-yellow-500"></i> Earn <strong>${Math.floor(product.price * 0.005)} SuperCoins</strong> on this purchase!</p>
          </div>

          <!-- Bank Offers -->
          <div class="mt-4 space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Available Offers</h4>
            <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1.5">
              <div class="flex items-start gap-2">
                <i class="fa-solid fa-tag text-green-600 mt-0.5"></i>
                <span><strong>Bank Offer:</strong> 10% instant discount on HDFC Bank Credit Card EMI up to ₹1,500</span>
              </div>
              <div class="flex items-start gap-2">
                <i class="fa-solid fa-tag text-green-600 mt-0.5"></i>
                <span><strong>Special Price:</strong> Get extra ₹2,000 off (price inclusive of cashback)</span>
              </div>
              <div class="flex items-start gap-2">
                <i class="fa-solid fa-shield-cat text-blue-600 mt-0.5"></i>
                <span><strong>Warranty:</strong> 1 Year Comprehensive Brand Replacement Warranty</span>
              </div>
            </div>
          </div>

          <!-- Pincode Checker -->
          <div class="mt-4">
            <label class="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">Check Delivery Pincode:</label>
            <div class="flex gap-2">
              <input id="pincode-input" type="text" placeholder="Enter 6-digit Pincode" maxlength="6" 
                     class="px-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48" />
              <button onclick="checkPincode()" class="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition">
                Check
              </button>
            </div>
            <div id="pincode-result" class="text-xs font-medium text-emerald-600 mt-1 hidden">
              <i class="fa-solid fa-circle-check"></i> Delivery available in 24 hours! COD eligible.
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button onclick="addToCart(${product.id}, event); closeProductModal();" 
                  class="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 active:scale-98 text-gray-900 font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition">
            <i class="fa-solid fa-cart-shopping"></i> ADD TO CART
          </button>
          <button onclick="buyNow(${product.id})" 
                  class="flex-1 py-3 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition">
            <i class="fa-solid fa-bolt"></i> BUY NOW
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function checkPincode() {
  const input = document.getElementById('pincode-input');
  const res = document.getElementById('pincode-result');
  if (!input || !res) return;
  if (input.value.length === 6 && /^\d+$/.test(input.value)) {
    res.classList.remove('hidden');
    sfx.playClick();
  } else {
    showToast('Please enter a valid 6-digit Pincode', 'warning');
  }
}

function buyNow(productId) {
  closeProductModal();
  addToCart(productId);
  openCartDrawer();
}

// --- Cart Drawer Management ---
function openCartDrawer() {
  sfx.playClick();
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
  }
}

function closeCartDrawer() {
  sfx.playClick();
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
    showToast('Item removed from cart', 'warning');
  } else {
    sfx.playClick();
  }

  persistState();
  updateCartBadge();
  renderCartDrawer();
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const summaryContainer = document.getElementById('cart-summary-container');
  if (!container || !summaryContainer) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-3xl text-gray-400">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <p class="font-bold text-gray-800 dark:text-gray-200">Your Flipkart Cart is Empty!</p>
        <p class="text-xs text-gray-400 mt-1">Explore our deals and add items to your cart.</p>
        <button onclick="closeCartDrawer()" class="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow transition">
          Shop Now
        </button>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  container.innerHTML = state.cart.map(item => `
    <div class="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 transition hover:border-blue-200">
      <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain rounded-lg bg-white p-1" />
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h4 class="font-semibold text-xs text-gray-900 dark:text-white line-clamp-2">${item.title}</h4>
          <div class="flex items-baseline gap-2 mt-1">
            <span class="font-bold text-sm text-gray-900 dark:text-white">${formatINR(item.price * item.quantity)}</span>
            <span class="text-xs text-gray-400 line-through">${formatINR(item.originalPrice * item.quantity)}</span>
          </div>
        </div>

        <div class="flex items-center justify-between mt-2">
          <!-- Quantity Control -->
          <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-700">
            <button onclick="updateCartQuantity(${item.id}, -1)" class="w-7 h-7 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 font-bold active:scale-95 transition">-</button>
            <span class="w-8 text-center text-xs font-bold text-gray-800 dark:text-white">${item.quantity}</span>
            <button onclick="updateCartQuantity(${item.id}, 1)" class="w-7 h-7 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 font-bold active:scale-95 transition">+</button>
          </div>

          <button onclick="updateCartQuantity(${item.id}, -${item.quantity})" class="text-xs text-red-500 hover:text-red-700 font-medium">
            <i class="fa-regular fa-trash-can"></i> Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Cart Price Calculation
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOriginal = state.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const totalSavings = totalOriginal - subtotal;

  let coinDiscount = 0;
  if (state.useCoinsDiscount && state.superCoins > 0) {
    coinDiscount = Math.min(state.superCoins, Math.floor(subtotal * 0.1));
  }

  let promoDiscount = 0;
  if (state.appliedCoupon === 'BIGBILLION') {
    promoDiscount = 500;
  } else if (state.appliedCoupon === 'FLIPKART50') {
    promoDiscount = Math.floor(subtotal * 0.05);
  }

  const finalTotal = Math.max(0, subtotal - coinDiscount - promoDiscount);

  summaryContainer.innerHTML = `
    <!-- SuperCoin Redemption Toggle -->
    <div class="p-3 mb-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-coins text-yellow-500 text-lg coin-spin"></i>
        <div>
          <p class="text-xs font-bold text-gray-900 dark:text-yellow-200">Use Flipkart SuperCoins</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400">Balance: ${state.superCoins} coins</p>
        </div>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" ${state.useCoinsDiscount ? 'checked' : ''} onchange="toggleSuperCoinsDiscount(this.checked)" class="sr-only peer">
        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
      </label>
    </div>

    <!-- Promo Code Input -->
    <div class="flex gap-2 mb-4">
      <input id="coupon-code-input" type="text" placeholder="Try 'BIGBILLION' or 'FLIPKART50'" value="${state.appliedCoupon || ''}"
             class="flex-1 uppercase px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
      <button onclick="applyCoupon()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition">
        Apply
      </button>
    </div>

    <!-- Summary Details -->
    <div class="space-y-2 text-xs border-t border-gray-200 dark:border-gray-700 pt-3">
      <div class="flex justify-between text-gray-600 dark:text-gray-300">
        <span>Price (${state.cart.length} items)</span>
        <span>${formatINR(totalOriginal)}</span>
      </div>
      <div class="flex justify-between text-green-600 font-medium">
        <span>Discount</span>
        <span>- ${formatINR(totalSavings)}</span>
      </div>
      ${coinDiscount > 0 ? `
        <div class="flex justify-between text-yellow-600 dark:text-yellow-400 font-medium">
          <span>SuperCoin Savings</span>
          <span>- ${formatINR(coinDiscount)}</span>
        </div>
      ` : ''}
      ${promoDiscount > 0 ? `
        <div class="flex justify-between text-green-600 font-medium">
          <span>Coupon "${state.appliedCoupon}"</span>
          <span>- ${formatINR(promoDiscount)}</span>
        </div>
      ` : ''}
      <div class="flex justify-between text-gray-600 dark:text-gray-300">
        <span>Delivery Charges</span>
        <span class="text-green-600 font-bold uppercase">Free</span>
      </div>
      <div class="flex justify-between text-sm font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2">
        <span>Total Amount</span>
        <span>${formatINR(finalTotal)}</span>
      </div>
    </div>

    <div class="mt-4">
      <button onclick="startCheckoutProcess(${finalTotal})" 
              class="w-full py-3.5 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition pulse-deal">
        <i class="fa-solid fa-lock"></i> PLACE ORDER (${formatINR(finalTotal)})
      </button>
      <p class="text-[11px] text-center text-gray-400 mt-2">
        <i class="fa-solid fa-shield-halved text-green-500"></i> Safe & Secure Payments. 100% Authentic products.
      </p>
    </div>
  `;
}

function toggleSuperCoinsDiscount(checked) {
  state.useCoinsDiscount = checked;
  sfx.playClick();
  renderCartDrawer();
}

function applyCoupon() {
  const input = document.getElementById('coupon-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'BIGBILLION' || code === 'FLIPKART50') {
    state.appliedCoupon = code;
    sfx.playSuccess();
    showToast(`Coupon "${code}" applied successfully!`, 'success');
  } else if (code === '') {
    state.appliedCoupon = null;
    showToast('Coupon removed', 'info');
  } else {
    sfx.playClick();
    showToast('Invalid coupon code. Try BIGBILLION or FLIPKART50', 'error');
  }
  renderCartDrawer();
}

// --- Checkout Simulation with Confetti ---
function startCheckoutProcess(amount) {
  closeCartDrawer();
  sfx.playClick();

  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutAmount = document.getElementById('checkout-total-amount');
  const customerNameEl = document.getElementById('checkout-customer-name');
  if (checkoutModal) {
    if (checkoutAmount) checkoutAmount.textContent = formatINR(amount);
    if (customerNameEl && state.user) {
      customerNameEl.innerHTML = `${state.user.name} <span class="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] px-1.5 py-0.5 rounded ml-1 font-bold">VERIFIED</span>`;
    }
    checkoutModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function confirmOrderPlacement() {
  sfx.playSuccess();

  const placeBtn = document.getElementById('confirm-order-btn');
  if (placeBtn) {
    placeBtn.disabled = true;
    placeBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Placing Order...`;
  }

  setTimeout(() => {
    // Confetti Explosion
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1 }
        });
      }, 250);
    }

    // Award SuperCoins
    const earnedCoins = Math.floor(Math.random() * 50) + 25;
    state.superCoins += earnedCoins;
    state.cart = [];
    state.appliedCoupon = null;
    state.useCoinsDiscount = false;
    persistState();
    updateCartBadge();
    updateSuperCoinsDisplay();

    closeCheckoutModal();

    // Show Order Success Screen Modal
    openOrderSuccessModal(earnedCoins);
  }, 1200);
}

function openOrderSuccessModal(earnedCoins) {
  const modal = document.getElementById('order-success-modal');
  const coinsText = document.getElementById('earned-coins-text');
  const orderIdText = document.getElementById('success-order-id');

  if (modal) {
    if (coinsText) coinsText.textContent = `+${earnedCoins} SuperCoins Earned!`;
    if (orderIdText) orderIdText.textContent = `OD${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    modal.classList.remove('hidden');
  }
}

function closeOrderSuccessModal() {
  const modal = document.getElementById('order-success-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// --- Live Deals Countdown Timer ---
function initDealTimers() {
  let secondsRemaining = 5 * 3600 + 42 * 60 + 18; // 5 hours 42 mins 18 secs

  setInterval(() => {
    secondsRemaining--;
    if (secondsRemaining < 0) secondsRemaining = 86400;

    const hrs = String(Math.floor(secondsRemaining / 3600)).padStart(2, '0');
    const mins = String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, '0');
    const secs = String(secondsRemaining % 60).padStart(2, '0');

    const hEl = document.getElementById('timer-hours');
    const mEl = document.getElementById('timer-mins');
    const sEl = document.getElementById('timer-secs');

    if (hEl) hEl.textContent = hrs;
    if (mEl) mEl.textContent = mins;
    if (sEl) sEl.textContent = secs;
  }, 1000);
}

// --- Hero Banner Carousel ---
let currentSlide = 0;
const slides = [
  {
    tag: 'FLIPKART BIG BILLION DAYS',
    title: 'Flagship Smartphone Bonanza',
    desc: 'Up to 40% Off on Apple, Samsung & Google Pixel. Extra ₹3,000 Exchange Bonus.',
    bg: 'from-blue-600 via-indigo-700 to-blue-900',
    img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    cta: 'Explore Flagships',
    category: 'Mobiles'
  },
  {
    tag: 'ELECTRONICS MELA',
    title: 'Noise Cancelling & Premium Audio',
    desc: 'Immersive sound experience with Sony, Bose & AirPods. Grab No Cost EMI.',
    bg: 'from-purple-700 via-indigo-800 to-blue-950',
    img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    cta: 'Shop Audio Deals',
    category: 'Electronics'
  },
  {
    tag: 'HOME & APPLIANCES EXTRAVAGANZA',
    title: 'Transform Your Smart Living',
    desc: '4K Ultra HD TVs, Inverter Air Conditioners & Air Fryers at Wholesale Prices.',
    bg: 'from-cyan-700 via-blue-800 to-slate-900',
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    cta: 'View Appliances',
    category: 'Appliances'
  }
];

function setupHeroSlider() {
  const container = document.getElementById('hero-slide-content');
  const dotsContainer = document.getElementById('hero-slider-dots');
  if (!container) return;

  function renderSlide(idx) {
    const s = slides[idx];
    container.className = `w-full min-h-[300px] md:min-h-[340px] rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between text-white bg-gradient-to-r ${s.bg} shadow-xl transition-all duration-700 relative overflow-hidden`;

    container.innerHTML = `
      <div class="relative z-10 max-w-xl">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-gray-950 font-black text-xs uppercase tracking-wider rounded-full shadow-sm">
          <i class="fa-solid fa-bolt"></i> ${s.tag}
        </span>
        <h1 class="text-2xl md:text-4xl font-extrabold mt-3 leading-tight tracking-tight">${s.title}</h1>
        <p class="text-sm md:text-base text-blue-100 mt-2 font-medium">${s.desc}</p>
        <div class="mt-6 flex items-center gap-4">
          <button onclick="selectCategory('${s.category}')" class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold text-sm rounded-xl shadow-lg hover:shadow-yellow-400/20 active:scale-95 transition-all flex items-center gap-2">
            ${s.cta} <i class="fa-solid fa-arrow-right text-xs"></i>
          </button>
          <span class="text-xs text-blue-200"><i class="fa-solid fa-shield-check"></i> 100% Genuine</span>
        </div>
      </div>
      <div class="relative z-10 mt-6 md:mt-0 flex-shrink-0 animate-float">
        <img src="${s.img}" alt="${s.title}" class="w-56 h-56 md:w-64 md:h-64 object-contain filter drop-shadow-2xl" />
      </div>
      <!-- Background decorative glow circles -->
      <div class="absolute -right-10 -bottom-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -top-20 w-60 h-60 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>
    `;

    if (dotsContainer) {
      dotsContainer.innerHTML = slides.map((_, i) => `
        <button onclick="goToSlide(${i})" class="w-2.5 h-2.5 rounded-full transition-all ${i === idx ? 'w-8 bg-yellow-400' : 'bg-white/40 hover:bg-white/70'}"></button>
      `).join('');
    }
  }

  window.goToSlide = function(idx) {
    currentSlide = idx;
    renderSlide(currentSlide);
  };

  window.nextSlide = function() {
    currentSlide = (currentSlide + 1) % slides.length;
    renderSlide(currentSlide);
  };

  window.prevSlide = function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    renderSlide(currentSlide);
  };

  renderSlide(0);
  setInterval(() => {
    nextSlide();
  }, 6000);
}

// Category filter selection
function selectCategory(cat) {
  state.activeCategory = cat;
  sfx.playClick();

  // Update pills
  document.querySelectorAll('.category-item-btn').forEach(btn => {
    const isMatch = btn.dataset.category === cat;
    btn.classList.toggle('border-blue-600', isMatch);
    btn.classList.toggle('text-blue-600', isMatch);
    btn.classList.toggle('font-bold', isMatch);
  });

  renderProducts();

  // Scroll smoothly to products grid
  const grid = document.getElementById('products-section');
  if (grid) {
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function resetFilters() {
  state.activeCategory = 'All';
  state.searchQuery = '';
  state.priceRange = 150000;
  state.minRating = 0;
  state.sortBy = 'featured';
  state.onlyAssured = false;

  const searchInput = document.getElementById('nav-search-input');
  if (searchInput) searchInput.value = '';

  const priceInput = document.getElementById('filter-price-slider');
  if (priceInput) priceInput.value = 150000;

  const priceVal = document.getElementById('filter-price-val');
  if (priceVal) priceVal.textContent = formatINR(150000);

  selectCategory('All');
}

// Dark / Light Theme Toggle
function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const isDark = localStorage.getItem('fk_theme') === 'dark' || 
                 (!('fk_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sfx.playClick();
      const currentDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('fk_theme', currentDark ? 'dark' : 'light');
    });
  }
}

// Sound FX Toggle Button
function setupSoundToggle() {
  const btn = document.getElementById('sound-toggle-btn');
  if (!btn) return;

  function updateIcon() {
    btn.innerHTML = sfx.enabled 
      ? '<i class="fa-solid fa-volume-high text-yellow-300"></i>' 
      : '<i class="fa-solid fa-volume-xmark text-gray-400"></i>';
    btn.title = sfx.enabled ? 'Sound Effects: On' : 'Sound Effects: Muted';
  }

  updateIcon();
  btn.addEventListener('click', () => {
    const enabled = sfx.toggle();
    if (enabled) sfx.playWishlist();
    updateIcon();
    showToast(enabled ? 'Sound effects enabled' : 'Sound effects muted', 'info');
  });
}

// Search & Typing Autocomplete simulation
function setupSearch() {
  const input = document.getElementById('nav-search-input');
  if (!input) return;

  const placeholders = [
    'Search for Mobiles, Electronics, Fashion & more...',
    'Search for "Apple iPhone 15 Pro"...',
    'Search for "Sony WH-1000XM5"...',
    'Search for "Nike Air Max sneakers"...',
    'Search for "Samsung Galaxy S24 Ultra"...'
  ];

  let pIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (document.activeElement === input || input.value.length > 0) {
      setTimeout(typeEffect, 1000);
      return;
    }

    const currentText = placeholders[pIndex];
    if (isDeleting) {
      input.placeholder = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      input.placeholder = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentText.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      pIndex = (pIndex + 1) % placeholders.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  input.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });
}

// Initialize Everything when DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupSoundToggle();
  setupSearch();
  setupHeroSlider();
  initDealTimers();
  updateCartBadge();
  updateWishlistBadge();
  updateSuperCoinsDisplay();
  renderUserNav();
  renderProducts();

  // Price slider listener
  const slider = document.getElementById('filter-price-slider');
  const priceDisplay = document.getElementById('filter-price-val');
  if (slider && priceDisplay) {
    slider.addEventListener('input', (e) => {
      state.priceRange = parseInt(e.target.value, 10);
      priceDisplay.textContent = formatINR(state.priceRange);
      renderProducts();
    });
  }

  // Assured toggle listener
  const assuredCheck = document.getElementById('filter-assured');
  if (assuredCheck) {
    assuredCheck.addEventListener('change', (e) => {
      state.onlyAssured = e.target.checked;
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }
});
