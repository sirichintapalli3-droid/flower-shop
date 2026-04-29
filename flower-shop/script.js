// Product Data - PINK THEME
const products = [
  { 
    id: 1, 
    name: "Blush Pink Rose Bouquet", 
    price: 45.99, 
    category: "roses",
    img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&auto=format&fit=crop",
    desc: "12 premium blush pink roses hand-tied with silk ribbon. Perfect for anniversaries and romantic gestures. Stays fresh for 7-10 days with proper care.",
    features: ["12 Premium Roses", "Silk Ribbon Wrap", "Free Greeting Card", "7-10 Days Freshness"]
  },
  { 
    id: 2, 
    name: "Pink Peony Dreams", 
    price: 59.99, 
    category: "peonies",
    img: "https://images.unsplash.com/photo-1574684891174-df6b02ab38d7?w=500&auto=format&fit=crop",
    desc: "Lush pink peonies with eucalyptus. Seasonal luxury bouquet that symbolizes prosperity and romance. Limited stock during peony season.",
    features: ["5 Large Peonies", "Fresh Eucalyptus", "Premium Vase Included", "Seasonal Special"]
  },
  { 
    id: 3, 
    name: "Baby Pink Tulips", 
    price: 39.99, 
    category: "tulips",
    img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500&auto=format&fit=crop",
    desc: "15 stems of delicate baby pink tulips. Represents perfect love and new beginnings. Brightens any room instantly.",
    features: ["15 Fresh Tulips", "Eco-Friendly Wrap", "Care Instructions", "5-7 Days Life"]
  },
  { 
    id: 4, 
    name: "Pink Carnation Charm", 
    price: 35.99, 
    category: "carnations",
    img: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&auto=format&fit=crop",
    desc: "Mixed pink carnations with baby's breath. Long-lasting and fragrant. Perfect budget-friendly gift that looks luxurious.",
    features: ["20 Carnations", "Baby's Breath Filler", "Lasts 2+ Weeks", "Light Fragrance"]
  },
  { 
    id: 5, 
    name: "Rosy Romance Mix", 
    price: 52.99, 
    category: "roses",
    img: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=500&auto=format&fit=crop",
    desc: "Designer mix of roses, lilies and alstroemeria in pink shades. Our bestseller for proposals and Valentine's Day.",
    features: ["Mixed Premium Flowers", "Designer Arrangement", "Luxury Box", "10-12 Days Fresh"]
  },
  { 
    id: 6, 
    name: "Hot Pink Gerbera", 
    price: 42.99, 
    category: "gerbera",
    img: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=500&auto=format&fit=crop",
    desc: "Vibrant hot pink gerberas with green fillers. Cheerful and energetic - perfect to celebrate achievements and birthdays.",
    features: ["10 Gerberas", "Cheerful Vibe", "Sturdy Stems", "7-9 Days Life"]
  }
];

const testimonials = [
  { name: "Priya S.", text: "The pink roses were stunning! My mom cried happy tears.", rating: 5 },
  { name: "Rahul M.", text: "Perfect pink bouquet for our anniversary. She said YES again!", rating: 5 },
  { name: "Ananya K.", text: "Fast delivery and the flowers were so fresh and pink!", rating: 5 }
];

// Cart & Wishlist State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const cartIcon = document.getElementById('cartIcon');
const wishlistIcon = document.getElementById('wishlistIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const navbar = document.getElementById('navbar');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
// Render Products with Like Button

// Render Products with Filter
function renderProducts(filter = 'all') {
  let filteredProducts = products;
  
  if (filter === 'under50') {
    filteredProducts = products.filter(p => p.price < 50);
  } else if (filter !== 'all') {
    filteredProducts = products.filter(p => p.category === filter);
  }
  
  productGrid.innerHTML = filteredProducts.map(product => {
    const isLiked = wishlist.includes(product.id);
    return `
      <div class="product-card reveal">
        <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${product.id}, this)">
          <i class="fa${isLiked ? 's' : 'r'} fa-heart"></i>
        </button>
        <div class="product-img" onclick="openModal(${product.id})" style="cursor:pointer;">
          <img loading="lazy" src="${product.img}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 onclick="openModal(${product.id})" style="cursor:pointer;">${product.name}</h3>
          <div class="price">$${product.price}</div>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  }).join('');
  
  // Show count
  const countDiv = document.querySelector('.product-count');
  if (!countDiv) {
    productGrid.insertAdjacentHTML('beforebegin', `<p class="product-count">Showing ${filteredProducts.length} products</p>`);
  } else {
    countDiv.textContent = `Showing ${filteredProducts.length} products`;
  }
  
  // Re-trigger reveal animation
  setTimeout(reveal, 100);
}

// Filter Products
function filterProducts(category) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  renderProducts(category);
}
// Like/Wishlist Functions
function toggleLike(id, btn) {
  const index = wishlist.indexOf(id);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    btn.classList.remove('liked');
    btn.innerHTML = '<i class="far fa-heart"></i>';
  } else {
    wishlist.push(id);
    btn.classList.add('liked');
    btn.innerHTML = '<i class="fas fa-heart"></i>';
  }
  
  updateWishlist();
}

function updateWishlist() {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  wishlistCount.textContent = wishlist.length;
}

// Cart Functions
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  updateCart();
  showCart();
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price} x ${item.qty}</p>
        <button onclick="removeFromCart(${item.id})" style="background:var(--pink-dark);color:white;border:none;padding:4px 8px;border-radius:5px;cursor:pointer;">Remove</button>
      </div>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function showCart() {
  cartSidebar.classList.add('active');
  overlay.classList.add('active');
}

function hideCart() {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
}

// Testimonials Slider
let currentSlide = 0;
function renderTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.getElementById('sliderDots');
  
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial">
      <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
      <p>"${t.text}"</p>
      <h4>- ${t.name}</h4>
    </div>
  `).join('');
  
  dots.innerHTML = testimonials.map((_, i) => 
    `<div class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>`
  ).join('');
}

function goToSlide(n) {
  currentSlide = n;
  const track = document.getElementById('testimonialTrack');
  track.style.transform = `translateX(-${n * 100}%)`;
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === n);
  });
}

