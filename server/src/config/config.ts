import path from "path";

import env from "dotenv";

import Config from "../@types/config";

env.config();
console.log(process.env.DB_URL);
const config: Config = {
  env: "test",
  database: process.env.DB_URL as string,
  frontEndUrl: process.env.FRONT_END_URL as string,

  imageFolder: path.join(
    __dirname,
    "..", // src
    "..", // root
    "media"
  ),
  smtp: {
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT as string),
    auth: {
      user: process.env.EMAIL_SERVER_USERNAME as string,
      pass: process.env.EMAIL_SERVER_PASSWORD as string,
    },
  },
  smtpFrom: "Movie-App",
  roles: {
    investor:process.env.USER_ROLE,
    admin:process.env.ADMIN_ROLE
  }
  
};

export default config;
