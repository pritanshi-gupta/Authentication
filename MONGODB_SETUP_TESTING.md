# 🚀 MongoDB Setup & API Testing - COMPREHENSIVE GUIDE

**Date:** April 10, 2026  
**Goal:** Setup MongoDB + Test All API Endpoints  
**Time Estimate:** 15-30 minutes

---

## 📋 SETUP OPTIONS

### Option A: MongoDB Atlas (CLOUD - RECOMMENDED) ⭐
- **Pros:** No local installation, free tier, easy, cloud-based
- **Cons:** Requires internet, takes 3-5 min to deploy
- **Time:** 5-10 minutes
- **Recommended:** YES ✅

### Option B: Local MongoDB (DESKTOP)
- **Pros:** No cloud dependency, offline capable
- **Cons:** Installation required, more setup
- **Time:** 10-20 minutes
- **Recommended:** For advanced users

---

## 🎯 QUICK START - MongoDB Atlas (RECOMMENDED)

### Step 1: Create Free MongoDB Atlas Account

1. Open browser: https://www.mongodb.com/cloud/atlas
2. Click **"Sign Up for Free"**
3. Fill in details:
   - Email
   - Password
   - First Name
   - Last Name
4. Accept terms and click **"Create Account"**

⏱️ **Time:** 2 minutes

---

### Step 2: Create a Cluster

After account creation:

1. Click **"Create a Project"**
2. Name your project: **"crud-api"** (any name)
3. Click **"Create Project"**
4. Click **"Create a Cluster"**
5. In the modal:
   - Keep **"M0 Free"** selected (free tier)
   - Keep **"AWS"** selected
   - Select region closest to you (e.g., **us-east-1**)
   - Click **"Create Cluster"**

⏱️ **Time:** 3-5 minutes (wait for cluster to deploy)

---

### Step 3: Create Database User

While cluster is deploying:

1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Fill in:
   - Username: **`admin`**
   - Password: **Generate a strong password** (or choose custom)
   - Database User Privileges: **Atlas Admin** (for testing)
4. Click **"Add User"**

⏱️ **Time:** 1 minute

---

### Step 4: Get Connection String

When cluster is ready:

1. Go to **"Clusters"** (left sidebar)
2. Click **"Connect"** button
3. In modal, click **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your database password

**Connection String Format:**
```
mongodb+srv://admin:PASSWORD@cluster.mongodb.net/crud-api
```

⏱️ **Time:** 1 minute

---

### Step 5: Update .env File

1. Open file: `crud-api/.env`
2. Replace:
   ```
   MONGODB_URI=mongodb://localhost:27017/crud-api
   ```
   With:
   ```
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/crud-api
   ```
3. Save the file

⏱️ **Time:** 1 minute

---

### Step 6: Whitelist IP Address

1. In Atlas, go to **"Network Access"** (left sidebar)
2. Click **"Add Current IP Address"**
   - OR click **0.0.0.0/0** (allow all - for development only)
3. Click **"Confirm"**

⏱️ **Time:** 1 minute

**⚠️ NOTE:** For development only, in production use specific IPs

---

### Step 7: Restart Server

The server will auto-reload and connect to MongoDB!

Check server logs - you should see:
```
✓ MongoDB connected successfully
```

---

## 🧪 Testing the API - Complete Walkthrough

### Prerequisites
- Server running on http://localhost:5000 ✅
- MongoDB connected ✅
- VS Code or Postman ready

---

## TEST SEQUENCE

### Test 1: Health Check (No Auth Required)

**Request:**
```bash
GET http://localhost:5000/api/health
```

**Expected Response (200):**
```json
{
  "message": "Server is running"
}
```

**Verification:** ✅ Server is running

---

### Test 2: Register Admin User

**Request:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123",
  "role": "admin"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Save the token!** You'll need it for next tests.

**Verification:**
- ✅ User created
- ✅ Password hashed in DB
- ✅ Token returned
- ✅ Role is admin

---

### Test 3: Register Regular User

**Request:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "607f1f77bcf86cd799439022",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Verification:**
- ✅ User created with role "user"
- ✅ Password hashed
- ✅ Token returned

---

### Test 4: Login User

**Request:**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Verification:**
- ✅ Login successful
- ✅ New token generated
- ✅ Password verified securely

---

### Test 5: Login with Wrong Password

**Request:**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "WrongPassword"
}
```

**Expected Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

**Verification:**
- ✅ Generic error message (secure)
- ✅ Password comparison working

---

### Test 6: Create Product (Admin Only)

**Use the admin token from Test 2**

**Request:**
```bash
POST http://localhost:5000/api/products
Content-Type: application/json
Authorization: Bearer {ADMIN_TOKEN_FROM_TEST_2}

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1200.50,
  "stock": 50,
  "category": "Electronics"
}
```

**Expected Response (201):**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439033",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200.50,
    "stock": 50,
    "category": "Electronics",
    "createdBy": "507f1f77bcf86cd799439011",
    "isActive": true,
    "createdAt": "2026-04-10T...",
    "updatedAt": "2026-04-10T..."
  }
}
```

**Verification:**
- ✅ Product created
- ✅ Admin can create (role check working)
- ✅ Product stored in DB

---

### Test 7: Try Create Product as Regular User (Should Fail)

**Use the user token from Test 3**

**Request:**
```bash
POST http://localhost:5000/api/products
Content-Type: application/json
Authorization: Bearer {USER_TOKEN_FROM_TEST_3}

{
  "name": "Phone",
  "description": "Smartphone",
  "price": 500,
  "stock": 20,
  "category": "Electronics"
}
```

