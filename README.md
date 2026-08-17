# WildFork E-commerce Demo

A small e-commerce application built with **Next.js, React, and TypeScript** as part of the **WildFork Senior Frontend Technical Assessment**.

The application allows users to browse products, search and filter the catalog, view product details, and manage a persistent shopping cart.

---

## 🚀 Live Demo

https://wildfork-ecommerce-demo.vercel.app/

---

# Features

## Product Listing

- Product image
- Product name
- Price
- Stock availability
- Category
- Product search
- Category filtering
- Price sorting
- Responsive product grid
- Loading state
- Error state
- Empty state

## Product Detail

- Product image gallery
- Product description
- Category
- Price
- Stock availability
- Add to Cart functionality
- Out-of-stock handling
- Loading state
- Error state
- Retry functionality

## Shopping Cart

- Add products to cart
- Increase product quantity
- Decrease product quantity
- Quantity cannot be reduced below `1` using the quantity control
- Remove individual products
- Clear the entire cart
- Subtotal calculation
- Cart total
- Cart item counter
- Stock-aware quantity limits
- Empty cart state
- Cart persistence using `localStorage`

## Application States

The application explicitly handles:

- Loading states
- Empty states
- Error states
- Out-of-stock states

The UI provides feedback to the user instead of displaying blank screens.

## Responsive Design

The application supports:

- Desktop
- Tablet
- Mobile

The cart and product detail interfaces include responsive layouts adapted to smaller screens.

---

# Tech Stack

## Required Technologies

- Next.js
- React
- TypeScript

## Additional Libraries

- TanStack Query
- Redux Toolkit
- React Redux
- Zod
- Tailwind CSS
- React Hot Toast
- Vitest
- React Testing Library
- jsdom

The additional libraries were selected to provide a clear separation between server state, client state, runtime validation, styling, user feedback, and testing.

---

# Architecture

The project uses a **feature-based architecture** for the main e-commerce functionality.

The main business features are organized under:

```text
src/features/
├── cart/
└── products/


wildfork-ecommerce-demo/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── context/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Common/
│   │   ├── Header/
│   │   └── ...
│   │
│   ├── features/
│   │   │
│   │   ├── cart/
│   │   │   ├── components/
│   │   │   ├── selectors/
│   │   │   ├── store/
│   │   │   └── types/
│   │   │
│   │   └── products/
│   │       ├── api/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── schemas/
│   │       └── types/
│   │
│   ├── lib/
│   │
│   ├── redux/
│   │
│   └── types/
│
├── vitest.config.ts
├── next.config.js
├── tsconfig.json
└── package.json



---

# Development Signature

**Version 1.1.1 — August 16, 2026**

**Developed by:** Juan Carlos Zepeda Arzate  
**Senior Front-End Engineer**

_Designed and developed by Juan Carlos Zepeda Arzate._