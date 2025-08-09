## Fashion Store — MERN E‑commerce

A full‑stack fashion e‑commerce application with a React frontend and a Node.js/Express/MongoDB backend. It includes product browsing, authentication, wishlist, cart, checkout, and admin‑ready APIs.

### Monorepo Layout

```
.
├─ backend/         # Express + MongoDB API (products, auth, orders, users)
└─ store/           # React frontend (Create React App)
```

### Tech Stack
- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express, Mongoose, JWT, Multer, CORS, dotenv
- **Database**: MongoDB (Atlas or local)

### Key Features
- Category pages and product detail pages
- Search, filters, new arrivals, sale collections
- Auth: register, login, profile; JWT‑based protected routes
- Wishlist and cart state via React Context
- Orders and basic checkout flow
- Product image uploads (served from `/uploads`)

---

## Getting Started (Local)

### Prerequisites
- Node.js 18+
- MongoDB (local) or a MongoDB Atlas connection string

### 1) Backend Setup
```bash
cd backend
npm install
```

Create `backend/config.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce-store
JWT_SECRET=your-very-secret-key

# Optional demo toggles
USE_FAKE_AUTH=false       # true → register/login returns fake user+token without DB
USE_FAKE_PRODUCTS=false   # true → products served from in-file sample instead of DB
```

Start the API:
```bash
npm start
```
You should see: `Server running on port 5000` and a Mongo connection log.

Optional: seed sample data (admin + products):
```bash
node seeder.js        # import
node seeder.js -d     # destroy
```


### 2) Frontend Setup
In a second terminal:
```bash
cd store
npm install
npm start
```
App runs at `http://localhost:3000`.

API base URL is defined in `store/src/services/api.js` as `http://localhost:5000/api`. If you deploy the backend elsewhere, update that constant accordingly.

---

## API Overview
Base URL: `/api`

- Auth: `POST /auth/register`, `POST /auth/login`, `GET/PUT /auth/profile`, wishlist CRUD
- Products: `GET /products`, `GET /products/:id`, Admin `POST/PUT/DELETE /products`, `POST /products/:id/reviews`
- Orders: `POST /orders`, `GET /orders/myorders`, Admin `GET /orders`, `GET /orders/:id`, `PUT /orders/:id/pay`, `PUT /orders/:id/deliver`, `PUT /orders/:id/status`
- Users (admin): `GET /users`, `GET/PUT/DELETE /users/:id`

Note on demo toggles: when `USE_FAKE_AUTH` or `USE_FAKE_PRODUCTS` are set to `true`, the backend serves fake data for those areas. The server still attempts a MongoDB connection, but routes continue to work using the fake responses.

---

## Scripts

### Backend (`backend/package.json`)
- `npm start` — start the Express server

### Frontend (`store/package.json`)
- `npm start` — start React dev server
- `npm run build` — production build
- `npm test` — run tests

---

## Environment Variables (Backend)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | API port | `5000` |
| `MONGODB_URI` | Mongo connection string | `mongodb://localhost:27017/ecommerce-store` |
| `JWT_SECRET` | Secret for JWT signing | `your-very-secret-key` |
| `USE_FAKE_AUTH` | Use fake auth responses | `true`/`false` |
| `USE_FAKE_PRODUCTS` | Serve in-file sample products | `true`/`false` |

---

## Production Notes
- Update the frontend API base URL in `store/src/services/api.js` for your deployed backend.
- Set strong values for `JWT_SECRET` and use environment variables in your hosting platform.
- Use a dedicated object storage or CDN for product images in production.

---

## Project Status
Active. Planned enhancements: Stripe payments, admin dashboard, analytics, CI/CD.

## License
ISC

# ====================================> Fashion_store-Website ====================================>
