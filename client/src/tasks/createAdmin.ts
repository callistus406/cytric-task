import config from "../config/config";
import { IRegistration } from "../@types/types";
import { UserModel } from "../db/models";

const createAdmin = async (data: {
  name: string;
  email: string;
  password: string;
  role: number;
}) => {
  const isFound = await UserModel.findOne({ where: { email: data.email } });
  if (!isFound) {
    const isCreated = await UserModel.create({
      name: data.name,
      email: data.email,
      role: data.role,
      is_verified: true,
      password: data.password,
    });

    return isCreated;
  } else {
    return null;
  }
};

export default { createAdmin };
