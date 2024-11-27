const emailOTPTemplate = (data: { otp: string }) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email OTP Template</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
        <div style="text-align: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 20px;">
            <h2>Email Verification OTP</h2>
        </div>
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <div style="font-size: 28px; color: #333; margin: 20px 0; text-align: center;">${data.otp}</div>
        <p>Please use this OTP to verify your email address. It will expire in a short period of time.</p>
        <p>Thank you,</p>
        <p>Temitope </p>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
            &copy; 2024 Callistus. All rights reserved.
        </div>
    </div>
</body>

</html>


    `;
};

export default emailOTPTemplate;
