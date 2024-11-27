import express from "express";
import { userProfileCtrl } from "../controller/user.controller";
import authorizationMw from "../middlewares/authorization.mw";

const router = express.Router();

router.get(
  "/profile",
  authorizationMw.verifyJWT,
  authorizationMw.ensureAuthenticated,
  userProfileCtrl
);

export default router;
