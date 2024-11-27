import { authenticator } from "otplib";

authenticator.options = {
  step: 3600,
  window: 1,
  digits: 6,
};

function generateUserSecrete() {
  const userSecret = authenticator.generateSecret();
  return userSecret;
}

function generateToken(userSecret: string) {
  const userToken = authenticator.generate(userSecret);
  return userToken;
}

function verifyUserToken(userInputToken: string, userSecret: string) {
  return authenticator.verify({ token: userInputToken, secret: userSecret });
}

export { generateToken, generateUserSecrete, verifyUserToken };
