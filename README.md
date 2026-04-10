# CRUD API with Authentication & Authorization

A complete RESTful API with user authentication, authorization, and CRUD operations for managing products.

## Features

✅ **Authentication**: JWT-based user authentication  
✅ **Authorization**: Role-based access control (User, Admin)  
✅ **CRUD Operations**: Create, Read, Update, Delete products  
✅ **Soft Delete**: Products are marked as inactive instead of hard deleted  
✅ **Password Hashing**: Bcrypt for secure password storage  
✅ **Error Handling**: Comprehensive error handling  
✅ **CORS**: Cross-Origin Resource Sharing enabled  

---

## Project Structure

```
crud-api/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Auth logic (register, login)
│   └── productController.js # Product CRUD logic
├── middleware/
│   ├── auth.js              # JWT verification
│   └── authorize.js         # Role-based authorization
├── models/
│   ├── User.js              # User schema
│   └── Product.js           # Product schema
├── routes/
│   ├── auth.js              # Auth endpoints
│   └── product.js           # Product endpoints
├── .env                      # Environment variables
├── package.json             # Dependencies
└── server.js                # Main server file
```

---

## Installation Steps

### Step 1: Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 2: Clone/Open Project
```bash
cd crud-api
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Configure Environment Variables
Edit `.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crud-api
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
JWT_EXPIRE=24h
```

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crud-api
```

### Step 5: Start MongoDB
```bash
# If using local MongoDB
mongod
```

### Step 6: Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

✅ Server will be running on `http://localhost:5000`

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## Product Endpoints

### Authorization Header
All product endpoints require authentication. Include JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### 1. Create Product
**POST** `/products`  
**Required Role:** Admin

**Request Body:**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1200,
  "stock": 50,
  "category": "Electronics"
}
```

**Response (201):**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "64abc456...",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200,
    "stock": 50,
    "category": "Electronics",
    "createdBy": "64abc123...",
    "isActive": true,
    "createdAt": "2024-01-10T10:30:00Z",
    "updatedAt": "2024-01-10T10:30:00Z"
  }
}
```

---

### 2. Get All Products
**GET** `/products`  
**Required Role:** Any authenticated user

**Response (200):**
```json
{
  "message": "Products fetched successfully",
  "count": 5,
  "products": [
    {
      "_id": "64abc456...",
      "name": "Laptop",
      "price": 1200,
      "stock": 50,
      "category": "Electronics",
      "createdBy": {
        "_id": "64abc123...",
        "name": "Admin User",
        "email": "admin@example.com"
      }
    }
  ]
}
```

---

### 3. Get Product by ID
**GET** `/products/:id`  
**Required Role:** Any authenticated user

**Response (200):**
```json
{
  "message": "Product fetched successfully",
  "product": {
    "_id": "64abc456...",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200,
    "stock": 50,
    "category": "Electronics",
    "createdBy": {
      "_id": "64abc123...",
      "name": "Admin User",
      "email": "admin@example.com"
    }
  }
}
```

---

### 4. Update Product
**PUT** `/products/:id`  
**Required Role:** Admin or Creator

**Request Body:**
```json
{
  "price": 1199.99,
  "stock": 45
}
```

**Response (200):**
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "64abc456...",
    "name": "Laptop",
    "price": 1199.99,
    "stock": 45,
    "category": "Electronics"
  }
}
```

---

### 5. Delete Product
**DELETE** `/products/:id`  
**Required Role:** Admin or Creator

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Authorization Rules

| Endpoint | User | Admin | Notes |
|----------|------|-------|-------|
| POST /auth/register | ✅ | ✅ | Public |
| POST /auth/login | ✅ | ✅ | Public |
| GET /products | ✅ | ✅ | Authenticated |
| GET /products/:id | ✅ | ✅ | Authenticated |
| POST /products | ❌ | ✅ | Admin only |
| PUT /products/:id | ⚠️ | ✅ | Admin or Creator |
| DELETE /products/:id | ⚠️ | ✅ | Admin or Creator |

✅ = Allowed  
❌ = Not Allowed  
⚠️ = Conditional (need to be creator or admin)

---

## Testing with Postman

### Import Collection
1. Open Postman
2. Create new collection "CRUD API"
3. Add requests as per API Documentation above

### Common Headers
```
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

---

## Error Handling

### 400 - Bad Request
```json
{
  "message": "Please provide email and password"
}
```

### 401 - Unauthorized
```json
{
  "message": "Token is not valid"
}
```

### 403 - Forbidden
```json
{
  "message": "Access denied. Required role(s): admin"
}
```

### 404 - Not Found
```json
{
  "message": "Product not found"
}
```

### 500 - Server Error
```json
{
  "message": "Internal server error",
  "error": "Error details"
}
```

---

## Security Best Practices

1. **Environment Variables**: Never commit `.env` file to version control
2. **JWT Secret**: Change `JWT_SECRET` in production
3. **Password**: Use strong passwords with special characters
4. **HTTPS**: Use HTTPS in production
5. **Rate Limiting**: Consider adding rate limiting for production
6. **Input Validation**: Validate all inputs on backend and frontend

---

## Next Steps / Additional Tasks

Once this project is complete, consider:

1. **Testing**: Add unit tests with Jest
2. **Pagination**: Add pagination for product list
3. **Filtering & Search**: Filter products by category, price range
4. **File Upload**: Allow product image uploads
5. **Email Verification**: Verify user email during registration
6. **Password Reset**: Add forgot password functionality
7. **Audit Logs**: Log all CRUD operations
8. **Rate Limiting**: Prevent brute force attacks
9. **API Documentation**: Generate API docs with Swagger/OpenAPI
10. **Docker**: Containerize the application

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### JWT Token Expired
- Register/login again to get a new token
- Increase `JWT_EXPIRE` in `.env` if needed

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### Dependencies Issue
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## License
ISC

---

## Support
For issues or questions, please create an issue in the repository.
