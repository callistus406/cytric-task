import express from "express";

import auth from "./auth.route";
import register from "./register.route";
import user from "./user.route";
import movie from "./movie.route";

const router = express.Router();
router.use(register);
router.use(movie);
router.use(auth);
router.use(user);

export default router;
