const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/400x400/1e293b/fff?text=iPhone+16+Pro", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 25990000, category: "phone", image: "https://placehold.co/400x400/1e293b/fff?text=Galaxy+S24", rating: 4.7, inStock: true },
    { id: 3, name: "MacBook Air M3", price: 27990000, category: "laptop", image: "https://placehold.co/400x400/1e293b/fff?text=MacBook+Air", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 15", price: 42000000, category: "laptop", image: "https://placehold.co/400x400/1e293b/fff?text=Dell+XPS", rating: 4.6, inStock: false },
    { id: 5, name: "iPad Pro M4", price: 25000000, category: "tablet", image: "https://placehold.co/400x400/1e293b/fff?text=iPad+Pro", rating: 4.8, inStock: true },
    { id: 6, name: "Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/400x400/1e293b/fff?text=Galaxy+Tab", rating: 4.5, inStock: true },
    { id: 7, name: "Sony WH-1000XM5", price: 8500000, category: "audio", image: "https://placehold.co/400x400/1e293b/fff?text=Sony+WH-1000XM5", rating: 4.7, inStock: true },
    { id: 8, name: "AirPods Pro 2", price: 6100000, category: "audio", image: "https://placehold.co/400x400/1e293b/fff?text=AirPods+Pro", rating: 4.8, inStock: true },
    { id: 9, name: "Google Pixel 8", price: 18000000, category: "phone", image: "https://placehold.co/400x400/1e293b/fff?text=Pixel+8", rating: 4.4, inStock: true },
    { id: 10, name: "Asus ROG Zephyrus", price: 45000000, category: "laptop", image: "https://placehold.co/400x400/1e293b/fff?text=ROG+Zephyrus", rating: 4.6, inStock: true },
    { id: 11, name: "iPad Air 5", price: 14500000, category: "tablet", image: "https://placehold.co/400x400/1e293b/fff?text=iPad+Air", rating: 4.6, inStock: false },
    { id: 12, name: "Marshall Acton III", price: 7200000, category: "audio", image: "https://placehold.co/400x400/1e293b/fff?text=Marshall+Acton", rating: 4.5, inStock: true }
];

const categories = ["All", "Phone", "Laptop", "Tablet", "Audio"];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const cartBadge = document.getElementById("cartBadge");
const themeToggle = document.getElementById("themeToggle");
const modalOverlay = document.getElementById("modalOverlay");

// State
let cartCount = 0;
let currentCategory = "All";
let currentSearch = "";
let currentSort = "default";

// Initialize App
function init() {
    renderCategories();
    renderProducts(products);
    
    // Listeners
    searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterAndRender();
    });

    sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        filterAndRender();
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// Render Categories
function renderCategories() {
    categoryFilters.innerHTML = "";
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `filter-btn ${cat === currentCategory ? "active" : ""}`;
        btn.textContent = cat;
        btn.addEventListener("click", () => {
            currentCategory = cat;
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterAndRender();
        });
        categoryFilters.appendChild(btn);
    });
}

// Filter and Sort Logic
function filterAndRender() {
    let filtered = products.filter(p => {
        const matchCategory = currentCategory === "All" || p.category.toLowerCase() === currentCategory.toLowerCase();
        const matchSearch = p.name.toLowerCase().includes(currentSearch);
        return matchCategory && matchSearch;
    });

    if (currentSort === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "rating-desc") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

// Format Currency
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// Render Products to Grid
function renderProducts(items) {
    productGrid.innerHTML = "";
    if (items.length === 0) {
        productGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">No products found</div>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-meta">
                    <span>★ ${product.rating}</span>
                    <span class="${product.inStock ? 'in-stock' : 'out-of-stock'}">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="add-cart-btn" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        `;

        // Card Click Event for Modal
        card.addEventListener("click", (e) => {
            if (!e.target.classList.contains("add-cart-btn")) {
                openModal(product);
            }
        });

        // Add to Cart Event
        const cartBtn = card.querySelector(".add-cart-btn");
        cartBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            cartCount++;
            cartBadge.textContent = cartCount;
            cartBadge.style.transform = "translate(20%, -20%) scale(1.2)";
            setTimeout(() => cartBadge.style.transform = "translate(20%, -20%) scale(1)", 200);
        });

        productGrid.appendChild(card);
    });
}

// Modal Logic
function openModal(product) {
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Product Details</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${product.image}" alt="${product.name}" class="modal-img">
                <div class="modal-details">
                    <h3 class="modal-title">${product.name}</h3>
                    <div class="product-meta">
                        <span>Category: ${product.category.toUpperCase()}</span>
                        <span>Rating: ★ ${product.rating}</span>
                    </div>
                    <div class="modal-price">${formatPrice(product.price)}</div>
                    <div>
                        <span class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                            ${product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    <p style="color: #64748b; margin-top: 10px; line-height: 1.5;">
                        Experience the exceptional quality of ${product.name}. Featuring top-tier specs, beautiful design, and outstanding performance for all your daily needs.
                    </p>
                    <button class="add-cart-btn" style="margin-top: auto;" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    `;

    const closeBtn = modalOverlay.querySelector(".close-modal");
    closeBtn.addEventListener("click", closeModal);

    const cartBtn = modalOverlay.querySelector(".add-cart-btn");
    cartBtn.addEventListener("click", () => {
        cartCount++;
        cartBadge.textContent = cartCount;
        closeModal();
    });

    modalOverlay.classList.add("active");
}

function closeModal() {
    modalOverlay.classList.remove("active");
}

// Run
init();
