# ⚡ Electricity Bill Tracker API

A RESTful API backend system built with Node.js, Express.js, and MongoDB that helps households monitor their monthly electricity usage, track meter readings, and estimate bills before they arrive.

---

## 📌 Problem Description

Many households receive unexpectedly high electricity bills because they have no way to monitor their monthly usage in real time. There is no simple system available to:

- Record monthly meter readings
- Track consumption history over time
- Estimate bills before they officially arrive

This leads to financial surprises and an inability to manage energy consumption effectively.

---

## 💡 Proposed Solution

The **Electricity Bill Tracker API** allows users to:

- Log monthly meter readings (previous and current units)
- Automatically calculate units consumed
- Estimate the electricity bill based on a rate per unit
- View full consumption history
- Analyze usage patterns with a summary endpoint
- Update or delete incorrect readings

---

## ✨ Features

- ✅ Add new monthly meter readings
- ✅ Auto-calculate units consumed and estimated bill
- ✅ View all readings or filter by user
- ✅ Update existing readings with recalculated values
- ✅ Delete incorrect or duplicate entries
- ✅ Get a full usage summary per user (total units, total bill, averages)
- ✅ Input validation and proper error handling
- ✅ RESTful API architecture

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Web framework for building REST APIs |
| MongoDB | NoSQL database for storing readings |
| Mongoose | MongoDB object modeling for Node.js |
| dotenv | Environment variable management |
| Postman | API testing and documentation |
| Git & GitHub | Version control and code hosting |

---

## 📁 Project Structure

```
electricity-bill-tracker/
├── controllers/
│   └── readingController.js   # Business logic for all endpoints
├── models/
│   └── MeterReading.js        # MongoDB schema and model
├── routes/
│   └── readings.js            # API route definitions
├── .env                       # Environment variables (not uploaded)
├── .gitignore                 # Files ignored by git
├── package.json               # Project dependencies
├── server.js                  # Entry point - server setup
└── README.md                  # Project documentation
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

### 1. Create a New Reading
**POST** `/api/readings`

Creates a new meter reading. Units consumed and estimated bill are calculated automatically.

**Request Body:**
```json
{
  "userId": "user001",
  "month": "2026-04",
  "previousUnits": 1250,
  "currentUnits": 1480,
  "ratePerUnit": 10,
  "notes": "April reading"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "6638f1a2c3d4e5f6a7b8c9d0",
    "userId": "user001",
    "month": "2026-04",
    "previousUnits": 1250,
    "currentUnits": 1480,
    "unitsConsumed": 230,
    "ratePerUnit": 10,
    "estimatedBill": 2300,
    "notes": "April reading",
    "createdAt": "2026-04-14T10:30:00.000Z"
  }
}
```

---

### 2. Get All Readings
**GET** `/api/readings`

Returns all meter readings in the database.

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [ ...array of readings... ]
}
```

---

### 3. Get Readings By User
**GET** `/api/readings/user/:userId`

Returns all readings for a specific user.

**Example:** `GET /api/readings/user/user001`

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [ ...readings for user001... ]
}
```

---

### 4. Get User Summary
**GET** `/api/readings/user/:userId/summary`

Returns total usage stats and averages for a specific user.

**Example:** `GET /api/readings/user/user001/summary`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "user001",
    "totalReadings": 3,
    "totalUnitsConsumed": 680,
    "totalEstimatedBill": 6800,
    "averageMonthlyUnits": "226.67",
    "averageMonthlyBill": "2266.67"
  }
}
```

---

### 5. Get Single Reading By ID
**GET** `/api/readings/:id`

Returns one specific reading by its MongoDB ID.

**Example:** `GET /api/readings/6638f1a2c3d4e5f6a7b8c9d0`

**Success Response (200):**
```json
{
  "success": true,
  "data": { ...single reading object... }
}
```

---

### 6. Update a Reading
**PUT** `/api/readings/:id`

Updates an existing reading. Bill and units are automatically recalculated.

**Example:** `PUT /api/readings/6638f1a2c3d4e5f6a7b8c9d0`

**Request Body (send only fields to update):**
```json
{
  "currentUnits": 1500,
  "notes": "Corrected reading"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { ...updated reading... }
}
```

---

### 7. Delete a Reading
**DELETE** `/api/readings/:id`

Deletes a reading permanently.

**Example:** `DELETE /api/readings/6638f1a2c3d4e5f6a7b8c9d0`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Reading deleted successfully"
}
```

---

### ❌ Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Description of what went wrong"
}
```

| Status Code | Meaning |
|---|---|
| 400 | Bad request / validation failed |
| 404 | Resource not found |
| 500 | Internal server error |

---

## ⚙️ Setup Instructions

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)
- [Postman](https://www.postman.com/downloads/) (for testing)

---

### Step 1 — Clone The Repository
```bash
git clone https://github.com/ManinduDeshan55/Electricity-Bill-Tracker.git
cd Electricity-Bill-Tracker
```

### Step 2 — Install Dependencies
```bash
npm install
```

### Step 3 — Create Environment File
Create a `.env` file in the root folder:
```
MONGO_URI=mongodb://localhost:27017/electricity-tracker
PORT=5000
```

### Step 4 — Start MongoDB
Make sure MongoDB is running on your machine. On Windows:
```bash
mongod
```

### Step 5 — Run The Project
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

---

## 🚀 How To Run The Project

Once setup is complete:

```bash
# Development mode (auto-restarts on changes)
npm run dev

# Production mode
npm start
```

Open your browser and go to:
```
http://localhost:5000
```

You should see:
```json
{ "message": "Electricity Bill Tracker API is running 🔌" }
```

Use **Postman** to test all the API endpoints listed above.

---

## 👨‍💻 Author

**Manindu Deshan**
2022/ICT/02
Module: Web Services and Technology (IT2234)

---
