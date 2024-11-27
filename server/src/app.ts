import "source-map-support/register";
import express from "express";
import setupExpress from "./init/expressInit";
import { createSuperAdmin } from "./tasks/taskStart";
import { connection } from "./init/createConnection";

const app = express();

async function start() {
  await connection.connect();
 await createSuperAdmin()
  setupExpress();
}

export const startPromise = start();

export default app;
