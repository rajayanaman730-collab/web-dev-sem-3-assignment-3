const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Mount API Routes
app.use('/api/products', productRoutes);

// Root health check endpoint
app.get('/', (_, res) => {
  res.send('Inventory and Data Management API is running...');
});

// Centralized Error Handling Middleware (must be registered last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});