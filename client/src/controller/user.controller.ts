import { IUpdateProfile } from "../@types/types";
import { Request, Response } from "../@types/express";
import { asyncWrapper } from "../middlewares/asyncWrapper.mw";
import {
  userProfileService,
} from "../service/user.service";

// export const updateProfileCtrl = [
//   asyncWrapper(async (req: Request, res: Response) => {
//     const { userId } = req.user;
//     const data = req.body as IUpdateProfile;
//     const response = await updateProfileService(data, userId);

//     res.status(200).json({
//       success: true,
//       payload: response,
//     });
//   }),
// ];

export const userProfileCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const { userId } = req.user;
    const response = await userProfileService(userId);

    res.status(200).json({
      success: true,
      payload: response,
    });
  }),
];
