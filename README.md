# 🍔 FoodVerse - Full Stack Food Delivery Application

<!-- Badges Section -->
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**FoodVerse** is a modern, high-performance full-stack web application designed to provide a seamless online food ordering and delivery experience. Built using the **MERN stack** (MongoDB, Express.js, React, Node.js), it features secure user authentication, real-time responsive state management, and robust online payment integration via **Razorpay**.

---

## 🚀 Core Features

* **User Authentication:** Secure user signup and login flow powered by **JSON Web Tokens (JWT)** and encrypted passwords, with integrated session state sync.
* **Dynamic Cart System:** Real-time incremental/decremental frontend cart states synchronized instantly with persistent backend MongoDB storage.
* **Live Catalog Sync:** Up-to-date food item feeds fetched dynamically from the database with automated graceful UI fallbacks.
* **Razorpay Payment Gateway:** Integrated production-ready checkout experience handling automatic payment verification and secure signatures.
* **Responsive UI:** Clean, corporate, and minimalist navbar and interface styling customized for smooth multi-page navigation and contextual dropdowns.

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (Functional Components & Hooks)
* **React Router DOM** (Client-side routing)
* **Axios** (Promise-based HTTP client with cookie defaults)
* **Tailwind CSS & DaisyUI** (Modern layout and styling components)
* **Context API** (Global state management for auth, cart items, and live catalog stream)
* ## 🔗 Live Deployment Links
* 
* **Customer Web App:** https://food-verse-mern-app.vercel.app
* **Admin Dashboard Portal:** [https://food-verse-mern-app-ete4.vercel.app]

### Backend
* **Node.js & Express.js** (RESTful API architecture)
* **MongoDB & Mongoose** (NoSQL Database modeling)
* **JSON Web Tokens (JWT)** (Secure header-driven authentication middleware)
* **Razorpay SDK** (Financial checkout transaction processing)

---

## 📁 Directory Structure

```text
FoodVerse/
├── backend/
│   ├── config/             # DB and system configurations
│   ├── controllers/        # Order, user, and cart routing business logic
│   ├── middleware/         # Token-based security and protection layers
│   ├── models/             # Mongoose schemas (User, Food, Order)
│   └── server.js           # Express entry point
└── frontend/
    ├── src/
    │   ├── components/     # Reusable global layouts (Navbar, Footer)
    │   ├── context/        # StoreContext global state engine
    │   ├── pages/          # Home, Cart, PlaceOrder, MyOrders screens
    │   └── index.html      # Application DOM entry node


PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
