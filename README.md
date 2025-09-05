# Tahir Khan Restaurant

A modern, full-featured web ordering system for Tahir Khan Restaurant, supporting food and essentials (including tobacco, vapes, and accessories) with WhatsApp integration and automated invoice emails.

## Features
- Modern, responsive UI for food and essentials ordering
- Unified checkout modal (name, phone, email, address required)
- WhatsApp order integration for instant confirmation
- Automated invoice emails with beautiful HTML and PDF attachment
- Delivery charges: 50 Rs for all orders
- Age verification for restricted products (18+)
- Category pages for essentials: Velo, Cigarettes, Devices, Lighters, E-Juice, Disposable, Accessories
- Admin-friendly, easy to extend

## Tech Stack
- HTML, CSS (Poppins, FontAwesome), JavaScript (vanilla)
- Python Flask backend for invoice email (send_invoice_server.py)
- reportlab for PDF invoice generation
- Gmail SMTP for email delivery

## Setup & Usage
1. **Clone or download this repository.**
2. **Frontend:**
   - Open `index.html` in your browser to view the site.
   - All category and product pages are static HTML/CSS/JS.
3. **Backend (Invoice Email):**
   - Install Python 3.8+ and pip.
   - Install dependencies:
     ```sh
     pip install flask flask-cors reportlab
     ```
   - Set your email credentials as environment variables (or edit in `send_invoice_server.py`):
     - `INVOICE_EMAIL_ADDRESS` (Gmail recommended)
     - `INVOICE_EMAIL_PASSWORD` (App password)
   - Run the server:
     ```sh
     python send_invoice_server.py
     ```
   - The server listens on `http://localhost:5001/send-invoice`.
4. **Ordering:**
   - Users fill the cart and checkout via the modal.
   - Orders are sent to WhatsApp and an invoice is emailed to the customer.

## Customization
- Edit `style.css`, `essentials.css`, and category HTML for branding.
- Update delivery charges in `essentials.js`, `food.js`, and `categories.js` if needed.
- Add/remove products by editing the relevant HTML files.

## Credits
- Made with ❤️ by Shahkaar Gul

## License
This project is made for a restaurant. Commercial use by others may require permission.
