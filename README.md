# LeadFlow CRM 🚀

A professional, full-stack Lead Management System (CRM) designed for teams to track, manage, and convert potential customers. Built with the MERN stack, this application features a sleek, responsive "Fresh Light" UI and robust security measures.

---

## 🌐 Live Deployment

- **Frontend:** https://lead-flow-crm-opal.vercel.app/
- **Backend API:** https://leadflow-crm-rzi4.onrender.com/api/health

---

## 🌟 Key Features

### 📋 Lead Management (CRUD)
- **Create:** Add new leads with validation for unique phone numbers.
- **View:** A comprehensive dashboard to browse all leads at a glance.
- **Update:** Real-time status management (New, Follow Up, Closed) directly from the details page.
- **Delete:** Permanent removal of lead records via a secure "Danger Zone."
- **Notes Timeline:** Add and view interaction history for every lead in reverse-chronological order.

### 🔐 Security & Authentication
- **User Auth:** Secure Registration and Login system using **JWT (JSON Web Tokens)** and password hashing.
- **Automation API:** Specialized endpoints protected by a static `x-api-key` for external lead ingestion (e.g., from website forms).
- **Validations:** Strict regex-based phone validation and 6-character minimum password enforcement.

### 🎨 Modern UI/UX
- **Fresh Light Theme:** A modern, indigo-accented interface with layered depth (cards on tinted backgrounds).
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop with a custom Hamburger menu for smaller screens.
- **Search & Filter:** Instant lead filtering by name, phone number, source, or current status.
- **CSV Export:** One-click export of all leads to a `.csv` file for external reporting.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, React Router, Axios, CSS3 (Custom Variables)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** JWT, Bcrypt, API Key Middleware

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB (Local or Atlas)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/harshtadas8/LeadFlow_CRM.git
cd leadflow-crm
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
API_KEY=my_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd ../frontend
npm install
```

Start the frontend application:

```bash
npm run dev
```

---

## 📡 API Endpoints Summary

### Authentication
- `POST /api/auth/register` — Create a new team account  
- `POST /api/auth/login` — Authenticate and receive a JWT  

### Leads
- `GET /api/leads` — Fetch all leads (Protected: JWT)  
- `GET /api/leads/:id` — Fetch lead details + notes (Protected: JWT)  
- `POST /api/leads` — Create a lead (Protected: API Key)  
- `PUT /api/leads/:id` — Update lead info/status (Protected: JWT)  
- `DELETE /api/leads/:id` — Remove a lead (Protected: JWT)  

### Notes
- `POST /api/leads/:id/notes` — Add interaction note (Protected: API Key)

---


## 👨‍💻 Author

Developed by **Harsh Prashant Tadas** 🎓  
IIT Kharagpur | Full Stack Developer
