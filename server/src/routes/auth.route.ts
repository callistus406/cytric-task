import express from "express";

import AuthorizationMw from "../middlewares/authorization.mw";
import { loginCtrl, logOutCtrl } from "../controller/auth.controller";
import { loginValidation } from "../middlewares/validator.mw";

const router = express.Router();

router.post("/sign-in",
  loginValidation,
  loginCtrl);
router.post(
  "/sign-out",
  AuthorizationMw.verifyJWT,
  AuthorizationMw.ensureAuthenticated,
  logOutCtrl
);

export default router;
