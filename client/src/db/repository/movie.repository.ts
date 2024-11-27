import { createCustomError } from "../../middlewares/customErrorHandler";
import { mongooseType } from "../../@types/express";
import { ICreateMovie, ICreateWallet, IUpdateMovie } from "../../@types/types";
import { MovieModel, UserModel } from "../models";
import { MovieAttributes } from "../models/movie.model";
import { FindAndCountOptions } from "sequelize";
import { Op } from "sequelize";

export const createMovie = async (data: ICreateMovie) => {
  const response = await MovieModel.create(data);
  if (!response) return null;

  return response.dataValues;
};
export const findMovieById = async (movieId: number) => {
  const response = await MovieModel.findByPk(movieId);
  if (!response) return null;

  return response.dataValues;
};

export const findMovieByIdWithUser = async (movieId: number) => {
  const movie = await MovieModel.findOne({
    where: { id: movieId },
    attributes: ['id', 'title', 'description', 'publishedYear'], 
    include: [
      {
        model: UserModel,
        attributes: ['userId', 'name', 'email'],
      },
    ],
  });

if (!movie) return null;

  return movie.dataValues;
};

export const deleteMovieById = async (movieId: number) => {
  const response = await MovieModel.destroy({ where: { id: movieId } });
  if (!response) return null;

  return response;
};
export const updateMovieById = async (movieId: number, data: IUpdateMovie) => {
  const response = await MovieModel.update(
    { ...data },
    { where: { id: movieId } }
  );
  if (!response) return null;
  return response;
};
export const findMovieByTitle = async (title: string) => {
  const response = await MovieModel.findOne({ where: { title } });
  if (!response) return null;

  return response.dataValues;
};

export const filterMovies = async (
  page: number = 1,
  limit: number = 10,
  filters: Partial<MovieAttributes> = {}
) => {
  const offset = (page - 1) * limit;

  const options: FindAndCountOptions = {
    where: filters,
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  };

  const { count, rows } = await MovieModel.findAndCountAll(options);

  return {
    data: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
};

export const findMovieByName = async (title: string, publishedYear: string) => {
  const response = await MovieModel.findOne({
    where: {
      [Op.and]: [
        {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
        {
          publishedYear: publishedYear,
        },
      ],
    },
  });
  if (!response) return null;

  return response.dataValues;
};
