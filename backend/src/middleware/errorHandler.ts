import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  console.error("Unhandled error:", {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  const response: ApiResponse = {
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  };

  res.status(500).json(response);
};
