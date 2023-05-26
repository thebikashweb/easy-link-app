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

export const getUserById = async (id: string): Promise<Partial<UserType>> => {
  const user = await User.findById(id);
  if (!user) throw new Error("User does not exist");
  return {
    id: user.id,
    fullName: user.fullName,
    avatar: user.avatar,
    email: user.email,
  };
};

export const updateUser = async (
  userId: string,
  payload: Partial<UserType>
) => {
  try {
    let data = await User.findById(userId);

    //editable column restriction
    const editableColumn: Array<Partial<keyof UserType>> = [
      "fullName",
      "avatar",
    ];

    Object.keys(payload).forEach((key: any) => {
      if (editableColumn.includes(key)) {
        data[key] = payload[key];
      }
    });

    const user = await User.findOneAndUpdate({ email: data.email }, data);

    return "updated";
  } catch (error) {
    console.log(error);
    Error(error);
  }
};
