import { Router, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../util";

import { UserType } from "../types";
import User from "../models/UserModel";

//generate access token

const generateAccessToken = (user: UserType): string => {
  return jwt.sign(
    {
      email: user.email,
      isLoggedIn: true,
      id: user.id,
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

// Define a middleware function to check jwt
export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request header
  var token = req.headers["authorization"]?.replace("Bearer ", "") || "";
  // If no token, send an error response
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  // Verify the token using a secret key
  jwt.verify(token, JWT_SECRET, async function (err: any, decoded: any) {
    // If verification fails, send an error response
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    // If verification succeeds, pass the decoded data to the next middleware
    try {
      const user = await User.findOne({ email: decoded.email });
      req["user"] = user as UserType;
      next();
    } catch (error) {
      return res.status(401).send({ message: "Invalid user" });
    }
  });
};
