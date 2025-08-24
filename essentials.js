document.addEventListener('DOMContentLoaded', function() {
    // Age Verification System
    const ageModal = document.getElementById('ageModal');
    const confirmAgeBtn = document.getElementById('confirmAge');
    const denyAgeBtn = document.getElementById('denyAge');
    const verifyAgeBtn = document.getElementById('verifyAgeBtn');
    const essentialsMenu = document.getElementById('essentialsMenu');
    const ageGateMessage = document.getElementById('ageGateMessage');

    const isAgeVerified = sessionStorage.getItem('ageVerified') === 'true';

    if (!isAgeVerified && ageModal) {
        ageModal.style.display = 'flex';
    } else if (ageGateMessage && essentialsMenu) {
        ageGateMessage.style.display = 'none';
        essentialsMenu.style.display = 'block';
    }

    if (verifyAgeBtn) {
        verifyAgeBtn.addEventListener('click', function() {
            if (ageModal) ageModal.style.display = 'flex';
        });
    }

    if (confirmAgeBtn) {
        confirmAgeBtn.addEventListener('click', function() {
            sessionStorage.setItem('ageVerified', 'true');
            if (ageModal) ageModal.style.display = 'none';
            if (ageGateMessage) ageGateMessage.style.display = 'none';
            if (essentialsMenu) essentialsMenu.style.display = 'block';
        });
    }

    if (denyAgeBtn) {
        denyAgeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Category switching functionality
    const subcategoryTabs = document.querySelectorAll('.subcategory-tab');
    subcategoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs in sidebar
            document.querySelectorAll('.subcategory-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content
            document.querySelectorAll('.subcategory-content').forEach(c => {
                c.classList.remove('active');
            });
            
            // Show corresponding content
            const category = this.getAttribute('data-category');
            const content = document.querySelector(`.subcategory-content[data-category="${category}"]`);
            if (content) {
                content.classList.add('active');
            }
        });
    });

    // Activate first tab by default
    const firstTab = document.querySelector('.subcategory-tab.active');
    if (firstTab) {
        firstTab.click();
    }

    // Mobile category toggle
    const mobileCategoryToggle = document.getElementById('mobileCategoryToggle');
    if (mobileCategoryToggle) {
        mobileCategoryToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.subcategory-sidebar');
            if (sidebar) sidebar.classList.toggle('active');
        });
    }

    // Modal close button
    document.querySelector('.close-modal')?.addEventListener('click', function() {
        const modal = document.getElementById('orderModal');
        if (modal) modal.style.display = 'none';
    });

    // Handle form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendOrderViaWhatsApp();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('orderModal');
        if (event.target === modal && modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize cart count
    updateCartCount();
});

// Order System
let currentOrder = JSON.parse(sessionStorage.getItem('currentOrder')) || [];

function addToOrder(itemName, itemPrice) {
    addItemToCart(itemName, parseFloat(itemPrice), 1);
}

function addItemToCart(name, price, quantity) {
    // Check if item already exists in cart
    const existingItemIndex = currentOrder.findIndex(item => item.name === name);
    
    if (existingItemIndex >= 0) {
        // Update quantity if item exists
        currentOrder[existingItemIndex].quantity += quantity;
    } else {
        // Add new item if it doesn't exist
        currentOrder.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }
    
    // Save to session storage
    sessionStorage.setItem('currentOrder', JSON.stringify(currentOrder));
    
    updateCartCount();
    showAddedToCartToast(name, quantity);
}

function updateCartCount() {
    const count = currentOrder.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'block' : 'none';
    }
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
    
    if (!modal || !orderSummary) {
        console.error('Modal or order summary element not found');
        return;
    }
    
    // Build order summary
    let summaryHTML = '';
    let subtotal = 0;
    const deliveryCharges = 30; // 30 Rs delivery charges
    
    currentOrder.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        summaryHTML += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>${itemTotal.toFixed(2)}Pkr</span>
            </div>
        `;
    });
    
    // Add delivery charges
    summaryHTML += `
        <div class="order-item">
            <span>Delivery Charges</span>
            <span>${deliveryCharges.toFixed(2)}Pkr</span>
        </div>
    `;
    
    // Calculate total including delivery charges
    const total = subtotal + deliveryCharges;
    
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
    const name = document.getElementById('customerName')?.value;
    const phone = document.getElementById('customerPhone')?.value;
    const address = document.getElementById('customerAddress')?.value;
    
    if (!name || !phone || !address) {
        alert('Please fill in all required fields')
        return;
    }
    
    // Format WhatsApp message
    let message = `*NEW ESSENTIALS ORDER*%0A%0A`;
    message += `*Customer Name:* ${name}%0A`;
    message += `*Phone:* ${phone}%0A`;
    message += `*Delivery Address:*%0A${address}%0A%0A`;
    message += `*Order Details:*%0A`;
    
    let subtotal = 0;
    const deliveryCharges = 30; // 30 Rs delivery charges
    
    currentOrder.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        message += `- ${item.name} x ${item.quantity} = ${itemTotal.toFixed(2)}Pkr%0A`;
    });
    
    // Add delivery charges to message
    message += `- Delivery Charges = ${deliveryCharges.toFixed(2)}Pkr%0A`;
    
    // Calculate total including delivery charges
    const total = subtotal + deliveryCharges;
    
    message += `%0A*TOTAL: ${total.toFixed(2)}Pkr*%0A%0A`;
    message += `Please confirm this order.`;
    
    // Open WhatsApp
    const whatsappNumber = '923005159901';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    // Reset order
    currentOrder = [];
    sessionStorage.removeItem('currentOrder');
    updateCartCount();
    
    const modal = document.getElementById('orderModal');
    if (modal) modal.style.display = 'none';
    
    const orderForm = document.getElementById('orderForm');
    if (orderForm) orderForm.reset();
    
    alert('Your essentials order has been sent! Please wait for call from our delivery boy.');
}

  document.addEventListener('DOMContentLoaded', function() {
            const verifyBtn = document.getElementById('verifyAgeBtn');
            const ageGate = document.getElementById('ageGateMessage');
            const essentialsMenu = document.getElementById('essentialsMenu');
            
            verifyBtn.addEventListener('click', function() {
                // For demonstration purposes, we're just showing the categories
                // In a real implementation, you would verify age properly
                ageGate.style.display = 'none';
                essentialsMenu.style.display = 'block';
            });
        });
        
        function openCategory(category) {
            // This function would navigate to the separate category page
            // For this example, we'll just show an alert
            alert(`Navigating to ${category} page...\nIn the actual implementation, this would open the separate HTML file for this category.`);
            
            // In your actual implementation, you would use:
            // window.location.href = `${category}.html`;
            // or similar navigation method
        }
