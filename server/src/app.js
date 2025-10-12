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

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const pool = (await import('./config/db.js')).default;
    const [rows] = await pool.execute('SELECT 1 as test');
    res.json({ message: 'Database connection successful', test: rows[0] });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// Test login endpoint without database dependency
app.post('/test-login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Test login request:', { email, password });
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Mock successful login for testing
    res.json({
      message: 'Test login successful',
      role: 'student',
      userId: '1',
      email: email,
      name: 'Test User',
      token: 'test-token'
    });
  } catch (error) {
    console.error('Test login error:', error);
    res.status(500).json({ message: 'Test login failed', error: error.message });
  }
});

export default app;
