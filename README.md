# 🍴 Eatoes Restaurant Admin Dashboard

> **Intern Project – Eatoes Technical Assessment**  
> Hi! I built this **Restaurant Admin Dashboard** as part of my Eatoes internship assessment. The goal was to create a **full-stack admin dashboard** for managing menu items, orders, and analytics using the MERN stack (MongoDB, Express, React, Node.js).  

---

## 👩‍💻 Project Overview

As an intern, my task was to:

- Build a **dashboard** where restaurant owners can see important stats at a glance.  
- Enable **menu management**: add, edit, delete, and toggle availability of menu items.  
- Handle **orders**: view, filter by status, and update orders in real-time.  
- Make the **UI responsive, clean, and professional** using Tailwind CSS.  
- Implement **best practices** like REST APIs, state management, debounced search, and optimistic UI updates.  

---

## 🛠 Tech Stack I Used

| Layer       | Technology |
|------------|------------|
| Frontend   | React 18+, Vite, Tailwind CSS |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas |
| State      | useState, Context API |
| API Calls  | Axios |
| Icons      | lucide-react |

---

## 🗂 Project Structure
restaurant-admin-dashboard/
├── server/                     # Backend
│   ├── config/                 # DB connection setup (db.js)
│   ├── controllers/            # Route logic (menuController.js, orderController.js)
│   ├── models/                 # Mongoose schemas (MenuItem.js, Order.js)
│   ├── routes/                 # API endpoints (menuRoutes.js, orderRoutes.js)
│   ├── scripts/                # Seed scripts for sample data (seed.js, seedOrders.js)
│   ├── .env                    # Environment variables (gitignored)
│   ├── package.json
│   └── server.js               # Entry point
│
└── client/                     # Frontend
    ├── src/
    │   ├── components/         # Reusable UI components (MenuCard.jsx, Sidebar.jsx, Header.jsx)
    │   ├── pages/              # Full pages (Dashboard.jsx, Menu.jsx, Orders.jsx)
    │   ├── hooks/              # Custom hooks (useDebounce.js)
    │   ├── services/           # API call abstraction (api.js)
    │   ├── App.jsx             # Main app with routing
    │   └── main.jsx            # ReactDOM render entry
    │
    ├── public/                 # Static files (index.html, favicon, images)
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js


---

## ✨ Features I Implemented

### Menu Management
- View all menu items in a responsive grid  
- **Add / Edit / Delete** menu items with forms  
- Toggle availability with **optimistic UI updates**  
- Search by name or ingredients (**debounced search** with 300ms delay)  
- Filter menu items by category and availability  

### Orders Dashboard
- View all orders with status badges  
- Filter by order status  
- Pagination for better performance  
- Update order status directly from the dashboard  
- Expand order to see details  

### Dashboard Stats
- Total orders and pending orders  
- Total menu items  
- Total revenue (excluding cancelled orders)  
- Real-time UI updates on actions  

---

## ⚡ Challenges I Faced & How I Solved Them

1. **Debounced Search**  
   - Created a custom `useDebounce` hook so the API is not called on every keystroke.  

2. **Optimistic UI Updates**  
   - Menu availability toggles update immediately in the UI before API call finishes.  
   - If API fails, the state rolls back and shows an error notification.  

3. **Deployment CORS Issues**  
   - Configured backend to allow the frontend URL (Vercel) in CORS.  

4. **MongoDB Atlas Connection**  
   - Learned how to whitelist IPs, create a DB user, and use connection strings in `.env`.  

---
