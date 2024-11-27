import mongoose from "mongoose";
import { mongooseType } from "./express";
interface IRegistration {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
}

interface IContactInfoUpdate {
  username?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  identityNumber?: string;
}

export interface IReviewAttributes {
  movieId: number;
  userId: number;
  rating: number;
  reviewText?: string;
}
export interface ICreateMovie {
  title: string;
  description?: string;
  publishedYear: string;
  poster?: string;
  author: string;
  genre: string;
  userId?:number

  director: string;
}
export interface IUpdateMovie {
  title?: string;
  description?: string;
  publishedYear: string;
  poster?: string;
  author?: string;
  genreId?: number;

  director: string;
}
interface IUpdateProfile {
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: number;
  otp_secrete?: string;
}

interface IInvestmentPlan {
  name: string;
  description?: string;
  minimumAmount: number;
  interestRate: number;
  durationInMonths: number;
  createdBy: mongoose.Types.ObjectId;
}
interface IUpdateInvestmentPlan {
  name?: string;
  description?: string;
  minimumAmount?: number;
  interestRate?: number;
  durationInMonths?: number;
}

interface IQuery {
  size?: number;
  page?: number;
  sort?: string;
  sortDirection?: number;
  [key: string]: any;
}
interface ISubscription {
  user: mongooseType;
  investmentPlan: mongooseType;
  amount: number;
  startDate: Date;
  endDate: Date;
}
interface ICreateWallet {
  user: mongoose.Types.ObjectId;
  balance?: number;
  transactions?: mongoose.Types.ObjectId[];
}
export {
  IRegistration,
  IContactInfoUpdate,
  IUpdateProfile,
  IInvestmentPlan,
  IQuery,
  IUpdateInvestmentPlan,
  ISubscription,
  ICreateWallet,
};
