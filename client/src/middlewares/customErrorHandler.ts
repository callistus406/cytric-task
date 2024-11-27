import { NextFunction, Request, Response } from "express";
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const createCustomError = (
  message: string,
  statusCode: number
): CustomError => {
  return new CustomError(message, statusCode);
};

const handleCustomError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json({ success: false, error: error.message });
  }
  console.log(error)
  return res.status(500).json({ success: false, payload: "server error" });
};

export { CustomError, handleCustomError, createCustomError };
