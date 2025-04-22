import express from 'express';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';
import cors from 'cors';



dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/api/groups', groupRoutes);

// Global Error Handler (Optional)

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