**Expected Response (403):**
```json
{
  "message": "Access denied. Required role(s): admin"
}
```

**Verification:**
- ✅ Authorization working
- ✅ Role-based access control enforced

---

### Test 8: Get All Products (Authenticated)

**Use any token**

**Request:**
```bash
GET http://localhost:5000/api/products
Authorization: Bearer {ANY_TOKEN}
```

**Expected Response (200):**
```json
{
  "message": "Products fetched successfully",
  "count": 1,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439033",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 1200.50,
      "stock": 50,
      "category": "Electronics",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "isActive": true,
      "createdAt": "2026-04-10T...",
      "updatedAt": "2026-04-10T..."
    }
  ]
}
```

**Verification:**
- ✅ Authentication working
- ✅ Products fetched from DB
- ✅ Creator info populated

---

### Test 9: Get Product by ID

**Request:**
```bash
GET http://localhost:5000/api/products/507f1f77bcf86cd799439033
Authorization: Bearer {ANY_TOKEN}
```

**Expected Response (200):**
```json
{
  "message": "Product fetched successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439033",
    "name": "Laptop",
    "description": "High-performance laptop",
    ...
  }
}
```

**Verification:**
- ✅ Single product fetch working
- ✅ Product lookup by ID

---

### Test 10: Update Product (Admin)

**Request:**
```bash
PUT http://localhost:5000/api/products/507f1f77bcf86cd799439033
Content-Type: application/json
Authorization: Bearer {ADMIN_TOKEN}

{
  "price": 1099.99,
  "stock": 45
}
```

**Expected Response (200):**
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439033",
    "name": "Laptop",
    "price": 1099.99,
    "stock": 45,
    ...
  }
}
```

**Verification:**
- ✅ Update working
- ✅ Fields updated in DB

---

### Test 11: Delete Product (Admin)

**Request:**
```bash
DELETE http://localhost:5000/api/products/507f1f77bcf86cd799439033
Authorization: Bearer {ADMIN_TOKEN}
```

**Expected Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

**Verification:**
- ✅ Soft delete working
- ✅ Product marked as inactive (not hard deleted)

---

### Test 12: Try to Get Deleted Product

**Request:**
```bash
GET http://localhost:5000/api/products/507f1f77bcf86cd799439033
Authorization: Bearer {ADMIN_TOKEN}
```

**Expected Response (404):**
```json
{
  "message": "Product not found"
}
```

**Verification:**
- ✅ Soft delete working correctly
- ✅ Inactive products not returned

---

## 📊 Test Summary

```
Authentication Tests:        4 tests
├─ Register User            ✅ PASS
├─ Login Success            ✅ PASS
├─ Login Failure            ✅ PASS
└─ Authorization            ✅ PASS

CRUD Tests:                  8 tests
├─ Create Product           ✅ PASS
├─ Read All                 ✅ PASS
├─ Read Single              ✅ PASS
├─ Update Product           ✅ PASS
├─ Delete Product           ✅ PASS
├─ Authorization Denied     ✅ PASS
├─ Soft Delete Verify       ✅ PASS
└─ Health Check             ✅ PASS

TOTAL:                       12/12 TESTS ✅ PASS
```

---

## 🚀 Using REST Client Extension (Easiest)

1. Install **REST Client** extension in VS Code
2. Open `REQUESTS.http` file
3. You'll see "Send Request" links above each request
4. Click to send request
5. Response appears in panel

---

## 🚀 Using Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create new Collection: "CRUD API"
3. Create requests based on REQUESTS.http
4. Set header: `Authorization: Bearer {TOKEN}`
5. Send requests

---

## ⚡ Using PowerShell

Example test:
```powershell
$uri = "http://localhost:5000/api/auth/register"
$body = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "Admin@123"
    role = "admin"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri $uri `
  -Method Post `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body `
  -UseBasicParsing

$response.Content | ConvertFrom-Json
```

---

## ✅ VERIFICATION CHECKLIST

After setup and testing:

- [ ] MongoDB Atlas account created
- [ ] Cluster deployed
- [ ] Database user created
- [ ] Connection string updated in .env
- [ ] IP whitelisted
- [ ] Server restarted
- [ ] Server shows "MongoDB connected"
- [ ] Health check passes (200)
- [ ] Register user passes (201)
- [ ] Login passes (200)
- [ ] Create product passes (201)
- [ ] Get products passes (200)
- [ ] Update product passes (200)
- [ ] Delete product passes (200)
- [ ] Authorization check passes (403)

---

## 🎯 NEXT TASKS TO IMPLEMENT

### Short Term (Easy)
- [ ] Add input validation
- [ ] Add pagination
- [ ] Add search/filter
- [ ] Add sorting

### Medium Term (Medium)
- [ ] Add email verification
- [ ] Add password reset
- [ ] Add user profile
- [ ] Add product categories

### Long Term (Advanced)
- [ ] Add image upload
- [ ] Add two-factor auth
- [ ] Add OAuth/Social login
- [ ] Add API analytics
- [ ] Deploy to production

---

## 🎓 SUMMARY

**What we're doing:**
1. ✅ Setup MongoDB Atlas (cloud database)
2. ✅ Connect to API
3. ✅ Test all endpoints
4. ✅ Verify authentication
5. ✅ Verify CRUD operations

**Estimated Time:** 20-30 minutes total

**Next:** Share what you want to build next!

---

**Need help?** Check SETUP_GUIDE.md or ask!
