import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.post('/example', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Your logic here
    const result = { message: 'Success' };
    res.status(200).json(result); // End the response cycle
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
});

export default router;