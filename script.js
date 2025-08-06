// Age Verification Modal
const ageModal = document.getElementById("ageModal");
const confirmAgeBtn = document.getElementById("confirmAge");
const denyAgeBtn = document.getElementById("denyAge");
const orderVapesBtn = document.getElementById("orderVapesBtn");
const tobaccoTab = document.querySelector('[data-tab="tobacco"]');

// Show modal when "Essentials" button is clicked
orderVapesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    ageModal.style.display = "flex";
});

// If user confirms age, show tobacco section
confirmAgeBtn.addEventListener("click", () => {
    ageModal.style.display = "none";
    document.querySelector('.tab-btn[data-tab="tobacco"]').click();
});

// If denied, redirect to food tab
denyAgeBtn.addEventListener("click", () => {
    ageModal.style.display = "none";
    document.querySelector('.tab-btn[data-tab="food"]').click();
});

// Tab Switching Logic
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons & contents
        tabBtns.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
        
        // Add active class to clicked tab
        btn.classList.add("active");
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });
});

// WhatsApp Order Function
function orderOnWhatsApp(item) {
    const phone = "+919876543210";
    const message = `Hi, I'd like to order ${item}. Please confirm availability.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// Animate menu items on scroll
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, { threshold: 0.1 });

    menuItems.forEach(item => observer.observe(item));
});
