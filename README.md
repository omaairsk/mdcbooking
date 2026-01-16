# Medical Diagnostic Centre – Telemedicine Management System

## Overview

This project is a **hospital-grade telemedicine and online consultation system** built for **Medical Diagnostic Centre**. It allows patients to book video consultations online while enabling hospital staff to securely manage appointments, doctors, statuses, and communications through a protected admin system.

The system is designed with **enterprise-level security**, ensuring that sensitive medical data and backend credentials are never exposed publicly.

---

## Key Features

### Patient Features

* Online video consultation booking
* Selection of consultation type
* Preferred date and time
* Choice of contact method (WhatsApp / SMS / Email)
* Simple, mobile-friendly interface
* No login required for patients

### Admin Features

* Secure admin login (JWT-based)
* Hidden admin access (not visible to patients)
* Real-time appointment management
* Doctor assignment per consultation
* Consultation status workflow:

  * Pending
  * Confirmed
  * Meet Sent
  * Completed
  * Cancelled
* Centralized dashboard for hospital staff

---

## Security Architecture (Hospital-Grade)

This system follows a **backend-driven security model**:

* ❌ Firebase API keys are **never exposed** to the public
* ✅ Firebase Admin SDK runs **only on the server**
* ✅ All database access is controlled via backend APIs
* ✅ JWT authentication protects admin routes
* ✅ Firestore is inaccessible from the public internet

This approach is suitable for real clinical environments.

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Responsive, patient-friendly UI

### Backend

* Node.js
* Express.js
* Firebase Admin SDK
* JWT Authentication

### Database

* Firebase Firestore (Admin SDK only)

### Hosting

* VPS (Ubuntu 20+ recommended)
* Nginx (reverse proxy)
* PM2 (process manager)
* HTTPS (Let’s Encrypt)

---

## Project Structure

```
medical-backend/
│
├── server.js
├── package.json
├── .env                 # Environment variables (never public)
│
├── firebase/
│   └── admin.js         # Firebase Admin SDK initialization
│
├── routes/
│   ├── auth.js          # Admin authentication
│   ├── booking.js       # Patient booking API
│   └── admin.js         # Admin management APIs
│
├── middleware/
│   └── authMiddleware.js
│
└── logs/
```

---

## Environment Variables

Create a `.env` file in the backend root:

```
PORT=5000
JWT_SECRET=your_strong_secret_here
```

Firebase service account credentials must be stored securely on the server and **never committed to version control**.

---

## API Endpoints

### Patient

* `POST /api/booking/book` – Book a consultation

### Admin Authentication

* `POST /api/auth/login` – Admin login

### Admin Operations (Protected)

* `GET /api/admin/consultations` – View all consultations
* `PUT /api/admin/update/:id` – Update status or assign doctor

All admin routes require a valid JWT token.

---

## Deployment Notes

1. Provision a VPS with Ubuntu
2. Install Node.js, PM2, and Nginx
3. Configure HTTPS using Let’s Encrypt
4. Upload backend code to the server
5. Add Firebase service account key securely
6. Start backend using PM2
7. Point frontend API calls to backend domain

---

## Compliance & Best Practices

* Backend-only database access
* Role-based expansion ready (doctors, staff)
* Audit logging can be added for compliance
* Ready for WhatsApp, SMS, and payment integrations

---

## Future Enhancements

* WhatsApp / SMS automation
* Google Meet auto-link generation
* Online payments (UPI / Razorpay)
* Doctor availability scheduling
* Audit logs and reporting

---

## License

This software is developed exclusively for **Medical Diagnostic Centre**. Unauthorized redistribution or commercial reuse without permission is prohibited.

---

## Author

Developed as a **secure, production-ready medical software system** for real-world clinical use.
