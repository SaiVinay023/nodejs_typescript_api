import express from 'express';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';
import cors from 'cors';


const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);


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