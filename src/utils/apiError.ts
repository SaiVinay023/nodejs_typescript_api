export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capturing stack trace is important for debugging
    Error.captureStackTrace(this, this.constructor);
  }

  // You can add a method to format the error response
  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,  // Include stack trace in dev mode
    };
  }
}
