# **QuickLink – Secure File Sharing App** 🚀  

QuickLink is a **fast and secure file-sharing app** that lets users **upload files and share them via QR codes**. It uses **AWS S3 for storage, PostgreSQL for database management, and Dockerized deployment on AWS EC2** for scalability and reliability.  

---

## **🛠️ Tech Stack**  
- **Backend:** Node.js, TypeScript, Prisma, PostgreSQL, AWS S3  
- **Frontend:** React, Vite, TypeScript, Tailwind CSS  
- **Deployment:** Docker, Nginx, AWS EC2, GitHub Actions (CI/CD)  

---

## **📦 Local Setup**  

### **1️⃣ Clone the Repository**  
``` 
git clone https://github.com/Deepanshudks/Quicklink.git
cd quicklink
```

###  2️⃣Set Up the Backend
```
cd backend
npm install
npx prisma generate
npm run build
npm run backend
```
###  3️⃣Set Up the Frontend
```
cd frontend
npm install
npm run dev
```
---

## **Running Backend and Frontend Separately using docker**

### 1️⃣ Build and Run the Backend
```
docker build -t quicklink-backend -f Dockerfile.backend .
docker run -d -p 5000:5000 --env-file backend/.env quicklink-backend
```
### 2️⃣ Build and Run the Frontend
```sh
docker build -t quicklink-frontend -f frontend/Dockerfile .
docker run -d -p 80:80 --env-file frontend/.env quicklink-frontend
```
