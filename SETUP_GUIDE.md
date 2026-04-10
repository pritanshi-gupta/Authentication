# CRUD API - Setup & Running Guide

## ✅ Project Status
✅ **All files created successfully**  
✅ **Dependencies installed**  
✅ **Server running on port 5000**  
✅ **Ready for testing**

---

## 🚀 Current Server Status

**URL:** `http://localhost:5000`  
**Port:** 5000  
**Environment:** Development  
**Status:** ✅ Running with auto-reload (nodemon)

### Server Output:
```
Server running on port 5000
Environment: development
⚠ MongoDB connection error: connect ECONNREFUSED
ℹ Server running without database...
```

**Note:** Server is running but MongoDB is not connected. The server will work for testing, but database operations will fail until MongoDB is set up.

---

## 📦 What's Installed

```
✅ express                - Web framework
✅ mongoose              - MongoDB ODM
✅ bcryptjs              - Password hashing
✅ jsonwebtoken          - JWT authentication
✅ cors                  - Cross-Origin Resource Sharing
✅ dotenv                - Environment variables
✅ express-validator     - Input validation
✅ nodemon               - Auto-reload on file changes
```

---

## 🔧 Setup MongoDB (Required for Full Functionality)

### Option 1: Local MongoDB (Windows)

**Step 1: Download MongoDB**
- Visit: https://www.mongodb.com/try/download/community
- Choose Windows installer
- Install with default settings

**Step 2: Start MongoDB Service**
```bash
# MongoDB starts automatically as a Windows service after installation
# Or manually run:
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

**Step 3: Verify Connection**
```bash
# In another terminal:
"C:\Program Files\MongoDB\Server\7.0\bin\mongo.exe"
```

---

### Option 2: MongoDB Atlas (Cloud - Recommended)

**Step 1: Create Free Account**
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up for free

**Step 2: Create Cluster**
- Click "Create a Project"
- Create a cluster (Free tier available)
- Wait for cluster to deploy (~3-5 min)

**Step 3: Get Connection String**
- Go to "Clusters" → Click "Connect"
- Choose "Connect your application"
- Copy connection string

**Step 4: Update .env File**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crud-api
```

**Step 5: Whitelist IP Address**
- In Atlas → Network Access
- Add Current IP or 0.0.0.0/0 (allow all)

---

## 🔄 Testing the API

### Using Visual Studio Code REST Client

1. **Install Extension**: REST Client (by Huachao Mao)
2. **Open file**: `REQUESTS.http`
3. **Click "Send Request"** above any request

### Using Postman

1. **Download**: https://www.postman.com/downloads/
2. **Import Collection**: 
   - New → Request
   - Add requests from `REQUESTS.http`
3. **Add Authorization Header**:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### Using PowerShell (Advanced)

