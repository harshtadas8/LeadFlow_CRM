# LeadFlow CRM 🚀

A professional, full-stack Lead Management System (CRM) designed for teams to track, manage, and convert potential customers. Built with the MERN stack, this application features a sleek, responsive **"Fresh Light" UI** and robust security measures.

---

## 🌐 Live Deployment

- **Frontend:** https://lead-flow-crm-opal.vercel.app/  
- **Backend API:** https://leadflow-crm-rzi4.onrender.com/api/health  

> ⚠️ **Note on Performance:**  
> The backend is hosted on a **Render free instance**. If the application has been inactive, the initial request may take ~30 seconds to "wake up" the server. Once active, performance is near-instant.

---

## 🌟 Key Features

### 📋 Lead Management (CRUD)
- **Create:** Add new leads with validation for unique phone numbers  
- **View:** A comprehensive dashboard to browse all leads  
- **Update:** Real-time status management (New, Follow Up, Closed)  
- **Delete:** Permanent removal via a secure "Danger Zone"  
- **Notes Timeline:** Track interaction history in reverse-chronological order  

### 🔐 Security & Authentication
- **User Authentication:** JWT-based login & registration with password hashing  
- **Automation API:** Protected endpoints using static `x-api-key`  
- **Validations:** Regex-based phone validation & minimum password length  

### 🎨 Modern UI/UX
- **Fresh Light Theme:** Clean, indigo-accented modern UI  
- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop  
- **Search & Filter:** Instant filtering by name, phone, source, or status  
- **CSV Export:** Export leads with one click  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, React Router, Axios, CSS3  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Security:** JWT, Bcrypt, API Key Middleware  

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed  
- MongoDB (Local or Atlas)  

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/harshtadas8/LeadFlow_CRM.git
cd LeadFlow_CRM
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the **backend** folder:

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

## 💻 Frontend Setup

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

### 🔐 Authentication
- `POST /api/auth/register` — Register a new user  
- `POST /api/auth/login` — Login and receive JWT  

### 📋 Leads
- `GET /api/leads` — Get all leads *(JWT required)*  
- `GET /api/leads/:id` — Get lead details *(JWT required)*  
- `POST /api/leads` — Create lead *(API Key required)*  
- `PUT /api/leads/:id` — Update lead *(JWT required)*  
- `DELETE /api/leads/:id` — Delete lead *(JWT required)*  

### 📝 Notes
- `POST /api/leads/:id/notes` — Add note *(API Key required)*  

---

## 👨‍💻 Author

Developed by **Harsh Prashant Tadas** 🎓  
IIT Kharagpur | Full Stack Developer
