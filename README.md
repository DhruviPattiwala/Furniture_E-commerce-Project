
# Furniture eCommerce Platform

A full-stack e-commerce web application built with modern technologies.  
Users can browse products, search, filter, manage cart & wishlist, and place orders.

##  Features

- Authentication (JWT - Access & Refresh Token)
- User Profile Management
- Cart System
- Wishlist System
- Search Products
- Filter Products (Category, Price, Rating)
- Order Management
- Admin Dashboard
- Responsive Design (Tablet & Desktop)
- Fast UI with optimized API calls


##  Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- @tanstack/react-query

### Backend
- Next.js API Routes
- MongoDB (Mongoose)
- JWT Authentication

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Installation

1. Install dependencies:

   npm install

##  Authentication Flow

- User logs in → receives Access Token + Refresh Token
- Access Token → short-lived (for API requests)
- Refresh Token → used to generate new access token
- Stored in HTTP-only cookies for security


##  Filter

- Search from navbar → redirects to `/products?q=...`
- Filters:
  - Category
  - Price
  - Rating
- "All" button resets filters and shows all products


## Wishlist Logic

- Toggle wishlist (add/remove)
- Stored per user
- like icon changes dynamically


##  Future Improvements

- Payment Integration (Stripe/Razorpay)
-  Product Reviews
-  Notifications


You can check out (https://github.com/DhruviPattiwala/Furniture_E-commerce-Project.git) - your feedback and contributions are welcome!

## Deploy on Vercel

[furnistack.vercel.app](https://furnistack.vercel.app)
