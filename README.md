
# Tahir Khan Restaurant Ordering System

This project is a modern, full-featured web ordering platform for Tahir Khan Restaurant. It enables customers to order food and essentials (including tobacco, vapes, and accessories) online, with seamless WhatsApp integration and automated invoice delivery.

---

## Key Features

- Responsive, mobile-friendly UI for food and essentials
- Unified, user-friendly checkout modal (name, phone, email, address required)
- WhatsApp integration for instant order confirmation
- Automated invoice emails with elegant HTML and attached PDF
- Flat delivery charge: 50 Rs on all orders
- Age verification for restricted products (18+)
- Essentials categories: Velo, Cigarettes, Devices, Lighters, E-Juice, Disposable, Accessories
- Easily extensible and admin-friendly

## Technology Stack

- Frontend: HTML, CSS (Poppins, FontAwesome), JavaScript (vanilla)
- Backend: Python Flask (send_invoice_server.py)
- PDF Generation: reportlab
- Email: Gmail SMTP

## Getting Started

### 1. Clone the Repository

Download or clone this repository to your local machine.

### 2. Frontend Usage

- Open `index.html` in your browser to access the site.
- All category and product pages are static HTML/CSS/JS.

### 3. Backend Setup (Invoice Email)

1. Install Python 3.8+ and pip.
2. Install dependencies:
  ```sh
  pip install flask flask-cors reportlab
  ```
3. Set your email credentials as environment variables (recommended) or edit them in `send_invoice_server.py`:
  - `INVOICE_EMAIL_ADDRESS` (Gmail recommended)
  - `INVOICE_EMAIL_PASSWORD` (App password)
4. Start the server:
  ```sh
  python send_invoice_server.py
  ```
5. The server will listen on `http://localhost:5001/send-invoice`.

### 4. Placing Orders

- Customers add items to the cart and complete checkout via the modal.
- Orders are sent to WhatsApp and an invoice is emailed to the customer.

## Customization

- Edit `style.css`, `essentials.css`, and category HTML for branding and appearance.
- Update delivery charges in `essentials.js`, `food.js`, and `categories.js` if needed.
- Add or remove products by editing the relevant HTML files.

## Credits

Developed with ❤️ by Shahkaar Gul

## License

This project is made for a restaurant. Commercial use by others may require permission.
