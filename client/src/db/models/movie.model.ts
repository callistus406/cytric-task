import { DataTypes, Model, Optional } from "sequelize";
// import sequelize from '../database';

export interface MovieAttributes {
  id: number;
  title: string;
  description?: string;
  publishedYear: string;
  poster?: string;
  genre: string;
  director: string;
  author: string;
  userId?: number;
}

interface MovieCreationAttributes extends Optional<MovieAttributes, "id"> {}

class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public publishedYear!: string;
  public poster?: string;
  public genre!: string;
  public director!: string;
  public author!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const MovieSchema = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  publishedYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export { Movie, MovieSchema };
