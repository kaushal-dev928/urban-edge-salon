# 💈 Urban Edge Men's Salon

A full-stack MERN salon appointment booking website with a secure admin dashboard for managing customer appointments.

## 🌐 Project Overview

Urban Edge Men's Salon is a modern men's grooming website where customers can:

- Explore salon services
- View gallery and testimonials
- Book appointments
- Select available date and time slots
- Receive validation for booking details

The admin can:

- Login securely
- View all appointments
- Search appointments
- Filter appointments by status
- Confirm appointments
- Complete appointments
- Cancel appointments
- Delete appointments
- View today's appointments
- View appointment statistics
- Access the public website from the dashboard

---

## ✨ Features

### 👤 Customer

- Responsive salon website
- Hero section
- About section
- Services section
- Gallery
- Testimonials
- Contact information
- Appointment booking
- Service selection
- Date selection
- Available time slots
- Duplicate booking prevention
- Form validation
- Mobile responsive design

### 🔐 Admin

- Admin login
- Protected admin dashboard
- Appointment statistics
- Today's appointment schedule
- Search appointments
- Filter by appointment status
- Confirm appointment
- Complete appointment
- Cancel appointment
- Delete appointment
- Refresh appointment data
- View public website
- Logout
- Responsive admin sidebar

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS3
- JavaScript ES6+

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Database

- MongoDB Atlas

---

## 📁 Project Structure

```text
urban-edge-salon/
│
├── client/
│   │
│   ├── public/
│   │   ├── hero-salon.jpg
│   │   ├── about-salon.jpg
│   │   ├── gallery-1.jpg
│   │   ├── gallery-2.jpg
│   │   ├── gallery-3.jpg
│   │   ├── gallery-4.jpg
│   │   ├── gallery-5.jpg
│   │   └── gallery-6.jpg
│   │
│   └── src/
│       ├── components/
│       │   ├── Navbar/
│       │   ├── Hero/
│       │   ├── About/
│       │   ├── Services/
│       │   ├── ServiceCard/
│       │   ├── Gallery/
│       │   ├── Testimonials/
│       │   ├── TestimonialCard/
│       │   ├── Booking/
│       │   ├── Contact/
│       │   ├── Footer/
│       │   ├── AppointmentList/
│       │   ├── AdminSidebar/
│       │   └── ProtectedRoute.jsx
│       │
│       ├── pages/
│       │   └── Admin/
│       │       ├── AdminDashboard.jsx
│       │       ├── AdminDashboard.css
│       │       ├── AdminLogin.jsx
│       │       └── AdminLogin.css
│       │
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Appointment.js
│   │   └── Admin.js
│   │
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   └── authRoutes.js
│   │
│   ├── server.js
│   ├── seedAdmin.js
│   └── package.json
│
├── .gitignore
└── README.md
