# 🏡 StayEase

A **Full-Stack StayEase** web application that allows users to explore, book, and manage vacation rentals just like StayEase.  
Built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** with a modern and responsive UI.

---

## 🚀 Features

✅ User authentication (signup/login with JWT)  
✅ List and manage rental properties  
✅ Search and filter stays by location, date, and price  
✅ Add photos and details for your listings  
✅ Booking system with date availability checks  
✅ Wishlist (favorite) functionality  
✅ Responsive and modern UI using **Tailwind CSS**  
✅ Secure RESTful API built with **Express.js**  
✅ MongoDB database for scalable data storage  

---

## 🧱 Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ODM)  
**Authentication:** JSON Web Token (JWT)  
**Other Tools:** Nodemon, dotenv, bcryptjs  

---

## 📁 Project Structure

```
StayEase/
│
├── backend/               # Node.js + Express API
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes (auth, bookings, listings)
│   ├── controllers/       # Business logic
│   ├── config/            # MongoDB and environment setup
│   └── server.js          # Server entry point
│
├── frontend/              # React.js + Tailwind CSS app
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page views (Home, Login, Booking, etc.)
│   │   ├── services/      # API service functions
│   │   └── App.jsx        # Main app file
│   └── package.json
│
└── README.md              # Project documentation
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/palmiyani/Airbnb_Clone.git
cd Airbnb_Clone
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm start
```

---

## 📸 Screenshots

_Add your app screenshots here (Home Page, Booking Page, etc.)_

```
![Homepage](screenshots/home.png)
![Booking](screenshots/booking.png)
```

---

## 💡 Future Enhancements

- Implement online payments (Stripe/PayPal integration)  
- Add host dashboard with revenue analytics  
- Include Google Maps API for better location search  
- Add advanced filters and booking calendar  

---

## 👨‍💻 Creator

**Created by [Pal Miyani](https://github.com/palmiyani)**  
🌟 Star this repo if you found it useful!

---

