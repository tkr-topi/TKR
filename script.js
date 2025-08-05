// Order System without localStorage
let currentOrder = [];

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Age Verification System (for essentials page only)
    if (document.getElementById('essentialsMenu')) {
        const ageModal = document.getElementById('ageModal');
        const confirmAgeBtn = document.getElementById('confirmAge');
        const denyAgeBtn = document.getElementById('denyAge');
        const verifyAgeBtn = document.getElementById('verifyAgeBtn');
        const essentialsMenu = document.getElementById('essentialsMenu');
        const ageGateMessage = document.getElementById('ageGateMessage');

        const isAgeVerified = sessionStorage.getItem('ageVerified') === 'true';

        if (!isAgeVerified) {
            ageModal.style.display = 'flex';
        } else {
            ageGateMessage.style.display = 'none';
            essentialsMenu.style.display = 'grid';
        }

        if (verifyAgeBtn) {
            verifyAgeBtn.addEventListener('click', function() {
                ageModal.style.display = 'flex';
            });
        }

        confirmAgeBtn.addEventListener('click', function() {
            sessionStorage.setItem('ageVerified', 'true');
            ageModal.style.display = 'none';
            ageGateMessage.style.display = 'none';
            essentialsMenu.style.display = 'grid';
        });

        denyAgeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Modal close button
    document.querySelector('.close-modal')?.addEventListener('click', function() {
        document.getElementById('orderModal').style.display = 'none';
    });

    // Handle form submission
    document.getElementById('orderForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        sendOrderViaWhatsApp();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('orderModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Quantity adjustment
function adjustQuantity(button, change) {
    const input = button.parentElement.querySelector('.quantity-input');
    let newValue = parseInt(input.value) + change;
    if (newValue < 1) newValue = 1;
    input.value = newValue;
}

// Add item to order (for food items)
function addToOrder(itemName, itemPrice) {
    const input = document.querySelector(`.quantity-input[data-item="${itemName}"]`);
    const quantity = parseInt(input.value);
    addItemToCart(itemName, itemPrice, quantity);
    input.value = 1; // Reset quantity
}

// Add essential product to order
function orderEssential(itemName, itemPrice) {
    addItemToCart(itemName, itemPrice, 1);
}

// Common function to add items to cart
function addItemToCart(name, price, quantity) {
    const existingItem = currentOrder.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        currentOrder.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }
    
    updateCartCount();
    alert(`${quantity} ${name}(s) added to your order!`);
}

// Update cart count display
function updateCartCount() {
    const count = currentOrder.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Show order modal
function showOrderModal() {
    if (currentOrder.length === 0) {
        alert('Your order is empty! Please add some items first.');
        return;
    }
    
    const modal = document.getElementById('orderModal');
    const orderSummary = document.getElementById('orderSummary');
    
    // Build order summary
    let summaryHTML = '';
    let total = 0;
    
    currentOrder.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        summaryHTML += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>${itemTotal.toFixed(2)}Pkr</span>
            </div>
        `;
    });
    
    summaryHTML += `
        <div class="order-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}Pkr</span>
        </div>
    `;
    
    orderSummary.innerHTML = summaryHTML;
    modal.style.display = 'flex';
}

// Send order via WhatsApp
function sendOrderViaWhatsApp() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    
    // Format WhatsApp message
    let message = `*NEW ORDER*%0A%0A`;
    message += `*Customer Name:* ${name}%0A`;
    message += `*Phone:* ${phone}%0A`;
    message += `*Delivery Address:*%0A${address}%0A%0A`;
    message += `*Order Details:*%0A`;
    
    let total = 0;
    currentOrder.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `- ${item.name} x ${item.quantity} = ${itemTotal.toFixed(2)}Pkr%0A`;
    });
    
    message += `%0A*TOTAL: ${total.toFixed(2)}Pkr*%0A%0A`;
    message += `Please confirm this order.`;
    
    // Open WhatsApp (replace with your number)
    const whatsappNumber = '923005159901';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    // Reset order
    currentOrder = [];
    updateCartCount();
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
    
    alert('Your order has been sent! Please wait for call from our delivery boy.');
}