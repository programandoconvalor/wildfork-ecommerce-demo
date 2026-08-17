# WildFork E-commerce Demo

A frontend e-commerce application developed as part of the **WildFork Senior Frontend Technical Assessment**.

The project demonstrates a production-oriented frontend architecture using **Next.js, React, TypeScript, TanStack Query, Redux Toolkit, Zod, and Tailwind CSS**.

The application allows users to browse products, search and filter the catalog, view product details, manage a persistent shopping cart, and complete a simulated checkout flow.

---

# 🚀 E-commerce Demo

## Live Demo

https://wildfork-ecommerce-demo.vercel.app/

## GitHub Repository

https://github.com/programandoconvalor/wildfork-ecommerce-demo

This project is presented as a **technical assessment demo** focused on frontend architecture, API integration, state management, responsive UI, performance, accessibility, and testing.

---

# 📋 Assessment Requirements

The implementation covers the core requirements defined in the **WildFork Senior Frontend Technical Assessment**.

## Product Listing

- Product image
- Product name
- Price
- Stock availability
- Category
- Product search
- Category filtering
- Price sorting

## Product Detail

- Product images
- Product description
- Category
- Price
- Stock availability
- Add to Cart functionality
- Out-of-stock handling

## Shopping Cart

- Add products to cart
- Increase product quantity
- Decrease product quantity
- Remove products
- Clear cart
- Subtotal calculation
- Total calculation
- Cart item counter
- Stock-aware quantity limits
- Persistent cart using `localStorage`

## Technical Requirements

- Loading states
- Error states
- Empty states
- Out-of-stock states
- Responsive Desktop / Tablet / Mobile UI
- Client-side filtering and sorting
- API integration
- State management
- TypeScript
- Frontend testing

---

# 🏗 Architecture

The application follows a **feature-based frontend architecture** combined with the **Next.js App Router**.

The architecture separates:

- UI components
- Business features
- API communication
- Server state
- Client state
- Runtime validation
- Shared utilities
- Type definitions

The main business domains are organized under:

```text
src/features/
├── cart/
└── products/
```

This structure keeps domain-specific logic close to the feature that owns it and makes the application easier to maintain and extend.

---

# 📁 Project Structure

```text
wildfork-ecommerce-demo/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── context/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── products/
│   │   ├── error/
│   │   ├── not-found/
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
│   │       ├── context/
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
├── package.json
└── README.md
```

---

# 🧠 State Management Strategy

The application separates **server state** from **client/application state**.

## Server State — TanStack Query

**TanStack Query** is responsible for server state and API-driven data.

It provides:

- API request management
- Loading states
- Error states
- Caching
- Request lifecycle management
- Refetching
- Avoidance of unnecessary repeated requests

Product data retrieved from the API is cached and reused by the application.

This allows product search, filtering, and sorting to be performed locally without creating additional API requests for every interaction.

---

## Client State — Redux Toolkit

**Redux Toolkit** manages client-side application state, primarily the shopping cart.

The cart state includes:

- Products
- Quantities
- Subtotals
- Totals
- Stock-aware quantity management

Redux Toolkit was selected because it provides a predictable and scalable approach to managing shared client state while reducing Redux boilerplate.

---

## Persistent State

The shopping cart is persisted using:

```text
localStorage
```

This allows users to refresh or revisit the application without losing their current cart.

---

# 🌐 API Consumption Strategy

The application consumes product data through the **DummyJSON API**.

The API integration is isolated inside the products feature:

```text
src/features/products/api/
```

Product-related API operations are consumed through dedicated hooks:

```text
src/features/products/hooks/
```

The application uses **TanStack Query** to manage the API lifecycle.

The general flow is:

```text
UI
 │
 ▼
Product Hook
 │
 ▼
API Layer
 │
 ▼
DummyJSON API
 │
 ▼
TanStack Query Cache
 │
 ▼
Product Components
```

This separation prevents UI components from being tightly coupled to the API implementation.

---

# 🔐 Runtime Validation

**Zod** is used for runtime validation of API data.

