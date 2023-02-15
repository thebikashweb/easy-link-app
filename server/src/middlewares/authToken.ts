import { Router, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../util";

import { UserType } from "../types";

//generate access token

const generateAccessToken = (user: UserType): string => {
  return jwt.sign(
    {
      email: user.email,
      isLoggedIn: true,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

export const getAuthToken = async (req: Request, res: Response) => {
  const user = req["user"] as UserType;
  const accessToken = generateAccessToken(user);
  res
    .status(200)
    .json({ email: user.email, accessToken: accessToken, isLoggedIn: true });
};
