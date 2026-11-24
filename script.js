// ===========================
// PRODUCT DATA
// ===========================

const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        category: "Clothing",
        price: 850,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Running Sneakers",
        category: "Shoes",
        price: 3200,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Stylish Backpack",
        category: "Accessories",
        price: 1800,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 4500,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Smart Watch",
        category: "Electronics",
        price: 5500,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Casual Hoodie",
        category: "Clothing",
        price: 2200,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Leather Handbag",
        category: "Accessories",
        price: 2800,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Casual Sneakers",
        category: "Shoes",
        price: 2900,
        image: "https://images.unsplash.com/photo-1495555961986-6d5a0a1f5b2f?auto=format&fit=crop&w=600&q=80"
    }
];

// ===========================
// VARIABLES
// ===========================

let cart = [];
let activeCategory = "All";

// ===========================
// DISPLAY PRODUCTS
// ===========================

function displayProducts(list) {
    const productGrid = document.getElementById("product-grid");

    productGrid.innerHTML = "";

    if (list.length === 0) {
        productGrid.innerHTML =
            `<p class="no-products">No products found.</p>`;
        return;
    }

    list.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}"
                     onerror="this.src='https://placehold.co/600x400?text=Product'">

                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString()} ETB</p>

                    <button class="add-btn" onclick="addToCart(${product.id})">
                        Add to Cart 🛒
                    </button>
                </div>
            </div>
        `;
    });
}

// ===========================
// CATEGORY FILTER
// ===========================

function filterCategory(category, button) {
    activeCategory = category;

    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    searchProducts();
}

// ===========================
// SEARCH PRODUCTS
// ===========================

function searchProducts() {
    const searchValue = document
        .getElementById("search-input")
        .value
        .toLowerCase();

    let filteredProducts = products;

    // Filter by category
    if (activeCategory !== "All") {
        filteredProducts = filteredProducts.filter(product =>
            product.category === activeCategory
        );
    }

    // Filter by search text
    filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);
}

// ===========================
// ADD TO CART
// ===========================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// ===========================
// CHANGE QUANTITY
// ===========================

function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();
}

// ===========================
// REMOVE ITEM
// ===========================

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// ===========================
// UPDATE CART
// ===========================

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    // Total quantity
    const totalQuantity = cart.reduce((sum, item) =>
        sum + item.quantity, 0
    );

    cartCount.textContent = totalQuantity;

    // Total price
    const totalPrice = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0
    );

    cartTotal.textContent = totalPrice.toLocaleString();

    // Empty cart
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">Your cart is empty 🛒</p>
        `;
        return;
    }

    // Display cart items
    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} ETB</p>

                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>

                    <button class="remove-btn"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });
}

// ===========================
// OPEN / CLOSE CART
// ===========================

function toggleCart() {
    document.getElementById("cart-overlay").classList.toggle("show");
}

function closeCartOutside(event) {
    if (event.target.id === "cart-overlay") {
        toggleCart();
    }
}

// ===========================
// CHECKOUT
// ===========================

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0
    );

    alert(
        "Thank you for shopping at Nova Store!\n" +
        "Your total is " + total.toLocaleString() + " ETB.\n\n" +
        "This is a demo checkout. No real payment was made."
    );

    cart = [];
    updateCart();
    toggleCart();
}

// ===========================
// INITIALIZE WEBSITE
// ===========================

displayProducts(products);
updateCart();