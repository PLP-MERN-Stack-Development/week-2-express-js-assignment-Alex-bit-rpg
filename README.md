# Product API

This is a simple RESTful API for managing products, built with Node.js and Express. It provides endpoints for retrieving, creating, updating, and deleting product information.

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [GET /api/products](#get-apiproducts)
  - [GET /api/products/:id](#get-apiproductsid)
  - [POST /api/products](#post-apiproducts)
  - [PUT /api/products/:id](#put-apiproductsid)
  - [DELETE /api/products/:id](#delete-apiproductsid)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Middleware](#middleware)

## Features

* **CRUD Operations:** Full Create, Read, Update, and Delete functionality for products.
* **In-Memory Database:** Uses a simple in-memory array for product storage (data is reset on server restart).
* **Request Logging:** Custom middleware to log incoming requests.
* **Basic Authentication:** API key-based authentication for modifying product data.
* **Error Handling:** Generic error handling for server-side issues.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository** (if applicable, otherwise download the `server.js` file):
    ```bash
    git clone <your-repository-url>
    cd product-api # or whatever your project directory is named
    ```

2.  **Install Node.js:** If you don't have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/).

3.  **Install Dependencies:** Navigate to your project directory in the terminal and install the required Node.js packages:
    ```bash
    npm install express body-parser uuid
    ```

## Running the Server

To start the API server:

1.  Open your terminal or command prompt.
2.  Navigate to the directory where you saved `server.js`.
3.  Run the following command:
    ```bash
    node server.js
    ```
    You should see the message: `Server is running on http://localhost:3000`

The API will be accessible at `http://localhost:3000`.

## API Endpoints

All API endpoints are prefixed with `/api`.

### GET /api/products

* **Description:** Retrieves a list of all products.
* **Method:** `GET`
* **URL:** `http://localhost:3000/api/products`
* **Authentication:** Not required.
* **Response (Status: 200 OK):**
    ```json
    [
      {
        "id": "1",
        "name": "Laptop",
        "description": "High-performance laptop with 16GB RAM",
        "price": 1200,
        "category": "electronics",
        "inStock": true
      },
      {
        "id": "2",
        "name": "Smartphone",
        "description": "Latest model with 128GB storage",
        "price": 800,
        "category": "electronics",
        "inStock": true
      }
    ]
    ```

### GET /api/products/:id

* **Description:** Retrieves a specific product by its ID.
* **Method:** `GET`
* **URL:** `http://localhost:3000/api/products/{id}` (e.g., `http://localhost:3000/api/products/1`)
* **URL Parameters:**
    * `id` (string): The unique identifier of the product.
* **Authentication:** Not required.
* **Response (Status: 200 OK):**
    ```json
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
    ```
* **Error Response (Status: 404 Not Found):**
    ```
    Product not found
    ```

### POST /api/products

* **Description:** Creates a new product.
* **Method:** `POST`
* **URL:** `http://localhost:3000/api/products`
* **Authentication:** Required (API Key).
    * **Header:** `x-api-key: mysecretapikey`
* **Request Headers:**
    * `Content-Type: application/json`
* **Request Body (JSON):**
    ```json
    {
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with customizable buttons",
      "price": 35.50,
      "category": "computer accessories",
      "inStock": true
    }
    ```
    **Required Fields:** `name`, `price`, `category`.
* **Response (Status: 201 Created):**
    ```json
    {
      "id": "a1b2c3d4-e5f6-4789-abcd-ef1234567890",
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with customizable buttons",
      "price": 35.50,
      "category": "computer accessories",
      "inStock": true
    }
    ```
* **Error Response (Status: 400 Bad Request):**
    ```
    Name, price, and category are required.
    ```
* **Error Response (Status: 401 Unauthorized):**
    ```
    Unauthorized: Invalid or missing API Key.
    ```

### PUT /api/products/:id

* **Description:** Updates an existing product by its ID.
* **Method:** `PUT`
* **URL:** `http://localhost:3000/api/products/{id}` (e.g., `http://localhost:3000/api/products/1`)
* **URL Parameters:**
    * `id` (string): The unique identifier of the product to update.
* **Authentication:** Required (API Key).
    * **Header:** `x-api-key: mysecretapikey`
* **Request Headers:**
    * `Content-Type: application/json`
* **Request Body (JSON):** Provide the full product object with updated values.
    ```json
    {
      "name": "Laptop Pro (Updated)",
      "description": "High-performance laptop with 32GB RAM and 1TB SSD",
      "price": 1500,
      "category": "electronics",
      "inStock": true
    }
    ```
* **Response (Status: 200 OK):**
    ```json
    {
      "id": "1",
      "name": "Laptop Pro (Updated)",
      "description": "High-performance laptop with 32GB RAM and 1TB SSD",
      "price": 1500,
      "category": "electronics",
      "inStock": true
    }
    ```
* **Error Response (Status: 404 Not Found):**
    ```
    Product not found
    ```
* **Error Response (Status: 400 Bad Request):**
    ```
    Invalid data type for name, price, or category.
    ```
* **Error Response (Status: 401 Unauthorized):**
    ```
    Unauthorized: Invalid or missing API Key.
    ```

### DELETE /api/products/:id

* **Description:** Deletes a product by its ID.
* **Method:** `DELETE`
* **URL:** `http://localhost:3000/api/products/{id}` (e.g., `http://localhost:3000/api/products/3`)
* **URL Parameters:**
    * `id` (string): The unique identifier of the product to delete.
* **Authentication:** Required (API Key).
    * **Header:** `x-api-key: mysecretapikey`
* **Response (Status: 204 No Content):**
    * No response body for successful deletion.
* **Error Response (Status: 404 Not Found):**
    ```
    Product not found
    ```
* **Error Response (Status: 401 Unauthorized):**
    ```
    Unauthorized: Invalid or missing API Key.
    ```

## Authentication

Authentication for `POST`, `PUT`, and `DELETE` requests is handled via a custom API key middleware.

* **Header Name:** `x-api-key`
* **Expected Value:** `mysecretapikey`

Requests to authenticated endpoints without this header or with an incorrect value will receive a `401 Unauthorized` response.

## Error Handling

A generic error handling middleware is implemented at the end of the middleware pipeline. If any unhandled errors occur during request processing, the server will respond with a `500 Internal Server Error`.

* **Error Response (Status: 500 Internal Server Error):**
    ```
    Something went wrong on the server!
    ```
    (Note: Detailed error messages are logged to the server console for debugging but are not exposed to the client in this generic response.)

## Middleware

The following custom middleware functions are implemented:

* **Request Logging:** Logs the HTTP method and URL of every incoming request to the server console.
    * Example log: `[2025-06-24T07:44:19.000Z] GET /api/products`
* **Authentication:** Checks for a valid API key (`x-api-key: mysecretapikey`) for `POST`, `PUT`, and `DELETE` requests to `/api/products` routes.
* **Error Handling:** Catches unhandled errors and sends a `500 Internal Server Error` response.

---

**Remember to:**

1.  **Create a new file named `README.md`** in the root of your project directory.
2.  **Copy and paste** the entire content above into your `README.md` file.
3.  **Replace `<your-repository-url>`** if you are using Git and cloning.
4.  **Ensure your `server.js` file has all the implemented routes and middleware** as discussed in our previous exchange.

This `README.md` should fulfill the documentation requirements for your submission!
