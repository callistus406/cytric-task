import { update } from "./../db/repository/user.repository";
import { sequelize } from "../db/config/connection";
import { ICreateMovie, IUpdateMovie } from "../@types/types";

import { createCustomError } from "../middlewares/customErrorHandler";
import {
  createMovie,
  deleteMovieById,
  filterMovies,
  findMovieById,
  findMovieByIdWithUser,
  findMovieByName,
  updateMovieById,
} from "../db/repository/movie.repository";
import fs from "fs";
import { MovieAttributes } from "../db/models/movie.model";
import { Request } from "../@types/express";
import { removeFile } from "../utils/multer";

export const createMovieService = async (data: ICreateMovie, req: Request) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  const movie = await findMovieByName(data.title, data.publishedYear);
  if (movie) {
    removeFile(req.file.path);

    throw createCustomError("Movie exists", 409);
  }

  const response = await createMovie({
    ...data,
    poster: fileUrl,
    userId: req.user.userId,
  });

  if (!response) {
    removeFile(req.file.path);

    throw createCustomError("Unable to create movie", 500);
  }
  return "Movie created successfully";
};
export const findMoviesService = async (
  page: number = 1,
  limit: number = 10,
  filters: Partial<MovieAttributes> = {}
  
) => {
  const response = await filterMovies(page, limit, filters);
  return response;
};
export const findMovieService = async (movieId: number) => {
  if (!movieId) throw createCustomError("MovieId  is required", 422);
  const response = await findMovieById(movieId);
  return response;
};
export const deleteMovieService = async (movieId: number,userId:number) => {
  const isFound = await findMovieByIdWithUser(movieId);
  if (!isFound) throw createCustomError("Record not found", 404);

  const ownerId = (isFound as any).User.userId;
  if(ownerId != userId) throw createCustomError("You not authorized to delete this resource",403)
  // if(isFound.User.)
// console.log((isFound as any).User.userId,"pp")
  const response = await deleteMovieById(movieId);
  if (response) {
    return "Record deleted!";
  } else {
    return "Unable to delete record";
  }
};
export const updateMovieService = async (
  movieId: number,
  data: IUpdateMovie,
  req: Request
) => {
  const isFound = await findMovieById(movieId);
  if (!isFound) throw createCustomError("Record not found", 404);
  let fileUrl;
  if (data.poster) {
    fileUrl = data.poster
  } else {
    
    fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
      }`;
    }
  const response = await updateMovieById(movieId, { ...data, poster: fileUrl });
  if (response) {
    return "Update successful";
  } else {
    removeFile(req.file.path);
    return "Unable to update record";
  }
};