TypeScript provides compile-time type safety, while Zod provides runtime validation when external data enters the application.

This creates two levels of protection:

```text
External API
     │
     ▼
Zod Schema
     │
     ▼
Validated Data
     │
     ▼
TypeScript Application
```

This approach helps protect the application from unexpected API response structures.

---

# ⚙️ Technical Decisions

## Next.js

Next.js was selected as the main application framework because it provides:

- App Router
- File-based routing
- Production-ready React architecture
- Image optimization
- Application-level error handling
- Scalable project structure

The application uses the **Next.js App Router**.

---

## React

React provides the component-based UI architecture used throughout the application.

The UI is divided into reusable components and feature-specific components to keep responsibilities isolated.

---

## TypeScript

TypeScript is used throughout the project to provide:

- Static typing
- Safer component interfaces
- Typed API models
- Typed Redux state
- Better developer experience
- Easier refactoring

---

## TanStack Query

TanStack Query was selected for server state because product data originates from an external API.

It provides:

- Caching
- Request lifecycle management
- Loading states
- Error handling
- Refetching

This avoids using Redux as a repository for server data.

---

## Redux Toolkit

Redux Toolkit manages client-side state that needs to be shared across the application.

The main use case is the shopping cart.

This keeps server state and application state clearly separated.

---

## Zod

Zod provides runtime validation for external API responses.

It complements TypeScript by validating data at runtime rather than relying exclusively on compile-time types.

---

## Tailwind CSS

Tailwind CSS is used for styling and responsive layouts.

It allows the UI to remain consistent while supporting:

- Desktop
- Tablet
- Mobile
- Responsive product grids
- Responsive cart layouts
- Responsive product detail layouts

---

## React Hot Toast

React Hot Toast provides immediate user feedback for actions such as adding products to the cart.

This improves interaction feedback without introducing unnecessary UI complexity.

---

## Vitest + React Testing Library

Vitest and React Testing Library are used for frontend component testing.

The tests focus on user-visible behavior such as:

- Product rendering
- Search
- Category filtering
- Price sorting
- Empty states
- Product detail states
- Add to Cart behavior
- Out-of-stock behavior

The testing strategy focuses on **behavior rather than implementation details**.

---

# ⚡ Performance Considerations

The implementation considers frontend performance through:

- Next.js App Router
- TanStack Query caching
- Local filtering of cached products
- Local sorting of cached products
- Avoiding unnecessary API requests
- Next.js Image optimization
- Responsive image sizing
- Memoized derived product data
- Component-based architecture
- Pagination of derived product results

The Product Listing derives:

```text
Categories
     ↓
Filtered Products
     ↓
Sorted Products
     ↓
Paginated Results
```

This keeps filtering, sorting, and pagination on the client after the initial product data has been retrieved.

---

# ♿ UX & Accessibility

The application includes accessible interaction patterns such as:

- Semantic headings
- Form labels
- Accessible button names
- `aria-label` attributes where appropriate
- Keyboard-friendly form controls
- Visible loading feedback
- Explicit error messages
- Empty states
- Disabled controls for unavailable products
- Responsive layouts

The goal is to provide predictable interactions rather than relying only on visual feedback.

---

# 🔄 Application States

The UI explicitly handles the following states.

## Loading

The application displays loading feedback while asynchronous product data is being retrieved.

## Error

API and product-loading failures provide an explicit error state with retry functionality where applicable.

## Empty

The product catalog displays an empty state when no products match the selected search or filters.

## Out of Stock

Products with no available inventory cannot be added to the cart.

These states prevent intentional blank screens and provide clear feedback to the user.

---

# 🛒 Shopping Flow

The application implements the following frontend shopping flow:

```text
Product Listing
      │
      ▼
Product Detail
      │
      ▼
Add to Cart
      │
      ▼
Shopping Cart
      │
      ▼
Checkout
```

The checkout represents a **frontend/demo shopping experience**.

No real payment gateway or production order-processing backend is implemented.

---

# 🧭 Application Routes

