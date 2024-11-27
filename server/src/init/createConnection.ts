import { CreateConnection } from "../db/config/connection";

export const connection = new CreateConnection(
  process.env.POSTGRES_DATABASE || "movies",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_ROOT_PASSWORD || "user11",
  process.env.DB_HOST || "172.26.0.2",
  {
    host: process.env.DB_HOST || "172.26.0.2",
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

