import express, { Request, Response } from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files (uploaded files)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
