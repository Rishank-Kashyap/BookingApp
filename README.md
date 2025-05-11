
# 🗓️ Activity Booking App

A backend web application to list, add, and book activities like cricket matches, movies, football games, etc. Users can sign up, log in, view available events, and make bookings.

---

## 📁 Project Structure

```
ActivityBookingApp/
├── controllers/
│   └── auth.controller.js
│   └── activity.controller.js
├── routes/
│   └── auth.route.js
│   └── activity.route.js
├── models/
│   └── user.model.js
│   └── activity.model.js
│   └── booking.model.js
├── middlewares/
│   └── auth.js
├── config/
│   └── database.js
├── utils/
│   └── validation.js
├── .env
├── index.js
├── package.json
```

---

## 🚀 Features

* User signup, login, and logout with JWT authentication 
* Add, list, and book activities
* Secure booking route (protected by middleware)
* Activity validation
* Get your own bookings (`/activities/bookings`)

---

## ⚙️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose)
* **Auth**: JWT 
* **Validation**: `validator` package

---


## 🛠️ Setup Instructions (Local Env)

### 1. Clone the Repository

```bash
git clone https://github.com/Rishank-Kashyap/BookingApp.git

cd ActivityBookingApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file at the root:

```env
PORT=5000
MONGODB_URI=<MONGODB_URI>
JWT_SECRET=<JWT_SECRET>
```

### 4. Run the Server

```bash
npm run dev
```

Server will start on: `http://localhost:5000`

---

## 📬 API Endpoints

### 👤 Auth

* `POST /user/signup` – Register a user
* `POST /user/login` – Login a user
* `POST /user/logout` – Logout (clears cookie)

### 🎯 Activities

* `GET /activities/` – List all available activities
* `POST /activities/add` – Add a new activity
* `POST /activities/book` – Book an activity (**requires login**)
* `GET /activities/bookings` – View logged-in user's bookings

---

## 📮 Sample Postman Inputs

### Register User

```json
POST /user/signup
{
  "firstName": "Rishank",
  "lastName": "Kashyap",
  "emailId": "rishank@example.com",
  "password": "Rishank@123",
  "phoneNumber": "7428019713"
}
```

### Add Activity

```json
POST /activities/add
{
  "title": "Cricket Match",
  "description": "A local tournament final between top teams.",
  "location": "Delhi Stadium",
  "date": "2025-05-20",
  "time": "17:00"
}
```

### Book Activity

```json
POST /activities/book
{
  "activityId": <activityId>
}
```

---




---

