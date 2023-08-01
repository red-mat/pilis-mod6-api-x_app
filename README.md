# X-App api

x app api

## Getting started

- npm 1 or pnpm i
- **npm run dev** for development mode
- **npm run test** for testing mode
- **npm run test:ui** for ui testing mode
- **npm run build** to transpile the development code
- **npm start** to start the production code

## Endpoints

### /api/auth

- **GET**: get user token

### api/products

- **GET**: get paginated all products (actives not deleted)
- **POST** _(protected)_: add product
- **PUT** _(protected)_: update product
- **DELETE** _(protected)_: soft delete product

### api/orders

- **GET** _(protected)_: paginated all orders
- **POST**: generate order

### api/orders/:id

- **GET**: get order qr
- **PUT** _(protected)_: mark order as delivered
