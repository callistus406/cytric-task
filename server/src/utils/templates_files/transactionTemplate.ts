export const transactionNotificationTemplate = ({
  userName,
  transactionType,
  amount,
  status,
}: {
  userName: string;
  transactionType: "DEPOSIT" | "WITHDRAWAL";
  amount: number;
  status: "APPROVED" | "REJECTED"|string;
}) => {


    console.log("======================================")
    console.log({
        userName,
        transactionType,
        amount,
        status,
      })
  const transactionAction =
    status === "APPROVED" ? "successfully approved" : "rejected";

  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              }
              .header {
                  background-color: #4caf50;
                  color: white;
                  text-align: center;
                  padding: 10px 0;
                  font-size: 20px;
                  border-radius: 8px 8px 0 0;
              }
              .content {
                  margin: 20px 0;
                  line-height: 1.6;
                  font-size: 16px;
              }
              .footer {
                  text-align: center;
                  font-size: 12px;
                  color: #888;
                  margin-top: 20px;
              }
              .button {
                  display: inline-block;
                  margin-top: 10px;
                  padding: 10px 20px;
                  background-color: #4caf50;
                  color: white;
                  text-decoration: none;
                  border-radius: 4px;
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  Transaction Notification
              </div>
              <div class="content">
                  <p>Hi ${userName},</p>
                  <p>We would like to inform you that your <strong>${transactionType}</strong> transaction of <strong>$${amount.toFixed(
    2
  )}</strong> has been <strong>${transactionAction}</strong>.</p>
                  ${
                    status === "APPROVED"
                      ? `<p>The updated balance in your wallet is now available for further transactions.</p>`
                      : `<p>If you have any questions or require further assistance, please contact our support team.</p>`
                  }
                  <p>Thank you for using our services!</p>
              </div>
              <div class="footer">
                  &copy; ${new Date().getFullYear()} Your Callistus. All rights reserved.
              </div>
          </div>
      </body>
      </html>
    `;
};
