// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: "High-performance laptop with 16GB RAM",
    price: 1200,
    category: "Books, electronics",
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// 1. Request Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // Pass control to the next middleware in the stack
});

// 2. Authentication Middleware (Example: Simple API Key Check)
// For demonstration, let's assume a valid API key is 'mysecretapikey'
// In a real application, this would involve more robust token validation (JWT, OAuth, etc.)
app.use('/api/products', (req, res, next) => {
  // Only apply authentication to routes under /api/products
  // You might want to make some routes public (e.g., GET all products)
  // For this example, let's protect all /api/products routes except GET /api/products/:id and GET /api/products

  // For simplicity, let's require authentication for POST, PUT, DELETE
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const apiKey = req.headers['x-api-key']; // Look for 'x-api-key' header

    if (!apiKey || apiKey !== 'mysecretapikey') {
      return res.status(401).send('Unauthorized: Invalid or missing API Key.');
    }
  }
  next(); // If authorized or a GET request, proceed
});


// Root routes
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement the following routes:
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// --- START of NEW Implementations ---

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
  
  const { name, description, price, category, inStock } = req.body;

  // Basic validation (you can add more robust validation)
  if (!name || !price || !category) {
    return res.status(400).send('Name, price, and category are required.');
  }

  // ... rest of the code to create and add the new product
});

  const newProduct = {
    id: uuidv4(), // Generate a unique ID for the new product
    name,
    description: description || '', // Default to empty string if not provided
    price,
    category,
    inStock: typeof inStock === 'boolean' ? inStock : true // Default to true if not provided or invalid
  };

  products.push(newProduct);
  res.status(201).json(newProduct); // 201 Created status
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category, inStock } = req.body;

  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex !== -1) {
    // Update the product in place
    products[productIndex] = {
      ...products[productIndex], // Keep existing properties if not provided in body
      name: name || products[productIndex].name,
      description: description || products[productIndex].description,
      price: price || products[productIndex].price,
      category: category || products[productIndex].category,
      inStock: typeof inStock === 'boolean' ? inStock : products[productIndex].inStock
    };
    res.json(products[productIndex]);
  } else {
    res.status(404).send('Product not found');
  }
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const initialLength = products.length;
  products = products.filter(p => p.id !== req.params.id);

  if (products.length < initialLength) {
    res.status(204).send(); // 204 No Content for successful deletion
  } else {
    res.status(404).send('Product not found');
  }
});

// --- END of NEW Implementations ---


// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000 `);
});

// Export the app for testing purposes
module.exports = app;

// 3. Error Handling Middleware
// This must be the last middleware added to the Express app.
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack to the console for debugging
  res.status(500).send('Something went wrong on the server!'); // Send a generic error response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});

// Export the app for testing purposes
module.exports = app;