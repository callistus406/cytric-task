import bcrypt from "bcrypt";

async function hashPassword(
  password: string,
  saltRounds: number = 10
): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}

export { comparePasswords, hashPassword };
