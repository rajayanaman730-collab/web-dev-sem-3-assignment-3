# Inventory and Data Management System

A RESTful backend service built with **Node.js**, **Express.js**, and **MongoDB** (via **Mongoose**) for managing product catalogs, tracking stock levels, handling inventory changes safely, and running analytics reports through aggregation pipelines.

---

## 🛠️ Technology Stack

- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework for routing and middleware
- **MongoDB** - NoSQL database for flexible document storage
- **Mongoose** - Object Data Modeling (ODM) with schema validation
- **dotenv** - Environment variable management

---

## 📁 Project Structure

```text
inventory-management-system/
│
├── config/
│   └── db.js                 # MongoDB connection logic
├── controller/
│   └── productController.js  # Business logic for CRUD, stock adjustments & aggregations
├── middleware/
│   ├── errorHandler.js       # Centralized error management
│   └── validate.js           # Request payload validation middleware
├── model/
│   └── Product.js            # Mongoose schema and virtual properties
├── routes/
│   └── productRoutes.js      # Endpoint route definitions
├── .env                      # Environment variables
├── package.json              # Project dependencies and scripts
└── server.js                 # Application entry point
```

---

## 🚀 Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) instance (Local or MongoDB Atlas cluster)

### 2. Environment Configuration
Create a `.env` file in the root directory and define your configurations:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/inventory_db
```

### 3. Install Dependencies
Run the following command in your terminal:
```bash
npm install
```

### 4. Start the Application
- **Production Mode:**
  ```bash
  npm start
  ```
- **Development Mode (with auto-reload):**
  ```bash
  npm run dev
  ```

---

## 📋 API Endpoints Reference

### Products Management

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/products` | Create a new product |
| `GET` | `/api/products` | Get products list (supports query filters, sorting, & pagination) |
| `GET` | `/api/products/:id` | Get details for a specific product by ID |
| `PUT` | `/api/products/:id` | Update full details of a product |
| `PATCH` | `/api/products/:id/stock` | Safely update stock level (`+` for restock, `-` for sales) |
| `DELETE`| `/api/products/:id` | Delete a product by ID |

### Aggregations & Reports

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products/low-stock` | Fetch items where `quantity <= reorderLevel` |
| `GET` | `/api/products/summary` | Aggregated report of total items, stock value, and avg price per category |

---

## 🧪 Testing with Postman

### 1. Create a Product (`POST /api/products`)
**Body (`JSON`):**
```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 128,
  "quantity": 40,
  "reorderLevel": 20,
  "supplier": "Cello Pens"
}
```

### 2. Filter & Paginate Products (`GET /api/products`)
**Query Parameters:**
`http://localhost:5000/api/products?category=Stationery&page=1&limit=10&sortBy=price`

### 3. Adjust Stock (`PATCH /api/products/:id/stock`)
**Body (`JSON`):**
```json
{
  "change": 15
}
```
*(Note: Pass positive values to restock, or negative values to simulate a sale)*

### 4. Fetch Reports
- **Low-Stock Alert:** `GET http://localhost:5000/api/products/low-stock`
- **Category Summary:** `GET http://localhost:5000/api/products/summary`

---

## 💡 Key Features

- **Virtual Stock Value:** Computes `stockValue = price * quantity` dynamically upon request.
- **Data Validation:** Enforces non-negative values for pricing/quantity and checks unique SKU bounds.
- **Stock Guardrails:** Prevents stock deductions that would reduce item inventory below 0.
- **Centralized Error Handling:** Formats MongoDB validation and duplicate key errors into clean JSON standard responses.