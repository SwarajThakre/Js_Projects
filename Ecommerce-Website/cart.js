// Render cart items
function renderCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');


  cartItemsContainer.innerHTML = cartItems.length
    ? `
    ${cartItems
      .map(
        (item) => `
      <div class="cart-item">
        <p>${item.name} - $${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${cartItems.indexOf(
          item
        )})">Remove</button>
      </div>
    `
      )
      .join('')}
  `
    : '<p>Your cart is empty.</p>';

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCartItems();
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cartItems.length;
}

// Checkout functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Thank you for your purchase!');
  localStorage.removeItem('cart');
  renderCartItems();
  updateCartCount();
});

// Initialize the cart page
function initCartPage() {
  renderCartItems();
  updateCartCount();
}

// Run the initialization function when the page loads
window.onload = initCartPage;
