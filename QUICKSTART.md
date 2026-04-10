# Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)
- npm or yarn

---

## Step 1: Install Dependencies
```bash
npm install
```

---

## Step 2: Configure Environment
Update `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crud-api
JWT_SECRET=your_secret_key
```

---

## Step 3: Start Server
```bash
npm run dev
```

✅ Server running on: `http://localhost:5000`

---

## Step 4: Test the API

### 4.1 Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"Password@123"
  }'
```

**Save the token from response!**

### 4.2 Create Product (Admin)
First register as admin:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Admin",
    "email":"admin@example.com",
    "password":"Admin@123",
    "role":"admin"
  }'
```

Then create product:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name":"Laptop",
    "description":"Amazing laptop",
    "price":1200,
    "stock":50,
    "category":"Electronics"
  }'
```

### 4.3 Get All Products
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📁 Project Structure

```
crud-api/
├── models/          # Database schemas
├── controllers/     # Business logic
├── routes/          # API endpoints
├── middleware/      # Auth & Authorization
├── config/          # Database config
├── .env             # Environment variables
└── server.js        # Main server
```

---

## 🔐 Key Features

| Feature | Status |
|---------|--------|
| User Registration | ✅ |
| User Login | ✅ |
| JWT Authentication | ✅ |
| Role-based Authorization | ✅ |
| Create Products | ✅ |
| Read Products | ✅ |
| Update Products | ✅ |
| Delete Products (Soft) | ✅ |

---

## 📚 API Endpoints

### Public (No Auth Needed)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Protected (Auth Required)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin/creator)
- `DELETE /api/products/:id` - Delete product (admin/creator)

---

## 🐛 Troubleshooting

**Q: MongoDB connection error?**
- Ensure MongoDB is running
- Check connection string in `.env`

**Q: Port already in use?**
- Change PORT in `.env`
- Or kill process using: `lsof -ti:5000 | xargs kill -9`

**Q: Token expired?**
- Login again to get new token

---

## 📝 Next Steps

1. Read full [README.md](./README.md)
2. Check [REQUESTS.http](./REQUESTS.http) for more examples
3. Add tests
4. Deploy to production
5. Add more features

---

## 📞 Need Help?

- Check README.md for detailed documentation
- Review REQUESTS.http for API examples
- Check error messages in console/Postman

**Happy Coding!** 🚀
