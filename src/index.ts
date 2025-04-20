import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Global Error Handler (Optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server Error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
