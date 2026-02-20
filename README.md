# PropertyHub – Real Estate Guru-style Real Estate Prototype

A minimal real-estate listing MVP built with **Next.js (App Router)**, **React (JavaScript)**, **MongoDB + Mongoose**, and **Tailwind CSS**. Inspired by Real Estate Guru.

---

## Tech stack

- **Next.js 14** (App Router)
- **React** (JavaScript, no TypeScript)
- **Next.js API Routes** for backend
- **MongoDB** with **Mongoose**
- **Tailwind CSS** for styling

---

## Project structure

```
real-estate-guru/
├── app/
│   ├── api/
│   │   ├── properties/
│   │   │   ├── route.js          # GET all, POST new
│   │   │   └── [id]/route.js     # GET one
│   │   └── seed/
│   │       └── route.js          # Seed dummy data
│   ├── add/page.js               # Add property form
│   ├── listings/page.js          # All listings
│   ├── property/[id]/page.js     # Property detail
│   ├── layout.js
│   ├── globals.css
│   └── page.js                   # Home (search + featured)
├── components/
│   ├── Navbar.js
│   ├── PropertyCard.js
│   └── SearchBar.js
├── lib/
│   └── db.js                     # MongoDB connection
├── models/
│   └── Property.js               # Mongoose schema
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
```

---

## How to run locally

### 1. Prerequisites

- **Node.js** 18+
- **MongoDB** running locally (e.g. [MongoDB Community](https://www.mongodb.com/try/download/community)) or a cloud URI (e.g. MongoDB Atlas)

### 2. Install dependencies

```bash
cd "c:\Users\saira\Downloads\real-estate-guru"
npm install
```

### 3. Environment (optional)

To use a custom MongoDB URL:

- Copy `.env.example` to `.env.local`
- Set `MONGODB_URI` (default is `mongodb://localhost:27017/realestateguru`)

```bash
copy .env.example .env.local
# Edit .env.local and set MONGODB_URI if needed
```

### 4. Seed dummy data (optional)

With the app running (see step 5), call the seed API once to insert sample properties:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or open `http://localhost:3000/api/seed` in the browser and use an API client (e.g. Postman) to send a **POST** request. Seed runs only if the collection is empty.

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Features

| Feature | Description |
|--------|-------------|
| **Home** | Navbar, search bar (location, price, property type – UI only), featured property cards |
| **Listings** | Fetches all properties from the API and shows them in a card layout |
| **Property detail** | Dynamic route `/property/[id]` – image, price, location, BHK, area, description |
| **Add property** | Form to add a new property; POSTs to `/api/properties` |
| **API** | `GET /api/properties`, `POST /api/properties`, `GET /api/properties/[id]` |

---

## API summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List all properties |
| POST | `/api/properties` | Create a property (JSON body) |
| GET | `/api/properties/[id]` | Get one property by ID |
| POST | `/api/seed` | Seed dummy data (no-op if DB has data) |

---

## Design notes

- Real Estate Guru-inspired layout: navbar, search strip, card-based listings.
- Primary color: orange (`#e85d04`) with hover states.
- Responsive grid for listing and detail pages.
- No authentication; focus on a simple, working prototype.

---

## Build for production

```bash
npm run build
npm start
```

Ensure `MONGODB_URI` is set in the production environment.