function autoSlide() {
  currentSlide = (currentSlide + 1) % testimonials.length;
  goToSlide(currentSlide);
}

// Scroll Reveal
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

// Event Listeners
cartIcon.addEventListener('click', showCart);
closeCart.addEventListener('click', hideCart);
overlay.addEventListener('click', hideCart);

wishlistIcon.addEventListener('click', () => {
  const likedProducts = products.filter(p => wishlist.includes(p.id));
  if (likedProducts.length === 0) {
    alert('Your wishlist is empty 💕');
  } else {
    alert(`You liked ${likedProducts.length} items:\n${likedProducts.map(p => p.name).join('\n')}`);
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

themeToggle.addEventListener('click', () => {
  const theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = theme;
  themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  reveal();
});

document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Welcome to the Pink Club! 🌸');
  e.target.reset();
});

document.getElementById('chatBtn').addEventListener('click', () => {
  alert('Chat feature coming soon! For pink emergencies, call +91 98765 43210 💕');
});

// Product Modal Functions
const modal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
let currentQty = 1;

function openModal(id) {
  const product = products.find(p => p.id === id);
  currentQty = 1;
  
  modalBody.innerHTML = `
    <div class="modal-img">
      <img src="${product.img}" alt="${product.name}">
    </div>
    <div class="modal-info">
      <h2>${product.name}</h2>
      <div class="modal-price">$${product.price}</div>
      <p class="modal-desc">${product.desc}</p>
      <ul class="modal-features">
        ${product.features.map(f => `<li><i class="fas fa-check-circle"></i>${f}</li>`).join('')}
      </ul>
      <div class="qty-selector">
        <span style="color:var(--text-light);">Quantity:</span>
        <button class="qty-btn" onclick="changeQty(-1)">-</button>
        <span class="qty-value" id="qtyValue">1</span>
        <button class="qty-btn" onclick="changeQty(1)">+</button>
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="addToCartFromModal(${product.id})">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
        <button class="btn btn-secondary" onclick="buyNow(${product.id})">
          Buy Now
        </button>
      </div>
    </div>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qtyValue').textContent = currentQty;
}

function addToCartFromModal(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  
  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({ ...product, qty: currentQty });
  }
  
  updateCart();
  closeModalFunc();
  showCart();
}

function buyNow(id) {
  addToCartFromModal(id);
  alert('Redirecting to checkout... 💕');
}

closeModal.addEventListener('click', closeModalFunc);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModalFunc();
});
// Checkout Functions
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty! Add some flowers first 🌸');
    return;
  }
  
  // Fill order summary
  const checkoutItems = document.getElementById('checkoutItems');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  checkoutItems.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <span>${item.name} x ${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('');
  
  document.getElementById('checkoutTotal').textContent = total.toFixed(2);
  document.getElementById('finalTotal').textContent = total.toFixed(2);
  
  hideCart();
  checkoutModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeCheckout.addEventListener('click', () => {
  checkoutModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

checkoutModal.addEventListener('click', (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(checkoutForm);
  const paymentMethod = formData.get('payment');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  // Success message
  alert(`Order Placed Successfully! 🌸\n\nTotal: $${total.toFixed(2)}\nPayment: ${paymentMethod.toUpperCase()}\n\nWe'll deliver your flowers soon!`);
  
  // Clear cart
  cart = [];
  updateCart();
  checkoutForm.reset();
  checkoutModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});
// Init
renderProducts();
renderTestimonials();
updateCart();
updateWishlist();
reveal();
setInterval(autoSlide, 5000);