import dotenv from "dotenv";
dotenv.config();

export default {
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    TotpTokenHashSecrete: process.env.TOTP_TOKEN_HASH_SECRETE as string,
  },



  apiKeys: {
  googleApi :process.env.GOOGLE_API_KEY as string
}


};
