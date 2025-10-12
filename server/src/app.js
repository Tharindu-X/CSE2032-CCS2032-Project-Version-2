import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes); 

// app.use('/api/dashboard', dashboardRoutes); 

// Root
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

export default app;
