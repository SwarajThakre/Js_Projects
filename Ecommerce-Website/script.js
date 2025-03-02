// Fetch product data from JSON file
async function fetchProducts() {
  const response = await fetch('data/product-data.json');
  return response.json();
}

// Render products dynamically
function renderProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; 

  const fragment = document.createDocumentFragment();
  products.forEach(({ image, name, price }) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p>$${price.toFixed(2)}</p>
      <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
    `;
    fragment.appendChild(productElement);
  });
  productList.appendChild(fragment);
}

// Add to cart functionality
function addToCart(productName, price) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push({ name: productName, price });
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartCount();
  alert(`${productName} added to cart!`);
}

// Update cart count
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cartItems.length;
}

// Initialize the page
async function init() {
  const products = await fetchProducts();
  renderProducts(products);
  updateCartCount();
}

// Run the initialization function when the page loads
window.onload = init;
