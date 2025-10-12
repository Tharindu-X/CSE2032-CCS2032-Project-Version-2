import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/jobs", jobRoutes);

app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

export default app;
