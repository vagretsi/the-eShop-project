# THE ULTIMATE STORE

A modern e-commerce web application built with **Next.js**, **React 19**, **TypeScript**, **Zustand**, and **PostgreSQL** via Prisma ORM.

---

## Features

- **Product Browsing** — Responsive product grid with data fetched from FakeStoreAPI
- **Shopping Cart** — Animated slide-in sidebar cart powered by Framer Motion
- **Cart State Management** — Client-side Zustand store with add, remove, and quantity controls
- **Admin Panel** — Protected page to add new products directly to the database
- **HTTP Basic Auth** — Middleware-based authentication guarding the `/admin` route
- **Dark Mode** — Full light/dark theme support via CSS variables and Tailwind
- **PostgreSQL Integration** — Prisma ORM for persisting admin-created products

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| State Management | Zustand |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | HTTP Basic Auth (Middleware) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page — product grid
│   ├── layout.tsx            # Root layout
│   ├── admin/
│   │   └── page.tsx          # Admin panel — add products
│   └── api/
│       └── products/
│           └── route.ts      # POST /api/products — create product
├── components/
│   ├── NavBar.tsx            # Sticky navbar with cart toggle
│   ├── ProductCard.tsx       # Individual product card
│   └── CartSidebar.tsx       # Animated cart sidebar
├── store/
│   └── useCart.ts            # Zustand cart store
├── types/
│   └── product.ts            # Product TypeScript interface
└── middleware.ts             # Admin route authentication
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### 1. Clone the repository

```bash
git clone <repo-url>
cd the-eShop-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/eshop"
ADMIN_USER=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

### 4. Set up the database

```bash
npx prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Admin Panel

The admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

Access is protected by HTTP Basic Authentication. Use the credentials defined in your `.env` file (`ADMIN_USER` / `ADMIN_PASSWORD`).

From the admin panel you can add new products with:
- Title
- Price
- Description
- Category
- Image URL

Products are saved to the PostgreSQL database via the `POST /api/products` endpoint.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ADMIN_USER` | Admin panel username |
| `ADMIN_PASSWORD` | Admin panel password |
