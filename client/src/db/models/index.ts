import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";
import { Movie, MovieSchema } from "./movie.model";

let UserModel: typeof User,
  MovieModel: typeof Movie


export function defineModels(sequelize: Sequelize) {
  UserModel = User.init(UserSchema, {
    sequelize,
    tableName: "user_records",
  });


  MovieModel = Movie.init(MovieSchema, {
    sequelize,
    tableName: "movie_records",
  });

  UserModel.hasMany(MovieModel, { foreignKey: "userId",  onDelete:"CASCADE"});
  MovieModel.belongsTo(UserModel, { foreignKey: "userId" });
  return {
    UserModel,
    MovieModel,
  
  };
}

export {
  UserModel,
  MovieModel,

};