```powershell
# Register User
$body = @{
    name = "John Doe"
    email = "john@example.com"
    password = "Password@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method Post `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body `
  -UseBasicParsing | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

---

## 📝 API Quick Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints (Public)
```
POST   /auth/register      - Register new user
POST   /auth/login         - Login (returns JWT token)
```

### Product Endpoints (Requires JWT Token)
```
GET    /products           - Get all products
GET    /products/:id       - Get product by ID
POST   /products           - Create product (admin only)
PUT    /products/:id       - Update product (admin/creator)
DELETE /products/:id       - Delete product (admin/creator)
```

---

## 🔐 Authorization Rules

| Endpoint | User | Admin | Notes |
|----------|------|-------|-------|
| POST /auth/register | ✅ | ✅ | Public |
| POST /auth/login | ✅ | ✅ | Public |
| GET /products | ✅ | ✅ | Auth Required |
| GET /products/:id | ✅ | ✅ | Auth Required |
| POST /products | ❌ | ✅ | Admin Only |
| PUT /products/:id | ⚠️ | ✅ | Admin or Creator |
| DELETE /products/:id | ⚠️ | ✅ | Admin or Creator |

---

## 🧪 Test Endpoints

### Mock Test (Without MongoDB)

Test that server is running:
```
GET http://localhost:5000/api/health
```

Expected Response:
```json
{
  "message": "Server is running"
}
```

### Full Test (Requires MongoDB)

1. **Register User**:
   ```
   POST http://localhost:5000/api/auth/register
   
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "Password@123"
   }
   ```

2. **Login**:
   ```
   POST http://localhost:5000/api/auth/login
   
   {
     "email": "john@example.com",
     "password": "Password@123"
   }
   ```

3. **Save Token** from login response

4. **Create Product** (with admin token):
   ```
   POST http://localhost:5000/api/products
   Header: Authorization: Bearer YOUR_TOKEN
   
   {
     "name": "Laptop",
     "description": "High performance",
     "price": 1200,
     "stock": 50,
     "category": "Electronics"
   }
   ```

---

## 📂 Project Structure

```
crud-api/
├── config/
│   └── database.js              ← MongoDB connection
├── controllers/
│   ├── authController.js        ← Register, Login logic
│   └── productController.js     ← CRUD operations
├── middleware/
│   ├── auth.js                  ← JWT verification
│   └── authorize.js             ← Role-based access
├── models/
│   ├── User.js                  ← User schema
│   └── Product.js               ← Product schema
├── routes/
│   ├── auth.js                  ← Auth endpoints
│   └── product.js               ← Product endpoints
├── .env                         ← Configuration
├── package.json                 ← Dependencies
├── server.js                    ← Main Express app
├── README.md                    ← Full documentation
├── QUICKSTART.md                ← 5-minute guide
├── REQUESTS.http                ← API examples
└── SETUP_GUIDE.md              ← This file
```

---

## 🛠️ Commands

### Start Development Server (With Auto-Reload)
```bash
npm run dev
```

### Start Production Server
```bash
npm start
```

### Install Dependencies
```bash
npm install
```

### Fix Security Vulnerabilities
```bash
npm audit fix --force
```

---

## ⚙️ Environment Variables

Edit `.env` file to configure:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/crud-api
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/crud-api

# JWT
JWT_SECRET=your_jwt_secret_change_this_in_production_12345
JWT_EXPIRE=24h

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
```

⚠️ **Important**: Change `JWT_SECRET` in production!

---

## 🐛 Troubleshooting

### Issue: "MongoDB connection error"
**Solution:** 
- Install MongoDB locally, OR
- Use MongoDB Atlas (cloud)
- See "Setup MongoDB" section above

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change in .env:
PORT=5001

# Or kill process:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "npm: File cannot be loaded" (PowerShell)
**Solution:**
```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

### Issue: "Token is not valid"
**Solution:**
- Register/login again to get new token
- Add `Authorization: Bearer {token}` to request headers

### Issue: "User already exists"
**Solution:**
- Use different email address
- Or check if user was already created

---

## 🚀 Next Steps

1. **Setup MongoDB** (see "Setup MongoDB" section)
2. **Test Registration**: POST /auth/register
3. **Test Login**: POST /auth/login
4. **Create Products**: POST /products
5. **Add Features**:
   - Testing (Jest)
   - Pagination
   - Search/Filter
   - Email verification
   - Password reset

---

## 📚 Documentation Files

- **README.md** - Complete API documentation
- **QUICKSTART.md** - 5-minute setup
- **REQUESTS.http** - API test examples
- **SETUP_GUIDE.md** - This file

---

## ✨ Features Implemented

✅ User Registration  
✅ User Login with JWT  
✅ Role-based Authorization  
✅ Create Products  
✅ Read Products  
✅ Update Products  
✅ Delete Products (Soft Delete)  
✅ Password Hashing (Bcrypt)  
✅ Error Handling  
✅ CORS Enabled  
✅ Auto-reload (Nodemon)  

---

## 📞 Support

For issues:
1. Check the error message in terminal
2. Review REQUESTS.http for examples
3. Ensure MongoDB is running
4. Verify JWT token is included in headers
5. Check browser DevTools (Network tab)

---

**Last Updated:** April 10, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready for Development

Good luck! 🎉
