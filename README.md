# 🛒 Full-Stack Ecommerce App Practice

This is a full-stack CRUD ecommerce practice project using:

- 🔧 **Backend**: Express + Prisma + PostgreSQL
- 🖥️ **Frontend**: React + Axios + Vite

---

## 📁 Folder Structure

```
ecommerce-backend-practice/
├── backend/             # Express + Prisma API
├── frontend/            # React client with Axios
└── README.md
```

---

## ⚙️ Setup Instructions

### 🐘 PostgreSQL Database

Use [Railway](https://railway.app) or [Supabase](https://supabase.com) and set this in `.env` in `/backend`:

```env
DATABASE_URL=postgresql://your-user:your-pass@host:port/dbname
PORT=4000
```

---

### 🚀 Backend Setup

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

Test in browser:  
[http://localhost:4000/users](http://localhost:4000/users)

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs at:  
[http://localhost:5173](http://localhost:5173)

---

## ✨ Features

- Create, read, and delete:
  - Users
  - Products
  - Orders
- Live updates from database
- Prisma manages SQL relationships
- Clean, testable REST API
- Simple UI to practice full-stack skills

---

## 🧠 Tech Stack

| Layer     | Tech                         |
|-----------|------------------------------|
| Frontend  | React + Axios + Vite         |
| Backend   | Express.js + Prisma ORM      |
| Database  | PostgreSQL (via Railway)     |
| DevTools  | Nodemon, Axios, Prisma Studio |

---

## 🙋 Author

**Al Jubair Hossain**  
🔗 GitHub: [github.com/XessX](https://github.com/XessX)

---
