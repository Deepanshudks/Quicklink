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
```sh
git clone https://github.com/Deepanshudks/Quicklink.git
cd quicklink
```

### Set Up the Backend
```sh
cd backend
npm install
npx prisma generate
npm run build
npm run backend
```
### Set Up the Frontend
```sh
cd frontend
npm install
npm run dev
```
---

## **Running Backend and Frontend Separately**

###1️⃣ Build and Run the Backend
```sh
docker build -t quicklink-backend -f Dockerfile.backend .
docker run -d -p 5000:5000 --env-file backend/.env quicklink-backend
```
###2️⃣ Build and Run the Frontend
```sh
docker build -t quicklink-frontend -f frontend/Dockerfile .
docker run -d -p 80:80 --env-file frontend/.env quicklink-frontend
```
