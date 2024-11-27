import express from "express";

import {
  registrationCtrl,
  requestOtpCtrl,
  verifyOtpCtrl,
} from "../controller/registration.controller";
import {
  emailValidation,
  registerValidation,
  validateVerifyOtp,
} from "../middlewares/validator.mw";

const router = express.Router();

router.post("/sign-up", registerValidation, registrationCtrl);
router.post("/verify-otp", validateVerifyOtp, verifyOtpCtrl);
router.post("/request-otp", emailValidation, requestOtpCtrl);

export default router;
