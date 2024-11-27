import { loginService, logoutService } from "../service/auth.service";
import { Request, Response } from "../@types/express";
import { asyncWrapper } from "../middlewares/asyncWrapper.mw";
import { loginValidation } from "../middlewares/validator.mw";

export const loginCtrl = [
  ...loginValidation,
  asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await loginService(email, password);

    res.status(200).json({
      success: true,
      payload: response,
    });
  }),
];

export const logOutCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const { userId } = req.user;

    const response = await logoutService(userId);

    res.status(200).json({
      success: true,
      payload: response,
    });
  }),
];
