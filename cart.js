// Cart Logic
const cart = [];
const cartButton = document.getElementById('cart-button');
const cartElement = document.getElementById('cart');
const closeCartButton = document.getElementById('close-cart');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout');

// Toggle Cart
cartButton.addEventListener('click', () => {
    cartElement.classList.toggle('active');
});

closeCartButton.addEventListener('click', () => {
    cartElement.classList.remove('active');
});

// Add to Cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Remove from Cart
function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCart();
}

// Update Cart
function updateCart() {
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsElement.appendChild(div);
    });

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Checkout
checkoutButton.addEventListener('click', () => {
    alert(`Proceeding to checkout with a total of $${getCartTotal().toFixed(2)}`);
});

// Calculate Total
function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
