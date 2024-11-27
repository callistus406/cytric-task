import { registrationService, requestOtpService, verifyOtpService } from "../service/registration.service";
import { Request, Response } from "../@types/express";
import { asyncWrapper } from "../middlewares/asyncWrapper.mw";
import sendMail from "../utils/sendMail";
import emailOTPTemplate from "../utils/templates_files/emailVerificationTemplate";
import { createCustomError } from "../middlewares/customErrorHandler";

export const registrationCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const data = req.body as {
      name: string;
      email: string;
      password: string;
    };
    const response = await registrationService(data);

    res.status(201).json({
      success: true,
      payload: response.payload,
    });
    await sendMail({
      subject: "ACCOUNT VERIFICATION",
      userEmail: data.email,
      cb: emailOTPTemplate,
      emailInfo: { otp: response.token },
    })
      .then(async (_) => {
        // log event
      })
      .catch((error) => {
        //TODO log event
        console.log(error);
      });
  }),
];

export const verifyOtpCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const { otp, email } = req.body;

    const response = await verifyOtpService(otp, email);

    res.status(200).json({ success: true, payload: response.payload });
  }),
];

export const requestOtpCtrl = [
  asyncWrapper(async (req: Request, res: Response) => {
    const { email } = req.body;

    const response = await requestOtpService(email);

    await sendMail({
      subject: "ACCOUNT VERIFICATION",
      userEmail: email,
      cb: emailOTPTemplate,
      emailInfo: { otp: response.otp },
    })
      .then((_) => {
        res.status(200).json({
          success: true,
          payload: response.message,
        });
      })
      .catch((error) => {
        console.log(error);
        throw createCustomError(
          "Unable to confirm email. please try again",
          500
        );
      });
  }),
];
