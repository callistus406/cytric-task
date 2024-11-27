import {
  createMovieService,
  deleteMovieService,
  findMovieService,
  findMoviesService,
  updateMovieService,
} from "../service/movies.service";
import { Request, Response } from "../@types/express";
import { asyncWrapper } from "../middlewares/asyncWrapper.mw";
import { MovieAttributes } from "../db/models/movie.model";
import { ICreateMovie, IUpdateMovie } from "../@types/types";
import { createCustomError } from "../middlewares/customErrorHandler";

export const createMovieCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const data = req.body as ICreateMovie;

    const file = req.file;

    if (!file) throw createCustomError("Provide a poster ", 422);
    const response = await createMovieService(data, req);

    res.status(200).json({
      success: true,
      payload: response,
    });
  }),
];
export const findMovieCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    const response = await findMovieService(id);

    res.status(200).json({
      success: true,
      payload: response,
    });
  }),
];
export const deleteMovieCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    const { userId } = req.user;
    const response = await deleteMovieService(id, userId);

    res.status(200).json({
      success: true,
      payload: response,
    });
  }),
];

export const updateMovieCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    const data = req.body as IUpdateMovie;

    const file = req.file;

    if (!file || !data.poster) {
      throw createCustomError("Please provide a poster ", 422);
    }

    const response = await updateMovieService(id, data, req);

    res.status(200).json({
      success: true,
      payload: response,
    });
  }),
];
export const findMoviesCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
    const {userId} = req.user
    const filters: Partial<MovieAttributes> = {userId};
    if (req.query.id) {
      filters.id = parseInt(req.query.id as string, 10);
    }
    if (req.query.director) {
      filters.director = req.query.director as string;
    }
    if (req.query.author) {
      filters.author = req.query.author as string;
    }

    const response = await findMoviesService(page, limit, filters);

    res.status(200).json({
      success: true,
      payload: response,
    });
  }),
];

