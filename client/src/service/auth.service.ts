import { Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  findUserById,
} from "../db/repository/user.repository";
import { createCustomError } from "../middlewares/customErrorHandler";
import { comparePasswords } from "../utils/bcrypt";
import constants from "../utils/constants";

export const logoutService = async (userId: number) => {
  const foundUser = await findUserById(userId);
  if (!foundUser) {
    throw createCustomError("Unable to process request", 400);
  }
  // await foundUser.updateOne({ $set: { refreshToken: [] } });
  return true;
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  // console.log(user);
  if (!user) throw createCustomError("Invalid credentials", 404);

  if(!user.is_verified)throw createCustomError("Your account is not active", 400);
  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) throw createCustomError("Invalid email or password", 400);

  if (!user.is_verified)
    throw createCustomError(
      "Your account is not verified. Please request and OTP to verify your account",
      400
    );

  const payload = {
    email: user.email,
    userId: user.userId,
    role: user.role,
  };

  const accessToken = jwt.sign(
    { user: payload },
    constants.jwt.accessTokenSecret,
    { expiresIn: "1d" }
  );

  return {
    user: payload,
    token: accessToken,
  };
};
