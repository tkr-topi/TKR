// Cart functionality
let cart = [];
let cartCount = 0;
const DELIVERY_CHARGE = 30;
let orderCounter = 1000; // Starting order number

// Add item to cart
function addToOrder(itemName, itemPrice) {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === itemName);
    
    if (existingItemIndex !== -1) {
        // Increment quantity if item exists
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    
    // Update cart count
    cartCount += 1;
    document.getElementById('cartCount').textContent = cartCount;
    
    // Show confirmation
    showToast(`${itemName} added to cart!`);
}

// Show order modal with cart items
function showOrderModal() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal" id="orderModal">
            <div class="modal-content">
                <span class="close" onclick="closeOrderModal()">&times;</span>
                <div class="order-header">
                    <h2><i class="fas fa-shopping-cart"></i> Your Order</h2>
                    <div class="order-number">Order #${orderCounter}</div>
                </div>
                <div class="order-items">
                    ${generateOrderItemsHTML()}
                </div>
                <div class="order-summary">
                    <div class="order-subtotal">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal()} Pkr</span>
                    </div>
                    <div class="order-delivery">
                        <span>Delivery Fee:</span>
                        <span>${DELIVERY_CHARGE} Pkr</span>
                    </div>
                    <div class="order-total">
                        <strong>Total:</strong>
                        <strong>${calculateTotal()} Pkr</strong>
                    </div>
                </div>
                <button class="btn btn-whatsapp" onclick="confirmOrder()">
                    <i class="fab fa-whatsapp"></i> Confirm via WhatsApp
                </button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    document.getElementById('orderModal').style.display = 'block';
}

// Generate HTML for order items
function generateOrderItemsHTML() {
    return cart.map(item => `
        <div class="order-item">
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">x${item.quantity}</span>
            </div>
            <span class="item-price">${item.price * item.quantity} Pkr</span>
        </div>
    `).join('');
}

// Calculate subtotal (without delivery)
function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate total order amount (with delivery)
function calculateTotal() {
    return calculateSubtotal() + DELIVERY_CHARGE;
}

// Close order modal
function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
        modal.remove();
    }
}

// Confirm order and send via WhatsApp
function confirmOrder() {
    const phone = "+923416040120";
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    // Increment order counter for next order
    orderCounter++;
    
    // Clear cart after order
    cart = [];
    cartCount = 0;
    document.getElementById('cartCount').textContent = cartCount;
    
    // Close modal and open WhatsApp
    closeOrderModal();
    window.open(url, "_blank");
}

// Generate WhatsApp message with order details
function generateWhatsAppMessage() {
    const orderNumber = orderCounter;
    let message = `🍕 *NEW FOOD ORDER* #${orderNumber}\n`;
    message += "==============================\n\n";
    
    message += "📋 *Order Details:*\n";
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - ${item.price * item.quantity}Pkr\n`;
    });
    
    message += "\n💵 *Payment Summary:*\n";
    message += `Subtotal: ${calculateSubtotal()}Pkr\n`;
    message += `Delivery Fee: ${DELIVERY_CHARGE}Pkr\n`;
    message += `*TOTAL: ${calculateTotal()}Pkr*\n\n`;
    
    message += "📦 *Delivery Information:*\n";
    message += "Please confirm availability and estimated delivery time.\n\n";
    
    message += "Thank you! 🎉";
    
    return message;
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.getElementById('toastNotification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast';
    toast.innerHTML = `<span><i class="fas fa-check-circle"></i> ${message}</span>`;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Close modal if clicked outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    document.getElementById('cartCount').textContent = cartCount;
    
    // Generate a random order number between 1000-9999
    orderCounter = Math.floor(Math.random() * 9000) + 1000;
});

// Add this JavaScript to toggle the mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
});
