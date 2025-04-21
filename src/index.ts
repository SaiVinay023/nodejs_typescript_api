import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Global Error Handler (Optional)
import { Request, Response, NextFunction } from 'express';

//app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //console.error(err);
  //res.status(500).json({ message: 'Server Error' });
//});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack || err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message || "Internal Server Error" });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export const server = app;
export default app;