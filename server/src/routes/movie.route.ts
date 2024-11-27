import express from "express";

import AuthorizationMw from "../middlewares/authorization.mw";
import { loginCtrl, logOutCtrl } from "../controller/auth.controller";
import {
  createMovieCtrl,
  deleteMovieCtrl,
  findMovieCtrl,
  findMoviesCtrl,
  updateMovieCtrl,
} from "../controller/movies.controller";
import { uploadImage } from "../utils/multer";
import { createMovieValidator } from "../middlewares/validator.mw";

const router = express.Router();

router.get(
  "/movies",
  AuthorizationMw.verifyJWT,
  AuthorizationMw.ensureAuthenticated,
  findMoviesCtrl
);
router.get("/movie/:id", findMovieCtrl);
router.delete(
  "/movie/:id",
  AuthorizationMw.verifyJWT,
  AuthorizationMw.ensureAuthenticated,
  deleteMovieCtrl
);
router.patch(
  "/update/movie/:id",
  AuthorizationMw.verifyJWT,
  AuthorizationMw.ensureAuthenticated,
  uploadImage.single("image"),

  updateMovieCtrl
);
router.post(
  "/movie",
  AuthorizationMw.verifyJWT,
  AuthorizationMw.ensureAuthenticated,
  uploadImage.single("image"),
  createMovieValidator,
  createMovieCtrl
);

export default router;
