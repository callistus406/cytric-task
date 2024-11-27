import {
  body,
  matchedData,
  query,
  validationResult,
  check,
} from "express-validator";

import { NextFunction, Request, Response } from "../@types/express";
import mongoose from "mongoose";

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0] as any;
    return res.status(422).json({
      success: false,
      error: firstError.msg,
    });
  }

  req.data = matchedData(req);
  next();
};

export const registerValidation = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, and one number"
    ),
  validateResult,
];
export const updateMovieValidator = [
  body("title").optional().isString().withMessage("Title must be a string."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("publishedYear")
    .isString()
    .matches(/^\d{2}-\d{2}-\d{4}$/)
    .withMessage("Published year must be in the format dd-mm-yyyy."),

  body("poster")
    .optional()
    .isString()
    .isURL()
    .withMessage("Poster must be a valid URL."),

  body("author").optional().isString().withMessage("Author must be a string."),

  body("genre")
    .optional()
    .isString()

    .withMessage("Genre  must be a string."),

  body("director")
    .isString()
    .notEmpty()
    .withMessage("Director is required and must be a string."),
];
export const createMovieValidator = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required and must be a string."),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),
  body("publishedYear")
    .matches(/^\d{2}-\d{2}-\d{4}$/)
    .withMessage("Published year must be in the format dd-mm-yyyy."),
  body("author")
    .isString()
    .notEmpty()
    .withMessage("Author is required and must be a string."),
  body("director")
    .isString()
    .notEmpty()
    .withMessage("Director is required and must be a string."),
  body("genre")
    .isString()
    .withMessage("Genre  must be a string."),
  validateResult,  
  body("image")
    .isEmpty()
    .withMessage("Poster  must be present."),
  validateResult,
];

export const validateVerifyOtp = [
  body("otp")
    .isString()
    .notEmpty()
    .withMessage("OTP is required")
    .matches(/^\d{6}$/)
    .withMessage("OTP must be exactly 6 digits"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  validateResult,
];

export const emailValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  validateResult,
];

export const userValidationRules = () => [
  body("first_name")
    .isString()
    .notEmpty()
    .withMessage("First name is required"),
  body("last_name").isString().notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("identityNumber").notEmpty().withMessage("Identity number is required"),
  body("phone")
    .isString()
    .matches(/^\+234\d{10}$/)
    .withMessage("Phone number must start with '+234' followed by 10 digits."),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, and one number"
    ),
  validateResult,
];

export const loginValidation = [
  body("email")
    .isString()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage(
      "Password must have at least one uppercase, one lowercase letter, and one digit."
    ),
  validateResult,
];
