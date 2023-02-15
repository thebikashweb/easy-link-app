import {
  UserLoginPayloadType,
  UserRegisterPayloadType,
  UserType,
} from "../types";
import User from "../models/UserModel";
import { compareHash, createHash } from "../util/hash";

export const createUser = async (
  payload: UserRegisterPayloadType
): Promise<UserType> => {
  try {
    const user = await User.create({
      ...payload,
      password: createHash(payload.password),
    });
    return user;
  } catch (error) {
    throw Error(error);
  }
};

export const loginUser = async (
  payload: UserLoginPayloadType
): Promise<UserType | boolean> => {
  try {
    const user = await User.findOne({ email: payload.email });
    if (!user) return false;

    //compare the password
    const passwordMatch = compareHash(payload.password, user.password);
    if (!passwordMatch) return false;

    return user;
  } catch (error) {
    throw Error(error);
  }
};