```text
/
│
├── /products
│
├── /products/[id]
│
├── /cart
│
├── /checkout
│
├── /error
│
└── /not-found
```

---

# 🚀 Local Development

## 1. Requirements

Recommended environment:

- Node.js
- npm

---

## 2. Installation

Clone the repository:

```bash
git clone https://github.com/programandoconvalor/wildfork-ecommerce-demo.git
```

Navigate to the project:

```bash
cd wildfork-ecommerce-demo
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Available Scripts

## Development

```bash
npm run dev
```

Starts the Next.js development server.

## Production Build

```bash
npm run build
```

Creates the production build.

## Production Server

```bash
npm start
```

Starts the production application.

## Run Tests

```bash
npm test
```

Starts Vitest.

## Run Test Suite Once

```bash
npm test -- --run
```

Runs the complete test suite once.

## TypeScript Validation

```bash
npx tsc --noEmit
```

Runs TypeScript validation without generating output files.

---

# 🔒 Security & Environment Variables

No API credentials or secrets are required for the current DummyJSON integration.

Local environment files should never be committed to Git.

The repository ignores local environment files such as:

```text
.env
.env.local
.env.*.local
```

---

# 📦 Scope

This project is a **frontend technical assessment demo**.

The main objective is to demonstrate:

```text
Frontend Architecture
        +
React / Next.js
        +
TypeScript
        +
API Integration
        +
State Management
        +
Responsive UI
        +
Testing
        +
Performance
        +
UX & Accessibility
```

The checkout experience represents the frontend shopping flow and does not implement a real payment gateway or production order-processing backend.

---

# 📊 Assessment Coverage

| Requirement | Implementation |
|---|---|
| Product listing | ✅ |
| Product image | ✅ |
| Product name | ✅ |
| Price | ✅ |
| Stock availability | ✅ |
| Category | ✅ |
| Search | ✅ |
| Category filtering | ✅ |
| Price sorting | ✅ |
| Product detail | ✅ |
| Product images | ✅ |
| Product description | ✅ |
| Add to Cart | ✅ |
| Quantity management | ✅ |
| Product removal | ✅ |
| Subtotal | ✅ |
| Total | ✅ |
| Cart persistence | ✅ |
| Loading states | ✅ |
| Error states | ✅ |
| Empty states | ✅ |
| Out-of-stock handling | ✅ |
| Responsive UI | ✅ |
| API integration | ✅ |
| State management | ✅ |
| TypeScript | ✅ |
| Frontend testing | ✅ |

---

# 🎯 Why This Architecture?

The main architectural goal was to keep the application **simple enough for a technical assessment while maintaining patterns that can scale to a larger production application**.

The separation between:

```text
Server State
     │
     └── TanStack Query

Client State
     │
     └── Redux Toolkit

API Layer
     │
     └── Products API

Runtime Validation
     │
     └── Zod

UI
     │
     └── React / Next.js
```

allows each technology to solve a specific problem instead of using a single state-management mechanism for the entire application.

This makes the codebase easier to reason about, test, maintain, and extend.

---

# 🎓 Technical Assessment Documentation

Additional technical documentation was prepared for the assessment covering:

- Local development
- Installation
- Available scripts
- Performance considerations
- UX and accessibility
- Application routes
- Security and environment variables
- Assessment requirements coverage
- Architecture decisions
- Technology stack

The project documentation is intended to complement this README with a more detailed technical overview.

---

# 👨‍💻 Development Signature

**Version 1.1.1 — August 17, 2026**

**Developed by:** Juan Carlos Zepeda Arzate

**Senior Front-End Engineer**

**Primary Stack:**

React · Next.js · TypeScript · Angular · AI-Assisted Development

---

<div align="center">

# 🚀 WildFork E-commerce Demo

### Senior Frontend Technical Assessment

Built with React · Next.js · TypeScript

**Live Demo**

https://wildfork-ecommerce-demo.vercel.app/

**GitHub Repository**

https://github.com/programandoconvalor/wildfork-ecommerce-demo

---

**Developed by Juan Carlos Zepeda Arzate**

**Senior Front-End Engineer**

</div>