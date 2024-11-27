import { ICreateUser, IUpdateProfile } from "../../@types/types";
import { UserModel } from "../models";

export const createUser = async (data: ICreateUser) => {
  const response = await UserModel.create(data);
  if (!response) return null;
  return response.dataValues;
};
export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) return null;

  return user.dataValues;
};
export const findUserById = async (userId: number) => {
  const response = await UserModel.findOne({ where: { userId } });
  if (!response) return null;

  return response.dataValues;
};
export const findUserOtpSecrete = async (email: string) => {
  const response = await UserModel.findOne({ where: { email } });
  if (!response) return null;

  return response;
};
export const updateUserAccount = async (email: string) => {
  const response = await UserModel.update(
    { is_verified: true },
    { where: { email } }
  );

  return response;
};
export const findUserByIdAndUpdate = async (
  userId: number,
  secrete: string
) => {
  const response = await UserModel.update(
    { otp_secrete: secrete },
    { where: { userId } }
  );

  return response;
};
export const update = async (userId: string, secrete: string) => {
  const response = await UserModel.update(
    { otp_secrete: secrete },
    { where: { userId } }
  );

  return response;
};
export const profile = async (userId: number) => {
  const response = await UserModel.findOne({ where: { userId },attributes:{exclude:["password","createdAt","updatedAt","otp_secrete",]} });
  if (!response) return null;

  return response.dataValues;
};
// export const updateProfile = async (userId: string,data:) => {
//   const response = await UserModel.findOne({ where: { userId } });
//   if (!response) return null;

//   return response.dataValues;
// };