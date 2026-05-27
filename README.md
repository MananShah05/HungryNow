# HungryNow 🍔

**HungryNow** is a premium, high-fidelity, and state-of-the-art food delivery web application. Crafted with modern web technologies including **React 19**, **Vite**, **TypeScript**, **Zustand**, and **Framer Motion**, it delivers an incredibly fluid, responsive, and aesthetically stunning user experience.

---

## ✨ Key Features

### 🎨 State-of-the-Art Design & Micro-Animations
- **Harmony & Aesthetics**: Customized HSL-tailored color palettes (zinc dark mode, warm orange accents), sleek typography, smooth hover scaling, and active-state click feedbacks.
- **Dynamic Layouts**: Interactive components powered by Framer Motion, including staggered entry animations, state transitions, and responsive nav alignment.

### 🗺️ Seamless Navigation
- **Double Navigation System**: Beautiful desktop Navbar with integrated search and smart badges alongside a mobile-first Bottom Navigation bar for smooth smartphone usability.
- **Smart Search**: Dedicated quick-access search panel to instantly discover restaurants and dishes.

### 🛍️ Sliding Cart & Stepper Checkout
- **Interactive Cart Drawer**: Quick-open slide-out cart drawer showing real-time item increments, automatic platform and delivery fees, and discount coupon codes (like `HUNGRY50`).
- **Dynamic Stepper Tracker**: Progress stepper (`Address` ➔ `Payment` ➔ `Verify` ➔ `Success`) showcasing the transaction stage.
- **Glassmorphic Secure Modal**: A gorgeous payment verification overlay that blurs the background and executes a simulated multi-step security sequence, protected by mock 256-bit SSL encryption.

### 👤 Profile Personalization
- **Synced Identity**: Account name pre-configured to **Manan Shah** (`manan@email.com`) synced flawlessly across the navbar initials, personal info edit panel, and payment delivery forms.

### 🔄 Intelligent One-Click Reordering
- **Automated Text Parsing**: Clicking "Reorder" on past orders dynamically parses items and quantities using regular expressions (e.g. `BBQ Chicken Pizza × 1` ➔ `BBQ Chicken Pizza` quantity `1`).
- **Menu matching & Cart insertion**: Cross-references items with the restaurant menu catalog to automatically load the items directly into the Zustand cart state and open the cart drawer instantly.

---

## 🛠️ Technology Stack

- **Core**: React 19, TypeScript, HTML5 (Semantic Structure)
- **Styling**: Tailwind CSS v4, Custom HSL Theme Variables
- **State Management**: Zustand (Cart Actions, Badge Counters, Drawer State)
- **Animations**: Framer Motion (Transitions, Stepper progress lines, modal spring physics)
- **Icons**: Phosphor Icons (Sleek and unified icon weight)
- **Toast Notifications**: Sonner (Highly customizable rich notifications)

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or above recommended).

### 2. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 3. Development Server
Run the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Production Build
Compile and bundle the project for optimal production performance (bundles are minified, optimized, and inlined for instant loads):
```bash
npm run build
```

### 5. Preview Production Build
Locally preview the generated production files:
```bash
npm run preview
```

---

## 📂 Project Structure

```
HungryNow/
├── dist/                  # Optimized production build outputs
├── src/
│   ├── components/        # Reusable UI (Navbar, BottomNav, CartSheet, VegDot, etc.)
│   ├── data/              # Static restaurant menus and dish details
│   ├── pages/             # Page components (HomePage, CheckoutPage, OrdersPage, etc.)
│   ├── store/             # Zustand global state (cartStore.ts)
│   ├── App.tsx            # Main router and route definitions
│   ├── index.css          # CSS themes, tailwind base layers, shimmer keyframes
│   └── main.tsx           # React bootstrap entry point
├── index.html             # HTML Shell container
├── package.json           # Scripts and dependency lists
└── tsconfig.json          # TypeScript configurations
```

---

## 📝 License
This project is open-source and available under the MIT License.
