import app from './app.js';
import dotenv from 'dotenv';
dotenv.config(); 
const PORT = process.env.PORT || 5000;
import jobRoutes from "./routes/dashboardRoutes.js";
app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
