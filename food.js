document.addEventListener('DOMContentLoaded', function() {
    // Food category switching functionality
    const foodCategoryTabs = document.querySelectorAll('.food-category-tab');
    foodCategoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.food-category-tab').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content
            document.querySelectorAll('.food-category-content').forEach(c => c.classList.remove('active'));
            
            // Show corresponding content
            const category = this.getAttribute('data-category');
            document.querySelector(`.food-category-content[data-category="${category}"]`).classList.add('active');
        });
    });

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

// Order System
let currentOrder = [];

function adjustQuantity(button, change) {
    const input = button.parentElement.querySelector('.quantity-input');
    let newValue = parseInt(input.value) + change;
    if (newValue < 1) newValue = 1;
    input.value = newValue;
}

function addToOrder(itemName, itemPrice) {
    const input = document.querySelector(`.quantity-input[data-item="${itemName}"]`);
    const quantity = parseInt(input.value);
    addItemToCart(itemName, itemPrice, quantity);
    input.value = 1; // Reset quantity
}

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
    showAddedToCartToast(name, quantity);
}

function updateCartCount() {
    const count = currentOrder.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function showAddedToCartToast(itemName, quantity) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${quantity} ${itemName} added to cart</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

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

function sendOrderViaWhatsApp() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    
    // Format WhatsApp message
    let message = `*NEW FOOD ORDER*%0A%0A`;
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
    
    alert('Your food order has been sent! Please wait for call from our delivery boy.');
}