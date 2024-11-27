import nodemailer from "nodemailer";

import config from "../config/config";
import { createCustomError } from "../middlewares/customErrorHandler";

const sendMail = async ({
  subject,
  userEmail,
  cb,
  emailInfo,
}: {
  subject: string;
  userEmail: string;
  cb: Function;
  emailInfo: object;
  }) => {
  
    console.log('SMTP User:', config.smtp.auth.user);
    console.log('SMTP Pass:', config.smtp.auth.pass);
  //TODO: for some reason, extracting the values won't work
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
  
      auth: {
        user: "callistus455@gmail.com",
        pass: "nkyn vzqa hxln iych",
      },
    })
  
    const message = {
      from: "callistus455@gmail.com",
      // from: config.smtp.auth.user,
      to: userEmail,
      subject,
      html: cb(emailInfo),
    }

  try {
    const info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
    throw createCustomError("Unable to connect to your email", 500);
  }
};

export default sendMail;
