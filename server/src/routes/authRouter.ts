import { Router, NextFunction, Request, Response } from "express";

import {
  createUser,
  getUserById,
  handleForgotPassword,
  loginUser,
  resetPassword,
  updateUser,
} from "../services/userServices";
import User from "../models/UserModel";
import {
  getAuthToken,
  handleRefreshToken,
  verifyAccessToken,
  veryResetToken,
} from "../middlewares/authToken";
import {
  PasswordReset,
  UserLoginPayloadType,
  UserRegisterPayloadType,
} from "types";

const router = Router();

router.post(
  "/forgot-password",
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email as string;
    if (!email) {
      res.status(400).json("Missing required paramaters");
    } else {
      try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
          res.status(400).json("Invalid email");
        } else {
          const isHandled = await handleForgotPassword(email);
          if (isHandled) {
            res.status(200).json("Reset instruction sent");
          }
        }
      } catch (error) {
        res.status(500).json("Internal server error");
      }
    }
  }
);
router.post(
  "/verify-token",
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token as string;
    if (!token) {
      res.status(400).json("Missing required paramaters");
    } else {
      try {
        const isTokenValid = await veryResetToken(token);
        if (!isTokenValid) {
          res.status(400).json("Invalid token");
        } else {
          const existingUser = await User.findOne({ email: isTokenValid });
          if (existingUser.resetToken !== token) {
            res.status(400).json("Invalid token");
          } else {
            res.status(200).json("Token is valid");
          }
        }
      } catch (error) {
        res.status(500).json("Internal server error");
      }
    }
  }
);
router.post(
  "/reset-password",
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, password } = req.body as PasswordReset;
    if (!token || !password) {
      res.status(400).json("Missing required paramaters");
    } else {
      try {
        const email = await veryResetToken(token);
        if (email && typeof email === "string") {
          //reset password
          const isReset = await resetPassword(password, email);
          res.status(200).json("Reset successfully");
        } else {
          res.status(400).json("Invalid token");
        }
      } catch (error) {
        res.status(500).json("Internal server error");
      }
    }
  }
);

router.get("/refresh-token", handleRefreshToken);

export default router;
